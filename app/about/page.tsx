import type { Metadata } from "next";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
import { AboutServices } from "@/components/about/AboutServices";
import { AboutStory } from "@/components/about/AboutStory";
import { CtaBand } from "@/components/layout/CtaBand";

export const metadata: Metadata = {
  title: "About Us · GreenCoreCleaning, Hobart Cleaning Services",
  description:
    "Meet GreenCoreCleaning, a local cleaning business in Hobart. Learn how we work and request a free, no-obligation quote.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutIntro />
      <AboutStory />
      <AboutPrinciples />
      <AboutServices />
      <CtaBand />
    </main>
  );
}
