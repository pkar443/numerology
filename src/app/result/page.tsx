"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ChaldeanBreakdown from "@/components/ChaldeanBreakdown";
import GuidanceCard from "@/components/GuidanceCard";
import LoShuGrid from "@/components/LoShuGrid";
import CelebrityMatchCard from "@/components/CelebrityMatchCard";
import PlaneBadges from "@/components/PlaneBadges";
import ShareSummary from "@/components/ShareSummary";
import SiteHeader from "@/components/SiteHeader";
import WeaknessArrows from "@/components/WeaknessArrows";
import SmallArrows from "@/components/SmallArrows";
import RemedyPacks from "@/components/RemedyPacks";
import RepeatedInsights from "@/components/RepeatedInsights";
import NameAlignmentCard from "@/components/NameAlignmentCard";
import SpecialNumbersCard from "@/components/SpecialNumbersCard";
import MobileAnalysisCard from "@/components/MobileAnalysisCard";
import HouseAnalysisCard from "@/components/HouseAnalysisCard";
import {
  analyzePerson,
  buildShareSummary,
  REMEDY_PACKS,
  type Digit,
  type UserInput,
} from "@/lib/numerology";

const chipStyles: Record<Digit, string> = {
  1: "bg-amber-100 text-amber-700",
  2: "bg-rose-100 text-rose-700",
  3: "bg-lime-100 text-lime-700",
  4: "bg-sky-100 text-sky-700",
  5: "bg-violet-100 text-violet-700",
  6: "bg-orange-100 text-orange-700",
  7: "bg-teal-100 text-teal-700",
  8: "bg-indigo-100 text-indigo-700",
  9: "bg-fuchsia-100 text-fuchsia-700",
};

export default function ResultPage() {
  const [input, setInput] = useState<UserInput | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("numerologyInput");
    if (!saved) {
      return;
    }
    try {
      setInput(JSON.parse(saved) as UserInput);
    } catch {
      setInput(null);
    }
  }, []);

  const analysis = useMemo(() => {
    if (!input) {
      return null;
    }
    return analyzePerson({
      fullName: input.fullName,
      dob: input.dob,
      mobile: input.mobile,
      houseNo: input.houseNo,
    });
  }, [input]);

  if (!input || !analysis) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            No data found
          </h1>
          <p className="mt-3 text-slate-600">
            Please return to the home page and enter your details.
          </p>
          <Link
            href="/#numerology-form"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Form
          </Link>
        </div>
      </div>
    );
  }

  const summary = buildShareSummary(input, analysis);

  const summaryItems = [
    { label: "Full Name", value: input.fullName },
    { label: "Date of Birth", value: input.dob },
    input.mobile ? { label: "Mobile", value: input.mobile } : null,
    input.email ? { label: "Email", value: input.email } : null,
    input.houseNo ? { label: "House No.", value: input.houseNo } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="hero-sky relative overflow-hidden border-b border-slate-100 print-hidden">
        <div className="stars-overlay pointer-events-none absolute inset-0 opacity-60" />
        <SiteHeader className="relative z-10" />
        <div className="relative mx-auto max-w-6xl px-6 pb-12">
          <Link
            href="/#numerology-form"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to edit details
          </Link>
          <h1 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Your Numerology Map
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            A full view of your grid, planes, remedies, and guidance.
          </p>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-10">
        <AnimatedSection className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm print-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                User Summary
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {input.fullName}
              </h2>
            </div>
            <div className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
              DOB: {input.dob}
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {summaryItems.map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-700">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-500">
            For guidance and reflection only.
          </p>
        </AnimatedSection>

        <AnimatedSection className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm print-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Lo Shu Grid
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Your 3x3 Energy Matrix
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              DOB digits plus your life path (derived) number.
            </p>
          </div>
          <div className="mt-6">
            <LoShuGrid counts={analysis.loShu.counts} />
          </div>
          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Derived number plotted
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
              <span
                className={`rounded-full px-3 py-2 ${chipStyles[analysis.derivedNumbers.lifePath]}`}
              >
                Life Path (Derived): {analysis.derivedNumbers.lifePath}
              </span>
              <span
                className={`rounded-full px-3 py-2 ${chipStyles[analysis.derivedNumbers.day]}`}
              >
                Day (Driver/Psychic): {analysis.derivedNumbers.day}
              </span>
              <span
                className={`rounded-full px-3 py-2 ${chipStyles[analysis.derivedNumbers.month]}`}
              >
                Month: {analysis.derivedNumbers.month}
              </span>
              <span
                className={`rounded-full px-3 py-2 ${chipStyles[analysis.derivedNumbers.year]}`}
              >
                Year (Conductor/Destiny): {analysis.derivedNumbers.year}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              The life path number is added once to your grid counts; day, month, and
              year are shown for context.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="print-hidden">
          <CelebrityMatchCard dobIso={input.dob} />
        </AnimatedSection>

        <AnimatedSection className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm print-card">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Present vs Missing
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Number Strengths and Gaps
            </h2>
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-600">Present Numbers</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {analysis.loShu.presentNumbers.map((digit) => (
                <span
                  key={`present-${digit}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    chipStyles[digit]
                  }`}
                >
                  {digit}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-600">Missing Numbers</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {analysis.loShu.missingNumbers.map((digit) => (
                <span
                  key={`missing-${digit}`}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-400"
                >
                  {digit} Missing
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm print-card">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Planes and Arrows of Strength
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Active planes in your grid
            </h2>
          </div>
          <PlaneBadges planes={analysis.planes} />
        </AnimatedSection>

        <AnimatedSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm print-card">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Arrows of Weakness
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Patterns to balance gently
            </h2>
          </div>
          <WeaknessArrows arrows={analysis.weaknessArrows} remedyLookup={REMEDY_PACKS} />
        </AnimatedSection>

        <AnimatedSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm print-card">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Small Arrows
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Bonus insights from number pairs
            </h2>
          </div>
          <SmallArrows arrows={analysis.smallArrows} />
        </AnimatedSection>

        <AnimatedSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm print-card">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Missing and Repeated Numbers
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Remedies and balance notes
            </h2>
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-slate-600">Repeated Insights</p>
              <div className="mt-4">
                <RepeatedInsights insights={analysis.repeatedInsights} />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600">Missing Number Remedies</p>
              <div className="mt-4">
                <RemedyPacks remedies={analysis.missingRemedies} />
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="space-y-6 print-card">
          <ChaldeanBreakdown name={input.fullName} result={analysis.chaldean} />
          <NameAlignmentCard alignment={analysis.nameAlignment} />
          <SpecialNumbersCard specialNumbers={analysis.specialNumbers} />
        </AnimatedSection>

        <AnimatedSection className="grid gap-4 lg:grid-cols-2 print-card">
          <div className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Essence Number
            </p>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-4xl font-semibold text-slate-900">
                {analysis.essence.reduced}
              </span>
              <span className="text-sm text-slate-500">
                Raw sum {analysis.essence.rawSum}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Essence reflects your core energy and long-term vibration.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-700">Meaning:</span>{" "}
              {analysis.essence.meaning}
            </p>
          </div>
          <div className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Personal Number
            </p>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-4xl font-semibold text-slate-900">
                {analysis.personal.reduced}
              </span>
              <span className="text-sm text-slate-500">
                Raw sum {analysis.personal.rawSum}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Personal number shows how you express yourself day to day.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-700">Meaning:</span>{" "}
              {analysis.personal.meaning}
            </p>
          </div>
        </AnimatedSection>

        {analysis.mobileAnalysis && (
          <AnimatedSection className="print-card">
            <MobileAnalysisCard analysis={analysis.mobileAnalysis} />
          </AnimatedSection>
        )}

        {analysis.houseAnalysis && (
          <AnimatedSection className="print-card">
            <HouseAnalysisCard analysis={analysis.houseAnalysis} />
          </AnimatedSection>
        )}

        <AnimatedSection className="print-card">
          <GuidanceCard essence={analysis.essence.reduced} guidance={analysis.guidance} />
        </AnimatedSection>

        <AnimatedSection className="print-card">
          <ShareSummary summary={summary} />
        </AnimatedSection>
      </main>
    </div>
  );
}
