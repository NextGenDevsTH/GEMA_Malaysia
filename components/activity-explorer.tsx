"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Chip } from "@/components/chip";
import { site } from "@/lib/site";

type Activity = {
  slug: string;
  title: string;
  category: string;
  state: string;
  date: string;
  location: string;
  poster: string;
  summary: string;
};

type ActivityExplorerProps = {
  activities: readonly Activity[];
};

const pageSize = 4;

export function ActivityExplorer({ activities }: ActivityExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [state, setState] = useState("All");
  const [page, setPage] = useState(1);

  const categories = ["All", ...new Set(activities.map((item) => item.category))];
  const states = ["All", ...new Set(activities.map((item) => item.state))];

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return activities.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesState = state === "All" || item.state === state;
      const matchesQuery =
        !term ||
        [item.title, item.summary, item.poster, item.category, item.state]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesCategory && matchesState && matchesQuery;
    });
  }, [activities, category, query, state]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="grid gap-6">
      <div className="glass-surface grid gap-3 rounded-[30px] p-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <label className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.34em] text-white/45">Search</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search activities, posters, states..."
            className="rounded-2xl border border-white/10 bg-black/28 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-white/25"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.34em] text-white/45">Cluster</span>
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/25"
          >
            {categories.map((item) => (
              <option key={item} value={item} className="bg-black">
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.34em] text-white/45">State</span>
          <select
            value={state}
            onChange={(event) => {
              setState(event.target.value);
              setPage(1);
            }}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/25"
          >
            {states.map((item) => (
              <option key={item} value={item} className="bg-black">
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-5">
        {visible.length ? (
          visible.map((item, index) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="overflow-hidden rounded-[30px] border border-white/10 bg-[#1b1130] shadow-soft"
            >
              <div className="grid gap-0 lg:grid-cols-[1fr_1.2fr]">
                <div className="flex min-h-[220px] flex-col justify-between bg-[radial-gradient(circle_at_top_left,_rgba(141,84,255,0.3),_rgba(17,17,20,0.12)_52%),linear-gradient(180deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.03))] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <Chip active>{item.category}</Chip>
                    <span className="text-xs uppercase tracking-[0.24em] text-white/42">{item.state}</span>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/42">{item.poster}</p>
                    <h3 className="mt-4 text-[clamp(1.9rem,2.5vw,2.6rem)] font-semibold tracking-[-0.06em] text-white">{item.title}</h3>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-white/68">{item.summary}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-5 p-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Info label="Date" value={item.date} />
                    <Info label="Location" value={item.location} />
                    <Info label="Category" value={item.category} />
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/activities/${item.slug}`}
                      className="rounded-full bg-[linear-gradient(135deg,_rgba(141,84,255,0.95),_rgba(168,123,255,0.78))] px-5 py-3 text-sm font-semibold text-[#ffffff] transition hover:translate-y-[-1px]"
                    >
                      View Detail
                    </Link>
                    <Link
                      href={site.registerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm text-white/84 transition hover:bg-white/10"
                    >
                      Volunteer
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <div className="rounded-[28px] border border-[#ded5f3] bg-white p-8 text-sm text-[#4a4a4a] shadow-[0_18px_48px_rgba(91,61,150,0.12)]">
            No activities match the current filters.
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(141,84,255,0.18)] pt-5 text-sm text-[#4a4a4a]">
        <p>
          Showing {visible.length} of {filtered.length} items
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-full border border-[#d9cff0] bg-white px-4 py-2 text-[#5f35b5] transition hover:bg-[#f3efff] disabled:opacity-40"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="rounded-full border border-[#d9cff0] bg-[#f7f3ff] px-4 py-2 text-[#3d245f]">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            className="rounded-full border border-[#d9cff0] bg-white px-4 py-2 text-[#5f35b5] transition hover:bg-[#f3efff] disabled:opacity-40"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-[11px] uppercase tracking-[0.26em] text-white/42">{label}</p>
      <p className="mt-2 text-sm text-white/84">{value}</p>
    </div>
  );
}
