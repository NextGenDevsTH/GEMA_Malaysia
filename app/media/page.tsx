import Link from "next/link";
import { SimplePage } from "@/components/simple-page";
import { mediaCards } from "@/lib/site";
import { Surface } from "@/components/surface";

export const metadata = {
  title: "Media",
};

export default function MediaPage() {
  return (
    <SimplePage
      eyebrow="Media"
      title="Media archive."
      description="Photos, videos, and recap-ready shelves."
      primaryAction={{ label: "Photos", href: "/media/photos" }}
      secondaryAction={{ label: "Videos", href: "/media/videos" }}
    >
      <div className="grid gap-5">
        {mediaCards.map((card, index) => (
          <Link key={card.title} href={card.href} className="group block">
            <Surface className="p-0 overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
                <div className="p-8">
                  <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">
                    {index === 0 ? "Photography" : "Video"}
                  </p>
                  <h3 className="mt-4 text-[clamp(2rem,3vw,3.1rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-white/64">{card.description}</p>
                  <div className="mt-8 inline-flex rounded-full bg-[linear-gradient(135deg,_rgba(141,84,255,0.95),_rgba(168,123,255,0.78))] px-5 py-3 text-sm font-semibold text-[#ffffff] transition duration-300 group-hover:translate-y-[-1px]">
                    Open archive
                  </div>
                </div>

                <div className="relative min-h-[240px] overflow-hidden border-t border-white/8 lg:border-l lg:border-t-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(141,84,255,0.2),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(168,123,255,0.16),_transparent_24%),linear-gradient(135deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.02))]" />
                  <div className="relative flex h-full flex-col justify-between p-8">
                    <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Archive route</p>
                    <div className="max-w-xl">
                      <p className="text-sm leading-7 text-white/66">
                        A focused entry point for official imagery and campaign media.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Surface>
          </Link>
        ))}
      </div>
    </SimplePage>
  );
}
