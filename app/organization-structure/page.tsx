import { SimplePage } from "@/components/simple-page";
import { Surface } from "@/components/surface";
import { cmsModules, roles } from "@/lib/site";

export const metadata = {
  title: "Organization Structure",
};

export default function OrganizationStructurePage() {
  return (
    <SimplePage
      eyebrow="Organization Structure"
      title="A CMS-ready structure."
      description="Public site and admin system, aligned."
      primaryAction={{ label: "Admin CMS", href: "/admin" }}
      secondaryAction={{ label: "State chairpersons", href: "/state-chairpersons" }}
    >
      <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
        <Surface className="relative overflow-hidden p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(141,84,255,0.15),_transparent_28%),radial-gradient(circle_at_70%_20%,_rgba(168,123,255,0.12),_transparent_24%)]" />
          <div className="relative flex h-full flex-col">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Public hierarchy</p>
            <p className="mt-4 max-w-sm font-display text-[clamp(2.3rem,4vw,4.2rem)] font-semibold leading-[0.92] tracking-[-0.085em] text-white">
              A CMS-ready structure.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/66">
              The structure should read like a designed system map, not a set of unrelated cards. This page now speaks
              more clearly about modules, roles, and the relationship between public content and operations.
            </p>
            <div className="mt-8 grid gap-3">
              {roles.map((role, index) => (
                <div key={role.title} className="rounded-[24px] border border-white/10 bg-black/18 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-medium text-white">{role.title}</h3>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">0{index + 1}</span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/62">{role.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Surface>

        <Surface className="p-8">
          <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">System modules</p>
          <div className="mt-6 grid gap-4">
            {cmsModules.map((module, index) => (
              <div key={module.title} className="grid grid-cols-[72px_1fr] gap-4 rounded-[26px] border border-white/10 bg-black/18 p-5">
                <div className="grid place-items-center rounded-[20px] bg-[linear-gradient(135deg,_rgba(141,84,255,0.9),_rgba(168,123,255,0.76))] text-sm font-semibold text-[#ffffff]">
                  0{index + 1}
                </div>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base font-medium text-white">{module.title}</h3>
                    <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[11px] uppercase tracking-[0.26em] text-white/56">
                      Module
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {module.bullets.map((bullet) => (
                      <span key={bullet} className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/70">
                        {bullet}
                      </span>
                    ))}
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
