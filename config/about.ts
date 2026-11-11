// About Us page content.
//
// PLACEHOLDER: everything under `story` is lorem ipsum. It must be replaced
// with the owner's real story (founder, motivation, experience, local
// connection) before launch. Never replace it with invented facts.
//
// `principles` is real: each point restates something already confirmed
// elsewhere on the site (free quotes, the cleaning checklist, scheduling
// options, service areas).

import { formatAreaList } from "./service-areas";

export const about = {
  intro:
    "A local cleaning business in Hobart, set up to make getting your home cleaned simple: a clear quote, a clear checklist and a clean that fits your week.",

  story: {
    heading: "Our story",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.",
      "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo.",
      "Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
    ],
    founderName: "Lorem Ipsum",
    founderRole: "Founder",
  },

  principles: [
    {
      title: "A quote for your property",
      text: "Every home is different, so we quote for yours, not a generic package. It's free and there's no obligation to book.",
      link: { label: "Get a free quote", href: "/#quote" },
    },
    {
      title: "You know what gets cleaned",
      text: "Our room-by-room checklist shows what a standard clean covers before we arrive. Anything extra, just ask.",
      link: { label: "See our checklist", href: "/#standards" },
    },
    {
      title: "Cleaning that fits your week",
      text: "Weekly, fortnightly, monthly, a one-off clean or turnovers between Airbnb guests. We work around your schedule.",
      link: { label: "Our services", href: "/#services" },
    },
    {
      title: "Local to Hobart",
      text: `We're a Hobart business, cleaning homes and properties in ${formatAreaList()}.`,
      link: { label: "Areas we cover", href: "/#areas" },
    },
  ],
};
