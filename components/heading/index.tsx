import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string; 
}

const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h3 className={`font-clash-display font-semibold md:text-4xl text-[28px] ${className}`}>
      {children}
    </h3>
  );
};

export default Heading;
