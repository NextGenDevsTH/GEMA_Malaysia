"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Surface } from "@/components/surface";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

type TimelineRiverProps = {
  items: readonly TimelineItem[];
};

export function TimelineRiver({ items }: TimelineRiverProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const marker = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative grid gap-5 lg:grid-cols-[0.42fr_1fr]">
      <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
        <Surface className="relative h-full overflow-hidden p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,180,95,0.14),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(127,209,193,0.12),_transparent_32%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Progress</p>
              <h3 className="mt-4 max-w-xs text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
                Narrative motion, driven by scroll.
              </h3>
            </div>

            <div className="relative mt-12 h-56">
              <div className="absolute left-6 top-0 h-full w-px bg-white/10" />
              <motion.div
                style={reduceMotion ? undefined : { height: fill }}
                className="absolute left-6 top-0 h-full w-px origin-top bg-[linear-gradient(180deg,_rgba(216,180,95,0.95),_rgba(127,209,193,0.82))]"
              />
              {items.map((item, index) => (
                <motion.div
                  key={item.year}
                  style={reduceMotion ? undefined : { y: index * 0 }}
                  className="absolute left-0 flex items-center gap-3"
                  initial={false}
                  animate={{ top: `${(index / Math.max(items.length - 1, 1)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-black/25 text-[11px] uppercase tracking-[0.2em] text-white/76">
                    {item.year}
                  </span>
                </motion.div>
              ))}
              <motion.div
                className="absolute left-[1.22rem] top-0 h-5 w-5 rounded-full border border-[#071013] bg-[linear-gradient(135deg,_rgba(216,180,95,0.98),_rgba(127,209,193,0.9))] shadow-[0_0_26px_rgba(216,180,95,0.35)]"
                style={reduceMotion ? undefined : { top: marker }}
              />
            </div>
          </div>
        </Surface>
      </div>

      <div className="grid gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={false}
            whileInView={reduceMotion ? undefined : { scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            className="group"
          >
            <Surface className="overflow-hidden p-0">
              <div className="grid gap-0 lg:grid-cols-[140px_1fr]">
                <div className="relative border-b border-white/8 bg-[linear-gradient(180deg,_rgba(255,255,255,0.03),_rgba(255,255,255,0.01))] p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[11px] uppercase tracking-[0.34em] text-white/42">Chapter</p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.06em] text-white">{item.year}</p>
                  <motion.div
                    className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/8"
                    initial={false}
                    animate={{ scaleX: index === 0 ? 1 : 0.25 }}
                    transition={{ type: "spring", stiffness: 160, damping: 20 }}
                  >
                    <div className="h-full origin-left rounded-full bg-[linear-gradient(90deg,_rgba(216,180,95,0.95),_rgba(127,209,193,0.78))]" />
                  </motion.div>
                </div>
                <div className="p-6 sm:p-7">
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    className="max-w-3xl"
                  >
                    <h4 className="text-xl font-medium text-white sm:text-2xl">{item.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-white/66">{item.description}</p>
                  </motion.div>
                </div>
              </div>
            </Surface>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
