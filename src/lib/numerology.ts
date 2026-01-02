export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Rating = "Supportive" | "Neutral" | "Challenging";

export type UserInput = {
  fullName: string;
  dob: string;
  mobile?: string;
  email?: string;
  houseNo?: string;
};

export type PersonInput = {
  fullName: string;
  dob: string;
  mobile?: string;
  houseNo?: string;
};

export type LoShuCounts = Record<Digit, number>;

export type DerivedNumbers = {
  day: Digit;
  month: Digit;
  year: Digit;
  lifePath: Digit;
};

export type LoShuResult = {
  counts: LoShuCounts;
  presentNumbers: Digit[];
  missingNumbers: Digit[];
  repeatedNumbers: Digit[];
};

export type PlaneResult = {
  id: string;
  name: string;
  numbers: Digit[];
  group: "Row" | "Column" | "Diagonal";
  present: boolean;
  meaning: string;
  howItShows: string;
  tip: string;
  missingTip: string;
};

export type WeaknessArrowResult = {
  id: string;
  name: string;
  numbers: Digit[];
  present: boolean;
  feeling: string;
  balance: string;
  habit: string;
};

export type SmallArrowResult = {
  id: string;
  name: string;
  numbers: [Digit, Digit];
  present: boolean;
  meaning: string;
  advice: string;
};

export type RemedyPack = {
  digit: Digit;
  block: string;
  crystal: string;
  color: string;
  direction: string;
  activity: string;
};

export type RepeatedInsight = {
  digit: Digit;
  amplified: string;
  balance: string;
};

export type ChaldeanBreakdownItem = {
  letter: string;
  value: number;
};

export type ChaldeanResult = {
  rawSum: number;
  reduced: Digit;
  breakdown: ChaldeanBreakdownItem[];
};

export type NameCorrectionSuggestion = {
  letters: string;
  value: number;
  newSum: number;
  newReduced: Digit;
  message: string;
};

export type NameAlignment = {
  rating: Rating;
  explanation: string;
  targetNumber: Digit;
  suggestions: NameCorrectionSuggestion[];
};

export type EssenceResult = {
  rawSum: number;
  reduced: Digit;
  meaning: string;
};

export type PersonalResult = {
  rawSum: number;
  reduced: Digit;
  meaning: string;
};

export type GuidanceResult = {
  luckyNumber: Digit;
  luckyColor: string;
  luckyDay: string;
  avoidNumber: Digit;
  remedy: string;
};

export type SpecialNumberType = "Master" | "Karmic";

export type SpecialNumber = {
  type: SpecialNumberType;
  value: number;
  meaning: string;
  guidance: string;
  source: string;
};

export type MobileAnalysis = {
  rawSum: number;
  reduced: Digit;
  rating: Rating;
  explanation: string;
  digitCoverage: LoShuCounts;
  supportsMissingDigits: Digit[];
  suggestions: string[];
  specialNumbers: SpecialNumber[];
};

export type HouseAnalysis = {
  rawSum: number;
  reduced: Digit;
  rating: Rating;
  explanation: string;
  adjustmentSuggestions: string[];
  entryRemedies: RemedyPack[];
  specialNumbers: SpecialNumber[];
};

export type PersonAnalysis = {
  loShu: LoShuResult;
  derivedNumbers: DerivedNumbers;
  planes: PlaneResult[];
  weaknessArrows: WeaknessArrowResult[];
  smallArrows: SmallArrowResult[];
  missingRemedies: RemedyPack[];
  repeatedInsights: RepeatedInsight[];
  chaldean: ChaldeanResult;
  nameAlignment: NameAlignment;
  essence: EssenceResult;
  personal: PersonalResult;
  guidance: GuidanceResult;
  mobileAnalysis?: MobileAnalysis;
  houseAnalysis?: HouseAnalysis;
  specialNumbers: SpecialNumber[];
};

export type CompatibilityResult = {
  personA: PersonAnalysis;
  personB: PersonAnalysis;
  sharedStrengthPlanes: PlaneResult[];
  sharedSmallArrows: SmallArrowResult[];
  complements: {
    aSupportsB: Digit[];
    bSupportsA: Digit[];
    message: string;
  };
  frictionNotes: string[];
  sharedRemedy?: RemedyPack;
  score: number;
  scoreNote: string;
};

export const LO_SHU_LAYOUT: Digit[][] = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

const DIGITS: Digit[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const NUMBER_MEANINGS: Record<Digit, string> = {
  1: "Leadership, independence, and new starts.",
  2: "Harmony, cooperation, and empathy.",
  3: "Creativity, communication, and joy.",
  4: "Stability, structure, and patience.",
  5: "Freedom, adaptability, and curiosity.",
  6: "Responsibility, service, and care.",
  7: "Introspection, wisdom, and spirituality.",
  8: "Ambition, authority, and achievement.",
  9: "Compassion, completion, and generosity.",
};

const PLANE_DEFINITIONS: Omit<PlaneResult, "present">[] = [
  {
    id: "mental",
    name: "Mental Plane",
    numbers: [4, 9, 2],
    group: "Row",
    meaning:
      "Planning, logic, and learning focus are highlighted. This plane reflects how you organize ideas and process information.",
    howItShows:
      "You prefer structured thinking and clear steps before taking action.",
    tip: "Use checklists and study plans to keep the mind sharp.",
    missingTip:
      "Practice simple planning habits to strengthen mental clarity.",
  },
  {
    id: "emotional",
    name: "Emotional/Spiritual Plane",
    numbers: [3, 5, 7],
    group: "Row",
    meaning:
      "Sensitivity, intuition, and emotional expression are emphasized. This plane reflects how you feel and connect inwardly.",
    howItShows:
      "You sense moods quickly and respond to subtle emotional cues.",
    tip: "Share feelings through journaling or creative outlets.",
    missingTip:
      "Start with small emotional check-ins and gentle self-expression.",
  },
  {
    id: "practical",
    name: "Practical/Material Plane",
    numbers: [8, 1, 6],
    group: "Row",
    meaning:
      "Execution, discipline, and responsibility stand out. This plane reflects how you deliver results.",
    howItShows:
      "You move from plan to action with steady effort.",
    tip: "Keep routines simple and consistent to build momentum.",
    missingTip:
      "Build follow-through by committing to small daily actions.",
  },
  {
    id: "thought",
    name: "Thought Plane",
    numbers: [4, 3, 8],
    group: "Column",
    meaning:
      "Persistence and focused thinking are supported. This plane reflects willpower in action.",
    howItShows:
      "You can push through tasks when you set clear goals.",
    tip: "Break goals into milestones and track progress.",
    missingTip:
      "Strengthen willpower by completing one small task daily.",
  },
  {
    id: "will-balance",
    name: "Will/Balance Plane",
    numbers: [9, 5, 1],
    group: "Column",
    meaning:
      "Inner balance, values, and direction are highlighted. This plane reflects how you align purpose and action.",
    howItShows:
      "You seek meaning and want your choices to feel aligned.",
    tip: "Reflect on values before major decisions.",
    missingTip:
      "Create a simple values list and review it weekly.",
  },
  {
    id: "action-material",
    name: "Action/Material Plane",
    numbers: [2, 7, 6],
    group: "Column",
    meaning:
      "Relationships, action, and material progress blend here. This plane reflects how support turns into outcomes.",
    howItShows:
      "You do best with teamwork and steady accountability.",
    tip: "Collaborate and keep practical commitments visible.",
    missingTip:
      "Lean on supportive routines and clear accountability.",
  },
  {
    id: "success",
    name: "Golden Yog (Success)",
    numbers: [4, 5, 6],
    group: "Diagonal",
    meaning:
      "Structured effort can lead to recognition. This plane reflects visible achievement over time.",
    howItShows:
      "You deliver best when you combine planning with consistent work.",
    tip: "Pair structure with follow-through for steady wins.",
    missingTip:
      "Focus on reliable routines and completing what you start.",
  },
  {
    id: "determination",
    name: "Silver Yog (Determination)",
    numbers: [2, 5, 8],
    group: "Diagonal",
    meaning:
      "Resilience and grit are highlighted. This plane reflects how you face obstacles.",
    howItShows:
      "You keep going even when progress is slow.",
    tip: "Track small wins to build resilience.",
    missingTip:
      "Practice patience and acknowledge each step forward.",
  },
];

const WEAKNESS_ARROWS: Omit<WeaknessArrowResult, "present">[] = [
  {
    id: "frustration",
    name: "Frustration Arrow",
    numbers: [2, 5, 8],
    feeling:
      "Progress can feel blocked or delayed. You may feel impatience when results take time.",
    balance:
      "Balance this with steady routines and remedies for 2, 5, and 8.",
    habit: "Use a simple weekly progress log to reduce pressure.",
  },
  {
    id: "loneliness",
    name: "Loneliness Arrow",
    numbers: [3, 5, 7],
    feeling:
      "Emotional distance can appear at times. Sharing feelings might feel harder than expected.",
    balance:
      "Balance this with expression habits and remedies for 3, 5, and 7.",
    habit: "Schedule one honest conversation or creative share each week.",
  },
  {
    id: "confusion",
    name: "Confusion Arrow",
    numbers: [3, 4, 8],
    feeling:
      "Plans may feel scattered or unclear. You might overthink choices.",
    balance:
      "Balance this with structure and remedies for 3, 4, and 8.",
    habit: "Write one clear next step before ending each day.",
  },
  {
    id: "indecision",
    name: "Indecision Arrow",
    numbers: [1, 5, 9],
    feeling:
      "Self-doubt or hesitation can show up in key decisions.",
    balance:
      "Balance this with grounding practices and remedies for 1, 5, and 9.",
    habit: "Time-box decisions and commit to a small first action.",
  },
];

const SMALL_ARROWS: Omit<SmallArrowResult, "present">[] = [
  {
    id: "detail",
    name: "Detail and Deceit",
    numbers: [1, 3],
    meaning:
      "Sharp attention to detail and strong analysis. This can be a gift for precision.",
    advice: "Watch for over-analysis and keep perspective.",
  },
  {
    id: "litigation",
    name: "Litigation",
    numbers: [3, 9],
    meaning:
      "Strong opinions and debate energy. Good for advocacy, but needs diplomacy.",
    advice: "Pause before responding and choose calm language.",
  },
  {
    id: "peace",
    name: "Peace of Mind",
    numbers: [7, 9],
    meaning:
      "Reflective energy with inner calm. You value quiet clarity.",
    advice: "Protect time for rest and reflection.",
  },
  {
    id: "science",
    name: "Science",
    numbers: [1, 7],
    meaning:
      "Curious and investigative mind. Strong potential for study and analysis.",
    advice: "Channel curiosity into structured learning goals.",
  },
];

export const REMEDY_PACKS: Record<Digit, RemedyPack> = {
  1: {
    digit: 1,
    block: "Confidence, initiative, and decisive action.",
    crystal: "Sunstone",
    color: "Gold",
    direction: "East",
    activity: "Start the day with one bold priority.",
  },
  2: {
    digit: 2,
    block: "Partnership, patience, and sensitivity.",
    crystal: "Moonstone",
    color: "White",
    direction: "North",
    activity: "Practice listening before responding.",
  },
  3: {
    digit: 3,
    block: "Expression, creativity, and optimism.",
    crystal: "Citrine",
    color: "Yellow",
    direction: "East",
    activity: "Share one creative idea each week.",
  },
  4: {
    digit: 4,
    block: "Structure, discipline, and steady effort.",
    crystal: "Hematite",
    color: "Blue",
    direction: "South",
    activity: "Follow a simple daily routine.",
  },
  5: {
    digit: 5,
    block: "Balance, adaptability, and grounded change.",
    crystal: "Green Aventurine",
    color: "Green",
    direction: "Center",
    activity: "Take a grounding walk and reset focus.",
  },
  6: {
    digit: 6,
    block: "Responsibility, care, and family harmony.",
    crystal: "Rose Quartz",
    color: "Pink",
    direction: "Southwest",
    activity: "Offer consistent support to someone close.",
  },
  7: {
    digit: 7,
    block: "Reflection, intuition, and inner wisdom.",
    crystal: "Amethyst",
    color: "Purple",
    direction: "West",
    activity: "Meditate for 10 minutes and note insights.",
  },
  8: {
    digit: 8,
    block: "Material stability, authority, and ambition.",
    crystal: "Black Tourmaline",
    color: "Black",
    direction: "Northwest",
    activity: "Review finances or goals once a week.",
  },
  9: {
    digit: 9,
    block: "Compassion, closure, and service.",
    crystal: "Garnet",
    color: "Red",
    direction: "South",
    activity: "Complete one open task and help someone.",
  },
};

const REPEATED_INSIGHTS: Record<Digit, RepeatedInsight> = {
  1: {
    digit: 1,
    amplified: "Strong will and leadership energy.",
    balance: "Balance with listening and collaboration.",
  },
  2: {
    digit: 2,
    amplified: "Heightened sensitivity and partnership focus.",
    balance: "Balance with clear boundaries.",
  },
  3: {
    digit: 3,
    amplified: "Expressive and creative energy.",
    balance: "Balance with focus and follow-through.",
  },
  4: {
    digit: 4,
    amplified: "Discipline and structure are strong.",
    balance: "Balance with flexibility and openness.",
  },
  5: {
    digit: 5,
    amplified: "Restless curiosity and change energy.",
    balance: "Balance with grounding and routines.",
  },
  6: {
    digit: 6,
    amplified: "Protective and responsible nature.",
    balance: "Balance with self-care and delegation.",
  },
  7: {
    digit: 7,
    amplified: "Deep introspection and analysis.",
    balance: "Balance with sharing and openness.",
  },
  8: {
    digit: 8,
    amplified: "Ambition and material focus.",
    balance: "Balance with fairness and patience.",
  },
  9: {
    digit: 9,
    amplified: "Strong idealism and compassion.",
    balance: "Balance with humility and closure.",
  },
};

const CHALDEAN_MAP: Record<string, number> = {
  A: 1,
  I: 1,
  J: 1,
  Q: 1,
  Y: 1,
  B: 2,
  K: 2,
  R: 2,
  C: 3,
  G: 3,
  L: 3,
  S: 3,
  D: 4,
  M: 4,
  T: 4,
  E: 5,
  H: 5,
  N: 5,
  X: 5,
  U: 6,
  V: 6,
  W: 6,
  O: 7,
  Z: 7,
  F: 8,
  P: 8,
};

const GUIDANCE: Record<Digit, GuidanceResult> = {
  1: {
    luckyNumber: 1,
    luckyColor: "Gold",
    luckyDay: "Sunday",
    avoidNumber: 8,
    remedy: "Start mornings with sunlight and write three goals.",
  },
  2: {
    luckyNumber: 2,
    luckyColor: "White",
    luckyDay: "Monday",
    avoidNumber: 5,
    remedy: "Practice calm breathing before decisions.",
  },
  3: {
    luckyNumber: 3,
    luckyColor: "Yellow",
    luckyDay: "Thursday",
    avoidNumber: 4,
    remedy: "Create and share by writing, singing, or teaching weekly.",
  },
  4: {
    luckyNumber: 4,
    luckyColor: "Blue",
    luckyDay: "Saturday",
    avoidNumber: 3,
    remedy: "Declutter your workspace and stick to routines.",
  },
  5: {
    luckyNumber: 5,
    luckyColor: "Green",
    luckyDay: "Wednesday",
    avoidNumber: 2,
    remedy: "Walk outdoors for 20 minutes to ground restlessness.",
  },
  6: {
    luckyNumber: 6,
    luckyColor: "Pink",
    luckyDay: "Friday",
    avoidNumber: 1,
    remedy: "Do one act of kindness or family support weekly.",
  },
  7: {
    luckyNumber: 7,
    luckyColor: "Purple",
    luckyDay: "Monday",
    avoidNumber: 6,
    remedy: "Meditate for 10 minutes and track insights.",
  },
  8: {
    luckyNumber: 8,
    luckyColor: "Black",
    luckyDay: "Saturday",
    avoidNumber: 9,
    remedy: "Build a budgeting habit and discipline one key goal.",
  },
  9: {
    luckyNumber: 9,
    luckyColor: "Red",
    luckyDay: "Tuesday",
    avoidNumber: 7,
    remedy: "Donate or help others monthly and release grudges.",
  },
};

const MASTER_NUMBERS = new Map<number, { meaning: string; guidance: string }>([
  [
    11,
    {
      meaning: "Master 11 highlights intuition and inspired vision.",
      guidance: "Use your insight to guide others with calm focus.",
    },
  ],
  [
    22,
    {
      meaning: "Master 22 is the builder of long-term impact.",
      guidance: "Pair big goals with steady, practical steps.",
    },
  ],
  [
    33,
    {
      meaning: "Master 33 reflects compassionate teaching energy.",
      guidance: "Lead with service and gentle support.",
    },
  ],
]);

const KARMIC_NUMBERS = new Map<number, { meaning: string; guidance: string }>([
  [
    13,
    {
      meaning: "Karmic 13 points to lessons in discipline and effort.",
      guidance: "Focus on patience, structure, and consistent work.",
    },
  ],
  [
    14,
    {
      meaning: "Karmic 14 highlights freedom with responsibility.",
      guidance: "Balance flexibility with healthy boundaries.",
    },
  ],
  [
    16,
    {
      meaning: "Karmic 16 emphasizes humility and inner transformation.",
      guidance: "Practice reflection and choose growth over pride.",
    },
  ],
  [
    19,
    {
      meaning: "Karmic 19 reflects independence with service.",
      guidance: "Lead with generosity and shared success.",
    },
  ],
]);

export function normalizeName(value: string): string {
  return value.replace(/\s+/g, " ").trim().toUpperCase();
}

export function normalizeMobile(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }
  const digits = value.replace(/\D/g, "");
  return digits.length > 0 ? digits : undefined;
}

export function extractDigits(value: string): number[] {
  return value
    .replace(/[^0-9]/g, "")
    .split("")
    .filter(Boolean)
    .map((digit) => Number.parseInt(digit, 10));
}

function sumDigits(value: string): number {
  return extractDigits(value).reduce((acc, digit) => acc + digit, 0);
}

export function reduceToSingleDigit(value: number): number {
  let result = value;
  while (result > 9) {
    result = result
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number.parseInt(digit, 10), 0);
  }
  return result;
}

export function toDigit(value: number): Digit {
  const reduced = reduceToSingleDigit(Math.abs(value));
  return (reduced === 0 ? 1 : reduced) as Digit;
}

export function getLoShuCounts(dob: string): LoShuCounts {
  const counts = createEmptyCounts();
  const digits = extractDigits(dob);
  digits.forEach((digit) => {
    if (digit >= 1 && digit <= 9) {
      counts[digit as Digit] += 1;
    }
  });
  return counts;
}

export function getDerivedNumbers(dob: string): DerivedNumbers {
  const [yearPart = "", monthPart = "", dayPart = ""] = dob.split("-");
  const day = toDigit(sumDigits(dayPart));
  const month = toDigit(sumDigits(monthPart));
  const year = toDigit(sumDigits(yearPart));
  const lifePath = toDigit(day + month + year);

  return { day, month, year, lifePath };
}

export function getLoShuCountsWithDerived(
  dob: string,
  derivedNumbers: DerivedNumbers,
): LoShuCounts {
  const counts = getLoShuCounts(dob);
  counts[derivedNumbers.lifePath] += 1;
  return counts;
}

export function getLoShuResult(dob: string, includeDerived = false): {
  result: LoShuResult;
  derivedNumbers: DerivedNumbers;
} {
  const derivedNumbers = getDerivedNumbers(dob);
  const counts = includeDerived
    ? getLoShuCountsWithDerived(dob, derivedNumbers)
    : getLoShuCounts(dob);
  const result = buildLoShuResult(counts);

  return { result, derivedNumbers };
}

function buildLoShuResult(counts: LoShuCounts): LoShuResult {
  const presentNumbers: Digit[] = [];
  const missingNumbers: Digit[] = [];
  const repeatedNumbers: Digit[] = [];

  DIGITS.forEach((digit) => {
    const count = counts[digit];
    if (count > 0) {
      presentNumbers.push(digit);
    } else {
      missingNumbers.push(digit);
    }
    if (count >= 2) {
      repeatedNumbers.push(digit);
    }
  });

  return { counts, presentNumbers, missingNumbers, repeatedNumbers };
}

export function getPlaneResults(counts: LoShuCounts): PlaneResult[] {
  return PLANE_DEFINITIONS.map((plane) => ({
    ...plane,
    present: plane.numbers.every((digit) => counts[digit] > 0),
  }));
}

export function getWeaknessArrows(counts: LoShuCounts): WeaknessArrowResult[] {
  return WEAKNESS_ARROWS.map((arrow) => ({
    ...arrow,
    present: arrow.numbers.every((digit) => counts[digit] === 0),
  }));
}

export function getSmallArrows(counts: LoShuCounts): SmallArrowResult[] {
  return SMALL_ARROWS.map((arrow) => ({
    ...arrow,
    present: arrow.numbers.every((digit) => counts[digit] > 0),
  }));
}

export function getMissingRemedies(missingNumbers: Digit[]): RemedyPack[] {
  return missingNumbers.map((digit) => REMEDY_PACKS[digit]);
}

export function getRepeatedInsights(repeatedNumbers: Digit[]): RepeatedInsight[] {
  return repeatedNumbers.map((digit) => REPEATED_INSIGHTS[digit]);
}

export function repeatDigit(digit: Digit, count: number): string {
  if (count <= 0) {
    return "";
  }
  if (count > 3) {
    return `${String(digit).repeat(3)}+`;
  }
  return String(digit).repeat(count);
}

export function getChaldeanResult(fullName: string): ChaldeanResult {
  const letters = normalizeName(fullName).replace(/[^A-Z]/g, "");
  const breakdown: ChaldeanBreakdownItem[] = [];
  let rawSum = 0;

  for (const letter of letters) {
    const value = CHALDEAN_MAP[letter] ?? 0;
    if (value > 0) {
      breakdown.push({ letter, value });
      rawSum += value;
    }
  }

  return {
    rawSum,
    reduced: toDigit(rawSum),
    breakdown,
  };
}

export function getEssenceResult(dob: string): EssenceResult {
  const digits = extractDigits(dob).filter((digit) => digit !== 0);
  const rawSum = digits.reduce((acc, digit) => acc + digit, 0);
  const reduced = toDigit(rawSum);
  return {
    rawSum,
    reduced,
    meaning: NUMBER_MEANINGS[reduced],
  };
}

export function getPersonalResult(dob: string): PersonalResult {
  const dayPart = dob.split("-")[2] ?? "";
  const rawSum = extractDigits(dayPart).reduce((acc, digit) => acc + digit, 0);
  const reduced = toDigit(rawSum);
  return {
    rawSum,
    reduced,
    meaning: NUMBER_MEANINGS[reduced],
  };
}

export function getGuidance(essenceNumber: Digit): GuidanceResult {
  return GUIDANCE[essenceNumber];
}

export function detectSpecialNumbers(rawSum: number, source: string): SpecialNumber[] {
  if (MASTER_NUMBERS.has(rawSum)) {
    const data = MASTER_NUMBERS.get(rawSum);
    return [
      {
        type: "Master",
        value: rawSum,
        meaning: data?.meaning ?? "",
        guidance: data?.guidance ?? "",
        source,
      },
    ];
  }
  if (KARMIC_NUMBERS.has(rawSum)) {
    const data = KARMIC_NUMBERS.get(rawSum);
    return [
      {
        type: "Karmic",
        value: rawSum,
        meaning: data?.meaning ?? "",
        guidance: data?.guidance ?? "",
        source,
      },
    ];
  }
  return [];
}

export function getNameAlignment(options: {
  nameNumber: Digit;
  nameRawSum: number;
  essenceNumber: Digit;
  personalNumber: Digit;
  missingNumbers: Digit[];
  counts: LoShuCounts;
  planes: PlaneResult[];
  weaknessArrows: WeaknessArrowResult[];
}): NameAlignment {
  const {
    nameNumber,
    nameRawSum,
    essenceNumber,
    personalNumber,
    missingNumbers,
    counts,
    planes,
    weaknessArrows,
  } = options;

  const supportiveReasons: string[] = [];

  if (nameNumber === essenceNumber) {
    supportiveReasons.push("aligns with your essence number");
  }
  if (nameNumber === personalNumber) {
    supportiveReasons.push("aligns with your personal number");
  }
  if (missingNumbers.includes(nameNumber)) {
    supportiveReasons.push("fills a missing number in your grid");
  }

  const golden = planes.find((plane) => plane.id === "success");
  const silver = planes.find((plane) => plane.id === "determination");

  const completesPlane = [golden, silver].some((plane) => {
    if (!plane) {
      return false;
    }
    const missing = plane.numbers.filter((digit) => counts[digit] === 0);
    return missing.length === 1 && missing[0] === nameNumber;
  });

  if (completesPlane) {
    supportiveReasons.push("helps complete a key plane");
  }

  const dominantNumbers = DIGITS.filter((digit) => counts[digit] >= 3);
  const isDominant = dominantNumbers.includes(nameNumber);

  const hasWeakness = weaknessArrows.some((arrow) => arrow.present);
  const repeatsImbalance = hasWeakness && counts[nameNumber] >= 2;

  let rating: Rating = "Neutral";
  if (isDominant || repeatsImbalance) {
    rating = "Challenging";
  } else if (supportiveReasons.length > 0) {
    rating = "Supportive";
  }

  const explanation = rating === "Supportive"
    ? `Your name number feels supportive because it ${supportiveReasons.join(", ")}.`
    : rating === "Challenging"
      ? "Your name number may amplify an already strong trait. Consider balancing it with missing energies."
      : "Your name number is neutral. It neither strongly fills gaps nor amplifies imbalances.";

  const targetNumber = chooseTargetNumber({
    weaknessArrows,
    essenceNumber,
    missingNumbers,
    planes,
    counts,
  });

  const suggestions = buildNameCorrectionSuggestions(nameRawSum, targetNumber);

  return {
    rating,
    explanation,
    targetNumber,
    suggestions,
  };
}

export function getMobileAnalysis(options: {
  mobile: string;
  essenceNumber: Digit;
  personalNumber: Digit;
  missingNumbers: Digit[];
  weaknessArrows: WeaknessArrowResult[];
  avoidNumber: Digit;
  dominantNumbers: Digit[];
}): MobileAnalysis | undefined {
  const mobileDigits = normalizeMobile(options.mobile);
  if (!mobileDigits) {
    return undefined;
  }

  const rawSum = extractDigits(mobileDigits).reduce((acc, digit) => acc + digit, 0);
  const reduced = toDigit(rawSum);
  const digitCoverage = createEmptyCounts();
  extractDigits(mobileDigits).forEach((digit) => {
    if (digit >= 1 && digit <= 9) {
      digitCoverage[digit as Digit] += 1;
    }
  });

  const supportsMissingDigits = options.missingNumbers.filter(
    (digit) => digitCoverage[digit] > 0,
  );

  const weaknessDigits = new Set<Digit>();
  options.weaknessArrows.forEach((arrow) => {
    if (arrow.present) {
      arrow.numbers.forEach((digit) => weaknessDigits.add(digit));
    }
  });

  const supportive =
    reduced === options.essenceNumber ||
    reduced === options.personalNumber ||
    options.missingNumbers.includes(reduced) ||
    supportsMissingDigits.length > 0 ||
    weaknessDigits.has(reduced);

  const challenging =
    options.dominantNumbers.includes(reduced) || reduced === options.avoidNumber;

  let rating: Rating = "Neutral";
  if (challenging) {
    rating = "Challenging";
  } else if (supportive) {
    rating = "Supportive";
  }

  const explanation = rating === "Supportive"
    ? "This mobile root supports your overall profile and helps cover missing energy."
    : rating === "Challenging"
      ? "This mobile root may amplify a dominant or avoid number. Consider balancing digits."
      : "This mobile root is neutral for your profile.";

  const suggestedDigits = uniqueDigits([
    ...options.missingNumbers,
    ...Array.from(weaknessDigits),
  ]);

  const suggestions = suggestedDigits.length
    ? [
        `If choosing a new number, include digits: ${suggestedDigits.join(", ")}.`,
      ]
    : ["Keep a balance of digits to support missing energies."];

  return {
    rawSum,
    reduced,
    rating,
    explanation,
    digitCoverage,
    supportsMissingDigits,
    suggestions,
    specialNumbers: detectSpecialNumbers(rawSum, "Mobile"),
  };
}

export function getHouseAnalysis(options: {
  houseNo: string;
  essenceNumber: Digit;
  personalNumber: Digit;
  missingNumbers: Digit[];
  planes: PlaneResult[];
  counts: LoShuCounts;
  avoidNumber: Digit;
  dominantNumbers: Digit[];
}): HouseAnalysis | undefined {
  if (!options.houseNo) {
    return undefined;
  }

  const houseDigits = extractDigits(options.houseNo);
  if (houseDigits.length === 0) {
    return undefined;
  }

  const rawSum = houseDigits.reduce((acc, digit) => acc + digit, 0);
  const reduced = toDigit(rawSum);

  const completesPlane = options.planes.some((plane) => {
    const missing = plane.numbers.filter((digit) => options.counts[digit] === 0);
    return missing.length === 1 && missing[0] === reduced;
  });

  const supportive =
    reduced === options.essenceNumber ||
    reduced === options.personalNumber ||
    options.missingNumbers.includes(reduced) ||
    completesPlane;

  const challenging =
    options.dominantNumbers.includes(reduced) || reduced === options.avoidNumber;

  let rating: Rating = "Neutral";
  if (challenging) {
    rating = "Challenging";
  } else if (supportive) {
    rating = "Supportive";
  }

  const explanation = rating === "Supportive"
    ? "This house number supports your core numbers and can feel stabilizing."
    : rating === "Challenging"
      ? "This house number may amplify a dominant or avoid number."
      : "This house number is neutral for your profile.";

  const entryRemedies = options.missingNumbers
    .slice(0, 2)
    .map((digit) => REMEDY_PACKS[digit]);

  const adjustmentSuggestions = [
    "If you cannot change the house number, add a supportive digit on a nameplate or decor.",
    "Use the suggested color or crystal near the entryway to balance the space.",
  ];

  return {
    rawSum,
    reduced,
    rating,
    explanation,
    adjustmentSuggestions,
    entryRemedies,
    specialNumbers: detectSpecialNumbers(rawSum, "House"),
  };
}

export function analyzePerson(input: PersonInput): PersonAnalysis {
  const { result: loShu, derivedNumbers } = getLoShuResult(input.dob, true);
  const planes = getPlaneResults(loShu.counts);
  const weaknessArrows = getWeaknessArrows(loShu.counts);
  const smallArrows = getSmallArrows(loShu.counts);
  const missingRemedies = getMissingRemedies(loShu.missingNumbers);
  const repeatedInsights = getRepeatedInsights(loShu.repeatedNumbers);

  const chaldean = getChaldeanResult(input.fullName);
  const essence = getEssenceResult(input.dob);
  const personal = getPersonalResult(input.dob);
  const guidance = getGuidance(essence.reduced);

  const nameAlignment = getNameAlignment({
    nameNumber: chaldean.reduced,
    nameRawSum: chaldean.rawSum,
    essenceNumber: essence.reduced,
    personalNumber: personal.reduced,
    missingNumbers: loShu.missingNumbers,
    counts: loShu.counts,
    planes,
    weaknessArrows,
  });

  const dominantNumbers = loShu.repeatedNumbers.filter(
    (digit) => loShu.counts[digit] >= 3,
  );

  const mobileAnalysis = input.mobile
    ? getMobileAnalysis({
        mobile: input.mobile,
        essenceNumber: essence.reduced,
        personalNumber: personal.reduced,
        missingNumbers: loShu.missingNumbers,
        weaknessArrows,
        avoidNumber: guidance.avoidNumber,
        dominantNumbers,
      })
    : undefined;

  const houseAnalysis = input.houseNo
    ? getHouseAnalysis({
        houseNo: input.houseNo,
        essenceNumber: essence.reduced,
        personalNumber: personal.reduced,
        missingNumbers: loShu.missingNumbers,
        planes,
        counts: loShu.counts,
        avoidNumber: guidance.avoidNumber,
        dominantNumbers,
      })
    : undefined;

  const specialNumbers = [
    ...detectSpecialNumbers(chaldean.rawSum, "Name"),
    ...detectSpecialNumbers(essence.rawSum, "DOB"),
    ...(mobileAnalysis ? mobileAnalysis.specialNumbers : []),
    ...(houseAnalysis ? houseAnalysis.specialNumbers : []),
  ];

  return {
    loShu,
    derivedNumbers,
    planes,
    weaknessArrows,
    smallArrows,
    missingRemedies,
    repeatedInsights,
    chaldean,
    nameAlignment,
    essence,
    personal,
    guidance,
    mobileAnalysis,
    houseAnalysis,
    specialNumbers,
  };
}

export function buildShareSummary(input: UserInput, analysis: PersonAnalysis): string {
  const present = analysis.loShu.presentNumbers.join(", ") || "None";
  const missing = analysis.loShu.missingNumbers.join(", ") || "None";
  const planes = analysis.planes
    .filter((plane) => plane.present)
    .map((plane) => plane.name)
    .join(", ") || "None";
  const weakness = analysis.weaknessArrows
    .filter((arrow) => arrow.present)
    .map((arrow) => arrow.name)
    .join(", ") || "None";

  return [
    "Numbers by Osho - Numerology Summary",
    `Name: ${input.fullName}`,
    `DOB: ${input.dob}`,
    input.mobile ? `Mobile: ${input.mobile}` : undefined,
    input.email ? `Email: ${input.email}` : undefined,
    input.houseNo ? `House No: ${input.houseNo}` : undefined,
    `Present Numbers: ${present}`,
    `Missing Numbers: ${missing}`,
    `Planes Present: ${planes}`,
    `Weakness Arrows: ${weakness}`,
    `Derived Numbers (Day/Month/Year/Life Path): ${analysis.derivedNumbers.day}, ${analysis.derivedNumbers.month}, ${analysis.derivedNumbers.year}, ${analysis.derivedNumbers.lifePath}`,
    `Name Number: ${analysis.chaldean.rawSum} -> ${analysis.chaldean.reduced} (${analysis.nameAlignment.rating})`,
    `Essence Number: ${analysis.essence.reduced}`,
    `Personal Number: ${analysis.personal.reduced}`,
    `Lucky Guidance: ${analysis.guidance.luckyNumber}, ${analysis.guidance.luckyColor}, ${analysis.guidance.luckyDay} (Avoid ${analysis.guidance.avoidNumber})`,
    `Remedy: ${analysis.guidance.remedy}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function getCompatibilityResult(a: PersonInput, b: PersonInput): CompatibilityResult {
  const personA = analyzePerson(a);
  const personB = analyzePerson(b);

  const sharedStrengthPlanes = personA.planes.filter(
    (plane) => plane.present && personB.planes.find((p) => p.id === plane.id && p.present),
  );

  const sharedSmallArrows = personA.smallArrows.filter(
    (arrow) => arrow.present && personB.smallArrows.find((a2) => a2.id === arrow.id && a2.present),
  );

  const aSupportsB = personA.loShu.presentNumbers.filter((digit) =>
    personB.loShu.missingNumbers.includes(digit),
  );
  const bSupportsA = personB.loShu.presentNumbers.filter((digit) =>
    personA.loShu.missingNumbers.includes(digit),
  );

  const frictionNotes: string[] = [];
  if (
    personA.smallArrows.find((arrow) => arrow.id === "litigation" && arrow.present) &&
    personB.smallArrows.find((arrow) => arrow.id === "litigation" && arrow.present)
  ) {
    frictionNotes.push(
      "Both charts show the debate pattern. Choose diplomacy and clear boundaries.",
    );
  }

  const sharedWeakness = personA.weaknessArrows.filter(
    (arrow) => arrow.present && personB.weaknessArrows.find((a2) => a2.id === arrow.id && a2.present),
  );
  if (sharedWeakness.length > 0) {
    frictionNotes.push(
      "Shared weakness arrows mean similar challenges. Support each other with routines and patience.",
    );
  }

  const sharedMissing = personA.loShu.missingNumbers.filter((digit) =>
    personB.loShu.missingNumbers.includes(digit),
  );
  const sharedRemedy = sharedMissing.length > 0 ? REMEDY_PACKS[sharedMissing[0]] : undefined;

  const sharedStrengthScore = sharedStrengthPlanes.length * 5;
  const complementScore = (aSupportsB.length + bSupportsA.length) * 3;
  const weaknessScore = sharedWeakness.length * -5;
  const baseScore = 50 + sharedStrengthScore + complementScore + weaknessScore;
  const score = Math.max(0, Math.min(100, baseScore));

  return {
    personA,
    personB,
    sharedStrengthPlanes,
    sharedSmallArrows,
    complements: {
      aSupportsB,
      bSupportsA,
      message:
        "Your charts can complement each other when you honor the missing energies you each provide.",
    },
    frictionNotes,
    sharedRemedy,
    score,
    scoreNote: "Score is for reflection only.",
  };
}

function createEmptyCounts(): LoShuCounts {
  return DIGITS.reduce((acc, digit) => {
    acc[digit] = 0;
    return acc;
  }, {} as LoShuCounts);
}

function uniqueDigits(list: Digit[]): Digit[] {
  return Array.from(new Set(list)).sort((a, b) => a - b);
}

function chooseTargetNumber(options: {
  weaknessArrows: WeaknessArrowResult[];
  essenceNumber: Digit;
  missingNumbers: Digit[];
  planes: PlaneResult[];
  counts: LoShuCounts;
}): Digit {
  const weaknessDigits: Digit[] = [];
  options.weaknessArrows.forEach((arrow) => {
    if (arrow.present) {
      weaknessDigits.push(...arrow.numbers);
    }
  });

  if (weaknessDigits.length > 0) {
    if (weaknessDigits.includes(5)) {
      return 5;
    }
    const frequency: Record<number, number> = {};
    weaknessDigits.forEach((digit) => {
      frequency[digit] = (frequency[digit] ?? 0) + 1;
    });
    const sorted = Object.entries(frequency).sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }
      return Number.parseInt(a[0], 10) - Number.parseInt(b[0], 10);
    });
    return Number.parseInt(sorted[0][0], 10) as Digit;
  }

  if (options.essenceNumber) {
    return options.essenceNumber;
  }

  const planeMissing = options.planes
    .flatMap((plane) => plane.numbers.filter((digit) => options.counts[digit] === 0));
  if (planeMissing.length > 0) {
    return planeMissing[0];
  }

  return 1;
}

function buildNameCorrectionSuggestions(
  rawSum: number,
  targetNumber: Digit,
): NameCorrectionSuggestion[] {
  const suggestions: NameCorrectionSuggestion[] = [];
  const valueToLetters: Record<number, string[]> = {
    1: ["A", "I", "J", "Q", "Y"],
    2: ["B", "K", "R"],
    3: ["C", "G", "L", "S"],
    4: ["D", "M", "T"],
    5: ["E", "H", "N", "X"],
    6: ["U", "V", "W"],
    7: ["O", "Z"],
    8: ["F", "P"],
  };

  const values = Object.keys(valueToLetters).map((value) => Number.parseInt(value, 10));

  const addSuggestion = (letters: string, value: number) => {
    const newSum = rawSum + value;
    const newReduced = toDigit(newSum);
    if (newReduced !== targetNumber) {
      return;
    }
    suggestions.push({
      letters,
      value,
      newSum,
      newReduced,
      message: `Add ${letters} (value ${value}) as an initial or spelling tweak.`,
    });
  };

  for (const value of values) {
    const letter = valueToLetters[value][0];
    addSuggestion(letter, value);
  }

  if (suggestions.length < 2) {
    for (const valueA of values) {
      for (const valueB of values) {
        if (suggestions.length >= 3) {
          break;
        }
        const letters = `${valueToLetters[valueA][0]}${valueToLetters[valueB][0]}`;
        addSuggestion(letters, valueA + valueB);
      }
    }
  }

  return suggestions.slice(0, 3);
}

/*
Example checks:
- getLoShuCounts("1994-12-06") -> {1:2,2:1,3:0,4:1,5:0,6:1,7:0,8:0,9:2}
- getEssenceResult("1994-12-06") -> rawSum 32, reduced 5
- getPersonalResult("1994-12-06") -> rawSum 6, reduced 6
- getChaldeanResult("OSHO") -> rawSum 22, reduced 4
- getCompatibilityResult({fullName:"A",dob:"1994-12-06"},{fullName:"B",dob:"1991-04-21"})
*/
