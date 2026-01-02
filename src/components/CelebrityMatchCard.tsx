"use client";

import { useCallback, useRef, useState } from "react";
import {
  AlertCircle,
  ChevronUp,
  Info,
  RefreshCcw,
  Sparkles,
  Star,
} from "lucide-react";
import {
  computeCounts9,
  computeDerived,
  computePlaneMask,
  commonNumbers,
  decodePlanesFromMask,
  rankCelebrities,
  sharedPlanes,
  type PersonRecord,
  type PlaneDescriptor,
  type RankedCelebrity,
} from "@/utils/loshuMatch";

type IndexData = {
  meta?: {
    plane_bit_order?: Record<string, number>;
  };
  by_plane_mask?: Record<string, number[]>;
};

const PEOPLE_URL = "/data/people.json";
const INDEX_URL = "/data/index_by_plane_mask.json";
const MAX_RESULTS = 20;
const CANDIDATE_POOL = 120;

const planeIcons: Record<string, string> = {
  mental_492: "🧠",
  emotional_357: "💗",
  practical_816: "🧭",
  will_438: "🔥",
  thought_951: "💡",
  action_276: "⚡",
  success_456: "🏆",
  family_852: "🏠",
  spiritual_654: "🔮",
};

function popCount(value: number): number {
  let count = 0;
  let current = value;
  while (current > 0) {
    count += current & 1;
    current >>= 1;
  }
  return count;
}

function buildFallbackIndices(
  userMask: number,
  byPlaneMask: Record<string, number[]>,
): number[] {
  const masks = Object.keys(byPlaneMask)
    .map((key) => Number.parseInt(key, 10))
    .filter((mask) => Number.isFinite(mask))
    .map((mask) => ({ mask, overlap: popCount(mask & userMask) }))
    .sort((a, b) => {
      if (b.overlap !== a.overlap) {
        return b.overlap - a.overlap;
      }
      return a.mask - b.mask;
    });

  const seen = new Set<number>();
  const indices: number[] = [];
  for (const entry of masks) {
    const bucket = byPlaneMask[String(entry.mask)] ?? [];
    bucket.forEach((idx) => {
      if (!seen.has(idx)) {
        indices.push(idx);
        seen.add(idx);
      }
    });
    if (indices.length >= CANDIDATE_POOL) {
      break;
    }
  }
  return indices;
}

export default function CelebrityMatchCard({ dobIso }: { dobIso: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<RankedCelebrity[]>([]);
  const [matchMode, setMatchMode] = useState<"exact" | "closest" | "none" | null>(
    null,
  );
  const [userPlaneMask, setUserPlaneMask] = useState<number | null>(null);
  const [userDerived, setUserDerived] = useState<number | null>(null);
  const [userCounts9, setUserCounts9] = useState<string | null>(null);
  const [userPlanes, setUserPlanes] = useState<PlaneDescriptor[]>([]);

  const peopleRef = useRef<PersonRecord[] | null>(null);
  const indexRef = useRef<IndexData | null>(null);

  const fetchJson = useCallback(async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${url}`);
    }
    return response.json();
  }, []);

  const loadData = useCallback(async () => {
    if (!peopleRef.current) {
      peopleRef.current = await fetchJson(PEOPLE_URL);
    }
    if (!indexRef.current) {
      indexRef.current = await fetchJson(INDEX_URL);
    }
    return {
      people: peopleRef.current ?? [],
      index: indexRef.current ?? {},
    };
  }, [fetchJson]);

  const handleMatch = useCallback(async () => {
    setIsOpen(true);
    setIsLoading(true);
    setError(null);
    setMatches([]);
    setMatchMode(null);

    try {
      const derived = computeDerived(dobIso);
      const counts9 = computeCounts9(dobIso, derived);
      if (!derived || !counts9) {
        throw new Error("Please provide a valid date of birth first.");
      }

      const planeMask = computePlaneMask(counts9);
      setUserDerived(derived);
      setUserCounts9(counts9);
      setUserPlaneMask(planeMask);
      setUserPlanes(decodePlanesFromMask(planeMask));

      const { people, index } = await loadData();
      const byPlaneMask = index.by_plane_mask ?? {};
      const exactBucket = byPlaneMask[String(planeMask)] ?? [];
      const useFallback = exactBucket.length === 0;
      const indices = useFallback
        ? buildFallbackIndices(planeMask, byPlaneMask)
        : exactBucket;

      const uniqueIndices = new Set<number>();
      const candidates: PersonRecord[] = [];
      indices.forEach((idx) => {
        if (!uniqueIndices.has(idx)) {
          const person = people[idx];
          if (person) {
            candidates.push(person);
            uniqueIndices.add(idx);
          }
        }
      });

      const ranked = rankCelebrities(counts9, derived, candidates).slice(
        0,
        MAX_RESULTS,
      );
      setMatches(ranked);
      setMatchMode(ranked.length ? (useFallback ? "closest" : "exact") : "none");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load matches.");
      setMatchMode("none");
      setMatches([]);
      setUserDerived(null);
      setUserCounts9(null);
      setUserPlaneMask(null);
      setUserPlanes([]);
    } finally {
      setIsLoading(false);
    }
  }, [dobIso, loadData]);

  return (
    <div className="hover-lift rounded-3xl border border-amber-100/60 bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Celebrity Match
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Match your profile with celebrity
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            We match your Lo Shu planes and number pattern with famous people.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleMatch}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 bg-gradient-to-r from-amber-600 via-rose-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Sparkles className="h-4 w-4" />
            Match your profile with celebrity
          </button>
          {isOpen && (
            <button
              type="button"
              onClick={handleMatch}
              className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-white"
            >
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-6 rounded-2xl border border-white/70 bg-white/80 p-5 shadow-inner">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Match Results
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {matchMode === "closest"
                  ? "Closest plane matches"
                  : matchMode === "exact"
                    ? "Exact plane matches"
                    : "Celebrity matches"}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700">
                  <Star className="h-3 w-3" />
                  Derived number: {userDerived ?? "-"}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300"
            >
              <ChevronUp className="h-3 w-3" />
              Hide
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Your active planes
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {userPlanes.length > 0 ? (
                userPlanes.map((plane) => (
                  <span
                    key={plane.key}
                    className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                  >
                    <span>{planeIcons[plane.key] ?? "✨"}</span>
                    {plane.label}
                  </span>
                ))
              ) : (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  No complete planes yet
                </span>
              )}
            </div>
          </div>

          <div className="mt-5">
            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                Finding matches...
              </div>
            ) : error ? (
              <div className="flex items-start gap-2 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
                <AlertCircle className="mt-0.5 h-4 w-4" />
                <span>{error}</span>
              </div>
            ) : matches.length === 0 ? (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                No matches found yet. Try refreshing or adjust your DOB entry.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <span>
                    Showing top {Math.min(matches.length, MAX_RESULTS)} matches
                  </span>
                  <span>
                    {matchMode === "closest"
                      ? "Closest planes by overlap"
                      : matchMode === "exact"
                        ? "Exact plane match"
                        : "Match results"}
                  </span>
                </div>
                <div className="flex items-start gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600">
                  <Info className="mt-0.5 h-4 w-4 text-slate-400" />
                  <span>
                    How match score works: Match score is based on shared Lo Shu
                    planes, similarity of your number pattern, and a derived number
                    bonus.
                  </span>
                </div>
                <div className="max-h-[420px] space-y-3 overflow-y-auto pr-2">
                  {matches.map((match) => {
                    const person = match.person;
                    const celebMask = person.plane_mask ?? 0;
                    const shared = userPlaneMask === null
                      ? []
                      : sharedPlanes(userPlaneMask, celebMask);
                    const { commonPresentDigits, commonMissingDigits } = userCounts9 && person.counts9
                      ? commonNumbers(userCounts9, person.counts9)
                      : { commonPresentDigits: [], commonMissingDigits: [] };
                    const showMissing = commonMissingDigits.slice(0, 3);
                    const showPresent = commonPresentDigits.slice(0, 3);
                    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(
                      person.name,
                    )}`;
                    return (
                      <div
                        key={person.profile_url}
                        className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <a
                            href={googleUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-base font-semibold text-slate-900 hover:text-slate-700"
                          >
                            {person.name}
                          </a>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                              {match.matchPercent}% match
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                          <span>DOB: {person.dob_iso ?? "Unknown"}</span>
                          {typeof person.derived === "number" && (
                            <span>Derived: {person.derived}</span>
                          )}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <span
                            className={`rounded-full px-3 py-1 font-semibold ${
                              match.derivedMatch
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {match.derivedMatch
                              ? "✅ Same derived number"
                              : "❌ Different derived number"}
                          </span>
                        </div>

                        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Shared planes with you
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {shared.length > 0 ? (
                              shared.map((plane) => (
                                <span
                                  key={`${person.profile_url}-${plane.key}`}
                                  className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                                >
                                  <span>{planeIcons[plane.key] ?? "✨"}</span>
                                  {plane.label}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-slate-500">
                                Closest by number pattern (no exact plane overlap)
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 text-xs text-slate-600 sm:grid-cols-2">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                              Common strong numbers
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {showPresent.length > 0 ? (
                                showPresent.map((digit) => (
                                  <span
                                    key={`${person.profile_url}-present-${digit}`}
                                    className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700"
                                  >
                                    {digit}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-slate-500">
                                  None yet
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                              Both missing
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {showMissing.length > 0 ? (
                                showMissing.map((digit) => (
                                  <span
                                    key={`${person.profile_url}-missing-${digit}`}
                                    className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500"
                                  >
                                    {digit}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-slate-500">
                                  None to highlight
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <details className="mt-4 rounded-2xl border border-slate-100 bg-white p-3 text-xs text-slate-600">
                          <summary className="cursor-pointer font-semibold text-slate-600">
                            Advanced details
                          </summary>
                          <div className="mt-2 space-y-1">
                            <p>Celebrity plane mask: {person.plane_mask ?? "-"}</p>
                            <p>Celebrity counts9: {person.counts9 ?? "-"}</p>
                          </div>
                        </details>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <details className="mt-4 rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-600">
            <summary className="cursor-pointer font-semibold text-slate-600">
              Advanced details
            </summary>
            <div className="mt-2 space-y-1">
              <p>Your plane mask: {userPlaneMask ?? "-"}</p>
              <p>Your counts9 pattern: {userCounts9 ?? "-"}</p>
              {matchMode === "closest" && <p>Closest planes by overlap.</p>}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
