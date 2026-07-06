"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import iconMark from "@/gallery/icon-GEM.png";

export function PurposeMark() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mb-12"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: reduceMotion ? 0 : 0.68, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="relative h-[72px] w-[72px]"
        animate={reduceMotion ? undefined : { scale: [1, 1.025, 1], rotate: [-1, 1, -1] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={iconMark}
          alt=""
          fill
          sizes="72px"
          className="object-contain"
          aria-hidden
          priority={false}
        />
      </motion.div>
    </motion.div>
  );
}
