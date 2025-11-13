"use client";

import React, { useEffect, useState } from "react";

import ProjectCard from "../projectCard";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import Options from "../ui/options";
import Link from "next/link";
import { Skeleton } from "@/src/components/ui/skeleton";
import { RootState } from "@/src/redux/store";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { getProject, setLoading } from "@/src/redux/slices/projectSlice";

export function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const dispatch = useAppDispatch();
  const { loading, projects } = useAppSelector(
    (state: RootState) => state.project
  );

  // useEffect(() => {
  //   const getPrivateProjects = async () => {
  //     try {
  //       dispatch(setLoading(true));
  //       await dispatch(getProject()).unwrap();
  //       dispatch(setLoading(false));
  //     } catch (err: any) {
  //       console.log(err);
  //     }
  //   };

  //   getPrivateProjects();
  // }, []);

  function handleToggleOptions(projectName: any) {
    setActiveProject((prev) => (prev === projectName ? null : projectName));
  }

  if (loading) {
    return (
      <>
        <div className="grid grid-cols-4 gap-3 mt-3">
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
        </div>
      </>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-5 mx-auto">
      {(projects ?? []).map((project: any) => (
        <ProjectCard className="" key={project?.uuid}>
          <div className="w-full flex justify-between">
            <Avatar className="w-8 h-8">
              <AvatarImage src={project?.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <button
              onClick={() => handleToggleOptions(project.uuid)}
              className="text-[#ddd] text-center w-[22px] h-[22px] items-center hover:cursor-pointer hover:bg-[#323232] hover:rounded-full duration-200"
            >
              &#8942;
            </button>
            {activeProject === project.name && (
              <Options className="rounded-sm border-none md:px-2! md:py-1.5! h-14 w-26 bg-[#272727] absolute top-8.5 right-2 text-[10px] text-[#ddd] flex flex-col gap-0.5 justify-center font-extralight " />
            )}
          </div>
          <Link
            href={`/dashboard/${project?.username}`}
            className="w-full flex items-center space-x-2 justify-between hover:cursor-pointer "
          >
            <span className="xl:text-[13px] md:text-[11px] text-[16px] text-[#f4f4f4] line-clamp-1">
              {project.name}
            </span>
            <ChevronRightIcon className="h-3 w-3 text-[#ddd]-600" />
          </Link>
        </ProjectCard>
      ))}
    </ul>
  );
}

export function ProjectsPartial() {
  const [activeProject, setActiveProject] = useState(null);
  const dispatch = useAppDispatch();
  const { loading, projects } = useAppSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    const getPrivateProjects = async () => {
      try {
        dispatch(setLoading(true));
        await dispatch(getProject()).unwrap();
        dispatch(setLoading(false));
      } catch (err: any) {
        console.log(err);
      }
    };

    getPrivateProjects();
  }, []);

  function handleToggleOptions(projectName: any) {
    setActiveProject((prev) => (prev === projectName ? null : projectName));
  }

  if (loading) {
    return (
      <>
        <div className="grid grid-cols-4 gap-x-3 mt-3">
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
          <Skeleton className="h-[125px] rounded-xl" />
        </div>
      </>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-4 w-full gap-4">
      {(projects ?? [])
        .filter((_, i) => i < 4)
        .map((project: any) => (
          <ProjectCard className="" key={project?.uuid}>
            <div className="w-full flex justify-between">
              <Avatar className="w-8 h-8">
                <AvatarImage src={project?.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <button
                onClick={() => handleToggleOptions(project.uuid)}
                className="text-[#ddd] text-center w-[22px] h-[22px] items-center hover:cursor-pointer hover:bg-[#323232] hover:rounded-full duration-200"
              >
                &#8942;
              </button>
              {activeProject === project.name && (
                <Options className="rounded-sm border-none md:px-2! md:py-1! h-9 w-26 bg-[#272727] absolute top-8.5 right-2 text-[10px] text-[#ddd] flex flex-col gap-0.5 justify-center font-extralight " />
              )}
            </div>
            <Link
              href={`/dashboard/${project?.username}`}
              className="w-full flex items-center space-x-2 justify-between hover:cursor-pointer "
            >
              <span className="xl:text-[13px] md:text-[11px] text-[16px] text-[#f4f4f4] line-clamp-1">
                {project.name}
              </span>
              <ChevronRightIcon className="h-3 w-3 text-[#ddd]-600" />
            </Link>
          </ProjectCard>
        ))}
    </ul>
  );
}
