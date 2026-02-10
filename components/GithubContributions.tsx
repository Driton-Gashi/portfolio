"use client";

import { useEffect, useState } from "react";

type Day = {
  date: string;
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
  color: string;
};

type Week = Day[];

type Contributions = Week[];

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

export function GithubContributions() {
  const [data, setData] = useState<Contributions | null>(null);

  useEffect(() => {
    if (!GITHUB_USERNAME) return;

    async function fetchContributions() {
      try {
        const res = await fetch(
          `https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`,
        );
        if (!res.ok) return;
        const json = await res.json();
        setData(json.contributions);
      } catch {
        // fail silently on errors in UI
        // console.error("Error fetching GitHub contributions:", error);
      }
    }

    fetchContributions();
  }, []);

  if (!GITHUB_USERNAME) {
    return null;
  }

  if (!data) {
    return (
      <div className="mt-10 text-xs text-neutral-400">
        Loading GitHub activity...
      </div>
    );
  }

  return (
    <div className="mt-10 w-full max-w-[700px]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-neutral-400">
          GitHub contributions for{" "}
          <span className="font-semibold text-neutral-100">
            {GITHUB_USERNAME}
          </span>
        </p>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-neutral-400 hover:text-neutral-100 underline underline-offset-2"
        >
          View profile
        </a>
      </div>
      <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-black/40 p-3">
        <div className="flex gap-[3px] text-[8px] text-neutral-500 mb-1 pl-4">
          <span>Mon</span>
          <span className="ml-[14px]">Wed</span>
          <span className="ml-[14px]">Fri</span>
        </div>
        <div className="flex gap-[3px]">
          {data.map((week, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  className="h-3 w-3 rounded-sm border border-neutral-800"
                  style={{ backgroundColor: day.color }}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
