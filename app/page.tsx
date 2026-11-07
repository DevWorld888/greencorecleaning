import { CleaningStandards } from "@/components/home/CleaningStandards";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <FeaturedServices />
      <CleaningStandards />
    </main>
  );
}
