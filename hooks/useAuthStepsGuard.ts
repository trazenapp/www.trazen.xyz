"use client"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAppSelector, RootState } from "@/redux/store"
import { AUTH_STEPS_ROUTE } from "@/types/auth.types"

export default function useAuthStepsGuard(requiredStep: number) {
  const router = useRouter();
  const pathname = usePathname();
  const { authSteps, role } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if(!role) return;

    const targetRoute = AUTH_STEPS_ROUTE[authSteps as 1 | 2 | 3] || "/sign-up";

    if (authSteps !== undefined && authSteps < requiredStep) {
      const backRoute = AUTH_STEPS_ROUTE[authSteps as 1 | 2 | 3];
      router.replace(backRoute);
    }

    if (role === "USER" && requiredStep > 2) {
      router.replace("/on-boarding");
    }

    if (pathname !== targetRoute) {
      router.replace(targetRoute);
    }
  }, [authSteps, role, pathname, router])
}