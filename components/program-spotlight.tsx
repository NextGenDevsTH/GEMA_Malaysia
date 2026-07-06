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
  const activeSentence = shortenCopy(active.summary);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
      <div className="grid gap-4">
        <motion.div
          className="relative overflow-hidden rounded-[42px] border border-white/10 bg-black/24 shadow-soft"
          initial={false}
          whileHover={reduceMotion ? undefined : { rotateX: 1.2, rotateY: -1.2 }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative aspect-[16/10] min-h-[32rem] overflow-hidden lg:min-h-[42rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {activeVisual ? (
                  <Image
                    src={activeVisual.urlPath}
                    alt={activeVisual.title}
                    fill
                    priority={activeIndex === 0}
                    sizes="(max-width: 1280px) 100vw, 58vw"
                    className="object-cover"
                    style={{ objectPosition: activeVisual.objectPosition }}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.03),_rgba(0,0,0,0.12)_28%,_rgba(0,0,0,0.64))]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-4 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02))] p-6 shadow-soft sm:p-7"
        >
          <div className="grid gap-3">
            <h3 className="text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[0.94] tracking-[-0.08em] text-white">
              {active.title}
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-white/68 sm:text-[15px]">{activeSentence}</p>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-5">
            <MagneticLink
              href={`/activities/${active.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2.5 text-sm font-medium text-white/88 transition hover:bg-white/12"
            >
              Explore
              <span aria-hidden className="text-sm leading-none">
                →
              </span>
            </MagneticLink>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-0 overflow-hidden rounded-[36px] border border-white/10 bg-black/14 shadow-soft">
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
        "group border-b border-white/8 px-5 py-5 text-left transition last:border-b-0 sm:px-6",
        isActive ? "bg-[linear-gradient(135deg,_rgba(141,84,255,0.1),_rgba(255,255,255,0.03))]" : "bg-transparent hover:bg-white/4",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid gap-2">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-[11px] font-medium text-white/54">
              0{index + 1}
            </span>
            <p className="text-lg font-medium tracking-[-0.05em] text-white sm:text-xl">{activity.title}</p>
          </div>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-white/58 transition group-hover:bg-white/10">
          Explore
        </span>
      </div>
      <div className="mt-5 h-px w-full bg-white/8">
        <motion.div
          initial={false}
          animate={{ scaleX: isActive ? 1 : 0.22 }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="h-px origin-left bg-[linear-gradient(90deg,_rgba(141,84,255,0.95),_rgba(168,123,255,0.78))]"
        />
      </div>
    </motion.button>
  );
}

function shortenCopy(text: string, maxWords = 14) {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return `${words.slice(0, maxWords).join(" ")}...`;
}
