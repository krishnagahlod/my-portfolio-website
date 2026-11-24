"use client";

import { motion } from "motion/react";
import { IN_OUT } from "@/components/motion";

// A black curtain lifts off every page as it mounts.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-black"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease: IN_OUT }}
      />
      {children}
    </>
  );
}
