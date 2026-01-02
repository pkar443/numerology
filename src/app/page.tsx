import Hero from "@/components/Hero";
import NumerologyForm from "@/components/NumerologyForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />
      <section className="relative bg-slate-50 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <NumerologyForm />
        </div>
      </section>
      <footer className="border-t border-slate-100 bg-white/80 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-sm text-slate-500">
          <p>For guidance and reflection only.</p>
          <p>All calculations happen on your device. No data is stored.</p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            <Link href="/about" className="text-slate-600 hover:text-slate-900">
              About
            </Link>
            <Link href="/privacy" className="text-slate-600 hover:text-slate-900">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
