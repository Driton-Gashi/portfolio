import type { MetadataRoute } from "next";
import { projects } from "@/data";

const siteUrl = "https://dritongashi.com";
const locales = ["en", "de", "sq"];

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages = locales.map((locale) => ({
    url: locale === "en" ? siteUrl : `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  const projectPages = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${siteUrl}${locale === "en" ? "" : `/${locale}`}/projects/${project.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...homePages, ...projectPages];
}
