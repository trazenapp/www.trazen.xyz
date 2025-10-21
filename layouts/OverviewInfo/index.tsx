import React from "react";

import ViewsCard from "@/components/viewsCard";
import ProjectsOverview from "@/components/projectOverview";

type OverviewInfoProps = {
  setTabValue: (value: string) => void;
  views: number;
};

function OverviewInfo({ setTabValue, views }: OverviewInfoProps) {
  return (
    <div className="flex md:flex-row flex-col gap-5 w-full">
      <ViewsCard views={views} />
      <ProjectsOverview setTabValue={setTabValue} />
    </div>
  );
}

export default OverviewInfo;
