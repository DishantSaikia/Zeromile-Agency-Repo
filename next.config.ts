import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // Next.js dev/HMR (Turbopack) needs 'unsafe-eval' for React's dev-mode
  // debugging features; production React never calls eval().
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // *.supabase.co - listing photos are served from Supabase Storage's
  // public bucket URL. placehold.co - temporary placeholder imagery until
  // real photos are supplied (see Hero.tsx, PageBanner.tsx).
  "img-src 'self' data: https://*.supabase.co https://placehold.co",
  "font-src 'self' data:",
  // *.supabase.co - the admin panel's browser client talks to Supabase
  // Auth/Storage/Postgres directly from the client.
  `connect-src 'self' https://*.supabase.co${isDev ? " ws:" : ""}`,
  // The contact page embeds a Google Maps location widget in an iframe.
  "frame-src https://www.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Temporary placeholder imagery until real hero/banner photos are
      // supplied - see Hero.tsx and PageBanner.tsx.
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/private-car-rental", destination: "/self-drive", permanent: true },
    ];
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
