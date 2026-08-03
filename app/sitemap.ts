import type { MetadataRoute } from "next";
import { getStays } from "@/lib/data/stays";

const BASE_URL = "https://zeromileagency.example";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/self-drive",
    "/commercial-rental",
    "/stays",
    "/packages",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const stays = await getStays();
  const stayRoutes = stays.map((stay) => ({
    url: `${BASE_URL}/stays/${stay.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...stayRoutes];
}
