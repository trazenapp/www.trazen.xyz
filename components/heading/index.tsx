import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  subText?: string;
}

const Heading = ({ children, className, subText }: HeadingProps) => {
  return (
    <>
      <h3
        className={`font-clash-display font-semibold md:text-4xl text-[28px] ${className}`}
      >
        {children}
      </h3>
      {subText && (
        <p className="font-sans text-xs md:text-base text-center font-normal flex justify-center mx-auto">
          {subText}
        </p>
      )}
    </>
  );
};

export default Heading;
