"use client";

import { useState } from "react";
import { FaLocationArrow, FaEllipsis } from "react-icons/fa6";
import Image from "next/image";
import { projects as initialProjects, moreProjects } from "@/data";
import { PinContainer } from "./ui/Pin";
import MagicButton from "./MagicButton";

const BATCH_SIZE = 2;

const RecentProjects = () => {
  const [displayedProjects, setDisplayedProjects] = useState(initialProjects);
  const [remainingProjects, setRemainingProjects] = useState(moreProjects);

  const handleShowMore = () => {
    const nextBatch = remainingProjects.slice(0, BATCH_SIZE);
    const remaining = remainingProjects.slice(BATCH_SIZE);
    setDisplayedProjects((prev) => [...prev, ...nextBatch]);
    setRemainingProjects(remaining);
  };

  return (
    <div id="projects" className="py-20">
      <h3 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h3>

      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {displayedProjects.map((item) => (
          <div
            key={item.id}
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
          >
            <PinContainer title={item.title} href={item.link}>
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
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{ transform: `translateX(-${5 * index + 2}px)` }}
                    >
                      <img src={icon} alt="icon" className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex lg:text-xl md:text-xs text-sm text-purple"
                  >
                    Check Live Site
                  </a>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>

      <div
        className={`text-center mt-10 ease-in ${
          remainingProjects.length === 0 && "fade-in-0 hidden"
        }`}
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
