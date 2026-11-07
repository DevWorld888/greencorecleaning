// What a standard clean covers, room by room. Read by the homepage
// "Cleaning Standards" section and reusable on future service pages.
//
// DRAFT COPY: these tasks are placeholders written for layout. Each line is a
// promise to the customer, so the owner must confirm the list before launch.

export type Room = {
  id: string;
  name: string;
  tasks: string[];
};

export const cleaningChecklist: Room[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    tasks: [
      "Benchtops and splashbacks wiped and sanitised",
      "Sink and tapware cleaned and polished",
      "Stovetop and range hood exterior degreased",
      "Appliance exteriors wiped down",
      "Cupboard fronts and handles spot cleaned",
      "Bins emptied and relined",
      "Floors vacuumed and mopped",
    ],
  },
  {
    id: "bathrooms",
    name: "Bathrooms",
    tasks: [
      "Showers, screens and tiles cleaned",
      "Toilets cleaned and sanitised inside and out",
      "Basins, vanities and tapware polished",
      "Mirrors cleaned streak-free",
      "Exhaust fan covers dusted",
      "Bins emptied and relined",
      "Floors vacuumed and mopped",
    ],
  },
  {
    id: "living-areas",
    name: "Living areas",
    tasks: [
      "Surfaces, shelves and ledges dusted",
      "Light switches and door handles wiped",
      "Skirting boards dusted",
      "Mirrors and glass surfaces cleaned",
      "Cushions straightened and furniture tidied",
      "Cobwebs removed",
      "Carpets vacuumed and hard floors mopped",
    ],
  },
  {
    id: "bedrooms",
    name: "Bedrooms",
    tasks: [
      "Beds made, with linen changed on request",
      "Bedside tables, dressers and shelves dusted",
      "Mirrors cleaned streak-free",
      "Light switches and door handles wiped",
      "Rooms tidied and bins emptied",
      "Carpets vacuumed and hard floors mopped",
    ],
  },
];
