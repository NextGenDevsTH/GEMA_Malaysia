"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Activity } from "@/lib/site";
import { MagneticLink } from "@/components/magnetic-link";
import type { GalleryAsset } from "@/lib/gallery";

type ProgramSpotlightProps = {
  activities: readonly Activity[];
  visuals: readonly Pick<GalleryAsset, "urlPath" | "title" | "caption" | "category" | "objectPosition">[];
};

export function ProgramSpotlight({ activities, visuals }: ProgramSpotlightProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = activities[activeIndex] ?? activities[0];
  const activeVisual = visuals[activeIndex % Math.max(visuals.length, 1)] ?? visuals[0];

  return (
    <div className="grid gap-5 xl:grid-cols-[1.06fr_0.94fr]">
      <motion.div
        className="relative overflow-hidden rounded-[38px] border border-white/10 bg-black/24 shadow-soft"
        initial={false}
        whileHover={reduceMotion ? undefined : { rotateX: 1.2, rotateY: -1.2 }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative min-h-[640px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {activeVisual ? (
                <Image
                  src={activeVisual.urlPath}
                  alt={activeVisual.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 54vw"
                  className="object-cover"
                  style={{ objectPosition: activeVisual.objectPosition }}
                />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.06),_rgba(0,0,0,0.56)_60%,_rgba(0,0,0,0.82)),radial-gradient(circle_at_50%_0%,_rgba(216,180,95,0.18),_transparent_34%)]" />
              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-full border border-white/10 bg-black/24 px-4 py-2 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-white/42">Program chapter</p>
                    <p className="mt-1 text-sm text-white/86">{active.category}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.26em] text-white/58">
                    {active.state}
                  </span>
                </div>

                <div className="max-w-2xl">
                  <p className="text-[11px] uppercase tracking-[0.34em] text-white/46">{active.poster}</p>
                  <h3 className="mt-4 text-[clamp(2.3rem,4.4vw,4.8rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-white">
                    {active.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/72">{active.summary}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr] sm:items-end">
                  <div className="rounded-[28px] border border-white/10 bg-black/24 p-4 backdrop-blur-xl">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/42">Editorial note</p>
                    <p className="mt-2 text-sm leading-7 text-white/66">
                      Real movement, public service, and visible leadership. The next chapter stays grounded in action,
                      not interface decoration.
                    </p>
                  </div>
                  <MagneticLink
                    href={`/activities/${active.slug}`}
                    className="inline-flex justify-center rounded-full bg-white/8 px-5 py-3 text-sm font-medium text-white/88"
                  >
                    Open activity
                  </MagneticLink>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="grid gap-0 overflow-hidden rounded-[34px] border border-white/10 bg-black/16">
        {activities.map((activity, index) => (
          <SpotlightItem
            key={activity.slug}
            activity={activity}
            index={index}
            isActive={index === activeIndex}
            onActivate={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

function SpotlightItem({
  activity,
  index,
  isActive,
  onActivate,
}: {
  activity: Activity;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <motion.button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={[
        "group border-b border-white/8 p-5 text-left transition last:border-b-0",
        isActive ? "bg-[linear-gradient(135deg,_rgba(216,180,95,0.14),_rgba(255,255,255,0.03))]" : "bg-transparent hover:bg-white/4",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">0{index + 1}</span>
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/42">{activity.category}</p>
        </div>
        <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">{activity.state}</span>
      </div>
      <p className="mt-4 text-xl font-medium tracking-[-0.05em] text-white">{activity.title}</p>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-white/64">{activity.summary}</p>
      <div className="mt-4 h-px w-full bg-white/8">
        <motion.div
          initial={false}
          animate={{ scaleX: isActive ? 1 : 0.22 }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="h-px origin-left bg-[linear-gradient(90deg,_rgba(216,180,95,0.95),_rgba(127,209,193,0.78))]"
        />
      </div>
    </motion.button>
  );
}
