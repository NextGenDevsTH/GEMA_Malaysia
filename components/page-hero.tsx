"use client";

import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { MagneticLink } from "@/components/magnetic-link";
import { motion, useReducedMotion } from "framer-motion";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();
  const words = title.split(" ");

  return (
    <section className="relative overflow-hidden border-b border-white/8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,95,0.2),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(127,209,193,0.15),_transparent_25%),linear-gradient(180deg,_rgba(10,13,14,1),_rgba(5,6,7,1))]" />
      <div className="mx-auto grid w-full max-w-[1600px] gap-6 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          {eyebrow ? (
            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[color:var(--accent-strong)]" />
                <p className="text-[11px] uppercase tracking-[0.42em] text-white/52">{eyebrow}</p>
              </div>
            </Reveal>
          ) : null}
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-balance text-[clamp(2.9rem,6vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.09em] text-white">
              {reduceMotion
                ? title
                : words.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.04 + index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                      className="mr-[0.18em] inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/64 sm:text-lg">
              {description}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {primaryAction ? (
                <MagneticLink
                  href={primaryAction.href}
                  className="rounded-full bg-[linear-gradient(135deg,_rgba(216,180,95,0.95),_rgba(127,209,193,0.78))] px-6 py-3 text-sm font-semibold text-[#071013] transition duration-300 hover:translate-y-[-1px]"
                >
                  {primaryAction.label}
                </MagneticLink>
              ) : null}
              {secondaryAction ? (
                <MagneticLink
                  href={secondaryAction.href}
                  className="rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm text-white/82 transition duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  {secondaryAction.label}
                </MagneticLink>
              ) : null}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 inline-flex max-w-2xl items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/48">
              <span className="h-2 w-2 rounded-full bg-[color:var(--accent-strong)]" />
              {site.sourceNote}
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:ml-auto lg:max-w-[28rem]" delay={0.18}>
          <div className="glass-surface rounded-[36px] p-5">
            <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.34em] text-white/42">Public record</p>
                <p className="mt-2 text-lg font-medium tracking-[-0.04em] text-white">One source of truth</p>
              </div>
              <div className="grid place-items-center rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/52">
                Live
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <div className="rounded-[28px] border border-white/8 bg-black/18 p-5">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/42">Official site identity</p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.05em] text-white">GEMA Malaysia</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[28px] border border-white/8 bg-black/18 p-5">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/42">Confirmed URL</p>
                  <p className="mt-3 break-all text-sm leading-6 text-white/84">{site.officialSiteUrl}</p>
                </div>
                <div className="rounded-[28px] border border-white/8 bg-black/18 p-5">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/42">Join route</p>
                  <MagneticLink
                    href={site.registerUrl}
                    className="mt-3 inline-flex rounded-full bg-white/8 px-4 py-2 text-sm font-medium text-white/86 transition hover:bg-white/12"
                  >
                    Join GEMA
                  </MagneticLink>
                </div>
              </div>
              <div className="rounded-[28px] border border-white/8 bg-black/18 p-5">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/42">Source note</p>
                <p className="mt-3 text-sm leading-7 text-white/68">{site.sourceNote}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
