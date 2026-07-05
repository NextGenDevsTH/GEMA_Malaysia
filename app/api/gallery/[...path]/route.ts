import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

const root = path.join(process.cwd(), "gallery");

function contentTypeFromExtension(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".avif":
      return "image/avif";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

export async function GET(_: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params;
  const relative = segments.join("/");
  const filePath = path.resolve(root, relative);

  if (path.relative(root, filePath).startsWith("..") || !existsSync(filePath)) {
    return new Response("Not found", { status: 404 });
  }

  const body = await readFile(filePath);

  return new Response(body, {
    headers: {
      "Content-Type": contentTypeFromExtension(filePath),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
