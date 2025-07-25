"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FormHeading from "@/components/formHeading";
import { Button } from "@/components/ui/button";
import img from "@/public/success.svg"

interface FormSuccessProps {
  title: string;
  subtitle: string;
  buttonText: string;
  url: string;
}

const FormSuccess = ({
  title,
  subtitle,
  buttonText,
  url,
}: FormSuccessProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(url);
  };
  return (
    <div className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col items-center justify-center gap-y-8">
      <Image src={img} alt="image of a check icon" className="w-[80px] h-[80px] md:w-[140px] md:h-140px]" />
      <div className="mb-8">
        <FormHeading
          title={title}
          subtitle={subtitle}
        />
      </div>
      <Button type="button" onClick={handleClick} className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold md:w-10/12 w-full mx-auto">
        {buttonText}
      </Button>
    </div>
  );
};

export default FormSuccess;
