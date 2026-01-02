import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://numbersbyosho.com"),
  title: "Numbers by Osho | Chaldean & Lo Shu Numerology",
  description:
    "Discover your Lo Shu grid, planes, lucky guidance, and Chaldean name number.",
  openGraph: {
    title: "Numbers by Osho | Chaldean & Lo Shu Numerology",
    description:
      "Discover your Lo Shu grid, planes, lucky guidance, and Chaldean name number.",
    url: "https://numbersbyosho.com",
    siteName: "Numbers by Osho",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${manrope.variable} ${cinzel.variable} bg-slate-50 text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
