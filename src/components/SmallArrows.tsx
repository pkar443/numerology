import type { SmallArrowResult } from "@/lib/numerology";

type SmallArrowsProps = {
  arrows: SmallArrowResult[];
};

export default function SmallArrows({ arrows }: SmallArrowsProps) {
  const present = arrows.filter((arrow) => arrow.present);

  if (present.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-600">
        No small arrows detected. Your chart emphasizes the broader planes instead.
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {present.map((arrow) => (
        <div
          key={arrow.id}
          className="hover-lift rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-900">{arrow.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {arrow.numbers.join(" and ")}
          </p>
          <p className="mt-3 text-sm text-slate-600">{arrow.meaning}</p>
          <p className="mt-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-700">Tip:</span> {arrow.advice}
          </p>
        </div>
      ))}
    </div>
  );
}
