import { GalleryExhibition } from "@/components/gallery-exhibition";
import { getGalleryAssets } from "@/lib/gallery";

export const metadata = {
  title: "Gallery",
};

export default async function GalleryPage() {
  const assets = await getGalleryAssets();

  return (
    <main className="w-full">
      <GalleryExhibition assets={assets} />
    </main>
  );
}
