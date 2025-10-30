"use client";
import { useState, useEffect } from "react";

export function useVisitedLinks() {
  const [visitedLinks, setVisitedLinks] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("visitedLinks") || "[]");
    setVisitedLinks(saved);
  }, []);

  const markVisited = (url: string) => {
    setVisitedLinks((prev) => {
      const updated = [...new Set([...prev, url])];
      localStorage.setItem("visitedLinks", JSON.stringify(updated));
      return updated;
    });
  };

  const isVisited = (url: string) => visitedLinks.includes(url);

  return { visitedLinks, markVisited, isVisited };
}
