import React from "react";

import OverviewInfo from "../OverviewInfo";
import FollowersChart from "../FollowersChart";

function Overview() {
  return (
    <div className="flex flex-col gap-5 ">
      <OverviewInfo />
      <FollowersChart />
    </div>
  );
}

export default Overview;
