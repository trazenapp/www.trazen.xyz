import React from "react";
import Link from "next/link";

const TermsFooter = () => {
  return (
    <footer className="pb-4 mt-8 w-11/12 mx-auto hidden md:flex justify-between items-center font-sans text-base font-normal text-[#B7B7B7]">
      <div className="">© 2025 Trazen</div>
      <ul className="flex gap-x-10">
        <li>
          <Link href="/privacy">Privacy</Link>
        </li>
        <li>
          <Link href="#">Support</Link>
        </li>
      </ul>
    </footer>
  );
};

export default TermsFooter;
