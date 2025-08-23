"use client";
import React, { useState } from "react";
import Image from "next/image";
import defaultProfile from "@/public/default-profile.svg";
import cancel from "@/public/cancel.svg";
import arrowDown from "@/public/arrow-down.svg";
import wallet from "@/public/wallet.svg";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Select from "react-select";
import { options, hearOptions, OptionType } from "@/constants/options";
import FormCheckbox from "@/components/form/formCheckbox";
import ResetPasswordForm from "@/components/form/resetPasswordForm";

const Settings = () => {
  const [tab, setTab] = useState<"account" | "security">("security");

  return (
    <div className="min-h-screen text-white p-6 font-sans">
      {/* Header */}
      <h1 className="text-xl font-medium mb-8">Settings</h1>

      {/* Main Container */}
      <div className="flex gap-0 bg-[#161616] w-[991px] h-[779px] relative rounded-lg overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-[#161616] p-6">
          <div className="space-y-2">
            <button
              className={`w-full text-left py-3 px-4 cursor-pointer rounded-lg font-medium transition-colors ${
                tab === "account"
                  ? "bg-[#272727] text-white"
                  : "text-gray-400 hover:bg-[#272727]"
              }`}
              onClick={() => setTab("account")}
            >
              Account management
            </button>
            <button
              onClick={() => setTab("security")}
              className={`w-full text-left py-3 px-4 cursor-pointer rounded-lg font-medium transition-colors ${
                tab === "security"
                  ? "bg-[#272727] text-white"
                  : "text-gray-400 hover:bg-[#272727]"
              }`}
            >
              Security
            </button>
          </div>
        </div>

        <div className="absolute left-[27%] border-l top-0 bottom-0 h-[97%] border-[#303030]"></div>
        {tab === "account" ? <AccountTab /> : <SecurityTab />}
      </div>
    </div>
  );
};

// -------------------- Types --------------------
interface Tag {
  id: number;
  label: string;
  removable?: boolean;
}

interface TagItemProps {
  tag: Tag;
  onRemove: (id: number, isSecondRow: boolean) => void;
  isSecondRow?: boolean;
}

// -------------------- Security Tab --------------------
function SecurityTab() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const passwordType = showPassword ? "text" : "password";

  return (
    <div className="flex-1 p-8 bg-[#161616] ml-4 ">
      <h2 className="text-white mb-6">Security</h2>
      <label htmlFor="email">Email</label>
      <div className="bg-[#171717] border border-[#434343] rounded-lg py-3 px-4 my-5 ">
        <input
          type="email"
          id="email"
          placeholder="example@email.com"
          className="w-full bg-[#171717] text-[#F4F4F4F4] outline-none placeholder-[#F4F4F4F4]"
        />
      </div>

      <label htmlFor="wallet" className="mb-5 mt-8 block">
        Linked Wallet
      </label>
      <button
        id="wallet"
        className="flex justify-center gap-3 border border-[#303030] py-3.5 px-4 rounded-[100px] cursor-pointer w-full "
      >
        <Image src={wallet} alt="linked wallet" />
        Connect Wallet
      </button>

      <h2 className="mt-6">Change Password</h2>

      <form className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8">
        {/* Old Password */}
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="oldPassword" className="font-medium text-sm">
            Old Password
          </Label>
          <div className="relative">
            <Input
              type={passwordType}
              id="oldPassword"
              placeholder="password"
              className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
            />
            <Button
              type="button"
              onClick={togglePassword}
              className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </div>
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="newPassword" className="font-medium text-sm">
            New Password
          </Label>
          <div className="relative">
            <Input
              type={passwordType}
              id="newPassword"
              placeholder="password"
              className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
            />
            <Button
              type="button"
              onClick={togglePassword}
              className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="confirmPassword" className="font-medium text-sm">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              type={passwordType}
              id="confirmPassword"
              placeholder="password"
              className="border-[#434343] rounded-[8px] py-[19px] px-4 pr-14"
            />
            <Button
              type="button"
              onClick={togglePassword}
              className="p-0 bg-transparent absolute top-1/2 right-4 -translate-y-1/2"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => router.push("/reset-password")}
          className="bg-[#430B68] max-w-40 hover:bg-[#430B68] rounded-full font-semibold"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}

// -------------------- Account Tab --------------------
function AccountTab() {
  const [tags, setTags] = useState<Tag[]>([
    { id: 1, label: "Blockchain developer", removable: true },
    { id: 2, label: "Marketer", removable: true },
    { id: 3, label: "UI/UX design", removable: true },
  ]);

  const [secondRowTags, setSecondRowTags] = useState<Tag[]>([
    { id: 4, label: "Blockchain developer", removable: true },
    { id: 5, label: "Marketer", removable: true },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const removeTag = (tagId: number, isSecondRow = false) => {
    if (isSecondRow) {
      setSecondRowTags((prev) => prev.filter((tag) => tag.id !== tagId));
    } else {
      setTags((prev) => prev.filter((tag) => tag.id !== tagId));
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const TagItem: React.FC<TagItemProps> = ({
    tag,
    onRemove,
    isSecondRow = false,
  }) => (
    <div className="p-2.5 flex items-center gap-2 bg-[#383838] text-[#BCBCBC] rounded-sm text-sm">
      <span>{tag.label}</span>
      {tag.removable && (
        <button type="button" onClick={() => onRemove(tag.id, isSecondRow)}>
          <Image src={cancel} alt="cancel" className="cursor-pointer" />
        </button>
      )}
    </div>
  );

  return (
    <div className="flex-1 p-8 bg-[#161616] ml-4">
      <h2 className="text-lg font-medium mb-8">Account management</h2>

      {/* Profile Picture */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-yellow-300 rounded-full flex items-center justify-center">
          <Image
            src={defaultProfile}
            alt="default profile"
            className="w-full"
          />
        </div>
        <button className="text-xs cursor-pointer bg-[#430B68] text-white py-2 px-3 rounded-md hover:bg-[#5a0e7a] transition-colors">
          Change profile picture
        </button>
      </div>

      {/* Username */}
      <div className="mb-8">
        <label
          htmlFor="username"
          className="block text-sm text-[#F4F4F4F4] mb-3"
        >
          Username
        </label>
        <div className="bg-[#171717] border border-[#434343] rounded-lg py-3 px-4 ">
          <input
            type="text"
            id="username"
            placeholder="johndecrypto"
            className="w-full bg-[#171717] text-[#F4F4F4F4] outline-none placeholder-[#F4F4F4F4]"
          />
        </div>
      </div>

      {/* Skills Selection */}
      <div className="mb-8">
        <label className="block text-sm text-gray-300 mb-3">
          Select your skills
        </label>
        <div className="bg-[#171717]">
          {/* First row */}
          <Select<OptionType, true>
            isMulti
            options={options as OptionType[]}
            className="basic-multi-select font-sans !bg-[#171717] !border-[#434343]"
            classNamePrefix="select"
            // isOptionDisabled={() => field.value?.length >= 5}
          />
        </div>
      </div>

      <Button className="bg-[#430B68] hover:bg-[#430B68] text-white py-3.5 px-4.5 max-w-40 rounded-[100px] cursor-pointer transition-colors font-medium">
        Save changes
      </Button>
    </div>
  );
}

export default Settings;
