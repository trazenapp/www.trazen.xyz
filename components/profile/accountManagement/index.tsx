"use client";
import React, { useState } from "react";
import Image from "next/image";
import defaultProfile from "@/public/default-profile.svg";
import cancel from "@/public/cancel.svg";
import { Button } from "@/components/ui/button";
import { options, OptionType, ChainAndNicheOptions } from "@/constants/options";
import { useAppDispatch, useAppSelector, RootState } from "@/redux/store";
import {
  ProfileData,
  getProfile,
  updateProfile,
} from "@/redux/slices/profileSlice";
import Select, { MultiValue } from "react-select";
import { toast } from "react-toastify";
import { useFileUpload } from "@/utils/uploadPostMedia";

interface Tag {
  id: number;
  label: string;
  removable: boolean;
}

interface TagItemProps {
  tag: Tag;
  onRemove: (id: number, isSecondRow?: boolean) => void;
  isSecondRow?: boolean;
}

function AccountManagementTab() {
  const dispatch = useAppDispatch();
  const {
    data: profile,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.profileSettings);

  const { result, uploading, uploadFiles } = useFileUpload();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [secondRowTags, setSecondRowTags] = useState<Tag[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    email: "",
    username: "",
    avatar: "",
    title: "",
    social: "",
    skills: [],
    interests: [],
    ref: "",
  });

  // Fetch profile data on component mount
  React.useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Update form fields and tags when profile data is fetched
  React.useEffect(() => {
    if (profile) {
      const { email, username, avatar, title, social, skills, interests, ref } =
        profile;

      setFormData({
        email: email || "",
        username: username || "",
        avatar: avatar || "",
        title: title || "",
        social: social || "",
        skills: skills || [],
        interests: interests || [],
        ref: ref || "",
      });
      // Update skills tags
      setTags(
        profile?.skills?.map((skill, index) => ({
          id: index + 1,
          label: skill,
          removable: true,
        }))
      );
      // Update interests tags
      setSecondRowTags(
        (profile.interests || []).map((interest, index) => ({
          id: index + 1,
          label: interest,
          removable: true,
        }))
      );
    }
  }, [profile]);

  const removeTag = (tagId: number, isSecondRow = false) => {
    if (isSecondRow) {
      setSecondRowTags((prev) => prev.filter((tag) => tag.id !== tagId));
      setFormData((prev) => ({
        ...prev,
        interests: secondRowTags
          .filter((tag) => tag.id !== tagId)
          .map((tag) => tag.label),
      }));
    } else {
      setTags((prev) => prev.filter((tag) => tag.id !== tagId));
      setFormData((prev) => ({
        ...prev,
        skills: tags.filter((tag) => tag.id !== tagId).map((tag) => tag.label),
      }));
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (
    selectedOptions: MultiValue<OptionType>,
    field: "skills" | "interests"
  ) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData((prev) => ({ ...prev, [field]: values }));
    if (field === "skills") {
      setTags(
        values.map((value, index) => ({
          id: index + 1,
          label: value,
          removable: true,
        }))
      );
    } else {
      setSecondRowTags(
        values.map((value, index) => ({
          id: index + 1,
          label: value,
          removable: true,
        }))
      );
    }
  };

  const handleSubmit = async () => {
    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast(<div>Profile updated successfully</div>, {
        theme: "dark",
        type: "success",
      });
      setProfileImage(null);
    } catch (err: any) {
      console.log(err);
        toast(<div>{err}</div>, {
          theme: "dark",
          type: "error",
        });
    }
  };

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploaded = await uploadFiles(e.target.files);
    if (uploaded) {
      const urls = Array.isArray(uploaded) ? uploaded : [uploaded];
      setFormData({
        ...formData,
        avatar: `${process.env.NEXT_PUBLIC_FILE_PREVIEW_URL}/${urls[0]}`,
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const profilePicUrl =
    formData.avatar == null || formData.avatar === ""
      ? defaultProfile
      : profileImage
        ? `${process.env.NEXT_PUBLIC_FILE_PREVIEW_URL}/profile`
        : formData.avatar;

  return (
    <div className="p-8 bg-transparent md:bg-[#161616] flex-1">
      <h2 className="text-lg font-medium mb-8">Account management</h2>
      {/* Profile Picture */}
      <div className="flex items-center gap-4 mb-8">
        <div className="size-14 bg-yellow-300 rounded-full overflow-hidden flex items-center justify-center relative">
          <Image
            src={profilePicUrl}
            alt="profile"
            fill
            className="w-full rounded-full object-center "
          />
        </div>
        <button
          className="text-xs cursor-pointer bg-[#430B68] text-white py-2 px-3 rounded-md hover:bg-[#5a0e7a] transition-colors"
          onClick={handleButtonClick}
        >
          {uploading ? "Uploading..." : "Change Profile Picture"}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Username */}
      <div className="mb-8">
        <label
          htmlFor="username"
          className="block text-sm text-[#F4F4F4F4] mb-3"
        >
          Username
        </label>
        <div className="bg-[#171717] border border-[#434343] rounded-lg py-3 px-4">
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="johndecrypto"
            className="w-full bg-[#171717] text-[#F4F4F4F4] outline-none placeholder-[#F4F4F4F4]"
          />
        </div>
      </div>
      {/* Email */}
      <div className="mb-8">
        <label htmlFor="email" className="block text-sm text-[#F4F4F4F4] mb-3">
          Email
        </label>
        <div className="bg-[#171717] border border-[#434343] rounded-lg py-3 px-4">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@email.com"
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
          <Select<OptionType, true>
            isMulti
            options={options as OptionType[]}
            value={options.filter((option) =>
              formData?.skills?.includes(option.value)
            )}
            onChange={(selected) => handleSelectChange(selected, "skills")}
            className="basic-multi-select font-sans !bg-[#171717] !border-[#434343]"
            classNamePrefix="select"
          />
        </div>
      </div>
      {/* Update Interest */}
      <div className="mb-8">
        <label className="block text-sm text-gray-300 mb-3">
          Update your Interests
        </label>
        <div className="bg-[#171717]">
          <Select<OptionType, true>
            isMulti
            options={ChainAndNicheOptions}
            value={ChainAndNicheOptions.filter((option) =>
              (formData.interests || []).includes(option.value)
            )}
            menuPlacement="auto"
            onChange={(selected) => handleSelectChange(selected, "interests")}
            className="basic-multi-select font-sans !bg-[#171717] !border-[#434343]"
            classNamePrefix="select"
          />
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        className="bg-[#430B68] hover:bg-[#430B68] text-white py-3.5 px-4.5 max-w-40 rounded-[100px] cursor-pointer transition-colors font-medium"
      >
        Save changes
      </Button>
    </div>
  );
}

export default AccountManagementTab;
