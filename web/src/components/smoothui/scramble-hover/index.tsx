"use client";

import type React from "react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export interface ScrambleHoverProps {
  children: string;
  className?: string;
  duration?: number; // total animation duration in ms
  speed?: number; // interval between scrambles in ms
}

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?".split(
    ""
  );

function scrambleText(original: string) {
  return original
    .split("")
    .map((char) =>
      char === " "
        ? " "
        : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
    )
    .join("");
}

function subscribeMedia(query: string, onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onChange) => subscribeMedia(query, onChange),
    () => window.matchMedia(query).matches,
    () => serverFallback
  );
}

const ScrambleHover: React.FC<ScrambleHoverProps> = ({
  children,
  duration = 600,
  speed = 30,
  className = "",
}) => {
  const [scrambled, setScrambled] = useState<string | null>(null);
  const shouldReduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isHoverDevice = useMediaQuery("(hover: hover) and (pointer: fine)");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (shouldReduceMotion || !isHoverDevice) {
      return;
    }
    clearTimers();
    intervalRef.current = setInterval(() => {
      setScrambled(scrambleText(children));
    }, speed);
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setScrambled(null);
    }, duration);
  };

  const handleMouseLeave = () => {
    clearTimers();
    setScrambled(null);
  };

  useEffect(() => () => clearTimers(), []);

  return (
    <span
      className={className}
      onMouseEnter={isHoverDevice ? handleMouseEnter : undefined}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      {scrambled ?? children}
    </span>
  );
};

export default ScrambleHover;
