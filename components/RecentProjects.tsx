"use client";

import { projects as initialProjects, moreProjects } from "@/data";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { FaEllipsis, FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { PinContainer } from "./ui/Pin";
import { Link } from "@/i18n/navigation";

const BATCH_SIZE = 2;

const RecentProjects = () => {
  const t = useTranslations("RecentProjects");
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(initialProjects.length);

  const allProjects = [...initialProjects, ...moreProjects];
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
  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const canShowMore = visibleCount < filteredProjects.length;

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCount(initialProjects.length);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + BATCH_SIZE, filteredProjects.length)
    );
  };

  return (
    <div id="projects" className="py-20">
      <h3 className="heading">
        {t("ASmallSelectionOf")}{" "}
        <span className="text-purple">{t("RecentProjects")}</span>
      </h3>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => handleFilterChange(filter.id)}
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

      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {displayedProjects.map((item) => (
          <div
            key={item.id}
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
          >
            <PinContainer title={item.title} href={`/projects/${item.id}`}>
              <Link href={`/projects/${item.id}`}>
                <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden aspect-video mb-10">
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

                <h3 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h3>

                <p
                  className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                  style={{ color: "#BEC1DD", margin: "1vh 0" }}
                >
                  {item.des ? t(item.des) : "..."}
                </p>

                <div className="flex items-center justify-between mt-7 mb-3">
                  <div className="flex items-center">
                    {item.iconLists.map((icon, index) => (
                      <div
                        key={index}
                        className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                        style={{ transform: `translateX(-${5 * index + 2}px)` }}
                      >
                        <Image
                          width={38}
                          height={38}
                          src={icon}
                          alt="icon"
                          className="p-2"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center">
                    <span className="flex lg:text-base md:text-xs text-sm text-purple">
                      {t("ViewDetails") || "View Details"}
                    </span>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </div>
                </div>
              </Link>
            </PinContainer>
          </div>
        ))}
      </div>

      <div
        className={`text-center mt-10 ease-in ${!canShowMore && "fade-in-0 hidden"}`}
      >
        <MagicButton
          title="Show More"
          position="right"
          icon={<FaEllipsis />}
          handleClick={handleShowMore}
        />
      </div>
    </div>
  );
};

export default RecentProjects;
