import Image from "next/image";
import type { ReactNode } from "react";
import { PurposeMark } from "@/components/compass-mark";
import Fall from "@/components/Fall";
import { HomeHero } from "@/components/home-hero";
import { MetricStrip } from "@/components/metric-strip";
import { PixelIcon } from "@/components/pixel-icon";
import { RevealText } from "@/components/reveal-text";
import { SectionHeading } from "@/components/section-heading";
import { StackingAgentCards } from "@/components/stacking-agent-cards";
import { Surface } from "@/components/surface";
import { activities, pillars } from "@/lib/site";
import { getFeaturedGalleryAssets, getGalleryAssets } from "@/lib/gallery";
import programHero from "@/gallery/bg-malay.png";

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-1 font-sans text-[11px] tracking-widest text-white/55">
      {children}
    </span>
  );
}

export default async function HomePage() {
  const galleryAssets = await getGalleryAssets();
  const featuredVisuals = getFeaturedGalleryAssets(galleryAssets);
  const heroVisual =
    galleryAssets.find((asset) => asset.relativePath === "group-simling.png") ??
    featuredVisuals[0] ?? {
      urlPath: "/api/gallery/hero.jpg",
      title: "Hero Image",
      caption: "The primary homepage hero image from the official gallery.",
      category: "Identity",
      objectPosition: "center 35%",
    };
  const featuredActivities = activities.slice(0, 4);
  const impactStats = [
    { label: "Program pillars", value: `${pillars.length}`, note: "Leadership, service, learning, and community" },
    { label: "Archive assets", value: `${galleryAssets.length}`, note: "Real files surfaced from /gallery" },
    { label: "Featured programs", value: `${featuredActivities.length}`, note: "Prepared for the public archive" },
    { label: "Public route", value: "Live", note: "Join path stays inside the official site shell" },
  ] as const;

  return (
    <>
      <HomeHero heroImage={heroVisual} supportingImages={featuredVisuals.slice(0, 2)} />

      <section className="mx-auto w-full max-w-[1600px] px-4 py-14 sm:px-6 lg:px-8">
        <Surface className="overflow-hidden p-0">
          <div className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(141,84,255,0.12),_transparent_32%),radial-gradient(circle_at_80%_18%,_rgba(168,123,255,0.1),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.02),_rgba(0,0,0,0.04))]" />
            <div className="relative grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="text-[11px] uppercase tracking-[0.42em] text-white/44">Chapter 01</p>
                <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-white">
                  The movement is defined by people, not by interface.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/64 sm:text-lg">
                  Youth chapters, volunteers, and community work should feel visible at a glance. This section keeps
                  the narrative grounded in faces, gatherings, and the public record of the organisation’s work.
                </p>

                <div className="mt-10 border-t border-white/8 pt-6">
                  <div className="grid gap-4">
                    {[
                      ["Leadership", "People learning to lead with responsibility in public."],
                      ["Community", "Family, service, and shared purpose in the same frame."],
                      ["Accountability", "The archive stays visible, specific, and real."],
                    ].map(([label, text]) => (
                      <div key={label} className="grid gap-2 border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
                        <p className="text-[11px] uppercase tracking-[0.34em] text-white/42">{label}</p>
                        <p className="max-w-xl text-sm leading-7 text-white/68">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-8 max-w-xl text-[11px] uppercase tracking-[0.3em] text-white/36">
                  Visible in the archive, active in the field, accountable in public.
                </p>
              </div>

              <div className="border-t border-white/8 lg:border-l lg:border-t-0">
                <div className="grid h-full gap-0 lg:grid-rows-[1.25fr_0.75fr]">
                  <div className="relative min-h-[30rem]">
                    {featuredVisuals[2] ? (
                      <Image
                        src={featuredVisuals[2].urlPath}
                        alt={featuredVisuals[2].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                        style={{ objectPosition: featuredVisuals[2].objectPosition }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.7)),radial-gradient(circle_at_top_left,rgba(141,84,255,0.18),transparent_36%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <div className="max-w-2xl rounded-[30px] border border-white/10 bg-black/26 p-5 backdrop-blur-2xl sm:p-6">
                        <p className="text-[11px] uppercase tracking-[0.34em] text-white/46">Archive lead</p>
                        <h3 className="mt-3 text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[0.93] tracking-[-0.075em] text-white">
                          {featuredVisuals[2]?.title ?? "Archive highlight"}
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
                          {featuredVisuals[2]?.caption ?? "Real images from the public archive."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-0 border-t border-white/8 sm:grid-cols-2">
                    <div className="relative min-h-[18rem] border-b border-white/8 sm:min-h-full sm:border-b-0 sm:border-r">
                      {featuredVisuals[3] ? (
                        <Image
                          src={featuredVisuals[3].urlPath}
                          alt={featuredVisuals[3].title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 30vw"
                          className="object-cover"
                          style={{ objectPosition: featuredVisuals[3].objectPosition }}
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.58))]" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="text-[11px] uppercase tracking-[0.32em] text-white/44">Community</p>
                        <p className="mt-2 text-sm leading-6 text-white/84">
                          Families, members, and volunteers sharing the same space.
                        </p>
                      </div>
                    </div>
                    <div className="relative min-h-[18rem]">
                      {featuredVisuals[4] ? (
                        <Image
                          src={featuredVisuals[4].urlPath}
                          alt={featuredVisuals[4].title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 30vw"
                          className="object-cover"
                          style={{ objectPosition: featuredVisuals[4].objectPosition }}
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.62))]" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="text-[11px] uppercase tracking-[0.32em] text-white/44">Leadership</p>
                        <p className="mt-2 text-sm leading-6 text-white/84">
                          Responsibility becomes visible when people step forward together.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/8 bg-black/16 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
              <MetricStrip items={impactStats} />
            </div>
          </div>
        </Surface>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5">
          <SectionHeading title="Empowering Youth. Inspiring Change." />
          <Surface className="overflow-hidden p-0">
            <section className="relative h-screen w-full overflow-clip">
              <Image
                src={programHero}
                alt="Programs hero"
                fill
                sizes="100vw"
                className="object-cover"
                priority={false}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.2)_24%,rgba(0,0,0,0.45)),radial-gradient(circle_at_18%_28%,rgba(0,0,0,0.32),transparent_46%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),transparent_30%)]" />
              <div className="absolute inset-0 flex items-start justify-start px-6 pt-[clamp(6.5rem,34vh,20rem)] sm:px-10 lg:px-16 xl:px-20">
                <Fall>
                  <h3 className="font-display whitespace-nowrap text-left text-[clamp(2.6rem,5.6vw,7.25rem)] font-medium leading-none tracking-[-0.11em] text-white" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.18)" }}>
                    تمكين الشباب. إلهام التغيير.
                  </h3>
                </Fall>
              </div>
            </section>

            <section className="relative flex min-h-screen w-full items-center justify-center overflow-clip px-6 py-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(141,84,255,0.11),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_42%,rgba(0,0,0,0.18))]" />
              <div className="relative mx-auto grid w-full max-w-4xl justify-items-center text-center">
                <PurposeMark />
                <Fall color="#005E53">
                  <div>
                    <p className="mb-5 text-xs uppercase text-white/42">Join the movement</p>
                    <h4 className="mx-auto max-w-3xl font-display text-5xl font-medium leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                      Lead with purpose. Serve with heart.
                    </h4>
                  </div>
                </Fall>
              </div>
            </section>
          </Surface>
        </div>
      </section>

      <section id="agents" className="border-t border-white/[0.08] px-6 py-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <PixelIcon type="agents" size={40} />
              <div className="mt-4"><Tag>PROGRAMS</Tag></div>
              <RevealText className="mt-5 text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
                {"Programmes that turn commitment\ninto action."}
              </RevealText>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/65">
              Youth leadership programmes, volunteer activities, community outreach initiatives, training & workshops, and social impact projects.
            </p>
          </div>

          <StackingAgentCards />
        </div>
      </section>
    </>
  );
}
