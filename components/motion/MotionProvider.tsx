"use client";

import { MotionConfig } from "motion/react";

// "user" turns off transform animations when the visitor prefers reduced motion.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
