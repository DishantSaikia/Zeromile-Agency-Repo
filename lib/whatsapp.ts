import { agencyConfig } from "./config";

/**
 * Builds a wa.me deep link. Every piece of user-entered text must be passed
 * through here (via encodeURIComponent) - never interpolated raw into a URL.
 */
export function buildWhatsAppLink(
  message: string,
  number: string = agencyConfig.whatsappNumber
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

const PHONE_PATTERN = /^[0-9+][0-9\s-]{6,18}[0-9]$/;

export function isValidPhone(value: string): boolean {
  return PHONE_PATTERN.test(value.trim());
}
