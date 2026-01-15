"use client";

import { projects, moreProjects, navItems } from "@/data";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "@/components/ui/Pin";
import Footer from "@/components/Footer";
import GoTopBtn from "@/components/GoTopBtn";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { useState } from "react";

const ProjectsPage = () => {
  const t = useTranslations("RecentProjects");
  const allProjects = [...projects, ...moreProjects];
  const [hasUsedNavbar, setHasUsedNavbar] = useState<boolean>(false);

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav setHasUsedNavbar={setHasUsedNavbar} navItems={navItems} />
        <div id="projects" className="py-20">
          <h3 className="heading">
            {t("ASmallSelectionOf")}{" "}
            <span className="text-purple">{t("RecentProjects")}</span>
          </h3>

          <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
            {allProjects.map((item) => (
              <div
                key={item.id}
                className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
              >
                <PinContainer
                  title={item.title}
                  href={`/projects/${item.id}`}
                >
                  <Link href={`/projects/${item.id}`}>
                    <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                      <div
                        className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                        style={{ backgroundColor: "#13162D" }}
                      >
                        <Image width={552} height={330} src="/bg.png" alt="bgimg" />
                      </div>
                      <Image
                        width={800}
                        height={512}
                        src={item.img}
                        alt="cover"
                        className="z-10 absolute bottom-0"
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
        </div>
        <Footer />
        <GoTopBtn />
      </div>
    </main>
  );
};

export default ProjectsPage;
