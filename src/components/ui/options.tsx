"use client";

import React from "react";
import Card from "../card";

interface OptionsProps {
  className?: string;
}

function Options({ className }: OptionsProps) {
  return (
    <Card className={className}>
      <p className=" hover:cursor-pointer hover:text-[#fff] duration-100 ">
        View Project
      </p>
      <p className=" hover:cursor-pointer hover:text-[#fff] duration-100 ">
        Edit Project
      </p>
      <p className=" hover:cursor-pointer hover:text-[#fff] duration-100 ">
        Delete Project
      </p>
    </Card>
  );
}

export default Options;
