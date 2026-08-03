type Props = {
  name: string;
  label: string;
  defaultValue?: number;
  required?: boolean;
  min?: number;
};

export function NumberField({ name, label, defaultValue, required, min = 0 }: Props) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="number"
        inputMode="numeric"
        min={min}
        defaultValue={defaultValue}
        required={required}
        className="w-full min-h-12 rounded-xl border border-hairline-strong bg-bg px-4 text-base text-ink transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] focus:outline-none focus:border-navy focus-visible:ring-2 focus-visible:ring-navy"
      />
    </div>
  );
}
