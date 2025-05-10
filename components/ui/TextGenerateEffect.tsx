"use client";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const wordsArray = words.split(" ");

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {wordsArray.map((word, idx) => (
            <span
              key={word + idx}
              className={`${
                idx > 3 ? "text-purple" : "dark:text-white text-black"
              }`}
            >
              {word}{" "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
