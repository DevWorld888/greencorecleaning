// Site navigation. Add, remove or reorder items here; the header renders this list.
// Routes other than "/" do not exist yet and will 404 until their pages are built.

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const navCta: NavItem = { label: "Let's Talk", href: "/contact" };
