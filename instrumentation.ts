export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // This machine's DNS resolver returns NAT64-synthesized IPv6 addresses
    // (64:ff9b::/96) before the real public IPv4 ones for some hosts
    // (e.g. Supabase's Cloudflare front). next/image's upstream-fetch SSRF
    // guard rejects those as "private IP", blocking every remote image.
    // Preferring IPv4 resolution avoids the NAT64 path entirely.
    const dns = await import("node:dns");
    dns.setDefaultResultOrder("ipv4first");
  }
}
