import { readdir, stat } from "fs/promises";
import path from "path";

const galleryRoot = path.join(process.cwd(), "gallery");
const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]);

export type GalleryAsset = {
  name: string;
  title: string;
  caption: string;
  category: string;
  relativePath: string;
  urlPath: string;
  widthHint: number;
  heightHint: number;
  featured: boolean;
  objectPosition: string;
  order: number;
};

const galleryMetadata: Record<
  string,
  Pick<GalleryAsset, "title" | "caption" | "category" | "featured" | "objectPosition" | "order">
> = {
  "1-enhanced.jpg": {
    title: "Menjana Perubahan Positif",
    caption: "A sharpened version of the leadership banner for clearer presentation.",
    category: "Identity",
    featured: true,
    objectPosition: "center 35%",
    order: 1,
  },
  "1hero.jpg": {
    title: "Hero Image",
    caption: "The primary homepage hero image from the official gallery.",
    category: "Identity",
    featured: false,
    objectPosition: "center 35%",
    order: 50,
  },
  "hero.jpg": {
    title: "Hero Image",
    caption: "The primary homepage hero image from the official gallery.",
    category: "Identity",
    featured: true,
    objectPosition: "center 35%",
    order: 0,
  },
  "group-simling.png": {
    title: "National Gathering",
    caption: "A hall full of young leaders standing together in a shared civic moment.",
    category: "Community",
    featured: true,
    objectPosition: "center 24%",
    order: 1,
  },
  "2ndImages.jpg": {
    title: "Perhimpunan Perwakilan Nasional",
    caption: "A national gathering story that anchors the movement’s scale and seriousness.",
    category: "Forum",
    featured: true,
    objectPosition: "center 42%",
    order: 1,
  },
  "1.jpeg": {
    title: "Menjana Perubahan Positif",
    caption: "Leadership banner art with a strong public-facing identity.",
    category: "Identity",
    featured: true,
    objectPosition: "center 30%",
    order: 2,
  },
  "5.jpg": {
    title: "Kejohanan Catur Terbuka",
    caption: "A program poster for a chess competition and youth activity partnership.",
    category: "Sports",
    featured: false,
    objectPosition: "center 50%",
    order: 3,
  },
  "11.jpg": {
    title: "Jawatankuasa Pusat",
    caption: "Central committee identity and leadership roster art.",
    category: "Leadership",
    featured: true,
    objectPosition: "center 25%",
    order: 4,
  },
  "7.jpg": {
    title: "Forum Assembly",
    caption: "A large forum photograph with a formal setting and national context.",
    category: "Forum",
    featured: true,
    objectPosition: "center 40%",
    order: 5,
  },
  "10.jpg": {
    title: "Volunteer Session",
    caption: "A group moment with warm energy and strong volunteer participation.",
    category: "Community",
    featured: true,
    objectPosition: "center 40%",
    order: 6,
  },
  "18.jpg": {
    title: "Community Assembly",
    caption: "A wide group portrait that reads like a movement milestone.",
    category: "Community",
    featured: true,
    objectPosition: "center 44%",
    order: 7,
  },
  "13.jpg": {
    title: "Perwakilan Nasional 2026",
    caption: "A heritage-led program poster with a documentary tone.",
    category: "Identity",
    featured: false,
    objectPosition: "center 44%",
    order: 8,
  },
  "14.jpeg": {
    title: "Public Leadership Banner",
    caption: "A leadership banner with a clear volunteer-first visual language.",
    category: "Leadership",
    featured: false,
    objectPosition: "center 50%",
    order: 9,
  },
  "14.jpg": {
    title: "Event Hall Group",
    caption: "A formal gathering inside a hall, ideal for the documentary section.",
    category: "Forum",
    featured: false,
    objectPosition: "center 45%",
    order: 10,
  },
  "15.jpg": {
    title: "Emotional Learning Session",
    caption: "A community workshop poster with a softer educational tone.",
    category: "Education",
    featured: false,
    objectPosition: "center 45%",
    order: 11,
  },
  "16.jpg": {
    title: "Program Announce Banner",
    caption: "A wide announcement layout for youth programming and brand consistency.",
    category: "Identity",
    featured: false,
    objectPosition: "center 35%",
    order: 12,
  },
  "17.jpg": {
    title: "Gathered Volunteer Group",
    caption: "A direct, energetic group photograph for the community section.",
    category: "Community",
    featured: false,
    objectPosition: "center 45%",
    order: 13,
  },
  "2.jpeg": {
    title: "Family & Emotion Workshop",
    caption: "A program poster centered on emotional literacy in the family context.",
    category: "Education",
    featured: false,
    objectPosition: "center 46%",
    order: 14,
  },
  "3.jpg": {
    title: "National Program Poster",
    caption: "A wide event poster suited for the campaign archive.",
    category: "Forum",
    featured: false,
    objectPosition: "center 42%",
    order: 15,
  },
  "4.jpg": {
    title: "Open Chess Championship",
    caption: "A sports poster with strong geometric composition and clear dates.",
    category: "Sports",
    featured: false,
    objectPosition: "center 46%",
    order: 16,
  },
  "6.jpg": {
    title: "Perwakilan Nasional",
    caption: "A program banner that pairs well with the documentary timeline.",
    category: "Forum",
    featured: false,
    objectPosition: "center 50%",
    order: 17,
  },
  "8.jpeg": {
    title: "Banner Strip",
    caption: "A clean wide banner for campaign identity and page separators.",
    category: "Identity",
    featured: false,
    objectPosition: "center 50%",
    order: 18,
  },
  "9.jpg": {
    title: "Movement Banner",
    caption: "A strong horizontal banner with a clear callout composition.",
    category: "Identity",
    featured: false,
    objectPosition: "center 50%",
    order: 19,
  },
  "12.jpg": {
    title: "Public Program Poster",
    caption: "A compact identity poster ready for the archive walls.",
    category: "Identity",
    featured: false,
    objectPosition: "center 35%",
    order: 20,
  },
};

async function walk(dir: string, base = ""): Promise<GalleryAsset[]> {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const result: GalleryAsset[] = [];

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    const relative = path.join(base, entry.name);

    if (entry.isDirectory()) {
      result.push(...(await walk(absolute, relative)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!allowedExtensions.has(ext)) continue;
    if (entry.name === "heroImage.jpg") continue;

    const fileStat = await stat(absolute);
    const metadata = galleryMetadata[entry.name] ?? {
      title: "Gallery Image",
      caption: "Official gallery asset.",
      category: "Archive",
      featured: false,
      objectPosition: "center center",
      order: 999,
    };

    result.push({
      name: path.basename(entry.name, ext),
      relativePath: relative,
      urlPath: `/api/gallery/${encodeURIComponent(relative).replaceAll("%2F", "/")}`,
      widthHint: fileStat.size > 4000000 ? 1600 : 1200,
      heightHint: fileStat.size > 4000000 ? 1800 : 1400,
      ...metadata,
    });
  }

  return result.sort((a, b) => a.order - b.order);
}

export async function getGalleryAssets() {
  return walk(galleryRoot);
}

export function getFeaturedGalleryAssets(assets: GalleryAsset[]) {
  return assets.filter((asset) => asset.featured).slice(0, 6);
}
