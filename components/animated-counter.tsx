"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
};

export function AnimatedCounter({ value, suffix = "", duration = 1.2, decimals = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [display, setDisplay] = useState(decimals ? "0.0" : "0");

  useEffect(() => {
    if (!isInView) return;

    const state = { count: 0 };
    const format = (num: number) => num.toFixed(decimals);

    const tween = gsap.to(state, {
      count: value,
      duration,
      ease: "power3.out",
      onUpdate: () => {
        setDisplay(format(state.count));
      },
    });

    return () => {
      tween.kill();
    };
  }, [decimals, duration, isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
