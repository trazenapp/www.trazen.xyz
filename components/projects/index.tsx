"use client";

import React, { useEffect, useRef, useState } from "react";

import ProjectCard from "../projectCard";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Options from "../ui/options";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProject, setLoading } from "@/redux/slices/projectSlice";

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
    <ul className="md:grid flex flex-col grid-cols-4 w-full gap-5 mx-auto">
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
  const [getItems, setGetItems] = useState([]);
  const dispatch = useAppDispatch();
  const { loading, projects } = useAppSelector(
    (state: RootState) => state.project
  );

  const allProjects = projects?.projects as [];
  //   {
  //     "id": 3,
  //     "uuid": "6b774cd8-bf4c-422d-9f63-bf72c1416948",
  //     "user_uuid": "310a575a-a6a2-477a-8c36-b62558824202",
  //     "wallet_uuid": null,
  //     "name": "jkgvvhjvhvjhvvj",
  //     "description": "gfcfcjvhvhgvjcgkhlkjhfghklhjhlb",
  //     "social": "https://x.com/hggjv",
  //     "whitepaper": "https://jkbjkbjk.com/jhbhjb",
  //     "avatar": "http://trazenapp.s3-website.eu-west-3.amazonaws.com/buckets/test/user/310a575a-a6a2-477a-8c36-b62558824202/images/397fa5f1d111e2c82bbaeaf2dcd9199a05a09bba.jpg",
  //     "categories": [
  //         "Ethereum",
  //         "Polygon",
  //         "NFT",
  //         "Metaverse"
  //     ],
  //     "team_emails": [
  //         "halo@gmail.com",
  //         "helo@gmail.com",
  //         "hello@gmail.com"
  //     ],
  //     "is_approved": false,
  //     "created_at": "2025-09-26T20:52:00.142Z",
  //     "updated_at": "2025-09-26T20:52:00.142Z"
  // }
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
      {(allProjects ?? [])
        .filter((_, i) => i < 4)
        .map((project: any) => (
          <>
            {project && (
              <>
                <ProjectCard className="" key={project?.uuid}>
                  <div className="w-full flex justify-between">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={project?.avatar} />
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
                    href={`/dashboard/${project.name}`}
                    className="w-full flex items-center space-x-2 justify-between hover:cursor-pointer "
                  >
                    <span className="xl:text-[13px] md:text-[11px] text-[16px] text-[#f4f4f4] line-clamp-1">
                      {project.name}
                    </span>
                    <ChevronRightIcon className="h-3 w-3 text-[#ddd]-600" />
                  </Link>
                </ProjectCard>
              </>
            )}
          </>
        ))}
    </ul>
  );
}
