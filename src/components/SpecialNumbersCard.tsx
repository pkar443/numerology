import type { SpecialNumber } from "@/lib/numerology";

type SpecialNumbersCardProps = {
  specialNumbers: SpecialNumber[];
};

export default function SpecialNumbersCard({
  specialNumbers,
}: SpecialNumbersCardProps) {
  if (specialNumbers.length === 0) {
    return null;
  }

  return (
    <div className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Special Numbers
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">
          Master and Karmic highlights
        </h3>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {specialNumbers.map((item, index) => (
          <div
            key={`${item.source}-${item.value}-${index}`}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {item.source} - {item.type} {item.value}
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              {item.meaning}
            </p>
            <p className="mt-2 text-sm text-slate-600">{item.guidance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
