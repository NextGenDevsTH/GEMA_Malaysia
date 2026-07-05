"use client";

import Link from "next/link";
import { pages, site, socialLinks, contactPoints } from "@/lib/site";
import { motion } from "framer-motion";
import { MagneticLink } from "@/components/magnetic-link";

export function SiteFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-white/8 bg-black/76"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="glass-surface grid gap-8 rounded-[36px] p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
          <div className="max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.36em] text-white/42">GEMA</p>
            <h2 className="mt-4 text-[clamp(2.4rem,4vw,4.6rem)] font-semibold tracking-[-0.07em] text-white">
              {site.name}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
              {site.brandLine} {site.sourceNote}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticLink
                href={site.registerUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[linear-gradient(135deg,_rgba(216,180,95,0.95),_rgba(127,209,193,0.78))] px-5 py-3 text-sm font-semibold text-[#071013]"
              >
                Join GEMA
              </MagneticLink>
              <MagneticLink
                href="/contact"
                className="rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm text-white/84 transition hover:bg-white/10"
              >
                Contact
              </MagneticLink>
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/42">Contact</p>
            <div className="mt-4 grid gap-2">
              {contactPoints.map((item) => (
                <div key={item.label} className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-white/82">{item.label}</p>
                  <p className="mt-1 text-sm text-white/58">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/42">Quick Links</p>
            <div className="mt-4 grid gap-2">
              {pages.slice(0, 8).map((page) => (
                <Link key={page.href} href={page.href} className="rounded-2xl px-3 py-2 text-sm text-white/68 transition hover:bg-white/8 hover:text-white">
                  {page.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/42">Official Paths</p>
            <div className="mt-4 grid gap-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="rounded-2xl px-3 py-2 text-sm text-white/68 transition hover:bg-white/8 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/privacy-policy" className="rounded-2xl px-3 py-2 text-sm text-white/68 transition hover:bg-white/8 hover:text-white">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-6 text-xs text-white/40 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Built as an editorial, accessible, mobile-first public experience.</p>
        </div>
      </div>
    </motion.footer>
  );
}
