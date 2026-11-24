import type { MetadataRoute } from "next";
import { projects } from "@/content";

const base = "https://krishna-gahlod.golash.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: base }, ...projects.map((p) => ({ url: base + "/work/" + p.slug }))];
}
