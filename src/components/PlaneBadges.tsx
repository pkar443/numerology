import type { PlaneResult } from "@/lib/numerology";

const badgeStyles = {
  present: "bg-emerald-100 text-emerald-700",
  missing: "bg-slate-100 text-slate-500",
};

type PlaneBadgesProps = {
  planes: PlaneResult[];
};

export default function PlaneBadges({ planes }: PlaneBadgesProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {planes.map((plane) => (
        <div
          key={plane.id}
          className="hover-lift rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {plane.group} Plane
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {plane.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {plane.numbers.join("-")}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                plane.present ? badgeStyles.present : badgeStyles.missing
              }`}
            >
              {plane.present ? "Present" : "Not present"}
            </span>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            {plane.present ? (
              <>
                <p>{plane.meaning}</p>
                <p>
                  <span className="font-semibold text-slate-700">How it shows:</span>{" "}
                  {plane.howItShows}
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Tip:</span> {plane.tip}
                </p>
              </>
            ) : (
              <p>{plane.missingTip}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
