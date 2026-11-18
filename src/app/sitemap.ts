import type { MetadataRoute } from "next";
import { pages } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...pages.map((p) => p.slug + "/")].map((path) => ({
    url: "https://grokbotjp.com/" + path,
    lastModified: "2026-11-17",
    changeFrequency: path.startsWith("news/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
