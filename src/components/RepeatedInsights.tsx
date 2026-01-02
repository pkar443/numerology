import type { RepeatedInsight } from "@/lib/numerology";

type RepeatedInsightsProps = {
  insights: RepeatedInsight[];
};

export default function RepeatedInsights({ insights }: RepeatedInsightsProps) {
  if (insights.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-600">
        No repeated numbers detected. Your energy pattern is balanced.
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {insights.map((insight) => (
        <div
          key={`repeat-${insight.digit}`}
          className="hover-lift rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-900">
            Repeated {insight.digit}
          </h3>
          <p className="mt-2 text-sm text-slate-600">{insight.amplified}</p>
          <p className="mt-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-700">Balance:</span> {insight.balance}
          </p>
        </div>
      ))}
    </div>
  );
}
