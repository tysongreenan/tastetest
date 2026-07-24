"use client";

import { Check, Copy, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useCallback, useState } from "react";

export interface ButtonCopyProps {
  className?: string;
  disabled?: boolean;
  duration?: number;
  idleIcon?: ReactNode;
  loadingDuration?: number;
  loadingIcon?: ReactNode;
  onCopy?: () => Promise<void> | void;
  successIcon?: ReactNode;
  /** Visible labels make the action scannable (Don't Make Me Think). */
  labels?: {
    idle?: string;
    loading?: string;
    success?: string;
  };
  showIcon?: boolean;
}

const defaultIcons = {
  idle: <Copy size={16} />,
  loading: <LoaderCircle className="animate-spin" size={16} />,
  success: <Check size={16} />,
};

export default function ButtonCopy({
  onCopy,
  idleIcon = defaultIcons.idle,
  loadingIcon = defaultIcons.loading,
  successIcon = defaultIcons.success,
  className = "",
  duration = 2000,
  loadingDuration = 1000,
  disabled = false,
  labels,
  showIcon = true,
}: ButtonCopyProps) {
  const [buttonState, setButtonState] = useState<
    "idle" | "loading" | "success"
  >("idle");
  const shouldReduceMotion = useReducedMotion();

  const handleClick = useCallback(async () => {
    setButtonState("loading");
    if (onCopy) {
      await onCopy();
    }
    setTimeout(() => {
      setButtonState("success");
    }, loadingDuration);
    setTimeout(() => {
      setButtonState("idle");
    }, loadingDuration + duration);
  }, [onCopy, loadingDuration, duration]);

  const icons = {
    idle: idleIcon,
    loading: loadingIcon,
    success: successIcon,
  };

  const textLabels = {
    idle: labels?.idle ?? "Copy",
    loading: labels?.loading ?? "Copying…",
    success: labels?.success ?? "Copied",
  };

  const hasVisibleLabel = Boolean(labels);

  return (
    <div className="flex justify-center">
      <button
        aria-label={textLabels[buttonState]}
        aria-live="polite"
        className={`relative min-h-[44px] w-auto min-w-[44px] cursor-pointer overflow-hidden rounded-full border bg-background p-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 ${hasVisibleLabel ? "px-4" : ""} ${className}`}
        disabled={buttonState !== "idle" || disabled}
        onClick={handleClick}
        type="button"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            className="flex w-full items-center justify-center gap-2 text-sm font-medium"
            exit={
              shouldReduceMotion
                ? { opacity: 0, transition: { duration: 0 } }
                : { opacity: 0, y: 25, filter: "blur(10px)" }
            }
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -25, filter: "blur(10px)" }
            }
            key={buttonState}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring" as const, duration: 0.25, bounce: 0 }
            }
          >
            {showIcon ? icons[buttonState] : null}
            {hasVisibleLabel ? <span>{textLabels[buttonState]}</span> : null}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
