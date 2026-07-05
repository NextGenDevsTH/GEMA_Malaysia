import { SimplePage } from "@/components/simple-page";
import { Surface } from "@/components/surface";

export const metadata = {
  title: "Vision",
};

export default function VisionPage() {
  return (
    <SimplePage
      eyebrow="Vision"
      title="A generation that leads with integrity."
      description="A concise vision for GEMA."
      primaryAction={{ label: "Read mission", href: "/mission" }}
      secondaryAction={{ label: "Join GEMA", href: "/join-us" }}
    >
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Surface className="relative overflow-hidden p-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,_rgba(216,180,95,0.14),_transparent_28%),radial-gradient(circle_at_82%_14%,_rgba(127,209,193,0.18),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.02),_rgba(0,0,0,0.08))]" />
          <div className="relative flex min-h-[620px] flex-col p-8 sm:p-10">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Vision statement</p>
            <p className="mt-5 max-w-3xl font-display text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-white">
              Young Malaysians equipped to build stronger, kinder communities.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/66 sm:text-lg">
              This is the site’s most aspirational page, so it should read like a statement in a publication, not a
              duplicate of the homepage hero. The language here is broader, slower, and more reflective.
            </p>
            <div className="mt-auto grid gap-3 sm:grid-cols-3">
              {[
                ["Integrity", "Trust first"],
                ["Service", "Visible impact"],
                ["Leadership", "Next generation"],
              ].map(([label, value], index) => (
                <div key={label} className="grid gap-3 rounded-[24px] border border-white/10 bg-black/18 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/42">{label}</p>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/36">0{index + 1}</span>
                  </div>
                  <p className="text-sm leading-6 text-white/64">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Surface>

        <div className="grid gap-5">
          <Surface className="p-8">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">North star</p>
            <p className="mt-5 max-w-md text-[clamp(1.9rem,3.4vw,3.4rem)] font-semibold leading-[0.96] tracking-[-0.08em] text-white">
              Keep the organisation legible, human, and service-oriented on every screen.
            </p>
          </Surface>

          <Surface className="p-8">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Signals</p>
            <div className="mt-6 grid gap-3">
              {[
                ["Trust", "The public route stays honest about what is verified."],
                ["Clarity", "Visitors should understand the site in one pass."],
                ["Momentum", "The system should feel alive without becoming noisy."],
              ].map(([label, value], index) => (
                <div key={label} className="grid grid-cols-[68px_1fr] gap-4 rounded-[24px] border border-white/10 bg-black/18 p-4">
                  <div className="grid place-items-center rounded-[20px] bg-[linear-gradient(135deg,_rgba(216,180,95,0.92),_rgba(127,209,193,0.76))] text-sm font-semibold text-[#071013]">
                    0{index + 1}
                  </div>
                  <div className="self-center">
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="mt-1 text-sm leading-6 text-white/64">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Surface>
        </div>
      </div>
    </SimplePage>
  );
}
