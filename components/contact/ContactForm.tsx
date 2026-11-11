"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { FieldError, FieldIdPrefix, TextField } from "@/components/ui/fields";
import { SpamTraps } from "@/components/ui/SpamTraps";
import { contactSchema, toContactFieldErrors, type ContactFieldErrors, type ContactFieldName } from "@/lib/contact-validation";

const initialState: ContactState = { status: "idle" };

// Same behaviour as the quote form: errors show once a field is left or after
// a submit attempt, the first invalid field gets focus, and answers are kept
// if the server rejects something.
export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  const serverErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  function errorFor(name: ContactFieldName) {
    if (attempted || touched.has(name)) return errors[name] ?? serverErrors[name];
    return undefined;
  }

  function validate() {
    if (!formRef.current) return {};
    const result = contactSchema.safeParse(Object.fromEntries(new FormData(formRef.current)));
    return result.success ? {} : toContactFieldErrors(result.error);
  }

  function handleBlur(event: React.FocusEvent<HTMLFormElement>) {
    const name = "name" in event.target ? String(event.target.name) : "";
    if (!name) return;
    setTouched((previous) => new Set(previous).add(name));
    setErrors(validate());
  }

  function handleChange() {
    if (attempted || touched.size > 0) setErrors(validate());
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate();
    setAttempted(true);
    setErrors(nextErrors);

    const firstInvalid = Array.from(form.elements).find(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && (element as HTMLInputElement).name in nextErrors,
    );
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    startTransition(() => formAction(new FormData(form)));
  }

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="py-6 text-center outline-none sm:py-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-mint text-action">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 10.5 3.2 3L15 7" />
          </svg>
        </span>
        <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
          Thanks{state.firstName ? `, ${state.firstName}` : ""}. Your message is on its way.
        </h2>
        <p className="mx-auto mt-3 max-w-[42ch] leading-[1.6]">We&apos;ll read it and get back to you soon.</p>
      </div>
    );
  }

  return (
    <FieldIdPrefix value="contact">
      <form ref={formRef} noValidate onSubmit={handleSubmit} onBlur={handleBlur} onChange={handleChange}>
        <SpamTraps idPrefix="contact" />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextField name="name" label="Full name" autoComplete="name" error={errorFor("name")} />
          </div>
          <TextField name="email" label="Email" type="email" autoComplete="email" error={errorFor("email")} />
          <TextField name="phone" label="Phone" type="tel" autoComplete="tel" optional error={errorFor("phone")} />
          <div className="sm:col-span-2">
            <TextField name="message" label="Message" multiline error={errorFor("message")} />
          </div>
        </div>

        <div className="mt-7">
          <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-[1.55]">
            <input
              type="checkbox"
              name="consent"
              aria-invalid={Boolean(errorFor("consent"))}
              aria-describedby={errorFor("consent") ? "contact-consent-error" : undefined}
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-action"
            />
            <span>
              I agree to GreenCoreCleaning using my details to reply to my message, as described in the{" "}
              <Link href="/privacy-policy" className="font-semibold text-action underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          <FieldError id="contact-consent-error" message={errorFor("consent")} />
        </div>

        {state.status === "error" && (
          <p role="alert" className="mt-6 rounded-control bg-red-50 px-4 py-3 text-[0.9375rem] font-medium text-red-800">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="relative mt-8 inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-control bg-action px-8 text-[1.0625rem] font-semibold text-white shadow-soft before:absolute before:inset-0 before:bg-primary before:opacity-0 before:transition-opacity hover:before:opacity-20 disabled:cursor-wait disabled:opacity-80"
        >
          {isPending ? (
            <>
              <span aria-hidden="true" className="relative size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              <span className="relative">Sending…</span>
            </>
          ) : (
            <>
              <span className="relative">Send message</span>
              <ArrowIcon className="relative size-5" />
            </>
          )}
        </button>
      </form>
    </FieldIdPrefix>
  );
}
