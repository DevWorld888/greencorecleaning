import type { Metadata } from "next";
import { CleaningStandards } from "@/components/home/CleaningStandards";
import { Faq } from "@/components/home/Faq";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { Hero } from "@/components/home/Hero";
import { QuoteSection } from "@/components/home/QuoteSection";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/config/faqs";
import { site } from "@/config/site";
import { faqJsonLd } from "@/lib/structured-data";

// The homepage targets the broad local search "cleaning services Hobart".
export const metadata: Metadata = {
  // Absolute: the layout's title template doesn't apply to the root page.
  title: { absolute: `Cleaning Services in Hobart · ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="flex-1">
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <FeaturedServices />
      <CleaningStandards />
      <ServiceAreas />
      <Faq />
      <QuoteSection />
    </main>
  );
}
