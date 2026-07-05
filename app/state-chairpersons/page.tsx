import Link from "next/link";
import { SimplePage } from "@/components/simple-page";
import { Surface } from "@/components/surface";
import { stateChairpersons } from "@/lib/site";

export const metadata = {
  title: "State Chairpersons",
};

export default function StateChairpersonsPage() {
  return (
    <SimplePage
      eyebrow="State Chairpersons"
      title="State chapters."
      description="Roster grid ready for verified updates."
      primaryAction={{ label: "Activities", href: "/activities" }}
      secondaryAction={{ label: "Contact", href: "/contact" }}
    >
      <div className="grid gap-5">
        <Surface className="p-8">
          <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Roster note</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-2xl text-sm leading-7 text-white/64">
              State chapters are shown as a living registry. It should feel like a clean directory, not a spreadsheet
              dump, so the layout shifts into cards instead of a rigid four-column table.
            </p>
            <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/52">
              16 states and territories
            </div>
          </div>
        </Surface>

        <Surface className="overflow-hidden p-0">
          <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-3">
            {stateChairpersons.map((item, index) => (
              <div key={item.state} className="border-b border-white/8 p-6 md:border-r">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">0{index + 1}</p>
                    <h3 className="mt-2 text-lg font-medium text-white">{item.state}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[11px] uppercase tracking-[0.26em] text-white/58">
                    TBA
                  </span>
                </div>
                <div className="mt-5 grid gap-3">
                  <div className="rounded-[24px] border border-white/10 bg-black/18 p-4">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/42">Chairperson</p>
                    <p className="mt-2 text-sm leading-6 text-white/72">{item.chairperson}</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-black/18 p-4">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/42">Website</p>
                    <p className="mt-2 text-sm leading-6 text-white/64">
                      {item.website ? <Link href={item.website}>{item.website}</Link> : "Official link pending"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Surface>
      </div>
    </SimplePage>
  );
}
