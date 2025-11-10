import React, { useEffect } from "react";
import Image from "next/image";
import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import { fetchProfile } from "@/src/redux/slices/userSlice";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

interface ProfilePhotoProps {
  width?: string;
  height?: string;
  avatarUrl?: string;
}

const ProfilePhoto = ({
  width = "40px",
  height = "40px",
  avatarUrl,
}: ProfilePhotoProps) => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state: RootState) => state.user);
  const { projectDetail } = useAppSelector((state: RootState) => state.project);
  const fallbackStr = [
    profile?.username[0].toUpperCase(),
    profile?.username[profile?.username?.length - 1],
  ];
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const urlToUse = avatarUrl
    ? avatarUrl
    : profile?.avatar
      ? profile?.avatar
      : "https://github.com/shadcn.png";
  return (
    <Avatar
      className=""
      style={{
        width: width,
        height: height,
      }}
    >
      <Image src={urlToUse} alt="profile photo" fill className="object-cover" />
      <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
        {fallbackStr.map((i) => i)}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfilePhoto;
