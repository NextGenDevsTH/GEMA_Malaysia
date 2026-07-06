import { Reveal } from "@/components/reveal";
import { AnimatedCounter } from "@/components/animated-counter";

type MetricStripProps = {
  items: ReadonlyArray<{
    label: string;
    value: string;
    note: string;
  }>;
};

export function MetricStrip({ items }: MetricStripProps) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02)),rgba(255,255,255,0.03)] shadow-soft">
        <div className="grid divide-y divide-white/8 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
          {items.map((item, index) => (
            <div key={item.label} className="relative p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[11px] uppercase tracking-[0.34em] text-white">{item.label}</p>
                <span className="h-2 w-2 rounded-full bg-[color:var(--accent-strong)] shadow-[0_0_18px_rgba(168,123,255,0.55)]" />
              </div>
              <p className="mt-5 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold tracking-[-0.08em] text-white">
                <MetricValue value={item.value} />
              </p>
              <p className="mt-3 max-w-[18rem] text-sm leading-6 text-white/60">{item.note}</p>
              {index === 0 ? (
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent md:hidden" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function MetricValue({ value }: { value: string }) {
  const numeric = Number(value);
  if (Number.isFinite(numeric) && String(numeric) === value) {
    return <AnimatedCounter value={numeric} />;
  }

  return <span>{value}</span>;
}
