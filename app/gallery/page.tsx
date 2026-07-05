import { GalleryExperience } from "@/components/gallery-experience";
import { getGalleryAssets } from "@/lib/gallery";

export const metadata = {
  title: "Gallery",
};

export default async function GalleryPage() {
  const assets = await getGalleryAssets();

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <GalleryExperience assets={assets} />
    </main>
  );
}
