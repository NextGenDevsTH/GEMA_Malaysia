"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticLink } from "@/components/magnetic-link";
import { useEffect, useState } from "react";

type NavLink = {
  href: string;
  label: string;
  description?: string;
};

type NavGroup = {
  label: string;
  href: string;
  kicker: string;
  links: NavLink[];
};

const primaryLinks: NavLink[] = [{ href: "/", label: "Home" }];

const navGroups: NavGroup[] = [
  {
    label: "About",
    href: "/about",
    kicker: "Identity",
    links: [
      { href: "/about", label: "Overview", description: "Purpose, role, and public profile" },
      { href: "/history", label: "History", description: "Timeline and organisational background" },
      { href: "/vision", label: "Vision", description: "Long-term direction" },
      { href: "/mission", label: "Mission", description: "What guides the work" },
    ],
  },
  {
    label: "Organisation",
    href: "/leadership",
    kicker: "People",
    links: [
      { href: "/leadership", label: "Leadership", description: "National roles and responsibilities" },
      { href: "/organization-structure", label: "Structure", description: "How the organisation is arranged" },
      { href: "/state-chairpersons", label: "State Chairpersons", description: "State-level representation" },
    ],
  },
  {
    label: "Programs",
    href: "/activities",
    kicker: "Action",
    links: [
      { href: "/activities", label: "Activities", description: "Programs, events, and service work" },
      { href: site.registerUrl, label: "Join Us", description: "Volunteer and membership pathway" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    kicker: "Archive",
    links: [
      { href: "/media", label: "Media Hub", description: "Photos and videos in one place" },
      { href: "/gallery", label: "Gallery", description: "Visual archive" },
      { href: "/media/photos", label: "Photos", description: "Photo collections" },
      { href: "/media/videos", label: "Videos", description: "Video updates" },
    ],
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const scrollY = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-3 z-50 px-3 sm:top-4 sm:px-4"
    >
      <div className="glass-surface relative z-[70] mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 rounded-full px-3 py-2.5 shadow-[0_18px_70px_rgba(0,0,0,0.32)] ring-1 ring-white/8 sm:gap-4 sm:px-4">
        <Link href="/" className="group flex min-w-0 items-center gap-3 rounded-full pr-2 text-white transition duration-300 hover:bg-white/[0.03]">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,_rgba(141,84,255,0.95),_rgba(168,123,255,0.82))] text-sm font-semibold tracking-[0.28em] text-[#ffffff] ring-1 ring-white/10 transition duration-300 group-hover:scale-[1.03]">
            G
          </span>
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="text-[11px] font-semibold uppercase tracking-[0.42em] text-white">
              {site.shortName}
            </span>
            <span className="max-w-[14rem] truncate text-[11px] leading-4 text-white">
              Pemuda GEMA Malaysia
            </span>
          </span>
        </Link>

        <motion.nav
          className="hidden items-center rounded-full border border-white/8 bg-black/20 p-1 xl:flex"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04, delayChildren: 0.12 } },
          }}
        >
          {primaryLinks.map((page) => (
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
              <Link href={page.href} className="relative z-10 rounded-full px-3 py-2 text-sm text-white transition duration-300 hover:text-white">
                {page.label}
              </Link>
            </motion.div>
          ))}
          {navGroups.map((group) => {
            const active = isGroupActive(pathname, group);

            return (
              <motion.div
                key={group.label}
                className="group/nav relative"
                variants={{
                  hidden: { opacity: 0, y: -8 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/9 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 240, damping: 24 }}
                  />
                ) : null}
                <Link
                  href={group.href}
                  className="relative z-10 flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-white transition duration-300 hover:text-white"
                >
                  {group.label}
                  <span className="text-[10px] text-white transition duration-300 group-hover/nav:translate-y-0.5 group-hover/nav:text-white">
                    v
                  </span>
                </Link>

                <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3 opacity-0 blur-sm transition duration-200 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-hover/nav:blur-0 group-focus-within/nav:pointer-events-auto group-focus-within/nav:opacity-100 group-focus-within/nav:blur-0">
                  <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#1b1130]/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                    <div className="border-b border-white/8 px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.32em] text-white">{group.kicker}</p>
                      <p className="mt-1 text-sm text-white">{group.label}</p>
                    </div>
                    <div className="grid gap-1 p-1">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                          className={`rounded-[18px] px-3 py-3 transition duration-200 ${
                            isActive(pathname, link.href)
                              ? "bg-white/9 text-white"
                              : "text-white hover:bg-white/7 hover:text-white"
                          }`}
                        >
                          <span className="block text-sm">{link.label}</span>
                          {link.description ? (
                            <span className="mt-0.5 block text-xs leading-5 text-white">{link.description}</span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.nav>

        <div className="hidden items-center gap-3 sm:flex">
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold tracking-[0.18em] text-white">
            EN | BM
          </span>
          <MagneticLink
            href={site.registerUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white transition duration-300 hover:border-white/18 hover:bg-white/10"
          >
            Join Us
          </MagneticLink>
          <MagneticLink
            href="/contact"
            className="rounded-full bg-[linear-gradient(135deg,_rgba(141,84,255,0.95),_rgba(168,123,255,0.78))] px-4 py-2 text-sm font-semibold text-[#ffffff] transition duration-300 hover:translate-y-[-1px]"
          >
            Contact
          </MagneticLink>
        </div>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
          className="relative z-[65] rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white transition hover:bg-white/10 xl:hidden"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation"
              className="fixed inset-0 z-[55] cursor-default bg-black/48 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              id="mobile-navigation"
              className="fixed inset-x-3 top-[5.75rem] z-[60] max-h-[calc(100dvh-7rem)] touch-pan-y overflow-y-auto overscroll-contain rounded-[28px] border border-white/10 bg-[#1b1130]/95 p-3 text-white shadow-[0_24px_80px_rgba(20,13,38,0.28)] backdrop-blur-2xl xl:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid gap-2">
                {primaryLinks.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className={`rounded-2xl px-4 py-3 text-sm text-white transition hover:bg-white/7 ${
                      isActive(pathname, page.href) ? "bg-white/9" : ""
                    }`}
                  >
                    {page.label}
                  </Link>
                ))}
                {navGroups.map((group) => (
                  <div key={group.label} className="rounded-[22px] border border-white/10 bg-white/6 p-2">
                    <Link
                      href={group.href}
                      className={`flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm text-white transition hover:bg-white/7 ${
                        isGroupActive(pathname, group) ? "bg-white/9" : ""
                      }`}
                    >
                      <span>{group.label}</span>
                      <span className="text-[10px] uppercase tracking-[0.26em] text-white">{group.kicker}</span>
                    </Link>
                    <div className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-2">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                          className={`rounded-2xl px-3 py-2.5 text-sm text-white transition hover:bg-white/7 ${
                            isActive(pathname, link.href) ? "bg-white/9" : ""
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid gap-2">
                <Link
                  href={site.registerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-[linear-gradient(135deg,_rgba(141,84,255,0.95),_rgba(168,123,255,0.78))] px-4 py-3 text-center text-sm font-semibold text-[#ffffff]"
                >
                  Join Us
                </Link>
                <Link
                  href="/contact"
                  className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Contact
                </Link>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function isGroupActive(pathname: string, group: NavGroup) {
  return isActive(pathname, group.href) || group.links.some((link) => isActive(pathname, link.href));
}
