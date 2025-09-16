import React from "react";

import ViewsCard from "@/components/viewsCard";
import ProjectsOverview from "@/components/projectOverview";

type OverviewInfoProps = {
  setTabValue: (value: string) => void;
};

function OverviewInfo({ setTabValue }: OverviewInfoProps) {
  return (
    <div className="flex md:flex-row flex-col gap-5 w-full">
      <ViewsCard />
      <ProjectsOverview setTabValue={setTabValue} />
    </div>
  );
}

export default OverviewInfo;
