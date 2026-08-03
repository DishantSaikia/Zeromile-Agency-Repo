"use client";

import { useId, useState, type FormEvent } from "react";
import { buildWhatsAppLink, isValidPhone } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

export type EnquiryFormVariant = "private-car" | "commercial" | "stay" | "package" | "general";

type Props = {
  variant: EnquiryFormVariant;
  itemName?: string;
  vehicleOptions?: string[];
  heading?: string;
  className?: string;
};

type FieldErrors = Partial<Record<"name" | "phone", string>>;

const inputClasses =
  "w-full min-h-12 rounded-xl border border-hairline-strong bg-bg px-4 text-base text-ink placeholder:text-ink-faint transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] focus:outline-none focus:border-navy focus-visible:ring-2 focus-visible:ring-navy";

const labelClasses = "mb-1.5 block text-sm font-medium text-ink";

export function EnquiryForm({ variant, itemName, vehicleOptions = [], heading, className = "" }: Props) {
  const formId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState(itemName ?? vehicleOptions[0] ?? "");
  const [companyName, setCompanyName] = useState("");
  const [duration, setDuration] = useState("");
  const [purpose, setPurpose] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<"name" | "phone", boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!phone.trim()) next.phone = "Please enter your phone number.";
    else if (!isValidPhone(phone)) next.phone = "Enter a valid phone number.";
    return next;
  }

  // Inline, on-blur validation reads faster and succeeds more often than
  // submit-only validation (see .raw/sources/mobile-form-design-best-practices.md).
  function handleBlur(field: "name" | "phone") {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  function buildMessage(): string {
    const lines: string[] = [];
    if (variant === "private-car") {
      lines.push("New Self Drive enquiry");
      lines.push(`Name: ${name}`);
      lines.push(`Phone: ${phone}`);
      if (vehicleType) lines.push(`Vehicle: ${vehicleType}`);
    } else if (variant === "commercial") {
      lines.push("New Commercial Rental enquiry");
      lines.push(`Name: ${name}`);
      lines.push(`Phone: ${phone}`);
      if (companyName.trim()) lines.push(`Organization: ${companyName.trim()}`);
      if (vehicleType) lines.push(`Vehicle: ${vehicleType}`);
      if (duration.trim()) lines.push(`Duration: ${duration.trim()}`);
      if (purpose.trim()) lines.push(`Route/Purpose: ${purpose.trim()}`);
    } else if (variant === "stay") {
      lines.push(`New Stay enquiry${itemName ? ` - ${itemName}` : ""}`);
      lines.push(`Name: ${name}`);
      lines.push(`Phone: ${phone}`);
      if (checkIn) lines.push(`Check-in: ${checkIn}`);
      if (checkOut) lines.push(`Check-out: ${checkOut}`);
      lines.push(`Guests: ${guests}`);
    } else if (variant === "package") {
      lines.push("New Package enquiry");
      lines.push(`Name: ${name}`);
      lines.push(`Phone: ${phone}`);
      if (vehicleType) lines.push(`Package: ${vehicleType}`);
      if (checkIn) lines.push(`Preferred start date: ${checkIn}`);
      lines.push(`Guests: ${guests}`);
    } else {
      lines.push("New General enquiry");
      lines.push(`Name: ${name}`);
      lines.push(`Phone: ${phone}`);
    }
    if (message.trim()) lines.push(`Message: ${message.trim()}`);
    return lines.join("\n");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(false);
    const nextErrors = validate();
    setErrors(nextErrors);
    setTouched({ name: true, phone: true });
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`${formId}-${firstKey}`)?.focus();
      return;
    }
    const link = buildWhatsAppLink(buildMessage());
    window.open(link, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-[var(--radius-outer)] bg-surface p-6 shadow-[var(--shadow-card)] lg:p-8 ${className}`}
    >
      {heading && (
        <h3 className="font-heading text-xl tracking-tight text-ink">{heading}</h3>
      )}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClasses}>
            Full name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? `${formId}-name-error` : undefined}
            className={inputClasses}
          />
          {touched.name && errors.name && (
            <p id={`${formId}-name-error`} role="alert" className="mt-1.5 text-sm text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className={labelClasses}>
            Phone number
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => handleBlur("phone")}
            aria-invalid={Boolean(touched.phone && errors.phone)}
            aria-describedby={touched.phone && errors.phone ? `${formId}-phone-error` : undefined}
            className={inputClasses}
          />
          {touched.phone && errors.phone && (
            <p id={`${formId}-phone-error`} role="alert" className="mt-1.5 text-sm text-danger">
              {errors.phone}
            </p>
          )}
        </div>

        {variant === "private-car" && (
          <>
            <div>
              <label htmlFor={`${formId}-vehicle`} className={labelClasses}>
                Vehicle type
              </label>
              <select
                id={`${formId}-vehicle`}
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className={inputClasses}
              >
                {vehicleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {variant === "commercial" && (
          <>
            <div>
              <label htmlFor={`${formId}-company`} className={labelClasses}>
                Organization name (leave empty if personal trip)
              </label>
              <input
                id={`${formId}-company`}
                type="text"
                autoComplete="organization"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor={`${formId}-vehicle`} className={labelClasses}>
                Vehicle type
              </label>
              <select
                id={`${formId}-vehicle`}
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className={inputClasses}
              >
                {vehicleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${formId}-duration`} className={labelClasses}>
                Rental duration
              </label>
              <input
                id={`${formId}-duration`}
                type="text"
                placeholder="e.g. 3 days, 1 month"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor={`${formId}-purpose`} className={labelClasses}>
                Route / purpose
              </label>
              <input
                id={`${formId}-purpose`}
                type="text"
                placeholder="e.g. Guwahati–Shillong, daily deliveries"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className={inputClasses}
              />
            </div>
          </>
        )}

        {variant === "stay" && (
          <>
            <div>
              <label htmlFor={`${formId}-checkin`} className={labelClasses}>
                Check-in
              </label>
              <input
                id={`${formId}-checkin`}
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor={`${formId}-checkout`} className={labelClasses}>
                Check-out
              </label>
              <input
                id={`${formId}-checkout`}
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor={`${formId}-guests`} className={labelClasses}>
                Guests
              </label>
              <input
                id={`${formId}-guests`}
                type="number"
                inputMode="numeric"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={inputClasses}
              />
            </div>
          </>
        )}

        {variant === "package" && (
          <>
            <div>
              <label htmlFor={`${formId}-vehicle`} className={labelClasses}>
                Package
              </label>
              <select
                id={`${formId}-vehicle`}
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className={inputClasses}
              >
                {vehicleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${formId}-checkin`} className={labelClasses}>
                Preferred start date
              </label>
              <input
                id={`${formId}-checkin`}
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor={`${formId}-guests`} className={labelClasses}>
                Guests
              </label>
              <input
                id={`${formId}-guests`}
                type="number"
                inputMode="numeric"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={inputClasses}
              />
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-message`} className={labelClasses}>
            Message <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <textarea
            id={`${formId}-message`}
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClasses} min-h-24 resize-none py-3`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full min-h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-base font-medium text-on-whatsapp transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] hover:bg-whatsapp-dark active:bg-whatsapp-dark active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp-dark focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:w-auto sm:px-8"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Send enquiry on WhatsApp
      </button>

      {submitted && (
        <p className="mt-3 text-sm text-ink-muted" role="status">
          Opening WhatsApp with your enquiry - if it didn&apos;t open, check your pop-up blocker.
        </p>
      )}
    </form>
  );
}
