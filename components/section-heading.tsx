"use client";

import { Reveal } from "@/components/reveal";
import { motion, useReducedMotion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();
  const words = title.split(" ");

  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.42em] text-white/44">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-[clamp(2.25rem,4vw,4.45rem)] font-semibold leading-[0.96] tracking-[-0.075em] text-white">
          {reduceMotion
            ? title
            : words.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.55, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
                  className="mr-[0.18em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 sm:text-[15px]">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
