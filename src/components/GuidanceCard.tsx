import type { GuidanceResult } from "@/lib/numerology";

const colorMap: Record<string, string> = {
  Gold: "#f59e0b",
  White: "#f8fafc",
  Yellow: "#facc15",
  Blue: "#60a5fa",
  Green: "#34d399",
  Pink: "#f9a8d4",
  Purple: "#c4b5fd",
  Black: "#0f172a",
  Red: "#f87171",
};

type GuidanceCardProps = {
  essence: number;
  guidance: GuidanceResult;
};

export default function GuidanceCard({ essence, guidance }: GuidanceCardProps) {
  const colorChip = colorMap[guidance.luckyColor] ?? "#e2e8f0";

  return (
    <div className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Lucky Guidance
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Essence {essence} Alignment
          </h3>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
          <span
            className="h-3 w-3 rounded-full border border-slate-200"
            style={{ backgroundColor: colorChip }}
          />
          {guidance.luckyColor}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Lucky Number
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-800">
            {guidance.luckyNumber}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Lucky Day
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-800">
            {guidance.luckyDay}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Avoid Number
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-800">
            {guidance.avoidNumber}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Remedy
          </p>
          <p className="mt-2 text-sm text-slate-600">{guidance.remedy}</p>
        </div>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Numerology guidance is for personal reflection.
      </p>
    </div>
  );
}
