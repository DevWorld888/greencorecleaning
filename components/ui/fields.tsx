"use client";

// Accessible form fields shared by the quote and contact forms: label,
// optional hint, the control and its error message, wired with aria-*.
// Each form sets its id prefix once with <FieldIdPrefix value="quote">.

import { createContext, useContext } from "react";
import { fieldClass, SelectChevron, selectClass } from "@/components/ui/form";

const IdPrefixContext = createContext("field");

export function FieldIdPrefix({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <IdPrefixContext.Provider value={value}>
      {children}
    </IdPrefixContext.Provider>
  );
}

function useFieldId(name: string) {
  return `${useContext(IdPrefixContext)}-${name}`;
}

type BaseFieldProps = {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
};

function FieldLabel({
  id,
  label,
  optional,
}: {
  id: string;
  label: string;
  optional?: boolean;
}) {
  return (
    <label htmlFor={id} className="text-sm font-semibold text-primary">
      {label}
      {optional && (
        <span className="font-normal text-charcoal"> (optional)</span>
      )}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-red-700"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="mt-0.5 size-4 shrink-0"
        fill="currentColor"
      >
        <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-.75 4.5a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0v-4ZM10 14.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
      </svg>
      {message}
    </p>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  const ids = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function TextField({
  name,
  label,
  error,
  hint,
  optional,
  type = "text",
  autoComplete,
  multiline,
}: BaseFieldProps & {
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const id = useFieldId(name);
  const shared = {
    id,
    name,
    required: !optional,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy(id, error, hint),
  };

  return (
    <div className="grid gap-1.5">
      <FieldLabel id={id} label={label} optional={optional} />
      {hint && (
        <p id={`${id}-hint`} className="-mt-0.5 text-sm text-charcoal">
          {hint}
        </p>
      )}
      {multiline ? (
        <textarea
          {...shared}
          rows={4}
          className={`${fieldClass} h-auto min-h-28 resize-y py-3.5 leading-[1.5]`}
        />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          className={fieldClass}
        />
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  error,
  hint,
  optional,
  placeholder,
  value,
  onChange,
  children,
}: BaseFieldProps & {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}) {
  const id = useFieldId(name);
  // Controlled when the parent needs the value, uncontrolled otherwise.
  const valueProps = onChange
    ? {
        value,
        onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(event.target.value),
      }
    : { defaultValue: "" };

  return (
    <div className="grid gap-1.5">
      <FieldLabel id={id} label={label} optional={optional} />
      <div className="relative">
        <select
          id={id}
          name={name}
          required={!optional}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, error, hint)}
          className={selectClass}
          {...valueProps}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {children}
        </select>
        <SelectChevron />
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
