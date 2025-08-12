"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/trazen-logo-white.svg"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setShow } from "@/redux/slices/dashboardSidebarSlice";


const DashboardNav = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { show } = useAppSelector((state: RootState) => state.dashboardSidebar);
  let title = pathname.slice(1, pathname.length);

  const handleToggleSidebar = () => {
    dispatch(setShow(!show));
  }


  return (
    <nav className='sticky top-0 z-10 lg:bg-[#161616] md:bg-[#0B0B0B] px-5 py-[18px] flex items-center justify-between lg:border-b lg:border-b-[#303030]'>
      {/* desktop view */}
      <Link href="/" className='hidden lg:flex'>
        <Image src={logo} alt="logo" width={120} />
      </Link>

      <div className='hidden lg:flex items-center gap-x-2.5 w-5/12'>
          <div className='w-full border border-[#303030] relative h-full rounded-full flex items-center px-5 py-1'>
            <Search className='text-[#9F9F9F]' />
            <Input type="text" placeholder="Search" className='font-sans border-0 focus-visible:border-0 focus-visible:ring-0 text-[#9F9F9F]' />
        </div>
        <Button className='flex !gap-x-2.5 rounded-full font-sans bg-[#430B68] !py-3 !px-8'>
          Create Project <ArrowRight />
        </Button>
      </div>

      {/* tablet and mobile view */}
      <Button onClick={handleToggleSidebar} className='lg:hidden !p-0'>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Button>

      <h3 className='lg:hidden text-[#F4F4F4F4] font-sans font-medium text-base capitalize'>{title}</h3>

      <Button className='lg:hidden !p-0'>
        <Search className='text-[#F4F4F4F4] text-xl' size={20} />
      </Button>
    </nav>
  )
}

export default DashboardNav