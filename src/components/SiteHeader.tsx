import Link from "next/link";

const linkStyles =
  "text-sm font-semibold text-slate-600 transition hover:text-slate-900";

type SiteHeaderProps = {
  className?: string;
};

export default function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      className={`mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-6 ${
        className ?? ""
      }`}
    >
      <Link href="/" className="text-lg font-semibold text-slate-900">
        Numbers by Osho
      </Link>
      <nav className="flex flex-wrap items-center gap-5">
        <Link href="/" className={linkStyles}>
          Home
        </Link>
        <Link href="/compatibility" className={linkStyles}>
          Compatibility
        </Link>
        <Link href="/about" className={linkStyles}>
          About
        </Link>
        <Link href="/privacy" className={linkStyles}>
          Privacy
        </Link>
      </nav>
    </header>
  );
}
