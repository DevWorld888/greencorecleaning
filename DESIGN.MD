# GreenCoreCleaning — DESIGN.md

## 1. Purpose

This document defines the approved visual design direction for GreenCoreCleaning.

It is the project's visual source of truth.

Claude must consult this document, PRODUCT.md, CLAUDE.md and relevant approved references before proposing or implementing UI changes.

Design decisions must be consistent, intentional and appropriate for a premium Australian cleaning business.

Do not interpret this document as permission to implement anything without approval.

---

## 2. Creative Direction

### Brand Personality

GreenCoreCleaning should feel:

- Professional
- Trustworthy
- Fresh
- Confident
- Premium
- Welcoming
- Modern

### Visual Concept

**Corporate precision meets residential freshness.**

The website should combine strong corporate typography and structured layouts with bright interior photography, carefully restrained green accents and subtle visual depth.

The design should communicate cleanliness without relying on generic cleaning-industry clichés.

### Core Principle

Every design element must have a purpose.

Decorative elements are permitted when they improve composition, depth, hierarchy or brand recognition.

---

## 3. Colour System

### Primary Tokens

| Token | HEX | Purpose |
|---|---|---|
| Navy | #0B2D48 | Headings, navigation, footer |
| Grass Green | #319B08 | Brand accents |
| Action Green | #287F06 | Primary buttons |
| Sky Blue | #DCEEF7 | Decorative backgrounds |
| Soft Green | #F0F8ED | Soft sections |
| White | #FFFFFF | Main background |
| Charcoal | #263238 | Body text |

### Colour Rules

- White is the dominant background.
- Navy establishes corporate identity.
- Green emphasises important actions.
- Avoid large amounts of saturated green.
- Use sky blue and soft green selectively.
- Maintain WCAG AA contrast for normal text.
- Use semantic colour tokens instead of repeating arbitrary HEX values.

The exact final implementation of the tokens must be approved before coding.

---

## 4. Typography

### Display Font

**Schibsted Grotesk**

Use for:

- H1
- H2
- Important editorial headings

### Body Font

**Geist**

Use for:

- Paragraphs
- Navigation
- Buttons
- Forms
- Supporting interface text

### Typography Guidelines

- Strong hierarchy.
- Tight but readable display line-height.
- Comfortable body line-height.
- Avoid unnecessary all-caps headings.
- Avoid excessive text highlighting.
- Avoid decorative underlines without purpose.
- Use responsive typography.

### Proposed Hero Scale

H1:
`clamp(2.5rem, 1.4rem + 4vw, 5rem)`

Body:
18–20px on desktop, adjusted for mobile.

These are starting values, not rigid requirements.

---

## 5. Layout and Spacing

### Container

Maximum content width: 1280px.

### Spacing Scale

4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.

### Layout Principles

- Use intentional whitespace.
- Maintain consistent alignment.
- Avoid overcrowding.
- Use asymmetry when it improves the composition.
- Create clear visual hierarchy.
- Maintain consistent section rhythm.
- Prefer responsive grids over absolute positioning for primary content.

### Border Radii

Initial guidelines:

- Buttons and fields: 12px
- Cards: 16px
- Large image containers: 24px

Use consistent radii across the interface.

---

## 6. Photography

Photography is a central part of the visual identity.

Preferred photography:

- Bright, clean Australian homes.
- Professional cleaning environments.
- Natural daylight.
- Authentic people and locations.
- Strong composition.
- Natural colours.
- Realistic interiors.

Avoid:

- Artificial-looking AI photography.
- Excessively staged scenes.
- Generic stock-photo clichés.
- Oversaturated images.
- Images unrelated to the services.

The client indicated that professional photographs are available, but the actual assets must be supplied and reviewed.

---

## 7. Depth and Decorative Elements

Approved visual direction includes:

- Subtle layered compositions.
- Carefully positioned green and blue shapes.
- Soft shadows.
- Limited floating UI elements.
- High-quality image framing.

### Rules

- Decorative elements must support the composition.
- Do not use random floating badges.
- Do not obscure essential content.
- Avoid excessive blobs, sparkles and gradients.
- Keep decorative elements restrained on mobile.

Functional UI elements should take priority over purely decorative cards.

---

## 8. Buttons and Forms

### Primary CTA

Use the accessible action green.

Suggested label:

**Get a Quote**

Use **Get a Free Quote** only after the business confirms that quotations are free.

### Button Design

- Consistent 12px radius.
- Strong contrast.
- Clear hover and focus states.
- Comfortable touch targets.
- No unnecessary animation.

### Forms

- Clear labels.
- Appropriate input types.
- Accessible error messages.
- Logical field grouping.
- Mobile-friendly controls.
- Minimal friction.
- No unnecessary fields.

Quote forms must reflect the selected cleaning service.

---

## 9. Responsive Design

### Desktop

- Strong grid composition.
- Large typography.
- Prominent photography.
- Carefully layered elements.

### Tablet

- Rebalance layout.
- Adjust image proportions.
- Reduce unnecessary overlap.
- Preserve visual hierarchy.

### Mobile

- Prioritise content and CTA.
- Stack elements intentionally.
- Simplify decorative layers.
- Maintain readable typography.
- Avoid horizontal scrolling.
- Ensure touch targets are accessible.

Do not simply shrink the desktop design.

---

## 10. Motion and Interaction

Motion should be subtle and purposeful.

Acceptable examples:

- Gentle entrance transitions.
- Button hover feedback.
- Small image reveals.
- Controlled opacity and transform animations.

Avoid:

- Constant floating animations.
- Excessive parallax.
- Unnecessary scroll effects.
- Large layout shifts.
- Animations that delay interaction.

Respect `prefers-reduced-motion`.

Do not introduce animation libraries without approval.

---

## 11. Anti-AI-Slop Design Rules

Before proposing a design, evaluate whether it looks generic.

Watch for:

- Repetitive three-card layouts.
- Generic split-screen heroes without a distinctive idea.
- Random decorative blobs.
- Unnecessary gradients.
- Floating icon cards without purpose.
- Excessive rounded corners.
- Generic marketing headlines.
- Fake metrics or testimonials.
- Inconsistent spacing.
- Decorative elements that do not support usability.

These are warning signs, not automatic prohibitions.

A common pattern is acceptable when it is the most effective solution and is executed with care.

### Quality Standard

The website should feel intentionally art-directed, not automatically assembled.

---

## 12. Hero Design Direction

### Current Status

Conceptual direction established. Final layout and implementation are pending approval.

### Preferred Composition

- Strong headline on the left.
- Large professional cleaning-related photograph on the right.
- White background.
- Navy typography.
- Green primary CTA.
- Subtle green and blue layering.
- Clear Hobart relevance.
- A possible functional quick-quote element.

### Restrictions

- No fictional statistics.
- No unverified claims.
- No fabricated reviews.
- No placeholder phone numbers in production.
- No automatic implementation of the quote form.
- No automatic implementation of decorative animations.

See `design/references/examples.md` for reference-specific guidance.

---

## 13. Design Approval Process

For every major UI task:

1. Review PRODUCT.md.
2. Review DESIGN.md.
3. Review relevant approved references.
4. Consult Impeccable.
5. Propose a design solution.
6. Explain visual and technical trade-offs.
7. Wait for approval.
8. Implement the approved scope.
9. Review desktop, tablet and mobile.
10. Perform design critique and accessibility checks.
11. Record final decisions.

Never treat a proposal as an approved design.

---

## 14. Design Decision Status

### Established Direction

- Corporate premium visual identity.
- Navy and green palette.
- Clean, bright visual character.
- Responsive-first approach.
- Impeccable-assisted design review.
- Strong conversion focus.
- No invented social proof.

### Proposed / Pending Final Validation

- Exact hero layout.
- Quick-quote card implementation.
- Final image selection.
- Animation details.
- Final navigation design.
- Full component library.
- Final button and card dimensions.

The project owner approves all final design decisions.