import React from "react";

import OverviewInfo from "../OverviewInfo";
import FollowersChart from "../FollowersChart";

type OverviewProps = {
  setTabValue: (value: string) => void;
};

function Overview({ setTabValue }: OverviewProps) {
  return (
    <div className="flex flex-col gap-5 ">
      <OverviewInfo setTabValue={setTabValue} />
      <FollowersChart />
    </div>
  );
}

export default Overview;
