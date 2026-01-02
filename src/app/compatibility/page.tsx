"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import LoShuGrid from "@/components/LoShuGrid";
import SiteHeader from "@/components/SiteHeader";
import {
  getCompatibilityResult,
  normalizeMobile,
  normalizeName,
  type CompatibilityResult,
} from "@/lib/numerology";
import {
  compatibilitySchema,
  type CompatibilityFormValues,
} from "@/lib/validation";

const fieldBase =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-100";

export default function CompatibilityPage() {
  const [formData, setFormData] = useState<CompatibilityFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompatibilityFormValues>({
    resolver: zodResolver(compatibilitySchema),
    defaultValues: {
      personAName: "",
      personADob: "",
      personAMobile: "",
      personAHouse: "",
      personBName: "",
      personBDob: "",
      personBMobile: "",
      personBHouse: "",
    },
  });

  useEffect(() => {
    const saved = sessionStorage.getItem("compatibilityInput");
    if (!saved) {
      return;
    }
    try {
      const parsed = JSON.parse(saved) as CompatibilityFormValues;
      setFormData(parsed);
      reset(parsed);
    } catch {
      // Ignore invalid cached data.
    }
  }, [reset]);

  const result: CompatibilityResult | null = useMemo(() => {
    if (!formData) {
      return null;
    }
    return getCompatibilityResult(
      {
        fullName: formData.personAName,
        dob: formData.personADob,
        mobile: formData.personAMobile,
        houseNo: formData.personAHouse,
      },
      {
        fullName: formData.personBName,
        dob: formData.personBDob,
        mobile: formData.personBMobile,
        houseNo: formData.personBHouse,
      },
    );
  }, [formData]);

  const onSubmit = (values: CompatibilityFormValues) => {
    const payload: CompatibilityFormValues = {
      personAName: normalizeName(values.personAName),
      personADob: values.personADob,
      personAMobile: values.personAMobile
        ? normalizeMobile(values.personAMobile)
        : undefined,
      personAHouse: values.personAHouse?.trim() || undefined,
      personBName: normalizeName(values.personBName),
      personBDob: values.personBDob,
      personBMobile: values.personBMobile
        ? normalizeMobile(values.personBMobile)
        : undefined,
      personBHouse: values.personBHouse?.trim() || undefined,
    };

    sessionStorage.setItem("compatibilityInput", JSON.stringify(payload));
    setFormData(payload);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="hero-sky relative overflow-hidden border-b border-slate-100 print-hidden">
        <div className="stars-overlay pointer-events-none absolute inset-0" />
        <SiteHeader className="relative z-10" />
        <div className="relative mx-auto max-w-6xl px-6 pb-12">
          <h1 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Compatibility Map
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Compare two charts to see shared strengths, complementary energies, and gentle growth tips.
          </p>
        </div>
      </section>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-10">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="card-surface hover-lift w-full px-6 py-10 sm:px-10"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Person A
              </p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Full Name *
                  </label>
                  <input {...register("personAName")} className={fieldBase} />
                  {errors.personAName && (
                    <p className="mt-2 text-sm text-rose-500">
                      {errors.personAName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    {...register("personADob")}
                    className={fieldBase}
                  />
                  {errors.personADob && (
                    <p className="mt-2 text-sm text-rose-500">
                      {errors.personADob.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">Mobile</label>
                  <input
                    {...register("personAMobile")}
                    inputMode="tel"
                    className={fieldBase}
                  />
                  {errors.personAMobile && (
                    <p className="mt-2 text-sm text-rose-500">
                      {errors.personAMobile.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">House No.</label>
                  <input {...register("personAHouse")} className={fieldBase} />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Person B
              </p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Full Name *
                  </label>
                  <input {...register("personBName")} className={fieldBase} />
                  {errors.personBName && (
                    <p className="mt-2 text-sm text-rose-500">
                      {errors.personBName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    {...register("personBDob")}
                    className={fieldBase}
                  />
                  {errors.personBDob && (
                    <p className="mt-2 text-sm text-rose-500">
                      {errors.personBDob.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">Mobile</label>
                  <input
                    {...register("personBMobile")}
                    inputMode="tel"
                    className={fieldBase}
                  />
                  {errors.personBMobile && (
                    <p className="mt-2 text-sm text-rose-500">
                      {errors.personBMobile.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">House No.</label>
                  <input {...register("personBHouse")} className={fieldBase} />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-full bg-slate-900 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Compare Compatibility
              </button>
              <p className="mt-3 text-sm text-slate-500">
                For guidance and reflection only.
              </p>
            </div>
          </form>
        </motion.section>

        {result && (
          <>
            <AnimatedSection className="grid gap-6 lg:grid-cols-2">
              <div className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">
                  {formData?.personAName}
                </h2>
                <p className="mt-1 text-sm text-slate-500">Lo Shu Grid</p>
                <div className="mt-5">
                  <LoShuGrid counts={result.personA.loShu.counts} />
                </div>
              </div>
              <div className="hover-lift rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">
                  {formData?.personBName}
                </h2>
                <p className="mt-1 text-sm text-slate-500">Lo Shu Grid</p>
                <div className="mt-5">
                  <LoShuGrid counts={result.personB.loShu.counts} />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Shared Strengths
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Planes and small arrows in common
              </h2>
              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-600">Planes</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.sharedStrengthPlanes.length > 0 ? (
                    result.sharedStrengthPlanes.map((plane) => (
                      <span
                        key={`shared-plane-${plane.id}`}
                        className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700"
                      >
                        {plane.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No shared planes detected.</span>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-600">Small arrows</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.sharedSmallArrows.length > 0 ? (
                    result.sharedSmallArrows.map((arrow) => (
                      <span
                        key={`shared-arrow-${arrow.id}`}
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
                      >
                        {arrow.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No shared small arrows detected.</span>
                  )}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Complementary Match
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                How you balance each other
              </h2>
              <p className="mt-4 text-sm text-slate-600">
                Person A supports B with: {result.complements.aSupportsB.join(", ") || "None"}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Person B supports A with: {result.complements.bSupportsA.join(", ") || "None"}
              </p>
              <p className="mt-4 text-sm text-slate-600">{result.complements.message}</p>
            </AnimatedSection>

            <AnimatedSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Potential Friction
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Areas to handle gently
              </h2>
              {result.frictionNotes.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {result.frictionNotes.map((note, index) => (
                    <li key={`friction-${index}`}>{note}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-slate-600">
                  No major friction indicators detected. Focus on shared strengths.
                </p>
              )}
            </AnimatedSection>

            <AnimatedSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Relationship Remedy
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                A shared alignment practice
              </h2>
              {result.sharedRemedy ? (
                <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                  <p>
                    Focus on missing {result.sharedRemedy.digit}. Use {result.sharedRemedy.color} tones
                    and keep {result.sharedRemedy.crystal} nearby.
                  </p>
                  <p className="mt-2">Activity: {result.sharedRemedy.activity}</p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-600">
                  No shared missing numbers. Use supportive routines and clear communication.
                </p>
              )}
            </AnimatedSection>

            <AnimatedSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Compatibility Score
              </p>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-4xl font-semibold text-slate-900">
                  {result.score}
                </span>
                <span className="text-sm text-slate-500">{result.scoreNote}</span>
              </div>
            </AnimatedSection>
          </>
        )}
      </main>
    </div>
  );
}
