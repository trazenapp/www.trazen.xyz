"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector, RootState } from "@/src/redux/store";
import { AUTH_STEPS_ROUTE } from "@/src/types/auth.types";

export default function useAuthStepsGuard(requiredStep: number) {
  const router = useRouter();
  const pathname = usePathname();
  const { authSteps, role } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("Auth Guard Debug →", { authSteps, role, requiredStep, pathname });
    if (!role || typeof authSteps === "undefined" || authSteps === null) return;

    const effectiveAuthSteps =
      role === "USER" ? Math.min(authSteps, 2) : authSteps;

    const targetRoute =
      AUTH_STEPS_ROUTE[effectiveAuthSteps as 1 | 2 | 3] || AUTH_STEPS_ROUTE[1];

    if (effectiveAuthSteps < requiredStep) {
      if (pathname !== targetRoute) router.replace(targetRoute);
      return;
    }

    if (role === "USER" && requiredStep > 2) {
      const userRoute = AUTH_STEPS_ROUTE[2] || "/on-boarding";
      if (pathname !== userRoute) router.replace(userRoute);
      return;
    }

    if (pathname !== targetRoute) {
      router.replace(targetRoute);
    }
  }, [authSteps, role, pathname, router, requiredStep]);
}
