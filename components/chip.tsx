import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  active?: boolean;
};

export function Chip({ children, active }: ChipProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-[0.08em] transition",
        active
          ? "bg-[linear-gradient(135deg,_rgba(141,84,255,0.95),_rgba(168,123,255,0.78))] text-[#ffffff] shadow-[0_10px_24px_rgba(141,84,255,0.18)]"
          : "border border-white/10 bg-white/5 text-white/74",
      ].join(" ")}
    >
      {children}
    </span>
  );
}
