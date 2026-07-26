import { WhatsAppIcon } from "./icons";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { defaultWhatsAppMessage } from "@/lib/config";

type Props = {
  message?: string;
  label?: string;
  variant?: "floating" | "inline" | "block";
  size?: "md" | "sm";
  className?: string;
};

// This is the ONLY component allowed to use --color-whatsapp - keeps the
// reserved-color constraint enforceable in one place instead of every CTA.
const base =
  // text-on-whatsapp (not text-white, not text-ink): white-on-#25D366
  // measures 1.98:1 contrast, failing the 4.5:1 floor. text-ink would fix
  // light mode (8.69:1) but flips light in dark mode, reintroducing the
  // same failure (1.81:1) - --color-on-whatsapp stays fixed-dark in both
  // themes since the green fill itself never changes between them.
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight bg-whatsapp text-on-whatsapp hover:bg-whatsapp-dark active:bg-whatsapp-dark transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] cursor-pointer active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp-dark focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function WhatsAppButton({
  message = defaultWhatsAppMessage,
  label = "Chat on WhatsApp",
  variant = "inline",
  size = "md",
  className = "",
}: Props) {
  const href = buildWhatsAppLink(message);

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Zeromile Agency on WhatsApp"
        className={`${base} fixed z-50 h-14 w-14 shadow-[0_12px_32px_-12px_rgba(11,27,51,0.45)] bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 md:bottom-6 md:right-6 ${className}`}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    );
  }

  const sizeClasses =
    variant === "block"
      ? "min-h-14 px-8 text-base w-full sm:w-auto"
      : size === "sm"
        ? "min-h-12 px-4 text-sm"
        : "min-h-12 px-6 text-[0.9375rem]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp-cta="true"
      className={`${base} ${sizeClasses} ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      {label}
    </a>
  );
}
