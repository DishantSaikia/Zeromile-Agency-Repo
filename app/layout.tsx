import type { Metadata } from "next";
import { Lexend, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { agencyConfig } from "@/lib/config";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zeromileagency.example"),
  title: {
    default: `${agencyConfig.name} - Private, Commercial & Stay Rentals`,
    template: `%s - ${agencyConfig.name}`,
  },
  description:
    "Private car rental, commercial vehicle hire, and short-term stays - book in minutes over WhatsApp with Zeromile Agency.",
  openGraph: {
    type: "website",
    siteName: agencyConfig.name,
    title: `${agencyConfig.name} - Private, Commercial & Stay Rentals`,
    description:
      "Private car rental, commercial vehicle hire, and short-term stays - book in minutes over WhatsApp.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${sourceSans.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-100 focus-visible:rounded-md focus-visible:bg-navy focus-visible:px-4 focus-visible:py-2 focus-visible:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
