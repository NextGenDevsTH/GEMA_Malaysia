import { SimplePage } from "@/components/simple-page";
import { historyTimeline } from "@/lib/site";
import { TimelineRiver } from "@/components/timeline-river";

export const metadata = {
  title: "History",
};

export default function HistoryPage() {
  return (
    <SimplePage
      eyebrow="History"
      title="History, distilled into milestones."
      description="A compact timeline until approved archival copy arrives."
      primaryAction={{ label: "Explore vision", href: "/vision" }}
      secondaryAction={{ label: "Explore mission", href: "/mission" }}
    >
      <TimelineRiver items={historyTimeline} />
    </SimplePage>
  );
}
