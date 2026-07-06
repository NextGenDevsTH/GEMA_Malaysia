import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ScrollProgress } from "@/components/scroll-progress";
import { MotionProvider } from "@/components/motion-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.shortName}`,
  },
  description:
    "An editorial, high-trust digital experience for Pertubuhan Pemuda GEMA Malaysia.",
  applicationName: site.shortName,
  metadataBase: new URL(site.officialSiteUrl),
  openGraph: {
    title: site.name,
    description:
      "A premium public website concept for Malaysia's youth movement with a strong volunteer, leadership, and humanitarian focus.",
    url: site.officialSiteUrl,
    siteName: site.shortName,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#8D54FF",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ms" suppressHydrationWarning>
      <body className="bg-page text-[color:var(--text)]">
        <div className="grain min-h-dvh">
          <ScrollProgress />
          <SiteHeader />
          <MotionProvider>
            <main>{children}</main>
          </MotionProvider>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
