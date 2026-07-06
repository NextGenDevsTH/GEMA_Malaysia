"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryAsset } from "@/lib/gallery";

type GalleryExhibitionProps = {
  assets: GalleryAsset[];
};

type Composition = {
  frame: string;
  image: string;
  meta: string;
  sizes: string;
};

const composition: Composition[] = [
  {
    frame: "md:col-span-7",
    image: "aspect-[16/10]",
    meta: "sm:grid-cols-[1fr_auto]",
    sizes: "(max-width: 768px) 100vw, 58vw",
  },
  {
    frame: "md:col-span-5 md:pt-20",
    image: "aspect-[4/5]",
    meta: "",
    sizes: "(max-width: 768px) 100vw, 42vw",
  },
  {
    frame: "md:col-span-4",
    image: "aspect-[3/4]",
    meta: "",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    frame: "md:col-span-8 md:pt-32",
    image: "aspect-[16/9]",
    meta: "sm:grid-cols-[1fr_auto]",
    sizes: "(max-width: 768px) 100vw, 67vw",
  },
  {
    frame: "md:col-span-5 md:col-start-2",
    image: "aspect-[5/6]",
    meta: "",
    sizes: "(max-width: 768px) 100vw, 42vw",
  },
  {
    frame: "md:col-span-5 md:col-start-7 md:pt-24",
    image: "aspect-[1/1]",
    meta: "",
    sizes: "(max-width: 768px) 100vw, 42vw",
  },
  {
    frame: "md:col-span-9 md:col-start-3",
    image: "aspect-[21/9]",
    meta: "sm:grid-cols-[1fr_auto]",
    sizes: "(max-width: 768px) 100vw, 75vw",
  },
  {
    frame: "md:col-span-4 md:pt-16",
    image: "aspect-[4/5]",
    meta: "",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    frame: "md:col-span-7 md:pt-4",
    image: "aspect-[13/9]",
    meta: "sm:grid-cols-[1fr_auto]",
    sizes: "(max-width: 768px) 100vw, 58vw",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function formatCount(value: number) {
  return value.toString().padStart(2, "0");
}

export function GalleryExhibition({ assets }: GalleryExhibitionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const categories = useMemo(() => ["All", ...Array.from(new Set(assets.map((asset) => asset.category)))], [assets]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    return assets.filter((asset) => {
      const matchesCategory = category === "All" || asset.category === category;
      const matchesQuery =
        !term ||
        [asset.title, asset.caption, asset.relativePath, asset.category].join(" ").toLowerCase().includes(term);

      return matchesCategory && matchesQuery;
    });
  }, [assets, category, query]);

  const activeAsset =
    activeIndex === null || filtered.length === 0
      ? null
      : filtered[((activeIndex % filtered.length) + filtered.length) % filtered.length];
  const currentIndex = activeAsset ? filtered.findIndex((asset) => asset.relativePath === activeAsset.relativePath) : -1;
  const previousAsset = currentIndex >= 0 ? filtered[(currentIndex - 1 + filtered.length) % filtered.length] : null;
  const nextAsset = currentIndex >= 0 ? filtered[(currentIndex + 1) % filtered.length] : null;

  const openAsset = useCallback(
    (asset: GalleryAsset) => {
      const index = filtered.findIndex((item) => item.relativePath === asset.relativePath);
      if (index >= 0) setActiveIndex(index);
    },
    [filtered],
  );

  const closeViewer = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || filtered.length === 0) return current;
      return (current - 1 + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || filtered.length === 0) return current;
      return (current + 1) % filtered.length;
    });
  }, [filtered.length]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setActiveIndex(null);
  }, [category, query]);

  useEffect(() => {
    if (!activeAsset) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [activeAsset]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!activeAsset) return;

      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeAsset, closeViewer, showNext, showPrevious]);

  const lightbox =
    isMounted && activeAsset
      ? createPortal(
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-[90] bg-black/88 text-white backdrop-blur-2xl"
              role="dialog"
              aria-modal="true"
              aria-label={`${activeAsset.title} lightbox`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
              onClick={closeViewer}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(216,180,95,0.12),_transparent_40%),linear-gradient(180deg,_rgba(255,255,255,0.04),_transparent_38%)]" />

              <motion.div
                className="relative grid h-[100dvh] grid-rows-[auto_minmax(0,1fr)_auto] px-4 py-4 sm:px-6 lg:px-8"
                initial={{ scale: shouldReduceMotion ? 1 : 0.98, y: shouldReduceMotion ? 0 : 12 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: shouldReduceMotion ? 1 : 0.985, y: shouldReduceMotion ? 0 : 8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(event) => event.stopPropagation()}
                onTouchStart={(event) => {
                  const touch = event.touches[0];
                  touchStart.current = { x: touch.clientX, y: touch.clientY };
                }}
                onTouchEnd={(event) => {
                  if (!touchStart.current) return;
                  const touch = event.changedTouches[0];
                  const dx = touch.clientX - touchStart.current.x;
                  const dy = touch.clientY - touchStart.current.y;
                  touchStart.current = null;

                  if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy)) return;
                  if (dx > 0) showPrevious();
                  else showNext();
                }}
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <p className="text-[11px] uppercase text-white/46">
                    {formatCount(currentIndex + 1)} / {formatCount(filtered.length)}
                  </p>
                  <button
                    type="button"
                    onClick={closeViewer}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm text-white/82 outline-none transition hover:bg-white/10 focus-visible:border-[color:var(--accent)] focus-visible:shadow-[0_0_0_4px_rgba(216,180,95,0.12)]"
                  >
                    Close
                  </button>
                </div>

                <div className="relative min-h-0 py-5 sm:py-6">
                  <button
                    type="button"
                    onClick={showPrevious}
                    className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/42 px-4 py-3 text-sm text-white/76 outline-none backdrop-blur-xl transition hover:bg-white/10 focus-visible:border-[color:var(--accent)] lg:block"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/42 px-4 py-3 text-sm text-white/76 outline-none backdrop-blur-xl transition hover:bg-white/10 focus-visible:border-[color:var(--accent)] lg:block"
                  >
                    Next
                  </button>

                  <motion.div
                    layoutId={`gallery-exhibition-${activeAsset.relativePath}`}
                    className="relative mx-auto h-full max-h-full w-full max-w-[min(86rem,100%)] overflow-hidden bg-[#0f0f0d]"
                  >
                    <Image
                      src={activeAsset.urlPath}
                      alt={activeAsset.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 86vw"
                      className="object-contain"
                      style={{ objectPosition: activeAsset.objectPosition }}
                      priority
                    />
                  </motion.div>

                  {previousAsset ? (
                    <Image src={previousAsset.urlPath} alt="" width={1} height={1} className="hidden" aria-hidden />
                  ) : null}
                  {nextAsset ? (
                    <Image src={nextAsset.urlPath} alt="" width={1} height={1} className="hidden" aria-hidden />
                  ) : null}
                </div>

                <div className="grid gap-4 border-t border-white/10 pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase text-[color:var(--accent)]">{activeAsset.category}</p>
                    <h3 className="mt-2 text-2xl font-medium leading-8 text-white sm:text-3xl">{activeAsset.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-white/62">{activeAsset.caption}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/76 outline-none transition hover:bg-white/10 focus-visible:border-[color:var(--accent)]"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/76 outline-none transition hover:bg-white/10 focus-visible:border-[color:var(--accent)]"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#080807] text-white"
      onPointerMove={(event) => {
        if (shouldReduceMotion) return;
        const x = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
        const y = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
        setPointer({ x, y });
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(216,180,95,0.16),_transparent_68%)] blur-3xl"
          animate={shouldReduceMotion ? undefined : { x: pointer.x * 24, y: pointer.y * 18 }}
          transition={{ type: "spring", stiffness: 60, damping: 24 }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(8,8,7,0.16),_#080807_76%),radial-gradient(circle_at_85%_12%,_rgba(127,209,193,0.1),_transparent_28%),radial-gradient(circle_at_10%_30%,_rgba(216,180,95,0.08),_transparent_26%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <section className="relative mx-auto grid min-h-[72vh] w-full max-w-[1480px] content-center gap-16 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.45fr)] lg:items-end"
        >
          <div className="max-w-5xl">
            <div className="mb-8 flex items-center gap-4 text-[11px] uppercase text-white/48">
              <span className="h-px w-12 bg-[color:var(--accent)]" />
              Visual Archive
            </div>
            <h1 className="max-w-5xl text-7xl font-medium leading-[0.9] text-white sm:text-8xl lg:text-9xl xl:text-[9rem]">
              Gallery
            </h1>
          </div>
          <div className="max-w-md border-l border-white/12 pl-6">
            <p className="text-base leading-8 text-white/68 sm:text-lg">
              A refined visual record of gatherings, campaigns, and civic moments, composed as an editorial exhibition
              rather than a static archive.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
              <div>
                <p className="text-2xl font-medium text-white">{formatCount(assets.length)}</p>
                <p className="mt-1 text-[10px] uppercase text-white/38">Images</p>
              </div>
              <div>
                <p className="text-2xl font-medium text-white">{formatCount(categories.length - 1)}</p>
                <p className="mt-1 text-[10px] uppercase text-white/38">Series</p>
              </div>
              <div>
                <p className="text-2xl font-medium text-white">{formatCount(filtered.length)}</p>
                <p className="mt-1 text-[10px] uppercase text-white/38">Shown</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="sticky top-0 z-30 border-y border-white/10 bg-[#080807]/76 px-5 py-4 backdrop-blur-2xl sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <nav className="-mx-2 flex gap-1 overflow-x-auto px-2" aria-label="Gallery categories">
            {categories.map((item) => {
              const active = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className="group relative shrink-0 px-4 py-3 text-xs uppercase text-white/42 outline-none transition focus-visible:text-white"
                  aria-pressed={active}
                >
                  <span className={active ? "text-white" : "transition group-hover:text-white/78"}>{item}</span>
                  <span
                    className={[
                      "absolute inset-x-4 bottom-1 h-px origin-left bg-[color:var(--accent)] transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </nav>

          <label className="group relative w-full max-w-md">
            <span className="sr-only">Search gallery</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the archive"
              className="h-11 w-full rounded-full border border-white/10 bg-white/[0.035] px-5 pr-16 text-sm text-white outline-none transition placeholder:text-white/34 focus:border-[color:var(--accent)] focus:bg-white/[0.055] focus:shadow-[0_0_0_4px_rgba(216,180,95,0.1)]"
            />
            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[10px] uppercase text-white/34">
              {formatCount(filtered.length)}
            </span>
          </label>
        </div>
      </section>

      <main className="relative mx-auto w-full max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        {filtered.length ? (
          <motion.div
            className="grid grid-cols-1 gap-y-20 md:grid-cols-12 md:gap-x-8 md:gap-y-24 xl:gap-x-10"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 } } }}
          >
            {filtered.map((asset, index) => {
              const item = composition[index % composition.length];
              const label = formatCount(index + 1);

              return (
                <motion.article
                  key={asset.relativePath}
                  variants={fadeUp}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={item.frame}
                >
                  <button
                    type="button"
                    onClick={() => openAsset(asset)}
                    className="group block w-full text-left outline-none"
                    aria-label={`Open ${asset.title}`}
                  >
                    <motion.div
                      className={[
                        "relative overflow-hidden border border-white/10 bg-[#11110f] shadow-[0_24px_80px_rgba(0,0,0,0.24)] transition duration-500",
                        "group-hover:border-white/22 group-focus-visible:border-[color:var(--accent)] group-focus-visible:shadow-[0_0_0_4px_rgba(216,180,95,0.12)]",
                        item.image,
                      ].join(" ")}
                      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <motion.div layoutId={`gallery-exhibition-${asset.relativePath}`} className="absolute inset-0">
                        <Image
                          src={asset.urlPath}
                          alt={asset.title}
                          fill
                          sizes={item.sizes}
                          className="object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.045]"
                          style={{ objectPosition: asset.objectPosition }}
                          priority={index < 3}
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/54 via-black/0 to-black/10 opacity-70 transition duration-500 group-hover:opacity-95" />
                      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-6">
                        <p className="text-[10px] uppercase text-white/58">{asset.category}</p>
                        <p className="mt-2 max-w-xl text-lg font-medium leading-6 text-white">{asset.title}</p>
                      </div>
                    </motion.div>

                    <div className={["mt-4 grid gap-3 text-white", item.meta].join(" ")}>
                      <div>
                        <p className="text-[10px] uppercase text-white/36">
                          {label} / {asset.category}
                        </p>
                        <h2 className="mt-2 text-xl font-medium leading-7 text-white sm:text-2xl">{asset.title}</h2>
                      </div>
                      <p className="max-w-lg text-sm leading-7 text-white/54">{asset.caption}</p>
                    </div>
                  </button>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <div className="grid min-h-[36vh] place-items-center border border-white/10 bg-white/[0.025] p-10 text-center">
            <div>
              <p className="text-[11px] uppercase text-white/42">No matches</p>
              <p className="mt-4 text-2xl font-medium text-white">Try a different category or search term.</p>
            </div>
          </div>
        )}
      </main>

      {lightbox}
    </div>
  );
}
