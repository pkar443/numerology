"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="hero-sky relative overflow-hidden">
      <div className="stars-overlay pointer-events-none absolute inset-0" />
      <SiteHeader className="relative z-10" />
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, ease: "easeOut" }}
          variants={fadeUp}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-white/60">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Chaldean and Lo Shu Numerology
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Numbers by Osho - Chaldean and Lo Shu Numerology
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            Reveal your grid, planes, and guidance with a complete, modern numerology map.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#numerology-form"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Reveal My Numbers
            </a>
            <a
              href="/compatibility"
              className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/70 px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-white"
            >
              Try Compatibility
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative flex flex-col items-center justify-center gap-6"
        >
          <div className="relative flex items-center justify-center">
            <div className="universe-orb h-64 w-64 sm:h-72 sm:w-72" />
            <div className="orbit-ring h-72 w-72 sm:h-80 sm:w-80" />
            <div className="orbit-ring delayed h-56 w-56 sm:h-64 sm:w-64" />
          </div>
          <div className="w-full max-w-sm rounded-3xl border border-white/60 bg-white/80 p-4 shadow-lg">
            <div className="relative h-48 w-full overflow-hidden rounded-2xl">
              <Image
                src="/image/osho.webp"
                alt="Osho portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 320px"
                priority
              />
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm font-semibold text-slate-800">
                Osho - inspiration behind these numerology rules
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Honoring the teacher who shaped this system.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
