"use server";

import { isSpam } from "@/lib/spam";
import { quoteSchema, toFieldErrors, type QuoteFieldErrors } from "@/lib/quote-validation";

export type QuoteState =
  | { status: "idle" }
  | { status: "success"; firstName: string }
  | { status: "error"; message: string; fieldErrors?: QuoteFieldErrors };

export async function submitQuote(_previous: QuoteState, formData: FormData): Promise<QuoteState> {
  // Bots get a fake success so they don't learn what gave them away.
  if (isSpam(formData)) return { status: "success", firstName: "" };

  const result = quoteSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      status: "error",
      message: "Some details need another look. Please check the highlighted fields.",
      fieldErrors: toFieldErrors(result.error),
    };
  }

  // PHASE 2: deliver the request to the business by email (Resend). Needs the
  // business email, a verified domain and server hosting. Until then the
  // request is validated but not sent anywhere.
  //
  // await sendQuoteEmail(result.data);

  return { status: "success", firstName: result.data.name.split(" ")[0] };
}
