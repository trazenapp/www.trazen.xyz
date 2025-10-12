import React from "react";
import PrivacyTermsHeader from "@/layouts/Privacy&TermsHeader";
import PrivacyFooter from "@/layouts/PrivacyFooter";
interface PrivacyLayoutProps {
  children: React.ReactNode;
}

const PrivacyLayout = ({ children }: PrivacyLayoutProps) => {
  return (
    <>
      <main className="h-full">
        <PrivacyTermsHeader />
        <section className="h-[75vh]">{children}</section>
        <PrivacyFooter />
      </main>
    </>
  );
};

export default PrivacyLayout;
