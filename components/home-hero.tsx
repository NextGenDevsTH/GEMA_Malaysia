"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useScroll } from "framer-motion";
import { site } from "@/lib/site";
import type { GalleryAsset } from "@/lib/gallery";
import { Chip } from "@/components/chip";
import { MagneticLink } from "@/components/magnetic-link";

type HomeHeroProps = {
  heroImage: Pick<GalleryAsset, "urlPath" | "title" | "caption" | "category" | "objectPosition">;
  supportingImages?: Pick<GalleryAsset, "urlPath" | "title" | "caption" | "category" | "objectPosition">[];
};

export function HomeHero({ heroImage, supportingImages = [] }: HomeHeroProps) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 18, mass: 0.45 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 18, mass: 0.45 });
  const shiftX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const shiftY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -54]);
  const copyScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [supportOne, supportTwo] = supportingImages;

  return (
    <section ref={heroRef} className="relative overflow-hidden border-b border-white/8">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,_rgba(216,180,95,0.22),_transparent_24%),radial-gradient(circle_at_82%_14%,_rgba(127,209,193,0.18),_transparent_22%),radial-gradient(circle_at_50%_100%,_rgba(255,255,255,0.08),_transparent_26%),linear-gradient(180deg,_rgba(10,13,14,1),_rgba(5,6,7,1)_78%)]" />
      <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      <motion.div
        className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left bg-[linear-gradient(90deg,transparent,_rgba(216,180,95,0.95),_rgba(127,209,193,0.9),transparent)]"
        style={{ scaleX: progressWidth }}
      />
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { y: [0, -14, 0], x: [0, 10, 0] }}
        transition={reduceMotion ? undefined : { duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[8%] top-[15%] h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(216,180,95,0.24),_rgba(216,180,95,0)_70%)] blur-2xl"
      />
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { y: [0, 18, 0], x: [0, -12, 0] }}
        transition={reduceMotion ? undefined : { duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[10%] top-[18%] h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(127,209,193,0.18),_rgba(127,209,193,0)_70%)] blur-2xl"
      />

      <div className="mx-auto grid min-h-[calc(100svh-88px)] w-full max-w-[1600px] gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[0.98fr_1.02fr] lg:items-end lg:px-8 lg:py-8">
        <motion.div
          style={reduceMotion ? undefined : { y: copyY, scale: copyScale }}
          className="relative z-10 flex h-full flex-col justify-between gap-10 pt-8 lg:py-4"
        >
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] uppercase tracking-[0.42em] text-white/50"
            >
              Official public experience
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.03, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-4xl text-balance text-[clamp(3rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-white"
            >
              Youth leadership,
              <span className="block text-white/72">made visible.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-2xl text-pretty text-base leading-8 text-white/66 sm:text-[15px]"
            >
              Pertubuhan Pemuda GEMA Malaysia brings leadership, volunteerism, education, community, environment,
              sports, and humanitarian action into one national youth movement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <MagneticLink
                href={site.registerUrl}
                className="rounded-full bg-[linear-gradient(135deg,_rgba(216,180,95,0.95),_rgba(127,209,193,0.78))] px-6 py-3 text-sm font-semibold text-[#071013] transition duration-300 hover:translate-y-[-1px]"
              >
                Join GEMA
              </MagneticLink>
              <MagneticLink
                href="/gallery"
                className="rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm text-white/84 transition duration-300 hover:border-white/20 hover:bg-white/10"
              >
                View gallery
              </MagneticLink>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {["Leadership", "Volunteerism", "Education", "Humanitarian impact"].map((label) => (
                <Chip key={label}>{label}</Chip>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl rounded-[28px] border border-white/10 bg-black/24 p-5 backdrop-blur-xl"
          >
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/42">Movement note</p>
            <p className="mt-3 text-lg leading-8 text-white/86 sm:text-xl">
              Young people standing together. Communities built through service. Leadership made visible in the
              streets, halls, and gathering spaces where the work actually happens.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
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
          className="relative min-h-[74svh] w-full"
        >
          <motion.div
            style={reduceMotion ? undefined : { x: shiftX, y: stageY, scale: stageScale }}
            className="relative h-full min-h-[74svh] overflow-hidden rounded-[40px] border border-white/10 shadow-[0_30px_110px_rgba(0,0,0,0.52)]"
          >
            <motion.div
              initial={reduceMotion ? false : { scale: 1.06, opacity: 0 }}
              animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={heroImage.urlPath}
                alt={heroImage.title}
                fill
                priority
                quality={92}
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="object-cover"
                style={{ objectPosition: heroImage.objectPosition }}
              />
            </motion.div>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.06),_rgba(0,0,0,0.48)_60%,_rgba(0,0,0,0.8)),radial-gradient(circle_at_50%_0%,_rgba(216,180,95,0.2),_transparent_36%)]" />

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 w-full p-4 sm:p-6"
            >
              <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-white/42">Editorial sequence</p>
                  <p className="mt-1 text-sm text-white/88">Leadership, community, and service in motion</p>
                </div>
                <p className="max-w-[16rem] text-right text-xs leading-5 text-white/58">Real GEMA photography, arranged as a public story.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-10 right-10 z-10 sm:bottom-12 sm:right-12 lg:bottom-14 lg:right-14"
            >
              <div className="relative aspect-[24/9] min-h-[6rem] overflow-hidden rounded-[28px] border border-white/10 bg-black/22 sm:min-h-[7rem] lg:min-h-[8rem]">
                {supportTwo ? (
                  <motion.div
                    initial={reduceMotion ? false : { scale: 1.04 }}
                    animate={reduceMotion ? undefined : { scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={supportTwo.urlPath}
                      alt={supportTwo.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 22vw"
                      className="object-contain bg-black"
                      style={{ objectPosition: supportTwo.objectPosition }}
                    />
                  </motion.div>
                ) : null}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.02),_rgba(0,0,0,0.48))]" />
              </div>
            </motion.div>

            <motion.div
              aria-hidden
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={reduceMotion ? undefined : { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="pointer-events-none absolute right-6 top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,_rgba(216,180,95,0.18),_rgba(216,180,95,0)_70%)] blur-xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
