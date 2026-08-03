type Props = {
  name: string;
  label: string;
  options: readonly string[];
  defaultValue?: string;
};

export function SelectField({ name, label, options, defaultValue }: Props) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? options[0]}
        className="w-full min-h-12 rounded-xl border border-hairline-strong bg-bg px-4 text-base text-ink transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] focus:outline-none focus:border-navy focus-visible:ring-2 focus-visible:ring-navy"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
