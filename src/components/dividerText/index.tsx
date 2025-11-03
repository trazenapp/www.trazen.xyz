import React from 'react'

interface DividerTextProps {
  text: string;
}

const DividerText = ({ text }: DividerTextProps) => {
  return (
    <div className='w-full flex gap-x-4 justify-center items-center'>
      <div className='flex-1 border-[0.5px] border-[#525252]' />
      <p className='text-[#BFBFBF] font-sans text-sm md:text-base font-normal'>{ text }</p>
      <div className='flex-1 border-[0.5px] border-[#525252]' />
    </div>
  )
}

export default DividerText