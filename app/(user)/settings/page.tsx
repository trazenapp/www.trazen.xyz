"use client";
import React from "react";
import Image from "next/image";
import FormCheckbox from "@/components/form/formCheckbox";
const Settings = () => {
  const value = ["Blockchain developer", "Marketer"];
  const options = [
    {
      label: "Select Your Skill",
      value: value[0],
    },
    {
      label: "Select Your Skill",
      value: value[1],
    },
  ];
  return (
    <div className="ml-6">
      <h2>Settings</h2>
      <section className="bg-[#161616] flex basis-1/2 relative rounded-2xl mt-7 h-[779px] w-[991px] py-7 px-7 ">
        <div className="leftSide h-full w-1/2 flex gap-3 flex-col ">
          <button className="w-[95%] text-left cursor-pointer py-3 px-3.5 rounded-lg bg-[#272727]">
            Account management
          </button>
          <button className="w-[90%] text-left py-3 px-3.5 rounded-lg">
            Security
          </button>
        </div>
        <div className="rightSide h-full flex flex-col gap-6 w-1/2 px-10 ">
          <h2>Account management</h2>
          <div>
            {/* image will be displayed here  */}
            <button className="font-normal text-[12px] bg-[#430B68] py-1.5 px-2.5 rounded-[6px] cursor-pointer">
              Change profile picture
            </button>
          </div>
          <label htmlFor="username" className="mt-6">
            Username
          </label>
          <div className="border border-[#434343] bg-[#171717] rounded-[8px] p-3 ">
            <input
              type="text"
              id="username"
              placeholder="johndecrypto"
              className="w-full outline-none px-2"
            />
          </div>
          <label htmlFor="skills">Select your skills</label>
          <div className="select-skills border border-[#430B68] rounded-[8px] h-24 bg-[#171717] ">
            <FormCheckbox values={value} options={options} />
          </div>
          <button className="bg-[#430B68] py-3.5 px-2.5 rounded-4xl cursor-pointer max-w-40 ">
            Save changes
          </button>
        </div>
        <div className="absolute left-1/2 border-l top-0 bottom-0 h-[97%] border-[#303030]"></div>
      </section>
    </div>
  );
};

export default Settings;
