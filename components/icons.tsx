// Hand-rolled SVG icon set - one consistent stroke weight/style throughout.
// Never use emoji as a structural/UI icon.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2C6.484 2 2 6.477 2 11.99c0 1.99.583 3.842 1.588 5.4L2 22l4.75-1.55a10.05 10.05 0 0 0 5.254 1.484h.004c5.52 0 10-4.477 10-9.99C22 6.476 17.523 2 12.004 2Zm0 18.184h-.003a8.17 8.17 0 0 1-4.166-1.14l-.299-.177-3.104 1.014.99-3.02-.194-.31a8.156 8.156 0 0 1-1.248-4.36c0-4.508 3.678-8.178 8.198-8.178 4.518 0 8.196 3.67 8.196 8.178s-3.678 8.178-8.19 8.178l-.18-.185Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.75" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M17 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 5 18.5V20" />
      <circle cx="9.5" cy="8" r="3.25" />
      <path d="M20 20v-1.5a3.25 3.25 0 0 0-2.25-3.09M14.75 5.09a3.25 3.25 0 0 1 0 6.32" />
    </svg>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 18v2M21 18v2M3 13h18" />
      <path d="M7 11V8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3" />
    </svg>
  );
}

export function BathIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z" />
      <path d="M7 12V6a2.5 2.5 0 0 1 4.5-1.5M4 19v1.5M18 19v1.5" />
    </svg>
  );
}

export function FuelIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 20V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14M4 20h12" />
      <path d="M14 9h1.5L18 11.2V17a1.5 1.5 0 0 1-3 0v-2a1 1 0 0 0-1-1" />
    </svg>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="m12 2.5 2.955 6.163 6.795.813-5.008 4.66 1.323 6.714L12 17.77l-6.065 3.08 1.323-6.714-5.008-4.66 6.795-.813L12 2.5Z" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.75 1.75L14.75 10" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
      <path d="M3.5 9.5h17M8 3v3M16 3v3" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M4 21h16M14 21v-6h6v6M8 8h1M8 12h1M8 16h1M11.5 8h1M11.5 12h1M11.5 16h1" />
    </svg>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16V11l1.6-4.2A2 2 0 0 1 7.5 5.5h9a2 2 0 0 1 1.9 1.3L20 11v5" />
      <path d="M3 16h18v2a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1h-11v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2Z" />
      <circle cx="7.5" cy="16" r="1.5" />
      <circle cx="16.5" cy="16" r="1.5" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.75" />
      <circle cx="17.5" cy="18" r="1.75" />
    </svg>
  );
}

export function HatchbackIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 15.5V12l1.2-3A1.8 1.8 0 0 1 7.9 7.8h5.6c.7 0 1.3.4 1.6 1l1.4 2.7" />
      <path d="M4 15.5h16v1.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-.7H7v.7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1.5Z" />
      <circle cx="7.5" cy="15.5" r="1.4" />
      <circle cx="16" cy="15.5" r="1.4" />
    </svg>
  );
}

export function SuvIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16v-4.5a2 2 0 0 1 .5-1.3L6 8.2A2 2 0 0 1 7.5 7.5h9A2 2 0 0 1 18 8.2l1.5 2a2 2 0 0 1 .5 1.3V16" />
      <path d="M7.5 7.5v4.5h9V7.5" />
      <path d="M3 16h18v2a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1h-11v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2Z" />
      <circle cx="7.5" cy="16.5" r="1.75" />
      <circle cx="16.5" cy="16.5" r="1.75" />
    </svg>
  );
}

export function LuxuryCarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 15.5V12l1.3-1.8c.7-.9 1.7-1.5 2.9-1.6l2.8-.3 2-1.6a2 2 0 0 1 1.3-.5h2.7c.7 0 1.3.4 1.6 1l1.4 2.4.7 2" />
      <path d="M2 15.5h20v1.5a1 1 0 0 1-1 1h-1.3a1 1 0 0 1-1-1v-.7H5.3v.7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1.5Z" />
      <circle cx="6.5" cy="15.5" r="1.5" />
      <circle cx="17.5" cy="15.5" r="1.5" />
    </svg>
  );
}

export function MiniTruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 16V10a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6" />
      <path d="M10 13h3.5l3.5 2.5V16" />
      <path d="M2 16h19v-1.2a1 1 0 0 0-.4-.8L17 11.5" />
      <circle cx="6" cy="17" r="1.6" />
      <circle cx="16.5" cy="17" r="1.6" />
    </svg>
  );
}

export function VanIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 17V8a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1l2 3v6" />
      <path d="M2 17h19v-1a1 1 0 0 0-1-1H3" />
      <path d="M9 7v10M14.5 10h5" />
      <circle cx="6.5" cy="17.5" r="1.6" />
      <circle cx="16" cy="17.5" r="1.6" />
    </svg>
  );
}

export function BusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 17V7.5a1 1 0 0 1 1-1h17a1 1 0 0 1 1 1V17" />
      <path d="M2 17h20v-1H2Z" />
      <path d="M5.5 9.5h2.2v2.5H5.5zM10.3 9.5h2.2v2.5h-2.2zM15.1 9.5h2.2v2.5h-2.2z" />
      <circle cx="6.5" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function PackageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 8.5 12 4l8.5 4.5V16L12 20.5 3.5 16Z" />
      <path d="M3.5 8.5 12 13l8.5-4.5M12 13v7.5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ImageOffIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="m7 15 3-3.2a1.4 1.4 0 0 1 2 0l1.2 1.2M13.5 9.5h.01" />
      <path d="M3.5 20.5 20.5 3.5" />
    </svg>
  );
}
