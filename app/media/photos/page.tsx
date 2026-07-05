import { SimplePage } from "@/components/simple-page";
import { GalleryExperience } from "@/components/gallery-experience";
import { getGalleryAssets } from "@/lib/gallery";

export const metadata = {
  title: "Photos",
};

export default async function MediaPhotosPage() {
  const assets = await getGalleryAssets();

  return (
    <SimplePage
      eyebrow="Photo Gallery"
      title="Editorial photo shelves for official albums."
      description="The gallery system is wired to the root folder so that the real file collection can be used without additional CMS plumbing."
      primaryAction={{ label: "Gallery", href: "/gallery" }}
      secondaryAction={{ label: "Videos", href: "/media/videos" }}
    >
      <GalleryExperience assets={assets} />
    </SimplePage>
  );
}
