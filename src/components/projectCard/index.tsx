import React from "react";

import Card from "../card";

interface ProjectProps {
  children: React.ReactNode;
  className: string;
}

function ProjectCard({ children, className }: ProjectProps) {
  return (
    <Card
      className={`w-full  md:h-24 h-28 mt-4 md:!p-3 rounded-xl flex flex-col md:gap-1 gap-3 justify-between relative  ${className}`}
    >
      {children}
    </Card>
  );
}

export default ProjectCard;
