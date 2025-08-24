import React from "react";
import AuthHeader from "@/layouts/AuthHeader";
import AuthFooter from "@/layouts/AuthFooter";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <main className="h-full">
        <AuthHeader />
        <section className="min-h-[60vh]">
        {children}
        </section>
        <AuthFooter />
      </main>
    </>
  );
};

export default AuthLayout;
