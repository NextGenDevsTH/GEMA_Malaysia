import type { PropsWithChildren } from "react";

type SurfaceProps = PropsWithChildren<{
  className?: string;
}>;

export function Surface({ className, children }: SurfaceProps) {
  return (
    <div
      className={[
        "glass-surface relative overflow-hidden rounded-[28px]",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/10 via-transparent to-transparent" />
      {children}
    </div>
  );
}
