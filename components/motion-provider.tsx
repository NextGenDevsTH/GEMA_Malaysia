"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

type MotionProviderProps = PropsWithChildren<{}>;

export function MotionProvider({ children }: MotionProviderProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  const pageKey = useMemo(() => pathname ?? "/", [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!ready ? (
          <motion.div
            key="boot"
            className="pointer-events-none fixed inset-0 z-[100] bg-[#050607]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(216,180,95,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(127,209,193,0.12),transparent_22%)]" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pageKey}
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
