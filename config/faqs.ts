// Frequently asked questions. Read by the homepage FAQ section and reusable
// on a future /faq page.
//
// DRAFT COPY: answers marked `confirmed: false` are placeholders written for
// layout. The owner must confirm them before launch, especially the ones
// about products and rescheduling, which describe business policy.

import { formatAreaList } from "./service-areas";

export type Faq = {
  id: string;
  question: string;
  answer: string;
  /** True once the owner has confirmed the answer is accurate. */
  confirmed: boolean;
};

export const faqs: Faq[] = [
  {
    id: "free-quote",
    question: "Is the quote really free?",
    answer:
      "Yes. Tell us about your property and the clean you need, and we'll send you a tailored quote at no cost and with no obligation to book.",
    confirmed: true,
  },
  {
    id: "suburbs",
    question: "Which suburbs do you service?",
    answer: `We currently service ${formatAreaList()}. If you're nearby but outside these suburbs, get in touch and we'll let you know if we can help.`,
    confirmed: true,
  },
  {
    id: "airbnb-turnover",
    question: "How does Airbnb turnover cleaning work?",
    answer:
      "Between guest check-out and the next check-in, we reset the property: kitchen and bathrooms cleaned, floors done and beds remade with fresh linen, so it's ready for your next guest. We schedule each clean around your booking calendar.",
    confirmed: false,
  },
  {
    id: "frequency",
    question: "How often should I book a regular clean?",
    answer:
      "It depends on your household. Weekly cleans suit busy homes with kids or pets, fortnightly cleans are a popular middle ground, and monthly cleans help you stay on top of things. We're happy to recommend a schedule when we prepare your quote.",
    confirmed: false,
  },
  {
    id: "be-home",
    question: "Do I need to be home during the clean?",
    answer:
      "No, you don't need to be home. We'll agree on how we access your property when you book.",
    confirmed: false,
  },
  {
    id: "products",
    question: "Do you bring your own products and equipment?",
    answer:
      "Yes, we bring our own cleaning products and equipment. If you'd prefer we use particular products in your home, just let us know.",
    confirmed: false, // Pending owner confirmation: operational commitment.
  },
  {
    id: "reschedule",
    question: "Can I reschedule or cancel a booking?",
    answer:
      "Yes. Plans change, so let us know as early as possible and we'll find a new time that works for you.",
    confirmed: false, // Pending owner confirmation: business policy.
  },
];
