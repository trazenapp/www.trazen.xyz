"use client";
import React, { useEffect } from "react";
import BountyCard from "@/components/bountyCard";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getBounties } from "@/redux/slices/bountiesSlice";
import { BountyItem } from "@/types/bounties.types";
import { RootState } from "@/redux/store";



const Bounty = () => {
  const dispatch = useAppDispatch();
  const { loading, error, bountyData } = useAppSelector(
    (state: RootState) => state.bounties
  );
  useEffect(() => {
    const getBountiesData = async () => {
      await dispatch(getBounties());
    };
    getBountiesData();
  }, [dispatch]);
  return (
    <div>
      <div className="flex gap-x-2.5 items-center mb-4">
        <div className="border border-[#303030] flex-1 flex items-center gap-x-2 rounded-full py-1 px-4">
          <FiSearch color="#9F9F9F" className="text-xl" />
          <Input
            type="text"
            placeholder="Search bounty title or keyword"
            className="font-sans border-0 focus-visible:ring-0 p-0"
          />
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-3 gap-4">
          {bountyData && bountyData.map((bounty) => (
            <Skeleton
              key={bounty.uuid}
              className="w-full h-[200px] my-4"
            />
          ))}
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bountyData && bountyData.map((bounty) => (
            <BountyCard key={bounty.uuid} bounty={bounty} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bounty;
