import type { ChaldeanResult } from "@/lib/numerology";

type ChaldeanBreakdownProps = {
  name: string;
  result: ChaldeanResult;
};

export default function ChaldeanBreakdown({ name, result }: ChaldeanBreakdownProps) {
  return (
    <div className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Chaldean Name Number
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{name}</h3>
        </div>
        <div className="rounded-2xl bg-amber-50 px-5 py-3 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-600">
            Raw Sum to Reduced
          </p>
          <p className="mt-1 text-xl font-semibold text-amber-700">
            {result.rawSum} to {result.reduced}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-500">Letter breakdown</p>
        {result.breakdown.length === 0 ? (
          <p className="mt-2 text-sm text-slate-400">
            No letters were detected in the name.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {result.breakdown.map((item, index) => (
              <div
                key={`${item.letter}-${index}`}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <span className="text-sm font-semibold text-slate-600">
                  {item.letter}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
