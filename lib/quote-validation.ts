// One schema for the quote request, shared by the browser (instant feedback)
// and the Server Action (the check that actually counts, since browser
// validation can be bypassed).

import { z } from "zod";
import {
  extraFields,
  OTHER_SUBURB,
  propertyTypes,
  serviceExtraFields,
  type ExtraFieldId,
} from "@/config/quote-form";
import { serviceAreas } from "@/config/service-areas";
import { services } from "@/config/services";

const serviceSlugs = services.map((service) => service.slug) as [string, ...string[]];
const suburbValues: [string, ...string[]] = [OTHER_SUBURB, ...serviceAreas.map((area) => area.slug)];

// Optional text: empty strings from the form count as "not provided".
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: `Please keep this under ${max} characters.` })
    .optional()
    .transform((value) => value || undefined);

const optionalDate = z
  .string()
  .optional()
  .transform((value) => value || undefined)
  .refine((value) => !value || !Number.isNaN(Date.parse(value)), { error: "Please choose a valid date." });

export const quoteSchema = z
  .object({
    service: z.enum(serviceSlugs, { error: "Please choose the service you need." }),
    suburb: z.enum(suburbValues, { error: "Please choose your suburb." }),
    otherSuburb: optionalText(60),
    propertyType: z.enum(propertyTypes, { error: "Please choose your property type." }),
    preferredDate: optionalDate,
    details: optionalText(2000),

    bedrooms: optionalText(20),
    bathrooms: optionalText(20),
    frequency: optionalText(40),
    turnovers: optionalText(40),
    vacateDate: optionalDate,
    projectType: optionalText(40),
    completionDate: optionalDate,
    floorArea: optionalText(40),

    name: z.string().trim().min(2, { error: "Please enter your full name." }).max(100),
    email: z.string().trim().pipe(z.email({ error: "Please enter a valid email so we can send your quote." })),
    phone: z
      .string()
      .trim()
      .refine((value) => /^\+?[\d\s()-]+$/.test(value) && value.replace(/\D/g, "").length >= 8 && value.replace(/\D/g, "").length <= 15, {
        error: "Please enter a valid phone number, e.g. 0400 123 456.",
      }),
    consent: z.literal("on", { error: "Please agree so we can use your details to prepare your quote." }),
  })
  .superRefine((data, ctx) => {
    // `data` may be incomplete here (see `when` below), so read it defensively.
    if (data.suburb === OTHER_SUBURB && !data.otherSuburb) {
      ctx.addIssue({ code: "custom", path: ["otherSuburb"], message: "Please tell us your suburb." });
    }

    // Each service asks its own extra questions (config/quote-form.ts).
    for (const id of serviceExtraFields[data.service] ?? []) {
      const field = extraFields[id];
      if (field.required && !data[id]) {
        ctx.addIssue({ code: "custom", path: [id], message: field.error ?? "Please complete this field." });
      }
    }
    // Run even when other fields are invalid, so every error shows at once
    // (zod skips refinements after an invalid enum/literal by default).
  }, { when: () => true });

export type QuoteRequest = z.infer<typeof quoteSchema>;
export type QuoteFieldName = keyof z.input<typeof quoteSchema> | ExtraFieldId;
export type QuoteFieldErrors = Partial<Record<QuoteFieldName, string>>;

/** First error message per field, in the shape the form displays. */
export function toFieldErrors(error: z.ZodError): QuoteFieldErrors {
  const errors: QuoteFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as QuoteFieldName | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}
