"use client";

import { createContext } from "react";
import React from "react";

export const ParentRefContext =
  createContext<React.MutableRefObject<HTMLDivElement | null> | null>(null);