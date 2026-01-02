"use client";

import { useState } from "react";
import { Clipboard, Check, Printer } from "lucide-react";

type ShareSummaryProps = {
  summary: string;
};

export default function ShareSummary({ summary }: ShareSummaryProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Share and Export
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Copy or print your summary
          </h3>
        </div>
        <div className="print-hidden flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
        </div>
      </div>
      <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
        {summary}
      </pre>
      <p className="mt-3 text-xs text-slate-400">
        Clipboard access is required to copy. Printing uses your browser print dialog.
      </p>
    </div>
  );
}
