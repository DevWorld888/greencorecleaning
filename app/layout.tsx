import type { Metadata } from "next";
import { Geist, Schibsted_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { isIndexable, site } from "@/config/site";
import { businessJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

// Defaults for every page. Each page sets its own title (filled into the
// template), description and canonical URL; anything it leaves out falls back
// to these values.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: site.locale },
  twitter: { card: "summary_large_image" },
  // Staging/preview deployments stay out of search results (config/site.ts).
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${geist.variable} ${schibsted.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <JsonLd data={[businessJsonLd(), websiteJsonLd()]} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
