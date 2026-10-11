import type { Metadata } from "next";
import { projects } from "@/data";

const siteUrl = "https://dritongashi.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const project = projects.find((item) => item.id === Number(id));

  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: true },
    };
  }

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonical = `${prefix}/projects/${project.id}`;
  const description = `View ${project.title}, a web development project by Driton Gashi, including its technologies, live website, and project details.`;

  return {
    title: `${project.title} Project`,
    description,
    alternates: {
      canonical,
      languages: {
        "x-default": `/projects/${project.id}`,
        en: `/projects/${project.id}`,
        de: `/de/projects/${project.id}`,
        sq: `/sq/projects/${project.id}`,
      },
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}${canonical}`,
      title: `${project.title} | Driton Gashi`,
      description,
      images: [{ url: project.img, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Driton Gashi`,
      description,
      images: [project.img],
    },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
