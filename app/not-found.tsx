import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export default function NotFound() {
  return (
    <div>
      <PageHero
        eyebrow="404"
        title="Page not found"
        description="The route you requested does not exist in this public site shell."
        primaryAction={{ label: "Back to home", href: "/" }}
        secondaryAction={{ label: "Contact", href: "/contact" }}
      />
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm text-white/70 underline decoration-white/20 underline-offset-4">
          Return to the homepage
        </Link>
      </section>
    </div>
  );
}
