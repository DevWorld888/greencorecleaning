---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Home page — surface brief

## Scope and mode

Home page (`app/page.tsx`), starting with the navbar and hero. Visitor mode: **Persuade**. Build path: code-led (no image generation available in this environment).

## Audience, job and action

Hobart residential customers (households, tenants/property managers, Airbnb hosts) weighted equally. They need to see within seconds that GreenCoreCleaning is a professional Hobart cleaner covering their need, then request a free, no-obligation quote. Primary action: **Get a Free Quote**. Secondary: call/WhatsApp once a verified number exists.

## Proof and content constraints

No statistics, ratings, reviews, eco claims, guarantees or placeholder phone numbers. Trust comes from clear service communication, an honest three-step process (tell us about your property, receive a tailored quote, we clean) and professional presentation. Hero copy targets Hobart only; suburbs are handled later by the local SEO strategy.

## Direction contract

THESIS: A premium, visually engaging Hobart cleaning hero that keeps the owner's approved two-column reference, strong type left and a large cleaning-related photograph right, but replaces its invented proof with a working quote start. It refuses fabricated stats, decorative clutter and a plain corporate layout.

OWN-WORLD: White-dominant ground; Primary `#0F4557` headings and nav; Secondary `#509948` as accent and large display text; Accessible Green `#3F7D38` for button fills (palette revised by the owner on 2026-11-05 to match the logo); Light Sky Blue `#DCEEF7` and Soft Green `#F0F8ED` as soft supporting surfaces; depth in the hero comes from the full-bleed photo and its fade. Schibsted Grotesk display, Geist body. One radius family (12 controls, 16 cards, 24 photo), one soft shadow.

STORY: The visitor sees "cleaning in Hobart" at once, believes the business is professional and careful, and starts a free quote.

FIRST VIEWPORT: Owner-approved revision (second reference, 2026-11-05): the photograph is a full-bleed background filling the hero from the top edge (the future navbar sits over it), mirrored so the sofas sit in the visible right side. On desktop it covers the right ~56–62% and dissolves to white toward the copy via a CSS mask, with a soft fade into the next section; no hard edge, no frame, no tilt. Copy and inline quick-quote form sit on white at left (owner-requested pill above the H1, "Spotless homes, every visit", kept deliberately against the craft-floor eyebrow ban; H1 naming Hobart, lead, Service + Suburb + Get my free quote, three-step row). Two small truthful chips float over the photo (featured residential services, "Free quotes"). Tablet/mobile: photo on top, fading downward into the copy; chips hidden.

FORM: Owner-pinned direction from `.impeccable/references/hero-reference.png`, position 1 (pinned beats the roll). seed: none (unavailable — user-pinned direction, concept-seed not run).

Signature interaction: the inline quick-quote form carries the visitor's service and suburb into the full quote form (functionality deferred to a later approved step; final selector UX not approved). Motion grammar (Motion library, owner-approved): one orchestrated load reveal (text rise of about 12px, staggered; heading never fades for LCP; photo settling from scale 1.04 to 1; chips arriving last) (decorative blob shapes removed with the full-bleed revision); transform animations disabled under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved decisions

- Quote selector final UX and service list (must cover all confirmed services eventually).
- Real photography (placeholder must be clearly provisional until delivered).
- Verified phone/WhatsApp number before showing call actions.
- Final hero copy (H1 options to be proposed and approved).
- Logo.
