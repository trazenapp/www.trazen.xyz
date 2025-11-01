"use client";
import React from "react";
import Link, { useRouter } from "next/navigation";
// import Image from "next/image";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { switchSession } from "@/redux/slices/loginSlice";
import { UserProfile } from "@/types/user.types";
import { Profile } from "iconsax-reactjs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import AvatarProfile from "../avatarProfile";

interface SwitchAccountProps {
  profile: UserProfile | null;
}

const SwitchAccount = ({ profile }: SwitchAccountProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { sessions, currentUser } = useAppSelector(
    (state: RootState) => state.login
  );
  console.log(sessions, currentUser);

  const handleUserSwitch = (email: string) => {
    dispatch(switchSession(email));
    window.location.reload();
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-x-2.5 justify-start font-sans text-sm font-normal text-[#F4F4F4] p-0! bg-transparent w-full">
            <Profile /> Switch users
          </Button>
        </DialogTrigger>
        <DialogContent
          className=" font-sans gap-3 bg-[#161616] border-[#303030] rounded-2xl p-0 xl:w-[50vw] lg:max-w-[55vw] md:max-w-[85vw] max-md:max-w-[95vw]!  md:max-h-[95vh] max-h-[98vh] min-h-[45vh] overflow-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex flex-col justify-center items-center mx-auto sm:gap-2 gap-y-4 py-2 sm:px-7 px-3 w-6/12">
            <DialogTitle className="flex items-center justify-between font-medium text-base text-[#f4f4f4]">
              Switch Account
            </DialogTitle>
            <p className="text-gray-400 text-sm mb-6">
              Select an account to continue
            </p>
            {sessions &&
              sessions.map((session) => {
                const avatarUrl = session?.user?.email
                  ? session?.user?.avatar || ""
                  : "https://github.com/shadcn.png";
                console.log(session?.user?.email === profile?.email);
                return (
                  <Button
                    key={session?.user?.uuid}
                    onClick={() => handleUserSwitch(session.user.email)}
                    className="border border-[#383838] w-full items-start"
                  >
                    <AvatarProfile
                      avatar={avatarUrl}
                      title={session.user.username}
                    />
                    <div className="text-left">
                      <p className="text-white font-medium">
                        {session.user.username}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {session.user.email}
                      </p>
                    </div>
                  </Button>
                );
              })}
            <Separator className="border-[#383838] my-4" />
            <a href="/sign-in" className="hover:underline">
              <p className="text-center text-sm">Login another Account</p>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SwitchAccount;
