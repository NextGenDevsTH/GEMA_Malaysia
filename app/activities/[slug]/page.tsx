import { notFound } from "next/navigation";
import Link from "next/link";
import { activities } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { Surface } from "@/components/surface";

export function generateStaticParams() {
  return activities.map((activity) => ({ slug: activity.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = activities.find((item) => item.slug === slug);
  return {
    title: activity ? activity.title : "Activity Detail",
  };
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = activities.find((item) => item.slug === slug);
  if (!activity) notFound();

  const related = activities.filter((item) => item.slug !== activity.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={activity.category}
        title={activity.title}
        description={activity.summary}
        primaryAction={{ label: "Join GEMA", href: "/join-us" }}
        secondaryAction={{ label: "Back to activities", href: "/activities" }}
      />

      <div className="mx-auto grid w-full max-w-[1440px] gap-5 px-4 py-12 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
        <Surface className="relative overflow-hidden p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,95,0.16),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(127,209,193,0.12),_transparent_24%)]" />
          <div className="relative flex h-full flex-col">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Program detail</p>
            <div className="mt-6 grid gap-4">
              <Detail label="Date" value={activity.date} />
              <Detail label="Location" value={activity.location} />
              <Detail label="State" value={activity.state} />
            </div>
            <div className="mt-6 rounded-[28px] border border-white/10 bg-black/18 p-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Poster</p>
              <p className="mt-3 text-sm leading-7 text-white/64">{activity.poster}</p>
            </div>
          </div>
        </Surface>

        <Surface className="p-0 overflow-hidden">
          <div className="grid divide-y divide-white/8">
            <div className="grid grid-cols-[0.9fr_1.1fr] gap-4 px-7 py-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Related archive</p>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Context</p>
            </div>
            {related.map((item, index) => (
              <Link key={item.slug} href={`/activities/${item.slug}`} className="grid grid-cols-[0.9fr_1.1fr] gap-4 px-7 py-6 transition hover:bg-white/4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">0{index + 1}</p>
                  <h3 className="mt-2 text-base font-medium text-white">{item.title}</h3>
                </div>
                <p className="text-sm leading-7 text-white/62">
                  {item.date} · {item.state} · {item.category}
                </p>
              </Link>
            ))}
          </div>
        </Surface>
      </div>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/42">{label}</p>
      <p className="mt-3 text-sm text-white/84">{value}</p>
    </div>
  );
}
