import SiteHeader from "@/components/SiteHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="hero-sky relative overflow-hidden border-b border-slate-100">
        <div className="stars-overlay pointer-events-none absolute inset-0" />
        <SiteHeader className="relative z-10" />
        <div className="relative mx-auto max-w-4xl px-6 pb-12">
          <h1 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
            About Numbers by Osho
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Numbers by Osho blends Chaldean and Lo Shu numerology to help you reflect on patterns,
            strengths, and growth areas in a modern, respectful way.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">What you will see</h2>
          <p className="mt-4 text-base text-slate-600">
            We calculate your Lo Shu grid, planes, arrows, and Chaldean name number, then provide
            gentle guidance and remedy ideas. The goal is clarity and self-awareness, not prediction.
          </p>
          <p className="mt-4 text-base text-slate-600">
            Everything is client-side. You stay in control of your data, and no profiles or tracking
            are created.
          </p>
          <p className="mt-6 text-sm text-slate-500">
            Disclaimer: For guidance and reflection only. Not medical or legal advice.
          </p>
        </div>
      </main>
    </div>
  );
}
