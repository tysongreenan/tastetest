"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export interface AnimatedGradientBackgroundProps {
  /**
   * Initial size of the radial gradient (percentage width).
   * @default 110
   */
  startingGap?: number;

  /**
   * Enables or disables the breathing animation effect.
   * @default true
   */
  breathing?: boolean;

  /**
   * Colors for radial stops. Must match `gradientStops` length.
   * Panel default: cool light canvas + brand blues (not rainbow dark).
   */
  gradientColors?: string[];

  /**
   * Percentage stops 0–100, same length as `gradientColors`.
   */
  gradientStops?: number[];

  /**
   * Breathing speed. Lower = slower.
   * @default 0.02
   */
  animationSpeed?: number;

  /**
   * Breathing range in percentage points.
   * @default 5
   */
  breathingRange?: number;

  containerStyle?: React.CSSProperties;
  containerClassName?: string;

  /**
   * Extra vertical stretch for the gradient ellipse.
   * @default 0
   */
  topOffset?: number;
}

/** Panel brand-aligned defaults (DESIGN.md: cool ink, electric blue) */
const PANEL_COLORS = [
  "oklch(0.995 0.004 260)",
  "oklch(0.88 0.06 265)",
  "oklch(0.62 0.16 257)",
  "oklch(0.78 0.1 250)",
  "oklch(0.94 0.03 265)",
  "oklch(0.985 0.008 260)",
];

const PANEL_STOPS = [28, 42, 55, 68, 82, 100];

/**
 * Animated radial gradient background with optional breathing.
 * Uses `motion` (already in this project). Honors prefers-reduced-motion.
 */
export function AnimatedGradientBackground({
  startingGap = 115,
  breathing = true,
  gradientColors = PANEL_COLORS,
  gradientStops = PANEL_STOPS,
  animationSpeed = 0.018,
  breathingRange = 4,
  containerStyle = {},
  topOffset = 8,
  containerClassName = "",
}: AnimatedGradientBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  if (gradientColors.length !== gradientStops.length) {
    throw new Error(
      `gradientColors and gradientStops must have the same length. Got ${gradientColors.length} vs ${gradientStops.length}.`
    );
  }

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const stopsString = gradientStops
      .map((stop, index) => `${gradientColors[index]} ${stop}%`)
      .join(", ");

    const paint = (width: number) => {
      el.style.background = `radial-gradient(${width}% ${width + topOffset}% at 50% 18%, ${stopsString})`;
    };

    // Static first paint (also final state when reduced motion)
    paint(startingGap);

    if (reduceMotion || !breathing) {
      return;
    }

    let animationFrame = 0;
    let width = startingGap;
    let direction = 1;

    const animate = () => {
      if (width >= startingGap + breathingRange) direction = -1;
      if (width <= startingGap - breathingRange) direction = 1;
      width += direction * animationSpeed;
      paint(width);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [
    startingGap,
    breathing,
    gradientColors,
    gradientStops,
    animationSpeed,
    breathingRange,
    topOffset,
    reduceMotion,
  ]);

  return (
    <motion.div
      key="animated-gradient-background"
      aria-hidden
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              scale: 1.12,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
        transition: reduceMotion
          ? { duration: 0 }
          : {
              duration: 1.4,
              ease: [0.25, 0.1, 0.25, 1],
            },
      }}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        containerClassName
      )}
    >
      <div
        ref={containerRef}
        style={containerStyle}
        className="absolute inset-0"
      />
    </motion.div>
  );
}

export default AnimatedGradientBackground;
