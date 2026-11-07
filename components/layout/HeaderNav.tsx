"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { NavItem } from "@/config/navigation";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

type HeaderNavProps = {
  items: NavItem[];
  cta: NavItem;
};

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function HeaderNav({ items, cta }: HeaderNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <nav aria-label="Main" className="hidden lg:block">
        <ul className="flex items-center gap-8 xl:gap-10">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 text-[0.9375rem] font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-secondary after:transition-transform hover:text-action ${
                    active ? "text-primary after:scale-x-100" : "text-primary/80 after:scale-x-0"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href={cta.href}
          className="relative hidden h-11 items-center gap-2 overflow-hidden rounded-control bg-primary px-5 text-[0.9375rem] font-semibold text-white shadow-soft before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity hover:before:opacity-10 sm:inline-flex"
        >
          <span className="relative">{cta.label}</span>
          <ArrowIcon className="relative size-4" />
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="grid size-11 place-items-center rounded-control border border-primary/10 bg-white/90 text-primary lg:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-5 top-full rounded-card border border-primary/5 bg-white p-3 shadow-soft md:inset-x-10 lg:hidden"
          >
            <ul className="grid">
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex h-12 items-center rounded-control px-4 font-semibold transition-colors hover:bg-mint ${
                        active ? "bg-mint text-action" : "text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className="mt-2 flex h-12 items-center justify-center gap-2 rounded-control bg-primary font-semibold text-white"
            >
              {cta.label}
              <ArrowIcon className="size-4" />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
