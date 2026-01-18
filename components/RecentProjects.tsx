"use client";

import { projects as initialProjects } from "@/data";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "./ui/Pin";
import { Link } from "@/i18n/navigation";

type FilterOption = {
  id: string;
  label: string;
};

type ProjectItem = {
  id: number;
  title: string;
  des?: string;
  img: string;
  iconLists: string[];
  techs?: string[];
};

const SectionHeading = ({ title, highlight }: { title: string; highlight: string }) => (
  <h3 className="heading">
    {title} <span className="text-purple">{highlight}</span>
  </h3>
);

const FilterBar = ({
  options,
  activeFilter,
  onChange,
}: {
  options: FilterOption[];
  activeFilter: string;
  onChange: (filter: string) => void;
}) => (
  <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-6">
    {options.map((filter) => (
      <button
        key={filter.id}
        type="button"
        onClick={() => onChange(filter.id)}
        className={`rounded-full px-4 py-2 text-sm transition border ${
          activeFilter === filter.id
            ? "bg-[#10132E] text-white border-white/[.2]"
            : "bg-transparent text-white/70 border-white/[.12] hover:text-white hover:border-white/[.3]"
        }`}
      >
        {filter.label}
      </button>
    ))}
  </div>
);

const ProjectCard = ({
  item,
  index,
  viewDetailsLabel,
  getDescription,
}: {
  item: ProjectItem;
  index: number;
  viewDetailsLabel: string;
  getDescription: (key?: string) => string;
}) => (
  <div
    className="project-card lg:min-h-[32rem] h-[26rem] flex items-center justify-center sm:w-96 w-[85vw]"
    style={{ animationDelay: `${index * 40}ms` }}
  >
    <PinContainer title={item.title} href={`/projects/${item.id}`}>
      <Link href={`/projects/${item.id}`}>
        <div className="relative flex items-center justify-center sm:w-96 w-[85vw] overflow-hidden aspect-video mb-8">
          <div
            className="absolute inset-0 overflow-hidden lg:rounded-3xl"
            style={{ backgroundColor: "#13162D" }}
          >
            <Image
              fill
              src="/bg.png"
              alt="bgimg"
              className="object-cover"
              sizes="(min-width: 1024px) 384px, 80vw"
            />
          </div>
          <Image
            fill
            src={item.img}
            alt="cover"
            className="z-10 object-contain p-4"
            sizes="(min-width: 1024px) 384px, 80vw"
          />
        </div>

        <h3 className="font-semibold text-base md:text-lg lg:text-xl line-clamp-1">
          {item.title}
        </h3>

        <p className="text-sm md:text-base text-[#BEC1DD] line-clamp-2 mt-2 mb-5">
          {getDescription(item.des)}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {item.iconLists.map((icon, index) => (
              <div
                key={index}
                className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-9 h-9 flex justify-center items-center"
                style={{ transform: `translateX(-${5 * index + 2}px)` }}
              >
                <Image
                  width={36}
                  height={36}
                  src={icon}
                  alt="icon"
                  className="p-2"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm md:text-base text-purple">
              {viewDetailsLabel}
            </span>
            <FaLocationArrow color="#CBACF9" />
          </div>
        </div>
      </Link>
    </PinContainer>
  </div>
);

const RecentProjects = () => {
  const t = useTranslations("RecentProjects");
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateKey, setAnimateKey] = useState(0);

  const allProjects = [...initialProjects];
  const filterOptions = [
    { id: "All", label: "All" },
    { id: "WordPress", label: "WordPress" },
    { id: "Next.js", label: "Next.js" },
    { id: "React", label: "React" },
    { id: "Static", label: "Static Sites" },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((project) => {
          const techs = project.techs || [];
          if (activeFilter === "WordPress") return techs.includes("WordPress");
          if (activeFilter === "Next.js") return techs.includes("Next.js");
          if (activeFilter === "React") return techs.includes("React");
          if (activeFilter === "Static") return techs.includes("HTML");
          return true;
        });
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    setAnimateKey((prev) => prev + 1);
  }, [activeFilter]);

  return (
    <div id="projects" className="py-20">
      <SectionHeading
        title={t("ASmallSelectionOf")}
        highlight={t("RecentProjects")}
      />

      <FilterBar
        options={filterOptions}
        activeFilter={activeFilter}
        onChange={handleFilterChange}
      />

      <div
        key={animateKey}
        className="project-grid flex flex-wrap items-center justify-center p-4 gap-12 mt-8"
      >
        {filteredProjects.map((item, index) => (
          <ProjectCard
            key={item.id}
            item={item as ProjectItem}
            index={index}
            viewDetailsLabel={t("ViewDetails") || "View Details"}
            getDescription={(key) =>
              key ? t(key) : t("ProjectDescription")
            }
          />
        ))}
      </div>
      <style jsx>{`
        .project-grid {
          animation: gridPop 240ms ease-out both;
        }

        .project-card {
          animation: filterFade 360ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        @keyframes filterFade {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes gridPop {
          from {
            opacity: 0.6;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default RecentProjects;
