// Single source of truth for agency contact details and default WhatsApp copy.
// Edit here - never hardcode the number or greeting text in a component.
export const agencyConfig = {
  name: "Zeromile Agency",
  tagline: "Drive Freely. Live Limitless.",
  // Full international format, digits only - no "+", no spaces (e.g. "919812345678").
  whatsappNumber: "918811034611",
  // Human-readable form of the same number, for display (tel: links, footer, contact page).
  phoneDisplay: "+91 88110 34611",
  email: "Zeromileagency@gmail.com",
  // Public Google Maps place link - used for the "Find us on Google Maps" footer link.
  googleMapsUrl:
    "https://www.google.com/maps/place/Zeromile+Agency/@26.1341991,91.7857421,17z/data=!3m1!4b1!4m6!3m5!1s0x375a5933eca2df27:0xe6fc4d6c6285223f!8m2!3d26.1341991!4d91.7857421!16s%2Fg%2F11zd7_wcg5?entry=ttu",
  // No-API-key embed URL for the contact page map widget, built from the same coordinates.
  googleMapsEmbedUrl: "https://www.google.com/maps?q=26.1341991,91.7857421&z=16&output=embed",
} as const;

export const defaultWhatsAppMessage =
  "Hi Zeromile Agency! I'd like to enquire about your services.";

export const floatingButtonMessage =
  "Hi Zeromile Agency! I have a question about a booking.";
