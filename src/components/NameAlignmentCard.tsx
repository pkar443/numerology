import type { NameAlignment } from "@/lib/numerology";

const ratingStyles: Record<NameAlignment["rating"], string> = {
  Supportive: "bg-emerald-100 text-emerald-700",
  Neutral: "bg-slate-100 text-slate-600",
  Challenging: "bg-rose-100 text-rose-700",
};

type NameAlignmentCardProps = {
  alignment: NameAlignment;
};

export default function NameAlignmentCard({ alignment }: NameAlignmentCardProps) {
  return (
    <div className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Name Alignment
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {alignment.rating}
          </h3>
        </div>
        <span
          className={`rounded-full px-4 py-2 text-xs font-semibold ${
            ratingStyles[alignment.rating]
          }`}
        >
          {alignment.rating}
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-600">{alignment.explanation}</p>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
        <span className="font-semibold text-slate-700">Best target number:</span>{" "}
        {alignment.targetNumber}
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-700">
          Name correction suggestions
        </p>
        {alignment.suggestions.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            No quick letter suggestions found. Consider a middle initial or a professional name variation.
          </p>
        ) : (
          <div className="mt-3 space-y-3">
            {alignment.suggestions.map((suggestion, index) => (
              <div
                key={`${suggestion.letters}-${index}`}
                className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-600"
              >
                <p className="font-semibold text-slate-700">
                  {suggestion.message}
                </p>
                <p className="mt-1">
                  New sum: {suggestion.newSum} to {suggestion.newReduced}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
