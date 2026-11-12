import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { QuoteLink } from "@/components/quote/QuoteLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { business } from "@/config/business";
import { serviceAreaHref, serviceAreas } from "@/config/service-areas";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about our cleaning services in Hobart? Send us a message, or request a free, no-obligation quote.",
  alternates: { canonical: "/contact" },
};

// Contact details only appear once they're verified in config/business.ts.
const contactMethods = [
  business.phone && { label: "Call us", value: business.phone, href: `tel:${business.phone.replace(/\s/g, "")}` },
  business.whatsapp && { label: "WhatsApp", value: "Message us on WhatsApp", href: `https://wa.me/${business.whatsapp}` },
  business.email && { label: "Email", value: business.email, href: `mailto:${business.email}` },
].filter((method): method is { label: string; value: string; href: string } => Boolean(method));

// No entrance animations on this page: content appears at once.
export default function ContactPage() {
  return (
    <main className="flex-1">
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact Us", path: "/contact" }])} />
      <section aria-labelledby="contact-heading" className="bg-white pb-20 pt-32 md:pb-28 md:pt-40 lg:pb-32 lg:pt-48">
        <div className="mx-auto max-w-site px-5 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1
              id="contact-heading"
              className="text-[clamp(2.5rem,1.3rem+3.4vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em] lg:col-span-7"
            >
              Get in <span className="text-secondary">touch</span>
            </h1>
            <p className="max-w-[46ch] text-lg leading-[1.6] md:text-xl lg:col-span-5 lg:pb-2">
              Have a question about our cleaning services in Hobart? Send us a message and we&apos;ll get back to you.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:items-start">
            <div className="min-w-0 rounded-card border border-primary/10 bg-white p-6 shadow-soft sm:p-10 lg:col-span-7">
              <ContactForm />
            </div>

            <aside aria-label="Other ways to reach us" className="grid gap-5 lg:col-span-5">
              <div className="rounded-card bg-primary p-7 text-white sm:p-8 [&_:focus-visible]:outline-secondary-light">
                <h2 className="text-2xl font-bold text-white">Looking for a price?</h2>
                <p className="mt-3 leading-[1.6] text-white/80">
                  Our quote form asks for the details we need, like your property size and the service, so we can send
                  you an accurate price. It&apos;s free and there&apos;s no obligation.
                </p>
                <QuoteLink className="mt-6 inline-flex h-12 items-center gap-2 rounded-control bg-secondary-light px-6 font-semibold text-primary transition-colors hover:bg-white">
                  Get a free quote
                  <ArrowIcon className="size-4" />
                </QuoteLink>
              </div>

              {contactMethods.length > 0 && (
                <div className="rounded-card bg-mint p-7 sm:p-8">
                  <h2 className="text-xl font-bold">Talk to us directly</h2>
                  <ul className="mt-5 grid gap-4">
                    {contactMethods.map((method) => (
                      <li key={method.label}>
                        <p className="text-sm text-charcoal">{method.label}</p>
                        <a href={method.href} className="font-display text-lg font-bold text-primary underline-offset-4 hover:underline">
                          {method.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-card border border-primary/10 p-7 sm:p-8">
                <h2 className="text-xl font-bold">Where we work</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={serviceAreaHref(area)}
                        className="inline-flex h-10 items-center rounded-full border border-primary/15 px-4 text-[0.9375rem] font-semibold text-primary transition-colors hover:border-action hover:bg-mint"
                      >
                        {area.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[0.9375rem] leading-[1.6]">
                  Have a quick question? It may already be answered in our{" "}
                  <Link href="/#faq" className="font-semibold text-action underline underline-offset-2">
                    FAQ
                  </Link>
                  .
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
