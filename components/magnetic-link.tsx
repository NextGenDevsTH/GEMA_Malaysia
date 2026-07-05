"use client";

import Link from "next/link";
import type { PropsWithChildren } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

type MagneticLinkProps = PropsWithChildren<{
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}>;

export function MagneticLink({ href, className, target, rel, children }: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 24, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 280, damping: 24, mass: 0.25 });
  const translateX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  return (
    <motion.span
      className="inline-flex"
      whileHover={reduceMotion ? undefined : { scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      style={reduceMotion ? undefined : { x: translateX, y: translateY }}
      onMouseMove={(event) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        if (reduceMotion) return;
        x.set(0);
        y.set(0);
      }}
    >
      <Link
        href={href}
        target={target}
        rel={rel}
        className={[
          "transform-gpu will-change-transform transition duration-300",
          className,
        ].join(" ")}
      >
        {children}
      </Link>
    </motion.span>
  );
}
