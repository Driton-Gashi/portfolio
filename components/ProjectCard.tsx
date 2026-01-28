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
export default ProjectCard;
