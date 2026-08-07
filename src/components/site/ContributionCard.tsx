import type { ContributionRecord } from "@/lib/contributions";
import { StatusBadge } from "./DataStatus";

const PRESENCE_LABEL: Record<ContributionRecord["presence"], string> = {
  remote: "Remote",
  "in-person": "In person",
  hybrid: "Remote or in person",
};

/**
 * Anonymised representation of a circulating gesture.
 * Deliberately carries no avatar, no name, no popularity metric.
 */
export function ContributionCard({
  item,
  compact = false,
  className = "",
}: {
  item: ContributionRecord;
  compact?: boolean;
  className?: string;
}) {
  const isOffer = item.kind === "offer";
  const accent = isOffer ? "text-gold-dust" : "text-celestial";
  const ring = isOffer ? "border-gold-dust/25" : "border-celestial/25";

  return (
    <article
      className={`rounded-2xl border ${ring} bg-space-deep/50 p-6 transition-colors hover:border-ivory/30 ${className}`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <span className={`text-[9px] uppercase tracking-[0.3em] ${accent}`}>
          {isOffer ? "Offer" : "Need"} · {item.category}
        </span>
        <span className="shrink-0 font-display text-[9px] tracking-[0.3em] text-ivory/25">
          {item.ref}
        </span>
      </div>

      <p className="mt-4 text-sm font-light leading-relaxed text-ivory">{item.summary}</p>

      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-[10px] uppercase tracking-[0.2em]">
        <Meta label="Territory" value={item.territory} />
        <Meta label={isOffer ? "Rhythm" : "Timeframe"} value={item.availability} />
        <Meta label="Languages" value={item.languages.join(" · ")} />
        <Meta label="Presence" value={PRESENCE_LABEL[item.presence]} />
      </dl>

      {!compact && (
        <div className="mt-6 border-t border-ivory/10 pt-5">
          <StatusBadge status="illustrative" />
          <p className="mt-3 text-[11px] leading-relaxed text-ivory/35">
            No identity, no contact channel and no profile is attached. This card shows what
            circulates, not who circulates it.
          </p>
        </div>
      )}
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[8px] tracking-[0.3em] text-ivory/30">{label}</dt>
      <dd className="mt-1 truncate text-[10px] tracking-[0.15em] text-ivory/70">{value}</dd>
    </div>
  );
}
