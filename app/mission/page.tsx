import { SimplePage } from "@/components/simple-page";
import { Surface } from "@/components/surface";
import { pillars } from "@/lib/site";

export const metadata = {
  title: "Mission",
};

export default function MissionPage() {
  return (
    <SimplePage
      eyebrow="Mission"
      title="Participation, growth, and service."
      description="The mission in one line."
      primaryAction={{ label: "Explore activities", href: "/activities" }}
      secondaryAction={{ label: "State chapters", href: "/state-chairpersons" }}
    >
      <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <Surface className="relative overflow-hidden p-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(141,84,255,0.17),_transparent_30%),radial-gradient(circle_at_82%_18%,_rgba(168,123,255,0.14),_transparent_26%),linear-gradient(180deg,_rgba(255,255,255,0.02),_rgba(0,0,0,0.1))]" />
          <div className="relative flex min-h-[640px] flex-col p-8 sm:p-10">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Mission</p>
            <p className="mt-5 max-w-3xl font-display text-[clamp(2.7rem,5vw,4.9rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-white">
              Mobilize youth through leadership and service that leaves a visible benefit.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/66 sm:text-lg">
              The mission should read like a practical operating line, not a slogan wall. This version is shorter,
              denser, and more action-oriented than the previous card stack.
            </p>
            <div className="mt-10 grid gap-3">
              {[
                ["01", "Lead", "Give young people a clear role and a real responsibility."],
                ["02", "Serve", "Keep community work practical, local, and measurable."],
                ["03", "Learn", "Translate action into education and leadership growth."],
              ].map(([step, label, detail]) => (
                <div key={step} className="grid grid-cols-[68px_0.8fr_1fr] gap-4 rounded-[24px] border border-white/10 bg-black/18 p-4">
                  <div className="grid place-items-center rounded-[20px] bg-white/8 text-sm font-semibold text-white">
                    {step}
                  </div>
                  <p className="self-center text-sm font-medium text-white">{label}</p>
                  <p className="self-center text-sm leading-6 text-white/64">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Surface>

        <div className="grid gap-5">
          <Surface className="p-8">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Outcome</p>
            <div className="mt-6 grid gap-3">
              {["Lead", "Serve", "Learn"].map((item, index) => (
                <div key={item} className="flex items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-black/18 px-5 py-4">
                  <p className="text-base font-medium text-white">{item}</p>
                  <span className="text-[11px] uppercase tracking-[0.28em] text-white/42">0{index + 1}</span>
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="p-8">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Covers</p>
            <div className="mt-4 flex flex-wrap gap-2">
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
