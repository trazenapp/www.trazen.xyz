"use client";

import React, { useEffect, useRef, useState } from "react";

import ProjectCard from "../projectCard";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Options from "../ui/options";
import Link from "next/link";

const tempProjectsList = [
  { logo: "https://github.com/shadcn.png", name: "CryptoMachine" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject1" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject2" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject3" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject4" },
  { logo: "https://github.com/shadcn.png", name: "CryptoProject5" },
];

export function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  function handleToggleOptions(projectName: any) {
    setActiveProject((prev) => (prev === projectName ? null : projectName));
  }

  return (
    <ul className="md:grid flex flex-col grid-cols-4 w-full gap-5">
      {tempProjectsList.map((project) => (
        <ProjectCard
          className="w-full !h-32 md:!py-5.5 md:!px-4"
          key={project.name}
        >
          <div className="w-full flex justify-between">
            <Avatar className="w-10 h-10">
              <AvatarImage src={project.logo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <button
              onClick={() => handleToggleOptions(project.name)}
              className="text-[#ddd] text-center w-[25px] h-[25px] items-center hover:cursor-pointer hover:bg-[#323232] hover:rounded-full duration-200"
            >
              &#8942;
            </button>
            {activeProject === project.name && (
              <Options className="rounded-sm border-none md:!px-2.5 md:!py-1.5 h-20 w-35 bg-[#272727] absolute top-13 right-4 text-xs text-[#ddd] flex flex-col gap-2 justify-center font-light " />
            )}
          </div>

          <Link
            href="/Profile"
            className="w-full flex items-center space-x-2 justify-between hover:cursor-pointer"
          >
            <span className="text-[15px] text-[#f4f4f4]">{project.name}</span>
            <ChevronRightIcon className="h-4 w-4 text-[#ddd]-600" />
          </Link>
        </ProjectCard>
      ))}
    </ul>
  );
}

export function ProjectsPartial() {
  const [activeProject, setActiveProject] = useState(null);

  function handleToggleOptions(projectName: any) {
    setActiveProject((prev) => (prev === projectName ? null : projectName));
  }

  return (
    <ul className="flex md:flex-row flex-col w-full gap-4">
      {tempProjectsList
        .filter((_, i) => i < 4)
        .map((project) => (
          <ProjectCard className="" key={project.name}>
            <div className="w-full flex justify-between">
              <Avatar className="w-8 h-8">
                <AvatarImage src={project.logo} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <button
                onClick={() => handleToggleOptions(project.name)}
                className="text-[#ddd] text-center w-[22px] h-[22px] items-center hover:cursor-pointer hover:bg-[#323232] hover:rounded-full duration-200"
              >
                &#8942;
              </button>
              {activeProject === project.name && (
                <Options className="rounded-sm border-none md:!px-2 md:!py-1.5 h-14 w-26 bg-[#272727] absolute top-8.5 right-2 text-[10px] text-[#ddd] flex flex-col gap-0.5 justify-center font-extralight " />
              )}
            </div>
            <Link
              href="/Profile"
              className="w-full flex items-center space-x-2 justify-between hover:cursor-pointer "
            >
              <span className="xl:text-[13px] md:text-[11px] text-[16px] text-[#f4f4f4]">
                {project.name}
              </span>
              <ChevronRightIcon className="h-3 w-3 text-[#ddd]-600" />
            </Link>
          </ProjectCard>
        ))}
    </ul>
  );
}
