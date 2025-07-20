import React from 'react'

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ children, className }: BadgeProps) => {

  return (
    <div className={`font-sans text-xs md:text-base text-center font-normal p-[1px] rounded-full bg-gradient-to-b from-[#c93be582] to-[#c93be500] to-[99%] flex justify-center w-fit mx-auto`}>
      <div className={`bg-gradient-to-br from-[#2c05332a] from-0% to-[#0b0b0b] to-70% w-full rounded-full py-2.5 md:py-3 px-9 md:px-10 ${className}`}>{ children }</div>
    </div>
  )
}

export default Badge