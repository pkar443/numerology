import type { WeaknessArrowResult, RemedyPack } from "@/lib/numerology";

const cardStyle =
  "rounded-2xl border border-rose-100 bg-rose-50/70 p-5 shadow-sm";

type WeaknessArrowsProps = {
  arrows: WeaknessArrowResult[];
  remedyLookup: Record<RemedyPack["digit"], RemedyPack>;
};

export default function WeaknessArrows({
  arrows,
  remedyLookup,
}: WeaknessArrowsProps) {
  const present = arrows.filter((arrow) => arrow.present);

  if (present.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-600">
        No major weakness arrows detected. Keep nurturing balance through your routines.
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {present.map((arrow) => (
        <div key={arrow.id} className={cardStyle}>
          <h3 className="text-lg font-semibold text-rose-700">{arrow.name}</h3>
          <p className="mt-2 text-sm text-slate-700">{arrow.feeling}</p>
          <p className="mt-3 text-sm text-slate-600">{arrow.balance}</p>
          <p className="mt-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-700">Habit:</span> {arrow.habit}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {arrow.numbers.map((digit) => {
              const remedy = remedyLookup[digit];
              return (
                <span
                  key={`${arrow.id}-${digit}`}
                  className="rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-700"
                >
                  Remedy {digit}: {remedy.color}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
