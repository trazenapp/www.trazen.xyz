import React from "react";

import Card from "../card";

interface ProjectProps {
  children: React.ReactNode;
}

function DropMenuCard({ children }: ProjectProps) {
  return (
    <Card className="w-max h-max md:!py-1 md:!px-2 rounded-[10px] block relative ">
      {children}
    </Card>
  );
}

export default DropMenuCard;
