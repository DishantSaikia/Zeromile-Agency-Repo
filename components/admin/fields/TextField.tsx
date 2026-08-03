type Props = {
  name: string;
  label: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

export function TextField({ name, label, defaultValue, type = "text", required, placeholder }: Props) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full min-h-12 rounded-xl border border-hairline-strong bg-bg px-4 text-base text-ink placeholder:text-ink-faint transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] focus:outline-none focus:border-navy focus-visible:ring-2 focus-visible:ring-navy"
      />
    </div>
  );
}
