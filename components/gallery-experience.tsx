"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryAsset } from "@/lib/gallery";
import { Chip } from "@/components/chip";

type GalleryExperienceProps = {
  assets: GalleryAsset[];
};

export function GalleryExperience({ assets }: GalleryExperienceProps) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  const featured = filtered.filter((asset) => asset.featured).slice(0, 4);
  const smallFeatured = featured.slice(1, 3);
  const wideFeatured = featured[3] ?? null;
  const remainder = filtered.filter((asset) => !featured.includes(asset));
  const activeList = filtered;
  const leadAsset = featured[0] ?? filtered[0] ?? null;
  const activeAsset =
    activeIndex === null || activeList.length === 0
      ? null
      : activeList[((activeIndex % activeList.length) + activeList.length) % activeList.length];

  useEffect(() => {
    setActiveIndex(null);
  }, [category, query]);

  const openAsset = useCallback(
    (asset: GalleryAsset | null | undefined) => {
      if (!asset) return;
      const index = activeList.findIndex((item) => item.relativePath === asset.relativePath);
      if (index >= 0) setActiveIndex(index);
    },
    [activeList],
  );

  const closeViewer = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || activeList.length === 0) return current;
      return (current - 1 + activeList.length) % activeList.length;
    });
  }, [activeList.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || activeList.length === 0) return current;
      return (current + 1) % activeList.length;
    });
  }, [activeList.length]);

  useEffect(() => {
    if (!activeAsset) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
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

  return (
    <div className="grid gap-10">
      <section className="grid gap-5">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black/20 shadow-soft"
        >
          <div className="absolute inset-0 scale-110 blur-3xl opacity-55">
            {leadAsset ? (
              <Image
                src={leadAsset.urlPath}
                alt=""
                fill
                aria-hidden
                sizes="100vw"
                className="object-cover object-center"
                style={{ objectPosition: leadAsset.objectPosition }}
              />
            ) : null}
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,95,0.24),_transparent_34%),radial-gradient(circle_at_82%_18%,_rgba(127,209,193,0.18),_transparent_28%),linear-gradient(180deg,_rgba(0,0,0,0.02),_rgba(0,0,0,0.72))]" />
          <div className="relative aspect-[16/9] min-h-[28rem] lg:min-h-[38rem]">
            {leadAsset ? (
              <Image
                src={leadAsset.urlPath}
                alt={leadAsset.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 100vw"
                className="object-cover"
                style={{ objectPosition: leadAsset.objectPosition }}
              />
            ) : null}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl rounded-[30px] border border-white/10 bg-black/28 p-5 backdrop-blur-2xl sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/44">
                {leadAsset?.category ?? "Archive"}
              </p>
              <h2 className="mt-3 max-w-2xl text-[clamp(2.25rem,4vw,4.75rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
                {leadAsset?.title ?? "No featured image"}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                {leadAsset?.caption ?? "The archive will surface the most relevant visual first."}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="glass-surface grid gap-4 rounded-[30px] p-4 lg:grid-cols-[1.15fr_0.85fr]">
        <label className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.34em] text-white/42">Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or category"
            className="rounded-2xl border border-white/10 bg-black/28 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
          />
        </label>
        <div className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.34em] text-white/42">Category</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)}>
                <Chip active={category === item}>{item}</Chip>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="grid gap-5 lg:grid-cols-[1.35fr_0.95fr]">
        <motion.button
          type="button"
          onClick={() => openAsset(featured[0])}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/6 text-left shadow-soft"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,95,0.28),_transparent_42%),linear-gradient(180deg,_rgba(0,0,0,0.05),_rgba(0,0,0,0.45))]" />
          {featured[0] ? (
            <motion.div layoutId={`gallery-${featured[0].relativePath}`} className="relative aspect-[4/5] min-h-[420px] lg:aspect-auto lg:min-h-[760px]">
              <Image
                src={featured[0].urlPath}
                alt={featured[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                style={{ objectPosition: featured[0].objectPosition }}
              />
            </motion.div>
          ) : null}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="rounded-[28px] border border-white/10 bg-black/28 p-5 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/46">
                {featured[0]?.category ?? "Archive"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                {featured[0]?.title ?? "No featured image"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/68">
                {featured[0]?.caption ?? "The archive will surface the most relevant visual first."}
              </p>
            </div>
          </div>
        </motion.button>

        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {smallFeatured.map((asset, index) => (
              <motion.button
                key={asset.relativePath}
                type="button"
                onClick={() => openAsset(asset)}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04, type: "spring", stiffness: 180, damping: 22 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 text-left shadow-soft"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={asset.urlPath}
                    alt={asset.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 22vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    style={{ objectPosition: asset.objectPosition }}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">{asset.category}</p>
                  <p className="mt-2 text-sm font-medium text-white">{asset.title}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {wideFeatured ? (
            <motion.button
              type="button"
              onClick={() => openAsset(wideFeatured)}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 text-left shadow-soft"
            >
              <motion.div layoutId={`gallery-${wideFeatured.relativePath}`} className="relative aspect-[16/8]">
                <Image
                  src={wideFeatured.urlPath}
                  alt={wideFeatured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  style={{ objectPosition: wideFeatured.objectPosition }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-black/14 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">{wideFeatured.category}</p>
                <p className="mt-2 text-xl font-medium text-white">{wideFeatured.title}</p>
              </div>
            </motion.button>
          ) : null}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {remainder.map((asset, index) => {
          const spanClass =
            asset.widthHint > asset.heightHint * 1.35
              ? "md:col-span-2"
              : asset.heightHint > asset.widthHint * 1.2
                ? "md:row-span-2"
                : "";
          return (
            <motion.button
              key={asset.relativePath}
              type="button"
              onClick={() => openAsset(asset)}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.02, type: "spring", stiffness: 180, damping: 22 }}
              className={[
                "group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 text-left shadow-soft",
                spanClass,
              ].join(" ")}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={asset.urlPath}
                  alt={asset.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  style={{ objectPosition: asset.objectPosition }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/4 to-transparent opacity-95" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-3">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">{asset.category}</p>
                </div>
                <p className="mt-2 text-base font-medium text-white">{asset.title}</p>
              </div>
            </motion.button>
          );
        })}
      </section>

      <AnimatePresence>
        {activeAsset ? (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-black/78 p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeAsset.title} full screen image`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeViewer}
          >
            <motion.div
              initial={{ scale: 0.97, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-[100dvh] w-screen flex-col overflow-hidden bg-black shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:h-[min(92dvh,920px)] sm:w-[min(96vw,1200px)] sm:rounded-[18px] sm:border sm:border-white/12"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeViewer}
                aria-label="Close full screen image"
                className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
              >
                Close
              </button>
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Show previous image"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-3 text-sm font-medium text-white transition hover:bg-black"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Show next image"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-3 text-sm font-medium text-white transition hover:bg-black"
              >
                Next
              </button>
              <motion.div layoutId={`gallery-${activeAsset.relativePath}`} className="relative min-h-0 flex-1 bg-black">
                <Image
                  src={activeAsset.urlPath}
                  alt={activeAsset.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  style={{ objectPosition: activeAsset.objectPosition }}
                  priority={false}
                />
              </motion.div>
              <div className="grid max-h-[36dvh] gap-4 overflow-y-auto border-t border-white/10 bg-[#0b0b0d] p-4 sm:max-h-none sm:grid-cols-[1fr_auto] sm:items-end sm:p-5">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/44">{activeAsset.category}</p>
                  <h3 className="mt-2 text-xl font-medium text-white sm:text-2xl">{activeAsset.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-white/64">{activeAsset.caption}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={showPrevious}
                    className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
