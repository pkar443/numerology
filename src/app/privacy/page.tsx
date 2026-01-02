import SiteHeader from "@/components/SiteHeader";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="hero-sky relative overflow-hidden border-b border-slate-100">
        <div className="stars-overlay pointer-events-none absolute inset-0" />
        <SiteHeader className="relative z-10" />
        <div className="relative mx-auto max-w-4xl px-6 pb-12">
          <h1 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Privacy
          </h1>
          <p className="mt-3 text-base text-slate-600">
            We do not store data. All calculations happen on your device.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">No data collection</h2>
          <p className="mt-4 text-base text-slate-600">
            Your name, date of birth, and optional details are kept in session storage only to make
            the experience smooth. They are never sent to a server.
          </p>
          <p className="mt-4 text-base text-slate-600">
            You can clear your browser session at any time to remove stored values.
          </p>
        </div>
      </main>
    </div>
  );
}
