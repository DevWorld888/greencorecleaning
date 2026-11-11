"use server";

import { contactSchema, toContactFieldErrors, type ContactFieldErrors } from "@/lib/contact-validation";
import { isSpam } from "@/lib/spam";

export type ContactState =
  | { status: "idle" }
  | { status: "success"; firstName: string }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors };

export async function submitContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // Bots get a fake success so they don't learn what gave them away.
  if (isSpam(formData)) return { status: "success", firstName: "" };

  const result = contactSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      status: "error",
      message: "Some details need another look. Please check the highlighted fields.",
      fieldErrors: toContactFieldErrors(result.error),
    };
  }

  // PHASE 2: email the message to the business (Resend), together with the
  // quote form. Needs the business email, a verified domain and server
  // hosting. Until then the message is validated but not sent anywhere.
  //
  // await sendContactEmail(result.data);

  return { status: "success", firstName: result.data.name.split(" ")[0] };
}
