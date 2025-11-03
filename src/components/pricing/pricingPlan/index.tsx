"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/src/redux/store";
import { useAppSelector, useAppDispatch } from "@/src/redux/store";
import {
  setSteps,
} from "@/src/redux/slices/projectSlice";
import Card from "@/src/components/card";
import PricingCard from "../pricingCard";
import FormHeading from "@/src/components/formHeading";
import { free, premium } from "@/src/constants/pricing";

const PricingPlan = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { steps } = useAppSelector((state: RootState) => state.project);

  const freeOnclick = () => {
    dispatch(setSteps(steps + 1))
  }
  return (
    <Card className="w-11/12 md:w-9/12 mx-auto border-0 md:border md:border-[#303030] py-10 !px-8 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8 w-full md:w-8/12">
        <FormHeading
          title="Account subscription"
          subtitle="Trazen uses a feature based subscription model that helps you select features that fits your needs. Change the plan or cancel anytime."
          // className="!text-left"
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-x-6">
        <PricingCard features={free} title="Free" isActive onClick={freeOnclick} />
        <PricingCard features={premium} title="Premium/Paid" isActive={false} />
      </div>
    </Card>
  );
};

export default PricingPlan;
