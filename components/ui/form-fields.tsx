import clsx from "clsx";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type FieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  className?: string;
};

function FieldWrapper({
  label,
  required,
  error,
  helpText,
  className,
  children,
}: FieldProps & { children: ReactNode }) {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {helpText && !error && (
        <p className="text-xs leading-relaxed text-text-muted">{helpText}</p>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

const inputClassName =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-text-muted/70 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 disabled:cursor-not-allowed disabled:bg-surface-muted";

export function FormInput({
  label,
  required,
  error,
  helpText,
  className,
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      className={className}
    >
      <input
        className={clsx(inputClassName, error && "border-red-400 focus:border-red-400 focus:ring-red-400/15")}
        {...props}
      />
    </FieldWrapper>
  );
}

export function FormSelect({
  label,
  required,
  error,
  helpText,
  className,
  children,
  ...props
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      className={className}
    >
      <select
        className={clsx(inputClassName, error && "border-red-400 focus:border-red-400 focus:ring-red-400/15")}
        {...props}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}

export function FormTextarea({
  label,
  required,
  error,
  helpText,
  className,
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      className={className}
    >
      <textarea
        className={clsx(
          inputClassName,
          "min-h-24 resize-y",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/15",
        )}
        {...props}
      />
    </FieldWrapper>
  );
}

export function FormFileInput({
  label,
  required,
  error,
  helpText,
  className,
  fileName,
  onChange,
  ...props
}: FieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value"> & {
    fileName?: string;
  }) {
  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      className={className}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-brand-blue bg-white px-4 py-2.5 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-green-light">
          Escolher arquivo
          <input
            type="file"
            className="sr-only"
            onChange={onChange}
            {...props}
          />
        </label>
        <span className="truncate text-sm text-text-muted">
          {fileName || "Nenhum arquivo selecionado"}
        </span>
      </div>
    </FieldWrapper>
  );
}

export function FormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-slate-200 pt-8 first:border-t-0 first:pt-0">
      <h2 className="mb-6 text-sm font-bold uppercase tracking-wide text-brand-blue">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function FormSelectPlaceholder({
  children = "Selecione...",
}: {
  children?: ReactNode;
}) {
  return (
    <option value="" disabled>
      {children}
    </option>
  );
}
