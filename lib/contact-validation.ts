// Contact form schema, shared by the browser (instant feedback) and the
// Server Action (the check that counts).

import { z } from "zod";

const phonePattern = /^\+?[\d\s()-]+$/;
const digitCount = (value: string) => value.replace(/\D/g, "").length;

export const contactSchema = z.object({
  name: z.string().trim().min(2, { error: "Please enter your full name." }).max(100),
  email: z.string().trim().pipe(z.email({ error: "Please enter a valid email so we can reply." })),
  // Optional: only validated when the visitor fills it in.
  phone: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined)
    .refine((value) => !value || (phonePattern.test(value) && digitCount(value) >= 8 && digitCount(value) <= 15), {
      error: "Please enter a valid phone number, e.g. 0400 123 456.",
    }),
  message: z
    .string()
    .trim()
    .min(10, { error: "Please tell us a little more (at least 10 characters)." })
    .max(2000, { error: "Please keep your message under 2,000 characters." }),
  consent: z.literal("on", { error: "Please agree so we can use your details to reply." }),
});

export type ContactFieldName = keyof z.input<typeof contactSchema>;
export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export function toContactFieldErrors(error: z.ZodError): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactFieldName | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}
