import React from "react";
import PrivacyTermsHeader from "@/src/layouts/Privacy&TermsHeader";
import TermsFooter from "@/src/layouts/TermsFooter";
interface TermsLayoutProps {
  children: React.ReactNode;
}

const TermsLayout = ({ children }: TermsLayoutProps) => {
  return (
    <>
      <main className="h-full">
        <PrivacyTermsHeader />
        <section className="h-[75vh]">{children}</section>
        <TermsFooter />
      </main>
    </>
  );
};

export default TermsLayout;
