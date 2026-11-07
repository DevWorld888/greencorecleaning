"use client";

import { motion } from "motion/react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Keep the element visible from the first paint (e.g. the LCP heading). */
  fade?: boolean;
  /** Animate when scrolled into view instead of on page load (below-the-fold sections). */
  inView?: boolean;
};

export function Reveal({ children, className, delay = 0, fade = true, inView = false }: RevealProps) {
  const visible = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: fade ? 0 : 1, y: 12 }}
      animate={inView ? undefined : visible}
      whileInView={inView ? visible : undefined}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.7, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

export function Settle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1.04 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.4, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
