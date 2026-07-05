"use client";

import type { PropsWithChildren } from "react";
import { PageHero } from "@/components/page-hero";

type SimplePageProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}>;

export function SimplePage({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
}: SimplePageProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      />
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
}
