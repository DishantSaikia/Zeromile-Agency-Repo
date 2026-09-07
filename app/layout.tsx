import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { ScrollTriggerRefresh } from "@/components/ScrollTriggerRefresh";
import { agencyConfig } from "@/lib/config";
import { getSiteSettings } from "@/lib/data/site-settings";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800"],
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
    default: `${agencyConfig.name} - Self Drive, Commercial Rentals and Stays`,
    template: `%s - ${agencyConfig.name}`,
  },
  description:
    "Self-drive car rental, commercial vehicle hire, and short-term stays - book in minutes over WhatsApp with Zeromile Agency.",
  openGraph: {
    type: "website",
    siteName: agencyConfig.name,
    title: `${agencyConfig.name} - Self Drive, Commercial Rentals and Stays`,
    description:
      "Self-drive car rental, commercial vehicle hire, and short-term stays - book in minutes over WhatsApp.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSans.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-100 focus-visible:rounded-md focus-visible:bg-navy focus-visible:px-4 focus-visible:py-2 focus-visible:text-on-navy"
        >
          Skip to main content
        </a>
        <Header logo={siteSettings.logo} logoAlt={siteSettings.logoAlt} />
        <main id="main-content" className="flex-1 pt-16 lg:pt-20">
          {children}
        </main>
        <Footer logo={siteSettings.logo} logoAlt={siteSettings.logoAlt} />
        <FloatingWhatsAppButton />
        <ScrollTriggerRefresh />
      </body>
    </html>
  );
}
