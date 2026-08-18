import { useMemo, useState } from "react";
import earthImg from "@/assets/earth-constellation.jpg";
import earthImgWebp from "@/assets/webp/earth-constellation.webp";
import {
  CONTRIBUTION_CATEGORIES,
  ILLUSTRATIVE_CONTRIBUTIONS,
  type ContributionRecord,
} from "@/lib/contributions";
import { ContributionCard } from "./ContributionCard";

type Filter = "all" | "offer" | "need";

/**
 * Contemplative, readable map. Nodes carry illustrative contribution records
 * so the constellation stops being purely decorative — without becoming a
 * dashboard.
 */
export function ConstellationMap() {
  const [filter, setFilter] = useState<Filter>("all");
  const [category, setCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<ContributionRecord | null>(null);
  const [hovered, setHovered] = useState<ContributionRecord | null>(null);

  const nodes = useMemo(
    () =>
      ILLUSTRATIVE_CONTRIBUTIONS.map((n) => ({
        node: n,
        visible:
          (filter === "all" || n.kind === filter) && (!category || n.category === category),
      })),
    [filter, category],
  );

  const visibleCount = nodes.filter((n) => n.visible).length;
  const focus = hovered ?? selected;

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div
            role="group"
            aria-label="Filter nodes"
            className="flex min-w-0 rounded-full border border-ivory/10 p-1"
          >
            {(
              [
                { id: "all", label: "All" },
                { id: "offer", label: "Offers" },
                { id: "need", label: "Needs" },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-all duration-500 ${
                  filter === f.id ? "bg-ivory text-space-black" : "text-ivory/50 hover:text-ivory"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="shrink-0 text-[9px] uppercase tracking-[0.3em] text-ivory/35">
            {visibleCount} illustrative nodes
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {CONTRIBUTION_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(category === c ? null : c)}
              className={`rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] transition-colors ${
                category === c
                  ? "border-gold-dust/60 bg-gold-dust/10 text-ivory"
                  : "border-ivory/10 text-ivory/45 hover:border-ivory/30 hover:text-ivory"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-ivory/10 bg-space-deep">
        <picture>
          <source srcSet={earthImgWebp} type="image/webp" />
          <img
            src={earthImg}
            alt="Earth at night with luminous nodes representing human solidarity connections"
            loading="lazy"
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-70"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent" />

        {nodes.map(({ node, visible }) => {
          const isOffer = node.kind === "offer";
          const active = focus?.ref === node.ref;
          return (
            <button
              key={node.ref}
              type="button"
              onMouseEnter={() => setHovered(node)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(node)}
              onBlur={() => setHovered(null)}
              onClick={() => setSelected(node)}
              aria-label={`${isOffer ? "Offer" : "Need"} — ${node.category}, ${node.territory}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 focus:outline-none ${
                visible ? "opacity-100" : "pointer-events-none opacity-10"
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <span
                className={`block rounded-full ${
                  isOffer ? "bg-gold-dust" : "bg-celestial"
                } ${active ? "h-3 w-3" : "h-2 w-2"} animate-pulse-soft`}
                style={{ boxShadow: "0 0 12px currentColor" }}
              />
            </button>
          );
        })}

        {/* Hover / focus whisper */}
        {focus && (
          <div className="pointer-events-none absolute inset-x-4 top-4 sm:inset-x-auto sm:right-6 sm:max-w-xs">
            <div className="rounded-2xl border border-ivory/10 bg-black/60 px-5 py-4 backdrop-blur-xl">
              <span
                className={`text-[9px] uppercase tracking-[0.3em] ${
                  focus.kind === "offer" ? "text-gold-dust" : "text-celestial"
                }`}
              >
                {focus.kind === "offer" ? "Offer" : "Need"} · {focus.category}
              </span>
              <p className="mt-2 text-xs font-light leading-relaxed text-ivory">{focus.summary}</p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-ivory/40">
                {focus.territory} · {focus.languages.join(" · ")} · {focus.availability}
              </p>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <Legend colour="bg-gold-dust" label="Offer" />
          <Legend colour="bg-celestial" label="Need" />
          <span className="rounded-full border border-ivory/10 bg-black/40 px-4 py-2 text-[9px] uppercase tracking-[0.25em] text-ivory/60 backdrop-blur-xl">
            Illustrative feed — not live data
          </span>
        </div>
      </div>

      <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-ivory/30">
        Hover or select a node to read what it carries.
      </p>

      {selected && (
        <div className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <ContributionCard item={selected} />
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="justify-self-start rounded-full border border-ivory/15 px-5 py-2 text-[9px] uppercase tracking-[0.3em] text-ivory/50 transition-colors hover:text-ivory"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

function Legend({ colour, label }: { colour: string; label: string }) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-ivory/10 bg-black/40 px-4 py-2 backdrop-blur-xl">
      <span className={`h-1.5 w-1.5 rounded-full ${colour} shadow-[0_0_10px_currentColor]`} />
      <span className="text-[9px] uppercase tracking-[0.25em] text-ivory">{label}</span>
    </span>
  );
}
