import Link from "next/link";
import { SimplePage } from "@/components/simple-page";
import { Surface } from "@/components/surface";
import { site } from "@/lib/site";

export const metadata = {
  title: "Join Us",
};

export default function JoinUsPage() {
  return (
    <SimplePage
      eyebrow="Join Us"
      title="Join GEMA."
      description="Three steps. One verified route."
      primaryAction={{ label: "Open join button", href: site.registerUrl }}
      secondaryAction={{ label: "Contact", href: "/contact" }}
    >
      <div className="grid gap-5 xl:grid-cols-[0.94fr_1.06fr]">
        <Surface className="relative overflow-hidden p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,95,0.16),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(127,209,193,0.12),_transparent_26%)]" />
          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Route</p>
            <p className="mt-4 max-w-sm font-display text-[clamp(2.5rem,4vw,4.4rem)] font-semibold leading-[0.92] tracking-[-0.085em] text-white">
              Three steps. One verified path.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/66">
              The join flow is treated like a premium access panel, not a form dump. It should feel efficient, clear,
              and trustworthy from the first click.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={site.registerUrl} className="rounded-full bg-[linear-gradient(135deg,_rgba(216,180,95,0.95),_rgba(127,209,193,0.78))] px-5 py-3 text-sm font-semibold text-[#071013]">
              Open join button
            </Link>
            <Link href="/" className="rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm text-white/84">
              Return home
            </Link>
          </div>
        </Surface>

        <div className="grid gap-5">
          <Surface className="p-0 overflow-hidden">
            <div className="grid divide-y divide-white/8">
              {[
                ["01", "Review", "Understand the program areas and public work."],
                ["02", "Open", "Use the verified join button to begin."],
                ["03", "Complete", "Finish the workflow and submit cleanly."],
              ].map(([step, title, detail]) => (
                <div key={step} className="grid grid-cols-[72px_0.78fr_1fr] gap-4 px-7 py-6">
                  <div className="grid place-items-center rounded-[20px] bg-[linear-gradient(135deg,_rgba(216,180,95,0.9),_rgba(127,209,193,0.76))] text-sm font-semibold text-[#071013]">
                    {step}
                  </div>
                  <div className="self-center">
                    <p className="text-base font-medium text-white">{title}</p>
                  </div>
                  <p className="self-center text-sm leading-7 text-white/64">{detail}</p>
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="p-8">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Checkpoint</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/64">
              The join button should land in a live, short-form form or verified registration page. Until then, this
              page keeps the path visible without inventing extra steps.
            </p>
          </Surface>
        </div>
      </div>
    </SimplePage>
  );
}
