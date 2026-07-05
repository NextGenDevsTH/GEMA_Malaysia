import { SimplePage } from "@/components/simple-page";
import { Surface } from "@/components/surface";
import { leadershipRoles } from "@/lib/site";

export const metadata = {
  title: "Leadership",
};

export default function LeadershipPage() {
  return (
    <SimplePage
      eyebrow="Leadership"
      title="Leadership roster."
      description="Structure first, names later."
      primaryAction={{ label: "Organization structure", href: "/organization-structure" }}
      secondaryAction={{ label: "Contact", href: "/contact" }}
    >
      <div className="grid gap-5 xl:grid-cols-[0.84fr_1.16fr]">
        <Surface className="relative overflow-hidden p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,95,0.15),_transparent_28%),radial-gradient(circle_at_70%_20%,_rgba(127,209,193,0.12),_transparent_24%)]" />
          <div className="relative flex h-full flex-col">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Roster logic</p>
            <p className="mt-4 max-w-sm font-display text-[clamp(2.4rem,4vw,4.4rem)] font-semibold leading-[0.92] tracking-[-0.085em] text-white">
              Roles first, names later.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/66">
              This page should feel like an index, not a spreadsheet. The list remains honest about what is pending,
              but the composition is cleaner and more deliberate.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                ["Coverage", `${leadershipRoles.length} official positions`],
                ["Status", "Appointments pending verification"],
                ["Use", "Public roster and internal reference"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[24px] border border-white/10 bg-black/18 p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/42">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-white/76">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Surface>

        <Surface className="p-0 overflow-hidden">
          <div className="grid divide-y divide-white/8">
            <div className="grid grid-cols-[72px_1fr_auto] gap-4 px-7 py-6">
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Index</p>
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Role</p>
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">State</p>
            </div>
            {leadershipRoles.map((role, index) => (
              <div key={role} className="grid grid-cols-[72px_1fr_auto] gap-4 px-7 py-6 transition hover:bg-white/4">
                <p className="text-sm uppercase tracking-[0.26em] text-white/44">0{index + 1}</p>
                <p className="text-base font-medium text-white">{role}</p>
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[11px] uppercase tracking-[0.26em] text-white/58">
                  TBA
                </span>
              </div>
            ))}
          </div>
        </Surface>
      </div>
    </SimplePage>
  );
}
