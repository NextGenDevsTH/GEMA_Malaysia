"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryAsset } from "@/lib/gallery";

type GalleryGridProps = {
  assets: GalleryAsset[];
};

export function GalleryGrid({ assets }: GalleryGridProps) {
  const [active, setActive] = useState<GalleryAsset | null>(null);

  if (!assets.length) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-white/6 p-8 text-sm leading-7 text-white/65 shadow-soft">
        No image files are present in the root <code className="rounded bg-black/30 px-1.5 py-0.5">gallery/</code>{" "}
        folder yet. The gallery is wired to automatically surface the real photos as soon as they are added.
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3">
        {assets.map((asset, index) => (
          <motion.button
            key={asset.relativePath}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.03 }}
            onClick={() => setActive(asset)}
            className="group relative block w-full overflow-hidden rounded-[30px] border border-white/10 bg-white/6 text-left shadow-soft"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={asset.urlPath}
                alt={asset.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/6 to-transparent opacity-90" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/46">{asset.relativePath}</p>
              <p className="mt-2 text-lg font-medium text-white">{asset.name}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              transition={{ duration: 0.28 }}
            className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/12 bg-[#0d0d10] shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-black">
              <Image
                  src={active.urlPath}
                  alt={active.name}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/44">Selected image</p>
                  <h3 className="mt-2 text-xl font-medium text-white">{active.name}</h3>
                  <p className="mt-2 text-sm text-white/62">{active.relativePath}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
