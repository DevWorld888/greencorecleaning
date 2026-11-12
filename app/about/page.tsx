import type { Metadata } from "next";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
import { AboutServices } from "@/components/about/AboutServices";
import { AboutStory } from "@/components/about/AboutStory";
import { CtaBand } from "@/components/layout/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet GreenCoreCleaning, a local cleaning business in Hobart. Learn how we work and request a free, no-obligation quote.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <JsonLd data={breadcrumbJsonLd([{ name: "About Us", path: "/about" }])} />
      <AboutIntro />
      <AboutStory />
      <AboutPrinciples />
      <AboutServices />
      <CtaBand />
    </main>
  );
}
