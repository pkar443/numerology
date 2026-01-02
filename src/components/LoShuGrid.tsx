import type { LoShuCounts, Digit } from "@/lib/numerology";
import { LO_SHU_LAYOUT, repeatDigit } from "@/lib/numerology";

const cellStyles: Record<Digit, { bg: string; text: string; ring: string }> = {
  1: {
    bg: "from-amber-50 to-amber-100",
    text: "text-amber-700",
    ring: "ring-amber-200/70",
  },
  2: {
    bg: "from-rose-50 to-rose-100",
    text: "text-rose-700",
    ring: "ring-rose-200/70",
  },
  3: {
    bg: "from-lime-50 to-lime-100",
    text: "text-lime-700",
    ring: "ring-lime-200/70",
  },
  4: {
    bg: "from-sky-50 to-sky-100",
    text: "text-sky-700",
    ring: "ring-sky-200/70",
  },
  5: {
    bg: "from-violet-50 to-violet-100",
    text: "text-violet-700",
    ring: "ring-violet-200/70",
  },
  6: {
    bg: "from-orange-50 to-orange-100",
    text: "text-orange-700",
    ring: "ring-orange-200/70",
  },
  7: {
    bg: "from-teal-50 to-teal-100",
    text: "text-teal-700",
    ring: "ring-teal-200/70",
  },
  8: {
    bg: "from-indigo-50 to-indigo-100",
    text: "text-indigo-700",
    ring: "ring-indigo-200/70",
  },
  9: {
    bg: "from-fuchsia-50 to-fuchsia-100",
    text: "text-fuchsia-700",
    ring: "ring-fuchsia-200/70",
  },
};

type LoShuGridProps = {
  counts: LoShuCounts;
};

export default function LoShuGrid({ counts }: LoShuGridProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {LO_SHU_LAYOUT.flat().map((digit) => {
          const count = counts[digit];
          const value = repeatDigit(digit, count);
          const styles = cellStyles[digit];
          const isEmpty = count === 0;

          return (
            <div
              key={`cell-${digit}`}
              className={`flex min-h-[96px] items-center justify-center rounded-2xl bg-gradient-to-br ${styles.bg} text-2xl font-semibold shadow-sm ring-1 ${styles.ring} ${
                isEmpty ? "text-slate-300" : styles.text
              }`}
            >
              <span className={isEmpty ? "opacity-40" : ""}>
                {value || "-"}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-slate-500">
        Repeats show stronger energy in that number.
      </p>
    </div>
  );
}
