import { SimplePage } from "@/components/simple-page";
import { Surface } from "@/components/surface";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <SimplePage
      eyebrow="Privacy Policy"
      title="A concise privacy page ready for legal review."
      description="This draft keeps the language direct and limited until the organization publishes the approved policy text."
      primaryAction={{ label: "Contact", href: "/contact" }}
      secondaryAction={{ label: "Join us", href: "/join-us" }}
    >
      <div className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
        <Surface className="relative overflow-hidden p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,95,0.12),_transparent_26%),radial-gradient(circle_at_85%_20%,_rgba(127,209,193,0.1),_transparent_24%)]" />
          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Legal draft</p>
            <p className="mt-4 max-w-sm font-display text-[clamp(2.1rem,3.8vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.08em] text-white">
              Data handling stays explicit and minimal.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/64">
              This page should stay spare. The whole point is to communicate restraint, not to stage a long-form
              disclaimer wall.
            </p>
          </div>
        </Surface>

        <Surface className="p-8">
          <div className="grid gap-4 text-sm leading-7 text-white/68">
            <p>
              This public website may collect basic analytics and form submissions only if approved and configured by
              the organization.
            </p>
            <p>
              Replace this text with the official privacy policy, data retention terms, and consent language before
              launch.
            </p>
            <p>
              All user-facing forms should clearly explain what information is collected and where the submission is
              sent.
            </p>
          </div>
        </Surface>
      </div>
    </SimplePage>
  );
}
