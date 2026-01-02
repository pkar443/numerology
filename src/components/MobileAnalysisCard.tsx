import type { MobileAnalysis, Digit } from "@/lib/numerology";

const chipStyles: Record<Digit, string> = {
  1: "bg-amber-100 text-amber-700",
  2: "bg-rose-100 text-rose-700",
  3: "bg-lime-100 text-lime-700",
  4: "bg-sky-100 text-sky-700",
  5: "bg-violet-100 text-violet-700",
  6: "bg-orange-100 text-orange-700",
  7: "bg-teal-100 text-teal-700",
  8: "bg-indigo-100 text-indigo-700",
  9: "bg-fuchsia-100 text-fuchsia-700",
};

const ratingStyles: Record<MobileAnalysis["rating"], string> = {
  Supportive: "bg-emerald-100 text-emerald-700",
  Neutral: "bg-slate-100 text-slate-600",
  Challenging: "bg-rose-100 text-rose-700",
};

type MobileAnalysisCardProps = {
  analysis: MobileAnalysis;
};

export default function MobileAnalysisCard({ analysis }: MobileAnalysisCardProps) {
  const digits: Digit[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Mobile Number
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Root {analysis.reduced}
          </h3>
        </div>
        <span
          className={`rounded-full px-4 py-2 text-xs font-semibold ${
            ratingStyles[analysis.rating]
          }`}
        >
          {analysis.rating}
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-600">{analysis.explanation}</p>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-700">Digit coverage</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {digits.map((digit) => (
            <span
              key={`mobile-digit-${digit}`}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                analysis.digitCoverage[digit] > 0
                  ? chipStyles[digit]
                  : "border border-slate-200 text-slate-400"
              }`}
            >
              {digit} {analysis.digitCoverage[digit] > 0 ? `x${analysis.digitCoverage[digit]}` : "Missing"}
            </span>
          ))}
        </div>
      </div>

      {analysis.suggestions.length > 0 && (
        <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          {analysis.suggestions.map((item, index) => (
            <p key={`mobile-suggestion-${index}`}>{item}</p>
          ))}
        </div>
      )}
    </div>
  );
}
