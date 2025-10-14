"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeedsMedia = ({ media = [] as string[], maxVisible = 4 }) => {
  const [playingVideos, setPlayingVideos] = useState();
  const [fullScreenMedia, setFullScreenMedia] = useState(null);

  // const togglePlay = (index) => {
  //   const newPlaying = new Set(playingVideos);
  //   if (newPlaying.has(index)) {
  //     newPlaying.delete(index);
  //   } else {
  //     newPlaying.add(index);
  //   }
  //   setPlayingVideos(newPlaying);
  // };

  const openFullScreen = (mediaItem: any, index: number) =>
    setFullScreenMedia({ ...mediaItem, index });

  const closeFullScreen = () => setFullScreenMedia(null);

  const getGridLayout = (count: number) => {
    if (count === 1) return "w-full";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    if (count >= 4) return "grid-cols-2 grid-rows-2";
    return "grid-cols-1 ";
  };

  const getColSpan = (index: number, count: number) => {
    if (count === 1) return "col-span-12 row-span-1";
    if (count === 2) return "col-span-1 row-span-1";
    if (count === 3) {
      if (index === 0) return "col-span-1 row-span-1";
      return "col-span-1 row-span-1";
    }
    return "col-span-1 row-span-1";
  };

  const visibleMedia = media.slice(0, maxVisible);
  const remainingCount = media.length - maxVisible;

  const MediaItem = ({
    item = "",
    index = 0,
    showOverlay = false,
    overlayCount = 0,
  }) => {

    const imgUrl = `${process.env.NEXT_PUBLIC_FILE_PREVIEW_URL}/${item}`;

    return (
      <div
        className={`relative overflow-hidden bg-gray-100 ${getColSpan(
          index,
          visibleMedia.length
        )}`}
      >
        <div className="w-full h-full relative">
            <Image
              src={imgUrl}
              alt={item}
              width={320}
              height={100}
              className="w-full h-full"
              onClick={() => openFullScreen(item, index)}
            />
            {showOverlay && (
              <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">
                  +{overlayCount}
                </span>
              </div>
            )}
          </div>
      </div>
    );
  };

  if (!media || media.length === 0) {
    return null;
  }

  return (
    <>
      <div
        className={`w-full grid grid-cols-2 gap-1 md:gap-2.5 ${getGridLayout(
          visibleMedia.length
        )}`}
      >
        {visibleMedia.map((item, index) => {
          const isLastItem = index === visibleMedia.length - 1;
          const shouldShowOverlay = isLastItem && remainingCount > 0;

          return (
            <MediaItem
              key={index}
              item={item}
              index={index}
              showOverlay={shouldShowOverlay}
              overlayCount={remainingCount}
            />
          );
        })}
      </div>
      {fullScreenMedia && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeFullScreen}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Carousel>
              <CarouselContent>
                {media?.map((item) => {
                  return (
                    <CarouselItem key={item}>
                      <Image
                          src={`${process.env.NEXT_PUBLIC_FILE_PREVIEW_URL}/${item}`}
                          width={640}
                          height={240}
                          alt="Fullscreen media"
                          className="max-w-full max-h-full rounded-lg mx-auto"
                          onClick={(e) => e.stopPropagation()}
                        />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="bg-[#1C1C1C] border-0 text-[#A6A6A6]" />
              <CarouselNext className="bg-[#1C1C1C] border-0 text-[#A6A6A6]" />
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedsMedia;
