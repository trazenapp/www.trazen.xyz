"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeedsMedia = ({ media = [], maxVisible = 4 }) => {
  const [playingVideos, setPlayingVideos] = useState();
  const [fullScreenMedia, setFullScreenMedia] = useState(null);

  const togglePlay = (index) => {
    const newPlaying = new Set(playingVideos);
    if (newPlaying.has(index)) {
      newPlaying.delete(index);
    } else {
      newPlaying.add(index);
    }
    setPlayingVideos(newPlaying);
  };

  const openFullScreen = (mediaItem, index) =>
    setFullScreenMedia({ ...mediaItem, index });

  const closeFullScreen = () => setFullScreenMedia(null);

  const getGridLayout = (count: number) => {
    if (count === 1) return "grid-cols-1 grid-rows-1";
    if (count === 2) return "grid-cols-2 grid-rows-2";
    if (count === 3) return "grid-cols-3 grid-rows-3";
    if (count >= 4) return "grid-cols-2 grid-rows-2";
    return "grid-cols-1 grid-rows-1";
  };

  const getColSpan = (index: number, count: number) => {
    if (count === 1) return "col-span-1 row-span-1";
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
    item,
    index,
    showOverlay = false,
    overlayCount = 0,
  }) => {
    const isVideo =
      item?.type === "video" || item?.url?.match(/\.(mp4|mov|avi|mkv)$/i);
    const isPlaying = playingVideos?.has(index);

    return (
      <div
        className={`relative overflow-hidden bg-gray-100 ${getColSpan(
          index,
          visibleMedia.length
        )}`}
      >
        {isVideo ? (
          <div className="w-full h-full relative">
            <video
              width="320"
              height="240"
              controls
              loop
              onClick={() => openFullScreen(item, index)}
              ref={(el) => {
                if (el) {
                  if (isPlaying) {
                    el.play();
                  } else {
                    el.pause();
                  }
                }
              }}
              preload="none"
            >
              <source
                src={item?.url}
                type="video/mp4"
                className="object-cover w-full h-full"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <Image
              src={item?.url}
              alt={item?.alt}
              width={320}
              height={240}
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
        )}
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
                    <CarouselItem key={item.url}>
                      {item?.type === "video" ||
                      item?.url.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video
                          width="320"
                          height="240"
                          controls
                          loop
                          onClick={(e) => e.stopPropagation()}
                          preload="none"
                        >
                          <source
                            src={item?.url}
                            type="video/mp4"
                            className="max-w-full max-h-full rounded-lg"
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <Image
                          src={item?.url}
                          width={640}
                          height={240}
                          alt={item?.alt || "Fullscreen media"}
                          className="max-w-full max-h-full rounded-lg mx-auto"
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
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
