import React, { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchProfile } from "@/redux/slices/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePhoto = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state: RootState) => state.user);
  const { projectDetail } = useAppSelector((state: RootState) => state.project);
  const fallbackStr = [profile?.username[0].toUpperCase(),profile?.username[profile?.username?.length - 1]]
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage
        src={
          profile?.avatar ? profile?.avatar : "https://github.com/shadcn.png"
        }
        className="h-full w-full"
      />
      <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
        {fallbackStr.map(i => i)}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfilePhoto;
