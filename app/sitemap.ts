import type { MetadataRoute } from "next";
import { stays } from "@/lib/data/stays";

const BASE_URL = "https://zeromileagency.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/private-car-rental",
    "/commercial-rental",
    "/stays",
    "/packages",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const stayRoutes = stays.map((stay) => ({
    url: `${BASE_URL}/stays/${stay.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...stayRoutes];
}
