import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { ServiceCategorySection } from "@/components/services/ServiceCategorySection";
import { ServicesIntro } from "@/components/services/ServicesIntro";
import { serviceCategories } from "@/config/services";

export const metadata: Metadata = {
  title: "Cleaning Services in Hobart · Residential, Commercial & Specialist · GreenCoreCleaning",
  description:
    "House, Airbnb, end of lease, commercial and specialist cleaning in Hobart. Choose your service and get a free, no-obligation quote.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <ServicesIntro />
      {serviceCategories.map((category, index) => (
        <ServiceCategorySection key={category} category={category} tinted={index % 2 === 1} />
      ))}
      <CtaBand
        heading="Not sure which service you need?"
        text="Describe the job in your quote request and we'll recommend the right clean for your property. It's free and there's no obligation."
      />
    </main>
  );
}
