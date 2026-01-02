import type { HouseAnalysis } from "@/lib/numerology";

const ratingStyles: Record<HouseAnalysis["rating"], string> = {
  Supportive: "bg-emerald-100 text-emerald-700",
  Neutral: "bg-slate-100 text-slate-600",
  Challenging: "bg-rose-100 text-rose-700",
};

type HouseAnalysisCardProps = {
  analysis: HouseAnalysis;
};

export default function HouseAnalysisCard({ analysis }: HouseAnalysisCardProps) {
  return (
    <div className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            House Number
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

      <div className="mt-5 space-y-2 text-sm text-slate-600">
        {analysis.adjustmentSuggestions.map((item, index) => (
          <p key={`house-suggestion-${index}`}>{item}</p>
        ))}
      </div>

      {analysis.entryRemedies.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {analysis.entryRemedies.map((remedy) => (
            <div
              key={`entry-remedy-${remedy.digit}`}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Entry support for {remedy.digit}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-slate-700">Color:</span> {remedy.color}
              </p>
              <p>
                <span className="font-semibold text-slate-700">Crystal:</span> {remedy.crystal}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
