import { SimplePage } from "@/components/simple-page";
import { ActivityExplorer } from "@/components/activity-explorer";
import { activities, site } from "@/lib/site";

export const metadata = {
  title: "Activities",
};

export default function ActivitiesPage() {
  return (
    <SimplePage
      eyebrow="Activities"
      title="Filter by state, category, and search term."
      description="This archive is designed to manage real program entries, posters, dates, locations, and pages for each activity."
      primaryAction={{ label: "Gallery", href: "/gallery" }}
      secondaryAction={{ label: "Join us", href: site.registerUrl }}
    >
      <ActivityExplorer activities={activities} />
    </SimplePage>
  );
}
