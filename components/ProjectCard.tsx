import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "./ui/Pin";
import { Link } from "@/i18n/navigation";
import type { ProjectItem } from "@/components/RecentProjects";

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
      <div className="sm:w-96 w-[85vw]">
        <Link href={`/projects/${item.id}`} className="block">
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
              className="z-10 object-cover rounded-tr-lg rounded-tl-lg"
              sizes="(min-width: 1024px) 384px, 80vw"
            />
          </div>

          <h3 className="font-semibold text-base md:text-lg lg:text-xl line-clamp-1">
            {item.title}
          </h3>

          <p className="text-sm md:text-base text-[#BEC1DD] line-clamp-2 mt-2 mb-5">
            {getDescription(item.des)}
          </p>
        </Link>

        {(item.github || item.deployedOn) && (
          <div className="flex flex-wrap items-center gap-4 mb-5 text-xs text-white/70">
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Image width={16} height={16} src="/git.svg" alt="GitHub" />
                <span>GitHub</span>
              </a>
            )}
            {item.deployedOn && (
              <div className="flex items-center gap-2">
                <Image
                  width={16}
                  height={16}
                  src={`/${item.deployedOn}.svg`}
                  alt={item.deployedOn}
                />
                <span className="capitalize">{item.deployedOn}</span>
              </div>
            )}
          </div>
        )}

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

          <Link
            href={`/projects/${item.id}`}
            className="flex items-center gap-3 text-sm md:text-base text-purple hover:opacity-80 transition-opacity"
          >
            <span>{viewDetailsLabel}</span>
            <FaLocationArrow color="#CBACF9" />
          </Link>
        </div>
      </div>
    </PinContainer>
  </div>
);
export default ProjectCard;
