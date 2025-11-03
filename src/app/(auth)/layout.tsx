"use client";
import React, { useEffect } from "react";
import AuthHeader from "@/src/layouts/AuthHeader";
import AuthFooter from "@/src/layouts/AuthFooter";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/src/redux/store";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();
  const { authSteps, role } = useAppSelector((state) => state.auth);

  
  useEffect(() => {
    if (role && authSteps) {
      const routeMap: Record<number, string> = {
        1: "/sign-up",
        2: "/on-boarding",
        3: "/create-project",
      };
      router.replace(routeMap[authSteps] || "/sign-up");
    }
  }, [authSteps, role, router]);
  
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
