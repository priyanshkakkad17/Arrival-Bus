"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Cpu, Zap, Shield, Cog, Wrench, Award } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Cpu, Zap, Shield, Cog, Wrench, Award };

type Feature = { icon: string; t: string; d: string };

export function EngFeatureSlider({ features }: { features: Feature[] }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + features.length) % features.length);
  const next = () => setIdx((i) => (i + 1) % features.length);
  const f = features[idx];
  const Icon = iconMap[f.icon] ?? Cpu;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", minHeight: "5rem" }}>
        <Icon size={28} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
        <div>
          <div style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em", fontSize: "1rem" }}>
            {f.t}
          </div>
          <p style={{ marginTop: "0.4rem", fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
            {f.d}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1.5rem" }}>
        <button
          onClick={prev}
          style={{ display: "grid", placeItems: "center", width: "2.25rem", height: "2.25rem", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)", color: "var(--foreground)", cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--foreground)"; }}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={next}
          style={{ display: "grid", placeItems: "center", width: "2.25rem", height: "2.25rem", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)", color: "var(--foreground)", cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--foreground)"; }}
        >
          <ChevronRight size={16} />
        </button>
        <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>
          {String(idx + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
