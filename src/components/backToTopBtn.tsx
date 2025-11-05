"use client"; // This tells Next.js it's a client-side component

import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Tool for scrolling
import { ArrowUp } from "lucide-react"; // The icon for the button

// Register the ScrollToPlugin so GSAP knows how to use it
gsap.registerPlugin(ScrollToPlugin);

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  
  // 1. Function to handle the smooth scroll
  const scrollToTop = () => {
    // This tells GSAP to animate the window's scroll position (y) to 0 (top)
    gsap.to(window, {
      scrollTo: {
        y: 0,
      },
      duration: 0.8, // Make the animation last 0.8 seconds (smooth)
      ease: 'power2.inOut', // The style of the animation (start/end slowly)
    });
  };

  // 2. Logic to SHOW/HIDE the button based on scrolling
  useEffect(() => {
    const toggleVisibility = () => {
      // If the user scrolls past 400 pixels, show the button
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up the listener when the component is removed
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []); // [] means run only once

  // 3. GSAP Animation for the button itself (fade in/out)
  useEffect(() => {
    const buttonElement = document.getElementById("back-to-top-button");

    if (isVisible) {
      // Fade in and slide up when visible
      gsap.fromTo(
        buttonElement,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3, pointerEvents: 'auto' }
      );
    } else {
      // Fade out and slide down when hidden
      gsap.to(buttonElement, { 
        opacity: 0, 
        y: 30, 
        duration: 0.3,
        pointerEvents: 'none' // Makes the hidden button unclickable
      });
    }
  }, [isVisible]);


  return (
    <button
      id="back-to-top-button" // Unique ID for GSAP target
      onClick={scrollToTop}
      aria-label="Back to top"
      // Basic styling for the button position and initial state
      style={{
        position: "fixed",
        bottom: "2.5rem", // 2.5rem from the bottom
        right: "2.5rem",  // 2.5rem from the right
        zIndex: 1000,
        opacity: 0, // Starts hidden, GSAP takes over
      }}
      className="p-3 bg-white/10 text-white rounded-full shadow-xl hover:bg-white/20 transition-colors"
    >
      <ArrowUp size={24} />
    </button>
  );
}