"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { userInputSchema } from "@/lib/validation";
import { normalizeMobile, normalizeName } from "@/lib/numerology";
import type { UserInput } from "@/lib/numerology";

const fieldBase =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-100";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function NumerologyForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserInput>({
    resolver: zodResolver(userInputSchema),
    defaultValues: {
      fullName: "",
      dob: "",
      mobile: "",
      email: "",
      houseNo: "",
    },
  });

  useEffect(() => {
    const saved = sessionStorage.getItem("numerologyInput");
    if (!saved) {
      return;
    }
    try {
      const parsed = JSON.parse(saved) as UserInput;
      reset({
        fullName: parsed.fullName ?? "",
        dob: parsed.dob ?? "",
        mobile: parsed.mobile ?? "",
        email: parsed.email ?? "",
        houseNo: parsed.houseNo ?? "",
      });
    } catch {
      // Ignore invalid cached data.
    }
  }, [reset]);

  const onSubmit = (values: UserInput) => {
    const payload: UserInput = {
      fullName: normalizeName(values.fullName),
      dob: values.dob,
      mobile: values.mobile ? normalizeMobile(values.mobile) : undefined,
      email: values.email?.trim() || undefined,
      houseNo: values.houseNo?.trim() || undefined,
    };

    sessionStorage.setItem("numerologyInput", JSON.stringify(payload));
    router.push("/result");
  };

  return (
    <motion.div
      className="card-surface hover-lift relative mx-auto -mt-14 w-full max-w-4xl px-6 py-10 sm:px-10"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Your Details
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Reveal your numerology blueprint
          </h2>
        </div>
        <p className="max-w-xs text-sm text-slate-500">
          All calculations run locally on your device.
        </p>
      </div>

      <form
        id="numerology-form"
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 grid gap-6 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-slate-600">
            Full Name *
          </label>
          <input
            {...register("fullName")}
            placeholder="e.g. Osho Rajneesh"
            className={fieldBase}
          />
          {errors.fullName && (
            <p className="mt-2 text-sm text-rose-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-600">
            Date of Birth *
          </label>
          <input type="date" {...register("dob")} className={fieldBase} />
          {errors.dob && (
            <p className="mt-2 text-sm text-rose-500">{errors.dob.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-600">Mobile</label>
          <input
            {...register("mobile")}
            placeholder="+91 98765 43210"
            inputMode="tel"
            className={fieldBase}
          />
          {errors.mobile && (
            <p className="mt-2 text-sm text-rose-500">
              {errors.mobile.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-600">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            className={fieldBase}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-rose-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-600">House No.</label>
          <input
            {...register("houseNo")}
            placeholder="Optional"
            className={fieldBase}
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-slate-900/25 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reveal My Numbers
          </button>
          <p className="mt-3 text-sm text-slate-500">
            For guidance and reflection only.
          </p>
        </div>
      </form>
    </motion.div>
  );
}
