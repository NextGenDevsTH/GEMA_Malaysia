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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(141,84,255,0.16),_transparent_30%),radial-gradient(circle_at_85%_20%,_rgba(168,123,255,0.14),_transparent_26%)]" />
            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Location</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="aspect-[16/11] overflow-hidden rounded-[30px] border border-white/10 bg-white/8">
                  <iframe
                    title="GEMA Malaysia Kuala Lumpur map"
                    src="https://www.google.com/maps?q=Kuala%20Lumpur%2C%20Malaysia&output=embed"
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
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
            <Link href={site.registerUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[linear-gradient(135deg,_rgba(141,84,255,0.95),_rgba(168,123,255,0.78))] px-5 py-3 text-sm font-semibold text-[#ffffff]">
              Join GEMA
            </Link>
            <Link href={site.registerUrl} target="_blank" rel="noreferrer" className="rounded-full border border-[#d9cff0] bg-white px-5 py-3 text-sm font-semibold text-[#5f35b5] shadow-[0_10px_28px_rgba(91,61,150,0.12)] transition hover:bg-[#f3efff]">
              Register
            </Link>
          </div>
        </div>
      </div>
    </SimplePage>
  );
}
