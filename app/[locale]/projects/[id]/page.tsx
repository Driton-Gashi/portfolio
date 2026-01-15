"use client";

import { projects, moreProjects, navItems } from "@/data";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FaLocationArrow, FaArrowLeft } from "react-icons/fa6";
import Footer from "@/components/Footer";
import GoTopBtn from "@/components/GoTopBtn";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}

const ProjectDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const t = useTranslations("RecentProjects");
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const allProjects = [...projects, ...moreProjects];
    const foundProject = allProjects.find((p) => p.id === parseInt(id || "0"));
    setProject(foundProject || null);
  }, [id]);

  const [hasUsedNavbar, setHasUsedNavbar] = useState<boolean>(false);

  if (!project) {
    return (
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <div className="max-w-7xl w-full">
          <FloatingNav setHasUsedNavbar={setHasUsedNavbar} navItems={navItems} />
          <div className="py-20 text-center">
            <h1 className="heading mb-4">Project Not Found</h1>
            <Link
              href="/projects"
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
            href="/projects"
            className="flex items-center gap-2 text-purple mb-8 hover:opacity-80 transition-opacity"
          >
            <FaArrowLeft />
            <span>{t("BackToProjects") || "Back to Projects"}</span>
          </Link>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="lg:w-1/2 w-full">
              <div className="relative flex items-center justify-center w-full overflow-hidden h-[40vh] lg:h-[60vh] mb-10 rounded-3xl">
                <div
                  className="relative w-full h-full overflow-hidden rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <Image width={552} height={330} src="/bg.png" alt="bgimg" />
                </div>
                <Image
                  width={800}
                  height={512}
                  src={project.img}
                  alt={project.title}
                  className="z-10 absolute bottom-0"
                />
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <h1 className="font-bold lg:text-4xl md:text-3xl text-2xl mb-6">
                {project.title}
              </h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-base mb-8"
                style={{ color: "#BEC1DD" }}
              >
                {project.des ? t(project.des) : t("ProjectDescription") || "Project description coming soon..."}
              </p>

              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-purple">
                  {t("TechnologiesUsed") || "Technologies Used"}
                </h3>
                <div className="flex items-center flex-wrap gap-4">
                  {project.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black w-16 h-16 flex justify-center items-center hover:scale-110 transition-transform"
                    >
                      <Image
                        width={48}
                        height={48}
                        src={icon}
                        alt={`tech-icon-${index}`}
                        className="p-3"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 lg:text-lg md:text-base text-sm text-purple hover:opacity-80 transition-opacity"
                >
                  {t("CheckLiveSite")}
                  <FaLocationArrow color="#CBACF9" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <GoTopBtn />
      </div>
    </main>
  );
};

export default ProjectDetailPage;
