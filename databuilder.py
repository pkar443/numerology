#!/usr/bin/env python3
"""
BornGlorious -> Lo Shu dataset builder

What it does:
- Scrapes the worldwide "birthdays" listing from BornGlorious (paged)
- Extracts: name, dob_raw (e.g., "Jan 01, 1973"), profile_url, plus any nearby birthplace/profession if present
- Converts DOB to ISO (YYYY-MM-DD)
- Computes:
    - derived number (digital root 1..9, ignoring zeros)
    - counts9 (counts for digits 1..9 from DOB digits, ignoring 0, PLUS derived number added once)
    - plane_mask (9-bit mask for Lo Shu planes/lines present)
- Outputs:
    - people.json
    - index_by_plane_mask.json  (mask -> list of indices into people.json)

Usage:
  pip install requests beautifulsoup4 lxml
  python build_bornglorious_loshu.py --pd today --delay 0.8
  python build_bornglorious_loshu.py --pd jan-01 --max-pages 50

Notes:
- Be polite: use --delay (seconds) to rate-limit requests.
- Consider using an explicit date (not pd=today) for stable results.
"""

#!/usr/bin/env python3
import argparse
import json
import re
import time
from dataclasses import asdict, dataclass
from datetime import datetime
from typing import Dict, List, Optional, Tuple
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE = "https://www.bornglorious.com"
DOB_PATTERNS = [
    re.compile(r'Date\s+of\s+Birth:?\s*"?(\d{1,2})[-\s]+([A-Za-z]{3})"?[-\s]+\(?(\d{4})\)?', re.IGNORECASE),
    re.compile(r'DOB:?\s*"?(\d{1,2})[-\s]+([A-Za-z]{3})"?[-\s]+(\d{4})', re.IGNORECASE),
    re.compile(r'\b(\d{1,2})[-\s]+([A-Za-z]{3})["\']?[-\s]+\(?(\d{4})\)?\b', re.IGNORECASE),
]
DOB_LABEL_RE = re.compile(r"\b(Date of Birth|DOB)\b", re.IGNORECASE)
MONTHS = {
    "jan": "Jan",
    "feb": "Feb",
    "mar": "Mar",
    "apr": "Apr",
    "may": "May",
    "jun": "Jun",
    "jul": "Jul",
    "aug": "Aug",
    "sep": "Sep",
    "oct": "Oct",
    "nov": "Nov",
    "dec": "Dec",
}
DEBUG_PROFILE_LIMIT = 5
PAGE_OF_RE = re.compile(r"Page:\s*(\d+)\s*of\s*(\d+)", re.IGNORECASE)

# Lo Shu planes (same order as before)
PLANES = [
    ("mental_492",    (4, 9, 2)),
    ("emotional_357", (3, 5, 7)),
    ("practical_816", (8, 1, 6)),
    ("will_438",      (4, 3, 8)),
    ("thought_951",   (9, 5, 1)),
    ("action_276",    (2, 7, 6)),
    ("success_456",   (4, 5, 6)),
    ("family_852",    (8, 5, 2)),
    ("spiritual_654", (6, 5, 4)),
]
PLANE_BIT_ORDER = {name: i for i, (name, _) in enumerate(PLANES)}

@dataclass
class PersonRecord:
    name: str
    dob_raw: Optional[str]
    dob_iso: Optional[str]
    derived: Optional[int]
    counts9: Optional[str]
    plane_mask: Optional[int]
    profile_url: str
    birthplace: Optional[str]
    profession: Optional[str]
    source_page: str

def clean(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "").strip())

def normalize_dob_parts(day_s: str, mon_s: str, year_s: str) -> Optional[str]:
    mon_key = mon_s.strip().lower()[:3]
    mon = MONTHS.get(mon_key)
    if not mon:
        return None
    try:
        day = int(day_s)
        year = int(year_s)
    except Exception:
        return None
    if not (1 <= day <= 31) or not (1000 <= year <= 9999):
        return None

    day_padded = f"{day:02d}"
    for sep, fmt in [("-", "%d-%b-%Y"), (" ", "%d %b %Y")]:
        try:
            dt = datetime.strptime(f"{day_padded}{sep}{mon}{sep}{year}", fmt)
            return dt.strftime("%b %d, %Y")
        except Exception:
            continue
    return None

def match_dob_from_text(text: str) -> Tuple[Optional[str], Optional[str]]:
    for pattern in DOB_PATTERNS:
        m = pattern.search(text)
        if not m:
            continue
        dob_raw = normalize_dob_parts(m.group(1), m.group(2), m.group(3))
        if dob_raw:
            return dob_raw, clean(m.group(0))
    return None, None

def extract_dob_from_profile(text: str) -> Optional[str]:
    dob_raw, _ = match_dob_from_text(text)
    return dob_raw

def dob_raw_to_iso(dob_raw: str) -> Optional[str]:
    try:
        dt = datetime.strptime(dob_raw, "%b %d, %Y")
        return dt.strftime("%Y-%m-%d")
    except Exception:
        return None

def digits_from_iso(dob_iso: str) -> List[int]:
    digs = []
    for ch in dob_iso:
        if ch.isdigit():
            d = int(ch)
            if d != 0:
                digs.append(d)
    return digs

def digital_root_1_to_9(digits: List[int]) -> Optional[int]:
    if not digits:
        return None
    s = sum(digits)
    return 9 if (s % 9 == 0) else (s % 9)

def counts9_from_digits_with_derived(digits: List[int], derived: Optional[int]) -> str:
    counts = [0] * 10
    for d in digits:
        if 1 <= d <= 9:
            counts[d] += 1
    if derived is not None:
        counts[derived] += 1  # derived MUST be included
    return "".join(str(min(counts[i], 9)) for i in range(1, 10))

def plane_mask_from_counts9(counts9: str) -> int:
    present = {i: (int(counts9[i - 1]) > 0) for i in range(1, 10)}
    mask = 0
    for i, (_name, (a, b, c)) in enumerate(PLANES):
        if present[a] and present[b] and present[c]:
            mask |= (1 << i)
    return mask

def get_total_pages(soup: BeautifulSoup) -> Optional[int]:
    text = soup.get_text(" ", strip=True)
    m = PAGE_OF_RE.search(text)
    if not m:
        return None
    return int(m.group(2))

def parse_listing_page_for_people(html: str, page_url: str) -> List[Tuple[str, str]]:
    """
    Robust listing parser:
    - Just find name + profile link for each entry.
    """
    soup = BeautifulSoup(html, "lxml")
    people = []

    # Many entries show as h3/h4 with "NN Name" and a link.
    for h in soup.find_all(["h3", "h4"]):
        t = clean(h.get_text(" ", strip=True))
        if not t or not re.match(r"^\d+\b", t):
            continue
        a = h.find("a", href=True)
        if not a:
            continue
        name = clean(a.get_text(strip=True))
        profile_url = urljoin(page_url, a["href"])
        people.append((name, profile_url))

    # Fallback: any link that looks like /person/?pi=
    if not people:
        for a in soup.find_all("a", href=True):
            if "/person/?pi=" in a["href"]:
                name = clean(a.get_text(strip=True))
                if name:
                    people.append((name, urljoin(page_url, a["href"])))

    # Deduplicate by profile_url
    seen = set()
    out = []
    for name, url in people:
        if url in seen:
            continue
        seen.add(url)
        out.append((name, url))
    return out

def parse_profile_page(html: str) -> Tuple[Optional[str], Optional[str], Optional[str], Optional[str]]:
    soup = BeautifulSoup(html, "lxml")
    text = soup.get_text("\n", strip=True)

    dob_raw = None
    dob_source = None

    candidates = []
    for label in soup.find_all(string=DOB_LABEL_RE):
        label_text = clean(str(label))
        if not label_text:
            continue
        parent = label.parent
        if parent:
            if parent.name in ("td", "th"):
                sib = parent.find_next_sibling(["td", "th"])
                if sib:
                    candidates.append(f"{label_text} {clean(sib.get_text(' ', strip=True))}")
            if parent.name == "dt":
                sib = parent.find_next_sibling("dd")
                if sib:
                    candidates.append(f"{label_text} {clean(sib.get_text(' ', strip=True))}")
            candidates.append(clean(parent.get_text(" ", strip=True)))
            sib = parent.find_next_sibling()
            if sib:
                candidates.append(f"{label_text} {clean(sib.get_text(' ', strip=True))}")

    seen = set()
    for cand in candidates:
        if not cand or cand in seen:
            continue
        seen.add(cand)
        dob_raw, dob_source = match_dob_from_text(cand)
        if dob_raw:
            break

    if not dob_raw:
        dob_raw, dob_source = match_dob_from_text(text)

    # Place of Birth line exists like: "Place of Birth: Milford, Michigan, United States"
    birthplace = None
    prof = None

    for line in text.splitlines():
        l = clean(line)
        if l.startswith("Place of Birth:"):
            birthplace = l.replace("Place of Birth:", "").strip()
        elif l.startswith("Profession:"):
            prof = l.replace("Profession:", "").strip()

    return dob_raw, birthplace, prof, dob_source


def build(pd: str, delay: float, max_pages: Optional[int], max_profiles: Optional[int], out_people: str, out_index: str, debug_profile: bool):
    session = requests.Session()
    session.headers.update({
        # A more browser-like UA helps some sites
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
    })

    first_url = f"{BASE}/world/birthday/?pd={pd}&pg=1"
    r = session.get(first_url, timeout=30)
    r.raise_for_status()

    soup = BeautifulSoup(r.text, "lxml")
    total_pages = get_total_pages(soup) or 1
    if max_pages is not None:
        total_pages = min(total_pages, max_pages)

    # 1) Gather all (name, profile_url)
    listing_people: List[Tuple[str, str, str]] = []  # (name, profile_url, source_page)
    for pg in range(1, total_pages + 1):
        url = f"{BASE}/world/birthday/?pd={pd}&pg={pg}"
        resp = session.get(url, timeout=30)
        resp.raise_for_status()
        entries = parse_listing_page_for_people(resp.text, url)
        for name, profile_url in entries:
            listing_people.append((name, profile_url, url))
        print(f"listing pg {pg}/{total_pages}: +{len(entries)} (total {len(listing_people)})")
        time.sleep(delay)

    # Deduplicate across pages
    seen = set()
    deduped = []
    for name, purl, src in listing_people:
        if purl in seen:
            continue
        seen.add(purl)
        deduped.append((name, purl, src))

    if max_profiles is not None:
        deduped = deduped[:max_profiles]

    # 2) Fetch each profile page and compute numerology fields
    people: List[PersonRecord] = []
    debug_printed = 0
    for i, (name, profile_url, source_page) in enumerate(deduped, start=1):
        try:
            pr = session.get(profile_url, timeout=30)
            pr.raise_for_status()
            dob_raw, birthplace, profession, dob_source = parse_profile_page(pr.text)

            dob_iso = dob_raw_to_iso(dob_raw) if dob_raw else None
            derived = None
            counts9 = None
            plane_mask = None
            if dob_iso:
                digits = digits_from_iso(dob_iso)
                derived = digital_root_1_to_9(digits)
                counts9 = counts9_from_digits_with_derived(digits, derived)
                plane_mask = plane_mask_from_counts9(counts9)

            if debug_profile and debug_printed < DEBUG_PROFILE_LIMIT:
                snippet = dob_source or "None"
                if len(snippet) > 120:
                    snippet = snippet[:117] + "..."
                print(f"[debug] {profile_url}")
                print(f"[debug] dob_source: {snippet}")
                print(f"[debug] dob_raw={dob_raw} dob_iso={dob_iso}")
                debug_printed += 1

            people.append(PersonRecord(
                name=name,
                dob_raw=dob_raw,
                dob_iso=dob_iso,
                derived=derived,
                counts9=counts9,
                plane_mask=plane_mask,
                profile_url=profile_url,
                birthplace=birthplace,
                profession=profession,
                source_page=source_page
            ))

        except Exception as e:
            # keep going, but record the person with nulls
            people.append(PersonRecord(
                name=name,
                dob_raw=None,
                dob_iso=None,
                derived=None,
                counts9=None,
                plane_mask=None,
                profile_url=profile_url,
                birthplace=None,
                profession=None,
                source_page=source_page
            ))
            print(f"[WARN] profile fetch failed for {profile_url}: {e}")

        if i % 25 == 0:
            print(f"profile {i}/{len(deduped)} processed")

        time.sleep(delay)

    # 3) Build index: mask -> list of indices
    index: Dict[str, List[int]] = {}
    for idx, p in enumerate(people):
        if p.plane_mask is None:
            continue
        index.setdefault(str(p.plane_mask), []).append(idx)

    # 4) Write outputs
    with open(out_people, "w", encoding="utf-8") as f:
        json.dump([asdict(p) for p in people], f, ensure_ascii=False, indent=2)

    payload = {
        "meta": {
            "source": f"{BASE}/world/birthday/?pd={pd}",
            "plane_bit_order": PLANE_BIT_ORDER,
            "planes": [{"name": name, "digits": list(digs)} for (name, digs) in PLANES],
            "counts9_format": "9-char string for digits 1..9 (DOB digits ignoring 0 + derived once)",
            "derived_rule": "digital root 1..9 from DOB digits (ignoring 0), then added into counts",
            "generated_at_utc": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
            "total_people": len(people),
            "indexed_people": sum(len(v) for v in index.values()),
        },
        "by_plane_mask": index
    }

    with open(out_index, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"\nWrote: {out_people} ({len(people)} records)")
    print(f"Wrote: {out_index} ({len(index)} masks)")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pd", default="today", help="BornGlorious pd param (e.g., today, jan-01, etc.)")
    ap.add_argument("--delay", type=float, default=0.8, help="Delay between requests (seconds)")
    ap.add_argument("--max-pages", type=int, default=None, help="Limit pages for testing")
    ap.add_argument("--max-profiles", type=int, default=None, help="Limit profiles for testing")
    ap.add_argument("--people-out", default="people.json")
    ap.add_argument("--index-out", default="index_by_plane_mask.json")
    ap.add_argument("--debug-profile", action="store_true", help="Print DOB parse details for the first few profiles")
    args = ap.parse_args()

    build(
        pd=args.pd,
        delay=args.delay,
        max_pages=args.max_pages,
        max_profiles=args.max_profiles,
        out_people=args.people_out,
        out_index=args.index_out,
        debug_profile=args.debug_profile
    )

if __name__ == "__main__":
    main()
