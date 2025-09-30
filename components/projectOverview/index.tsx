import React from "react";

import Card from "../card";
import { ProjectsPartial } from "../projects";

type ProjectsOverviewProps = {
  setTabValue: (value: string) => void;
};

function ProjectsOverview({ setTabValue }: ProjectsOverviewProps) {
  return (
    <Card className="md:!py-6 xl:!px-6 !px-4 xl:w-[70%] lg:w-[77%] md:w-[82%] w-full rounded-xl ">
      <div className="flex justify-between mt-1">
        <p className="text-base">Projects</p>
        <button
          className="text-xs font-normal hover:text-[#9f9f9f] hover:cursor-pointer duration-200"
          value="project"
          onClick={() => setTabValue("project")}
        >
          View All
        </button>
      </div>
      <ProjectsPartial />
    </Card>
  );
}

export default ProjectsOverview;
