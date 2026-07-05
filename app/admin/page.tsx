import { SimplePage } from "@/components/simple-page";
import { Surface } from "@/components/surface";
import { rfp, rfpChecklist } from "@/lib/site";

export const metadata = {
  title: "Admin CMS",
};

export default function AdminPage() {
  return (
    <SimplePage
      eyebrow="Admin CMS"
      title="The CMS is designed around content, media, contacts, and permissions."
      description="This page is a product-design blueprint for the internal system. It shows the modules and role logic needed to run the public site cleanly."
      primaryAction={{ label: "Activities", href: "/activities" }}
      secondaryAction={{ label: "Contact", href: "/contact" }}
    >
      <div className="grid gap-5 xl:grid-cols-[0.94fr_1.06fr]">
        <Surface className="relative overflow-hidden p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,95,0.15),_transparent_28%),radial-gradient(circle_at_70%_20%,_rgba(127,209,193,0.12),_transparent_24%)]" />
          <div className="relative flex h-full flex-col">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Control panel</p>
            <p className="mt-4 max-w-sm font-display text-[clamp(2.2rem,4vw,4.1rem)] font-semibold leading-[0.92] tracking-[-0.085em] text-white">
              The CMS is designed around content, media, contacts, and permissions.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/66">
              This still reads as a blueprint, but it needs more visual authority. The new arrangement makes the
              product intent clearer without turning the page into a dry spec sheet.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                ["Admin", "Full access, publish rights, and permission control."],
                ["Media User", "Can manage media and metadata only."],
                ["Banned User", "Blocked from publishing and operational access."],
              ].map(([title, description]) => (
                <div key={title} className="rounded-[26px] border border-white/10 bg-black/18 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-medium text-white">{title}</h3>
                    <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent-strong)]" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/64">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </Surface>
        <Surface className="p-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Modules</p>
          <div className="mt-6 grid gap-4">
            {[
              ["Activity Management", "Create, edit, publish, and retire program cards."],
              ["Media Management", "Upload image sets, build albums, and manage video posts."],
              ["Contact Management", "Maintain central and state contact points."],
              ["Organization Structure", "Keep the hierarchy and state mapping synchronized."],
              ["Role Management", "Control publication and moderation permissions."],
            ].map(([title, description], index) => (
              <div key={title} className="grid grid-cols-[68px_1fr] gap-4 rounded-[26px] border border-white/10 bg-black/18 p-5">
                <div className="grid place-items-center rounded-[20px] bg-[linear-gradient(135deg,_rgba(216,180,95,0.9),_rgba(127,209,193,0.76))] text-sm font-semibold text-[#071013]">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/64">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <Surface className="p-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">RFP Alignment</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4 text-sm leading-7 text-white/68">
            <p>
              Ad date: {rfp.adDate} · Closing date: {rfp.closingDate} · Election date: {rfp.electionDate}
            </p>
            <p>
              Budget band: {rfp.budgetRange}. This is the range written in the PDF and should guide the delivery
              scope, documentation, and support model.
            </p>
            <p>
              Delivery contact: WhatsApp {rfp.whatsapp} ({rfp.contactPerson}) and email {rfp.email}.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[26px] border border-white/10 bg-black/18 p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Required deliverables</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {rfpChecklist.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/76">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-black/18 p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Reference links</p>
              <div className="mt-4 grid gap-2 text-sm text-white/62">
                {rfp.references.map((href) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer" className="break-all underline decoration-white/20 underline-offset-4">
                    {href}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Surface>

      <div className="grid gap-5 lg:grid-cols-2">
        <Surface className="p-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Included now</p>
          <p className="mt-4 text-sm leading-7 text-white/64">
            Public navigation, landing page, activities archive, media gallery, contact surfaces, join flow, privacy
            policy, CMS blueprint, and RFP-aligned content sections.
          </p>
        </Surface>
        <Surface className="p-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Deferred later</p>
          <p className="mt-4 text-sm leading-7 text-white/64">
            Login, authenticated admin accounts, database persistence, role enforcement, publishing workflow, uploads,
            and any live CMS integrations can be built later without altering the public design system.
          </p>
        </Surface>
      </div>
    </SimplePage>
  );
}
