"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.22 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[linear-gradient(90deg,transparent,_rgba(141,84,255,0.95),_rgba(168,123,255,0.95),_rgba(141,84,255,0.95),transparent)]"
      style={{ scaleX }}
    />
  );
}
