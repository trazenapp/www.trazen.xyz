import React from 'react'
import Image from 'next/image'
import image from "@/public/coming-soon.svg"

const Community = () => {
  return (
    <div className='h-[80vh] flex flex-col items-center justify-center'>
      <Image src={image} alt="coming soon" />
      <div className='mt-9 flex flex-col items-center font-sans'>
        <h6 className='text-xl font-medium'>Coming Soon!!!</h6>
        <p className='text-sm font-normal'>Community is yet to take off. Check back in a bit</p>
      </div>
    </div>
  )
}

export default Community