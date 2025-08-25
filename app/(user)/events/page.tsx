import React from "react";
import EventCard from "@/components/eventCard";

const Events = () => {
  return (
    <>
      <h4 className="mb-6 text-white text-xl font-medium font-sans lg:flex hidden">
        Events
      </h4>
      <EventCard />
    </>
  );
};

export default Events;
