import { SimplePage } from "@/components/simple-page";
import { Surface } from "@/components/surface";
import { pillars, draftNotice } from "@/lib/site";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <SimplePage
      eyebrow="About"
      title="Built for trust, service, and youth leadership."
      description="A concise public profile for GEMA Malaysia."
      primaryAction={{ label: "Join GEMA", href: "/join-us" }}
      secondaryAction={{ label: "View history", href: "/history" }}
    >
      <div className="grid gap-5 xl:grid-cols-[1.14fr_0.86fr]">
        <Surface className="relative overflow-hidden p-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,95,0.18),_transparent_30%),radial-gradient(circle_at_82%_18%,_rgba(127,209,193,0.16),_transparent_26%),linear-gradient(180deg,_rgba(255,255,255,0.02),_rgba(0,0,0,0.08))]" />
          <div className="relative flex min-h-[640px] flex-col p-8 sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Identity</p>
              <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-white/58">
                Malaysia
              </span>
            </div>
            <div className="mt-8 max-w-3xl">
              <p className="font-display text-[clamp(2.9rem,5vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.085em] text-white">
                A civic movement, presented like a serious editorial cover.
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/66 sm:text-lg">
                GEMA is treated here as a public record: restrained, legible, and built to show the work before the
                rhetoric. The page stops pretending to be a brochure and starts behaving like a published identity.
              </p>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                ["Leadership", "Developing capable organisers."],
                ["Volunteerism", "Converting intent into service."],
                ["Education", "Making learning practical."],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/42">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-white/78">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[28px] border border-white/10 bg-black/18 p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/42">Public note</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/66">{draftNotice}</p>
            </div>
          </div>
        </Surface>

        <div className="grid gap-5">
          <Surface className="p-8">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Signals</p>
            <div className="mt-6 grid gap-3">
              {[
                ["Trust", "A clear route from interest to action."],
                ["Hope", "Language that stays optimistic without becoming vague."],
                ["Impact", "Activities and contact paths stay visible."],
              ].map(([title, detail], index) => (
                <div key={title} className="grid grid-cols-[72px_1fr] gap-4 rounded-[24px] border border-white/10 bg-black/18 p-4">
                  <div className="grid place-items-center rounded-[20px] bg-[linear-gradient(135deg,_rgba(216,180,95,0.92),_rgba(127,209,193,0.76))] text-sm font-semibold text-[#071013]">
                    0{index + 1}
                  </div>
                  <div className="self-center">
                    <p className="text-sm font-medium text-white">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/64">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="p-8">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Program pillars</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {pillars.map((pillar) => (
                <span
                  key={pillar}
                  className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/76"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </Surface>
        </div>
      </div>
    </SimplePage>
  );
}
