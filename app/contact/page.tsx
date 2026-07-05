import Link from "next/link";
import { SimplePage } from "@/components/simple-page";
import { Surface } from "@/components/surface";
import { contactPoints, site } from "@/lib/site";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <SimplePage
      eyebrow="Contact"
      title="Verified contact paths."
      description="WhatsApp, email, and office details."
      primaryAction={{ label: "Join us", href: site.registerUrl }}
      secondaryAction={{ label: "Privacy policy", href: "/privacy-policy" }}
    >
      <div className="grid gap-5 xl:grid-cols-[0.88fr_1.12fr]">
        <Surface className="p-8">
          <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Channel index</p>
          <div className="mt-6 grid gap-4">
            {contactPoints.map((item, index) => (
              <div key={item.label} className="rounded-[28px] border border-white/10 bg-black/18 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">0{index + 1}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/72">{item.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/38">{item.helper}</p>
              </div>
            ))}
          </div>
        </Surface>

        <div className="grid gap-5">
          <Surface className="relative overflow-hidden p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,95,0.16),_transparent_30%),radial-gradient(circle_at_85%_20%,_rgba(127,209,193,0.14),_transparent_26%)]" />
            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Location</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="aspect-[16/11] overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.02)),radial-gradient(circle_at_top_left,_rgba(216,180,95,0.24),_rgba(0,0,0,0)_54%)] p-6">
                  <p className="text-[11px] uppercase tracking-[0.34em] text-white/42">Office map</p>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-white/66">
                    Replace this visual block with the verified address and an embedded map once available.
                  </p>
                </div>
                <div className="grid gap-3">
                  {[
                    ["Direct", "WhatsApp"],
                    ["Email", "pusat@pemudagema.org"],
                    ["Action", "Join Us"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[24px] border border-white/10 bg-black/18 p-4">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/42">{label}</p>
                      <p className="mt-2 text-sm text-white/86">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Surface>

          <div className="flex flex-wrap gap-3">
            <Link href={site.registerUrl} className="rounded-full bg-[linear-gradient(135deg,_rgba(216,180,95,0.95),_rgba(127,209,193,0.78))] px-5 py-3 text-sm font-semibold text-[#071013]">
              Join GEMA
            </Link>
            <Link href="/join-us" className="rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm text-white/84">
              Join page
            </Link>
          </div>
        </div>
      </div>
    </SimplePage>
  );
}
