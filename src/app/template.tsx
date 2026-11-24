"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCurtain } from "@/components/Curtain";
import { IN_OUT } from "@/components/motion";

// A curtain lifts off every page as it mounts: black by default, or the colour of the project that was just opened.
export default function Template({ children }: { children: React.ReactNode }) {
  const { colour } = useCurtain();
  const [ground] = useState(() => colour.current);
  useEffect(() => {
    colour.current = "#000";
  }, [colour]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] origin-top"
        style={{ background: ground }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease: IN_OUT }}
      />
      {children}
    </>
  );
}
