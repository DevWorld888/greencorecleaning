"use client";

import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { submitQuote, type QuoteState } from "@/app/actions/quote";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { SpamTraps } from "@/components/ui/SpamTraps";
import {
  FieldError,
  FieldIdPrefix,
  SelectField,
  TextField,
} from "@/components/ui/fields";
import {
  extraFields,
  OTHER_SUBURB,
  propertyTypes,
  serviceExtraFields,
} from "@/config/quote-form";
import { serviceAreas } from "@/config/service-areas";
import {
  serviceCategories,
  services,
  servicesByCategory,
} from "@/config/services";
import { QUOTE_PREFILL_EVENT } from "@/lib/quote-prefill";
import {
  quoteSchema,
  toFieldErrors,
  type QuoteFieldErrors,
  type QuoteFieldName,
} from "@/lib/quote-validation";

const initialState: QuoteState = { status: "idle" };

// The URL query (?service=…&suburb=…) is an external source: it changes when
// the hero form or a service panel sends the visitor here.
function subscribeToPrefill(onChange: () => void) {
  window.addEventListener(QUOTE_PREFILL_EVENT, onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener(QUOTE_PREFILL_EVENT, onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function parsePrefill(search: string) {
  const params = new URLSearchParams(search);
  const service = params.get("service") ?? "";
  const suburb = params.get("suburb") ?? "";
  const knownSuburb = serviceAreas.some((area) => area.slug === suburb);
  return {
    service: services.some((item) => item.slug === service) ? service : "",
    suburb: knownSuburb || suburb === OTHER_SUBURB ? suburb : "",
  };
}

export function QuoteRequestForm() {
  const [state, formAction, isPending] = useActionState(
    submitQuote,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Service and suburb are controlled: they decide which fields appear.
  const search = useSyncExternalStore(
    subscribeToPrefill,
    () => window.location.search,
    () => "",
  );
  const [appliedSearch, setAppliedSearch] = useState("");
  const [service, setService] = useState("");
  const [suburb, setSuburb] = useState("");
  if (search !== appliedSearch) {
    // A new prefill arrived: adopt it (React's "adjust state on change" pattern).
    const prefill = parsePrefill(search);
    setAppliedSearch(search);
    if (prefill.service) setService(prefill.service);
    if (prefill.suburb) setSuburb(prefill.suburb);
  }

  // Errors show once a field has been left, or after a submit attempt.
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  const serverErrors =
    state.status === "error" ? (state.fieldErrors ?? {}) : {};
  function errorFor(name: QuoteFieldName) {
    if (attempted || touched.has(name))
      return errors[name] ?? serverErrors[name];
    return undefined;
  }

  function validate() {
    if (!formRef.current) return {};
    const result = quoteSchema.safeParse(
      Object.fromEntries(new FormData(formRef.current)),
    );
    return result.success ? {} : toFieldErrors(result.error);
  }

  function handleBlur(event: React.FocusEvent<HTMLFormElement>) {
    const name = "name" in event.target ? String(event.target.name) : "";
    if (!name) return;
    setTouched((previous) => new Set(previous).add(name));
    setErrors(validate());
  }

  function handleChange() {
    // Re-check as the visitor fixes a field, so errors clear immediately.
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
        element instanceof HTMLElement &&
        (element as HTMLInputElement).name in nextErrors,
    );
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    // Called manually (not via the action prop) so React doesn't reset the
    // fields: if the server rejects something, the visitor keeps their answers.
    startTransition(() => formAction(new FormData(form)));
  }

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="py-6 text-center outline-none sm:py-10"
      >
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-mint text-action">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 10.5 3.2 3L15 7" />
          </svg>
        </span>
        <h3 className="mt-6 text-2xl font-bold sm:text-3xl">
          Thanks{state.firstName ? `, ${state.firstName}` : ""}. We&apos;ve got
          your request.
        </h3>
        <p className="mx-auto mt-3 max-w-[42ch] leading-[1.6]">
          We&apos;ll review the details and get back to you soon with your free,
          tailored quote.
        </p>
      </div>
    );
  }

  const extras = serviceExtraFields[service] ?? [];

  return (
    <FieldIdPrefix value="quote">
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        onBlur={handleBlur}
        onChange={handleChange}
      >
        <SpamTraps idPrefix="quote" />

        <fieldset>
          <legend className="font-display text-xl font-bold text-primary">
            About your clean
          </legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <SelectField
              name="service"
              label="Service"
              value={service}
              onChange={setService}
              placeholder="Choose a service"
              error={errorFor("service")}
            >
              {serviceCategories.map((category) => (
                <optgroup key={category} label={category}>
                  {servicesByCategory(category).map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </SelectField>

            <SelectField
              name="suburb"
              label="Suburb"
              value={suburb}
              onChange={setSuburb}
              placeholder="Choose your suburb"
              error={errorFor("suburb")}
            >
              {serviceAreas.map((area) => (
                <option key={area.slug} value={area.slug}>
                  {area.name}
                </option>
              ))}
              <option value={OTHER_SUBURB}>Other suburb</option>
            </SelectField>

            {suburb === OTHER_SUBURB && (
              <div className="sm:col-span-2">
                <TextField
                  name="otherSuburb"
                  label="Your suburb"
                  autoComplete="address-level2"
                  hint="We'll confirm whether we can service your area."
                  error={errorFor("otherSuburb")}
                />
              </div>
            )}

            <SelectField
              name="propertyType"
              label="Property type"
              placeholder="Choose a type"
              error={errorFor("propertyType")}
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </SelectField>

            <TextField
              name="preferredDate"
              label="Preferred date"
              type="date"
              optional
              error={errorFor("preferredDate")}
            />

            {extras.map((id) => {
              const field = extraFields[id];
              return field.kind === "select" ? (
                <SelectField
                  key={id}
                  name={id}
                  label={field.label}
                  placeholder="Choose"
                  optional={!field.required}
                  error={errorFor(id)}
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </SelectField>
              ) : (
                <TextField
                  key={id}
                  name={id}
                  label={field.label}
                  type="date"
                  optional={!field.required}
                  error={errorFor(id)}
                />
              );
            })}

            <div className="sm:col-span-2">
              <TextField
                name="details"
                label="Additional details"
                multiline
                optional
                hint="Anything we should know: access, pets, areas that need extra attention or questions for us."
                error={errorFor("details")}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="mt-10 border-t border-primary/10 pt-8">
          <legend className="float-left w-full font-display text-xl font-bold text-primary">
            Your details
          </legend>
          <div className="clear-both grid gap-5 pt-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <TextField
                name="name"
                label="Full name"
                autoComplete="name"
                error={errorFor("name")}
              />
            </div>
            <TextField
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              error={errorFor("email")}
            />
            <TextField
              name="phone"
              label="Phone"
              type="tel"
              autoComplete="tel"
              error={errorFor("phone")}
            />
          </div>
        </fieldset>

        <div className="mt-8">
          <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-[1.55]">
            <input
              type="checkbox"
              name="consent"
              aria-invalid={Boolean(errorFor("consent"))}
              aria-describedby={
                errorFor("consent") ? "quote-consent-error" : undefined
              }
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-action"
            />
            <span>
              I agree to GreenCoreCleaning using my details to prepare my quote,
              as described in the{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-action underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          <FieldError id="quote-consent-error" message={errorFor("consent")} />
        </div>

        {state.status === "error" && (
          <p
            role="alert"
            className="mt-6 rounded-control bg-red-50 px-4 py-3 text-[0.9375rem] font-medium text-red-800"
          >
            {state.message}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <button
            type="submit"
            disabled={isPending}
            className="relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-control bg-action px-8 text-[1.0625rem] font-semibold text-white shadow-soft before:absolute before:inset-0 before:bg-primary before:opacity-0 before:transition-opacity hover:before:opacity-20 disabled:cursor-wait disabled:opacity-80"
          >
            {isPending ? (
              <>
                <span
                  aria-hidden="true"
                  className="relative size-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                />
                <span className="relative">Sending…</span>
              </>
            ) : (
              <>
                <span className="relative">Send my quote request</span>
                <ArrowIcon className="relative size-5" />
              </>
            )}
          </button>
          <p className="text-sm text-charcoal">Free and no obligation.</p>
        </div>
      </form>
    </FieldIdPrefix>
  );
}
