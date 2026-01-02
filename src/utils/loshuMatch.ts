import type { Digit } from "@/lib/numerology";

export type PersonRecord = {
  name: string;
  dob_iso?: string | null;
  derived?: number | null;
  counts9?: string | null;
  plane_mask?: number | null;
  profile_url: string;
};

export type PlaneDescriptor = {
  key: string;
  label: string;
  digits: [Digit, Digit, Digit];
};

export type RankedCelebrity = {
  person: PersonRecord;
  similarity: number;
  matchPercent: number;
  score: number;
  derivedMatch: boolean;
};

const PLANE_DEFINITIONS: PlaneDescriptor[] = [
  { key: "mental_492", label: "Mental (4-9-2)", digits: [4, 9, 2] },
  { key: "emotional_357", label: "Emotional (3-5-7)", digits: [3, 5, 7] },
  { key: "practical_816", label: "Practical (8-1-6)", digits: [8, 1, 6] },
  { key: "will_438", label: "Will (4-3-8)", digits: [4, 3, 8] },
  { key: "thought_951", label: "Thought (9-5-1)", digits: [9, 5, 1] },
  { key: "action_276", label: "Action (2-7-6)", digits: [2, 7, 6] },
  { key: "success_456", label: "Success (4-5-6)", digits: [4, 5, 6] },
  { key: "family_852", label: "Family (8-5-2)", digits: [8, 5, 2] },
  { key: "spiritual_654", label: "Spiritual (6-5-4)", digits: [6, 5, 4] },
];

const DIGITS: Digit[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function parseCounts9(counts9: string): number[] | null {
  if (!counts9 || counts9.length !== 9) {
    return null;
  }
  const counts = Array.from({ length: 10 }, () => 0);
  DIGITS.forEach((digit, index) => {
    const value = Number.parseInt(counts9[index], 10);
    counts[digit] = Number.isFinite(value) ? value : 0;
  });
  return counts;
}

function digitsFromDob(dobIso: string): number[] {
  return dobIso
    .replace(/[^0-9]/g, "")
    .split("")
    .map((digit) => Number.parseInt(digit, 10))
    .filter((digit) => digit >= 1 && digit <= 9);
}

export function computeDerived(dobIso: string): number | null {
  const digits = digitsFromDob(dobIso);
  if (digits.length === 0) {
    return null;
  }
  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  const mod = sum % 9;
  return mod === 0 ? 9 : mod;
}

export function computeCounts9(dobIso: string, derived: number | null): string | null {
  const digits = digitsFromDob(dobIso);
  if (digits.length === 0 || !derived || derived < 1 || derived > 9) {
    return null;
  }
  const counts = Array.from({ length: 9 }, () => 0);
  digits.forEach((digit) => {
    counts[digit - 1] += 1;
  });
  counts[derived - 1] += 1;
  return counts.map((count) => String(Math.min(count, 9))).join("");
}

export function computePlaneMask(counts9: string): number {
  const counts = parseCounts9(counts9);
  if (!counts) {
    return 0;
  }
  return PLANE_DEFINITIONS.reduce((mask, plane, index) => {
    const present = plane.digits.every((digit) => counts[digit] > 0);
    return present ? mask | (1 << index) : mask;
  }, 0);
}

export function decodePlanesFromMask(mask: number): PlaneDescriptor[] {
  return PLANE_DEFINITIONS.filter((plane, index) => (mask & (1 << index)) !== 0);
}

export function sharedPlanes(userMask: number, celebMask: number): PlaneDescriptor[] {
  return decodePlanesFromMask(userMask & celebMask);
}

export function commonNumbers(
  userCounts9: string,
  celebCounts9: string,
): { commonPresentDigits: number[]; commonMissingDigits: number[] } {
  const userCounts = parseCounts9(userCounts9);
  const celebCounts = parseCounts9(celebCounts9);
  if (!userCounts || !celebCounts) {
    return { commonPresentDigits: [], commonMissingDigits: [] };
  }
  const commonPresentDigits: number[] = [];
  const commonMissingDigits: number[] = [];
  DIGITS.forEach((digit) => {
    const userCount = userCounts[digit] ?? 0;
    const celebCount = celebCounts[digit] ?? 0;
    if (Math.min(userCount, celebCount) > 0) {
      commonPresentDigits.push(digit);
    }
    if (userCount === 0 && celebCount === 0) {
      commonMissingDigits.push(digit);
    }
  });
  return { commonPresentDigits, commonMissingDigits };
}

export function rankCelebrities(
  userCounts9: string,
  userDerived: number | null,
  candidates: PersonRecord[],
): RankedCelebrity[] {
  const userCounts = parseCounts9(userCounts9);
  if (!userCounts) {
    return [];
  }
  const maxScore = DIGITS.reduce((acc, digit) => acc + userCounts[digit], 0);
  const safeMax = Math.max(maxScore, 1);

  return candidates
    .map((person) => {
      const counts = person.counts9 ? parseCounts9(person.counts9) : null;
      if (!counts) {
        return null;
      }
      const similarity = DIGITS.reduce(
        (acc, digit) => acc + Math.min(userCounts[digit], counts[digit]),
        0,
      );
      const derivedMatch = Boolean(
        userDerived && person.derived && userDerived === person.derived,
      );
      const score = similarity + (derivedMatch ? 0.35 : 0);
      const matchPercent = Math.round((similarity / safeMax) * 100);
      return { person, similarity, matchPercent, score, derivedMatch };
    })
    .filter((entry): entry is RankedCelebrity => Boolean(entry))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      if (b.similarity !== a.similarity) {
        return b.similarity - a.similarity;
      }
      return a.person.name.localeCompare(b.person.name);
    });
}
