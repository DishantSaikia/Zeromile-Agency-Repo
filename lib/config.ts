// Single source of truth for agency contact details and default WhatsApp copy.
// Edit here - never hardcode the number or greeting text in a component.
export const agencyConfig = {
  name: "Zeromile Agency",
  tagline: "Drive Freely. Live Limitless.",
  // TODO(launch): replace with the real WhatsApp Business number before going live.
  // Full international format, digits only - no "+", no spaces (e.g. "919812345678").
  whatsappNumber: "910000000000",
  email: "hello@zeromileagency.example",
} as const;

export const defaultWhatsAppMessage =
  "Hi Zeromile Agency! I'd like to enquire about your services.";

export const floatingButtonMessage =
  "Hi Zeromile Agency! I have a question about a booking.";
