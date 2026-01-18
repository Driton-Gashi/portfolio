"use client";

import { projects, moreProjects, navItems } from "@/data";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FaLocationArrow, FaArrowLeft } from "react-icons/fa6";
import Footer from "@/components/Footer";
import FloatingLocaleSwitcher from "@/components/FloatingLocaleSwitcher";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { useParams } from "next/navigation";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
  techs?: string[];
}

const ProjectDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const t = useTranslations("RecentProjects");
  const allProjects = [...projects, ...moreProjects];
  const project = allProjects.find((p) => p.id === parseInt(id || "0")) || null;

  const [hasUsedNavbar, setHasUsedNavbar] = useState<boolean>(false);
  const techs = project?.techs || [];

  const getProjectType = (items: string[]) => {
    if (items.includes("WordPress")) return t("ProjectTypeWordPress");
    if (items.includes("Next.js")) return t("ProjectTypeNext");
    if (items.includes("React")) return t("ProjectTypeReact");
    if (items.includes("HTML")) return t("ProjectTypeStatic");
    return t("ProjectTypeWeb");
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  if (!project) {
    return (
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <div className="max-w-7xl w-full">
          <FloatingNav
            setHasUsedNavbar={setHasUsedNavbar}
            navItems={navItems}
          />
          <div className="py-20 text-center">
            <h1 className="heading mb-4">
              {t("ProjectNotFound") || "Project Not Found"}
            </h1>
            <Link
              href="/#projects"
              className="flex items-center justify-center gap-2 text-purple hover:opacity-80 transition-opacity"
            >
              <FaArrowLeft />
              <span>{t("BackToProjects") || "Back to Projects"}</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav setHasUsedNavbar={setHasUsedNavbar} navItems={navItems} />
        <div className="py-20">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-purple mb-10 hover:opacity-80 transition-opacity"
          >
            <FaArrowLeft />
            <span>{t("BackToProjects") || "Back to Projects"}</span>
          </Link>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
            <div>
              <h1 className="font-bold lg:text-4xl md:text-3xl text-2xl mb-5">
                {project.title}
              </h1>
              <p
                className="lg:text-lg font-light text-base mb-8"
                style={{ color: "#BEC1DD" }}
              >
                {project.des
                  ? t(project.des)
                  : t("ProjectDescription") ||
                    "Project description coming soon..."}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/[.2] bg-[#10132E] px-5 py-2 text-sm text-white hover:opacity-80 transition-opacity"
                >
                  {t("CheckLiveSite")}
                  <FaLocationArrow color="#CBACF9" />
                </a>
                <div className="rounded-full border border-white/[.12] px-4 py-2 text-sm text-white/70">
                  {getProjectType(techs)}
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center w-full overflow-hidden aspect-video rounded-3xl">
              <div
                className="absolute inset-0 overflow-hidden rounded-3xl"
                style={{ backgroundColor: "#13162D" }}
              >
                <Image
                  fill
                  src="/bg.png"
                  alt="bgimg"
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <Image
                fill
                src={project.img}
                alt={project.title}
                className="z-10 object-contain p-6"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-white/[.08] bg-black/40 p-6">
              <h3 className="font-semibold text-lg mb-6 text-purple">
                {t("ProjectDetails") || "Project Details"}
              </h3>
              <div className="space-y-5 text-sm">
                <div className="flex items-center justify-between gap-6">
                  <span className="text-white/60">{t("Type") || "Type"}</span>
                  <span className="text-white">{getProjectType(techs)}</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span className="text-white/60">
                    {t("PrimaryStack") || "Primary Stack"}
                  </span>
                  <span className="text-white">
                    {techs.slice(0, 4).join(", ")}
                    {techs.length > 4 ? " +" + (techs.length - 4) : ""}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span className="text-white/60">
                    {t("Status") || "Status"}
                  </span>
                  <span className="text-white">{t("Live") || "Live"}</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span className="text-white/60">
                    {t("Website") || "Website"}
                  </span>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:opacity-80 transition-opacity"
                  >
                    {getDomain(project.link)}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/[.08] bg-black/40 p-6">
              <h3 className="font-semibold text-lg mb-6 text-purple">
                {t("TechnologiesUsed") || "Technologies Used"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.iconLists.map((icon, index) => (
                  <div
                    key={index}
                    className="border border-white/[.12] rounded-2xl bg-black/30 p-4 flex items-center gap-3"
                  >
                    <div className="border border-white/[.2] rounded-full bg-black w-10 h-10 flex justify-center items-center">
                      <Image
                        width={28}
                        height={28}
                        src={icon}
                        alt={`tech-icon-${index}`}
                        className="p-1"
                      />
                    </div>
                    <span className="text-xs text-white/70">
                      {techs[index] || "Tech"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <FloatingLocaleSwitcher />
      </div>
    </main>
  );
};

export default ProjectDetailPage;
