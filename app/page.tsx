import { CleaningStandards } from "@/components/home/CleaningStandards";
import { Faq } from "@/components/home/Faq";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { Hero } from "@/components/home/Hero";
import { QuoteSection } from "@/components/home/QuoteSection";
import { ServiceAreas } from "@/components/home/ServiceAreas";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <FeaturedServices />
      <CleaningStandards />
      <ServiceAreas />
      <Faq />
      <QuoteSection />
    </main>
  );
}
