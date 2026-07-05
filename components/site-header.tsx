"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pages, site } from "@/lib/site";
import { motion } from "framer-motion";
import { MagneticLink } from "@/components/magnetic-link";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-3 z-50 px-3 sm:top-4 sm:px-4"
    >
      <div className="glass-surface mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 rounded-full px-4 py-3 sm:px-5">
        <Link href="/" className="group flex items-center gap-3 text-white">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,_rgba(216,180,95,0.95),_rgba(127,209,193,0.82))] text-sm font-semibold tracking-[0.28em] text-[#071013] ring-1 ring-white/10 transition duration-300 group-hover:scale-[1.03]">
            G
          </span>
          <span className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-[0.42em] text-white/88">
              {site.shortName}
            </span>
            <span className="max-w-[14rem] text-[11px] leading-4 text-white/56">
              Pemuda GEMA Malaysia
            </span>
          </span>
        </Link>

        <motion.nav
          className="hidden items-center gap-2 xl:flex"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04, delayChildren: 0.12 } },
          }}
        >
          {pages.map((page) => (
            <motion.div
              key={page.href}
              className="relative"
              variants={{
                hidden: { opacity: 0, y: -8 },
                show: { opacity: 1, y: 0 },
              }}
            >
              {isActive(pathname, page.href) ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/9 ring-1 ring-white/10"
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                />
              ) : null}
              <Link href={page.href} className="relative z-10 rounded-full px-3 py-2 text-sm text-white/68 transition duration-300 hover:text-white">
                {page.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <div className="hidden items-center gap-3 sm:flex">
          <MagneticLink
            href={site.registerUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/82 transition duration-300 hover:border-white/18 hover:bg-white/10"
          >
            Join Us
          </MagneticLink>
          <MagneticLink
            href="/contact"
            className="rounded-full bg-[linear-gradient(135deg,_rgba(216,180,95,0.95),_rgba(127,209,193,0.78))] px-4 py-2 text-sm font-semibold text-[#071013] transition duration-300 hover:translate-y-[-1px]"
          >
            Contact
          </MagneticLink>
        </div>

        <details className="relative xl:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/86 transition hover:bg-white/10">
            Menu
          </summary>
          <div className="glass-surface absolute right-0 mt-3 w-[min(92vw,340px)] overflow-hidden rounded-[28px] p-3">
            <div className="grid gap-1">
              {pages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="rounded-2xl px-4 py-3 text-sm text-white/76 transition hover:bg-white/8 hover:text-white"
                >
                  {page.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 grid gap-2">
              <Link
                href={site.registerUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-[linear-gradient(135deg,_rgba(216,180,95,0.95),_rgba(127,209,193,0.78))] px-4 py-3 text-center text-sm font-semibold text-[#071013]"
              >
                Join Us
              </Link>
              <Link
                href="/contact"
                className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-center text-sm text-white/82"
              >
                Contact
              </Link>
            </div>
          </div>
        </details>
      </div>
    </motion.header>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}
