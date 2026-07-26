import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // Next.js dev/HMR (Turbopack) needs 'unsafe-eval' for React's dev-mode
  // debugging features; production React never calls eval().
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Add the production domain and/or future photo-storage provider
      // (S3 / Vercel Blob / Cloudinary / Supabase Storage) here when wired up.
      // Nothing needed today - listings render an on-brand placeholder
      // (components/ImagePlaceholder.tsx) until real photos exist.
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
