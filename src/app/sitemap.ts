import type { MetadataRoute } from "next";
import { site, services } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/residential", priority: 0.9, freq: "monthly" },
    { path: "/commercial", priority: 0.9, freq: "monthly" },
    { path: "/request-service", priority: 0.9, freq: "monthly" },
    { path: "/service-area", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/reviews", priority: 0.6, freq: "weekly" },
    { path: "/faq", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
    { path: "/careers", priority: 0.4, freq: "monthly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
