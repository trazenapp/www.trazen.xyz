import { HomeAngle2, Suitcase, Bell, } from "@solar-icons/react";
import { SlideSearch20Regular, SlideSearch20Filled, PeopleInterwoven20Regular, PeopleInterwoven20Filled } from '@fluentui/react-icons';
import { LuCalendarCheck } from "react-icons/lu";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { RiSettings4Line, RiSettings4Fill } from "react-icons/ri";


export const userSidebarMenu = [
  { label: "Home", href: "/home", icon: <HomeAngle2 weight="Linear" size={20} />, isActiveIcon: <HomeAngle2 weight="Bold" size={20} /> },
  { label: "Discover", href: "/discover", icon: <SlideSearch20Regular /> , isActiveIcon: <SlideSearch20Filled /> },
  { label: "Events", href: "/events", icon: <LuCalendarCheck size={20}  stroke="#7F7F7F" />, isActiveIcon: <LuCalendarCheck size={20} fill="white" stroke="#7F7F7F" /> },
  { label: "Gigs", href: "/gigs", icon: <Suitcase weight="Linear" size={20} />, isActiveIcon: <Suitcase weight="Bold" size={20} /> },
  { label: "Notifications", href: "/notifications", icon: <Bell weight="Linear" size={20} />, isActiveIcon: <Bell weight="Bold" size={20} /> },
  { label: "Saved", href: "/saved", icon: <MdBookmarkBorder size={20} />, isActiveIcon: <MdBookmark size={20} /> },
  { label: "Community", href: "/community", icon: <PeopleInterwoven20Regular />, isActiveIcon: <PeopleInterwoven20Filled /> },
  { label: "Settings", href: "/settings", icon: <RiSettings4Line size={20} />, isActiveIcon: <RiSettings4Fill size={20} /> },
]