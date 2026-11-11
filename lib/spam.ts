// Invisible spam traps shared by the quote and contact forms:
// - "website" is a hidden field only bots fill in (honeypot);
// - "startedAt" is when the form was opened; humans take longer than this.
// See components/ui/SpamTraps.tsx for the matching form fields.

const MIN_FILL_TIME_MS = 3000;

export function isSpam(formData: FormData) {
  const honeypot = formData.get("website");
  const startedAt = Number(formData.get("startedAt"));
  return Boolean(honeypot) || (startedAt > 0 && Date.now() - startedAt < MIN_FILL_TIME_MS);
}
