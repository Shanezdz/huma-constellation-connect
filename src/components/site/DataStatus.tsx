import { Link } from "@tanstack/react-router";

type Status =
  | "prototype"
  | "illustrative"
  | "demonstration"
  | "verified-story"
  | "community-story"
  | "anonymous-testimony"
  | "illustrative-scenario";

const LABELS: Record<Status, { label: string; tone: string }> = {
  prototype: { label: "Prototype data", tone: "text-celestial border-celestial/30" },
  illustrative: { label: "Illustrative data", tone: "text-gold-dust border-gold-dust/30" },
  demonstration: { label: "Demonstration", tone: "text-ivory/60 border-ivory/20" },
  "verified-story": { label: "Verified story", tone: "text-aurora border-aurora/30" },
  "community-story": { label: "Community story", tone: "text-celestial border-celestial/30" },
  "anonymous-testimony": { label: "Anonymous testimony", tone: "text-ivory/60 border-ivory/20" },
  "illustrative-scenario": {
    label: "Illustrative scenario",
    tone: "text-gold-dust border-gold-dust/30",
  },
};

/** Small, discreet provenance badge. Never implies verification that does not exist. */
export function StatusBadge({ status, className = "" }: { status: Status; className?: string }) {
  const s = LABELS[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[9px] uppercase tracking-[0.25em] ${s.tone} ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

/** Inline note explaining the provenance of the numbers on the current screen. */
export function DataDisclosure({
  status = "illustrative",
  children,
  className = "",
}: {
  status?: Status;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-start gap-3 rounded-xl border border-ivory/10 bg-space-deep/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={status} />
        <p className="text-xs leading-relaxed text-ivory/50">
          {children ??
            "These figures are not measurements of real-world global activity. They illustrate how the map will read once the network is live."}
        </p>
      </div>
      <Link
        to="/methodology"
        className="shrink-0 text-[9px] uppercase tracking-[0.3em] text-ivory/40 underline-offset-4 transition-colors hover:text-gold-dust hover:underline"
      >
        Methodology →
      </Link>
    </div>
  );
}
