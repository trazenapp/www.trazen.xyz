import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/trazen-logo-white.svg";

const PrivacyTermsHeader = () => {
  return (
    <nav className="my-6 mx-auto w-11/12 flex justify-center md:justify-start items-center">
      <Link href="/">
        <Image src={logo} alt="Trazen Logo" />
      </Link>
    </nav>
  );
};

export default PrivacyTermsHeader;
