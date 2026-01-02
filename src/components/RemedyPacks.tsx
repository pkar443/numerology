import type { RemedyPack } from "@/lib/numerology";

type RemedyPacksProps = {
  remedies: RemedyPack[];
};

export default function RemedyPacks({ remedies }: RemedyPacksProps) {
  if (remedies.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-600">
        No missing numbers detected. Keep reinforcing your present strengths.
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {remedies.map((remedy) => (
        <div
          key={`remedy-${remedy.digit}`}
          className="hover-lift rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Missing {remedy.digit}
            </h3>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Remedy Pack
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">{remedy.block}</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <div>
              <span className="font-semibold text-slate-700">Crystal:</span> {remedy.crystal}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Color:</span> {remedy.color}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Direction:</span> {remedy.direction}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Activity:</span> {remedy.activity}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
