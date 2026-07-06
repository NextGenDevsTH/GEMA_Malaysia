import { SimplePage } from "@/components/simple-page";
import { Surface } from "@/components/surface";

export const metadata = {
  title: "Videos",
};

export default function MediaVideosPage() {
  return (
    <SimplePage
      eyebrow="Video Gallery"
      title="Ready for campaign cuts, recaps, and short-form leadership stories."
      description="A video-ready archive with a placeholder embed until GEMA-approved campaign clips are supplied."
      primaryAction={{ label: "Contact", href: "/contact" }}
      secondaryAction={{ label: "Photos", href: "/media/photos" }}
    >
      <Surface className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="aspect-video bg-black">
            <iframe
              title="Rakan Muda youth video placeholder"
              src="https://www.youtube.com/embed/WQkStTQXrEE"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="grid divide-y divide-white/8">
            <div className="px-7 py-6">
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Featured placeholder</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-white">
                Youth movement video slot
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/64">
                Temporary Malaysian youth-program embed. Replace this with official GEMA footage when approved.
              </p>
            </div>
            <div className="grid grid-cols-[0.9fr_1.1fr] gap-4 px-7 py-6">
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Format</p>
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Purpose</p>
            </div>
            {[
              ["Program recap", "Concise event summaries for the public archive."],
              ["Volunteer story", "Human-first storytelling with a clear community lens."],
              ["Leadership message", "Short, direct communication from the organisation."],
              ["Field interview", "On-location clips that keep the record credible."],
            ].map(([slot, detail], index) => (
              <div key={slot} className="grid grid-cols-[0.9fr_1.1fr] gap-4 px-7 py-6 transition hover:bg-white/4">
                <p className="text-base font-medium text-white">
                  <span className="mr-3 text-[11px] uppercase tracking-[0.24em] text-white/40">0{index + 1}</span>
                  {slot}
                </p>
                <p className="text-sm leading-7 text-white/64">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Surface>
    </SimplePage>
  );
}
