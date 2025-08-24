import React from "react";

import ViewsCard from "@/components/viewsCard";
import ProjectsOverview from "@/components/projectOverview";

function OverviewInfo() {
  return (
    <div className="flex md:flex-row flex-col gap-5 w-full">
      <ViewsCard />
      <ProjectsOverview />
    </div>
  );
}

export default OverviewInfo;
