"use client";

import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { useEffect, useRef, useState } from "react";
// metadata must live in a server component; title is set in layout.tsx for this route

const stages = [
  {
    num: "01",
    t: "Requirement Analysis",
    d: "Route, chassis, capacity, climate, livery — captured as engineering inputs.",
    icon: "📋",
    color: "#e8650a",
  },
  {
    num: "02",
    t: "CAD Design",
    d: "3D SolidWorks models with full BOM, tooling paths and manufacturing drawings.",
    icon: "✏️",
    color: "#f07020",
  },
  {
    num: "03",
    t: "3D Simulation",
    d: "FEA on structure, CFD on aerodynamics, thermal analysis on HVAC.",
    icon: "🖥️",
    color: "#e8650a",
  },
  {
    num: "04",
    t: "Structural Fabrication",
    d: "CNC-cut galvanized tube sections, robotic MIG welding on load paths.",
    icon: "⚙️",
    color: "#f07020",
  },
  {
    num: "05",
    t: "Body Assembly",
    d: "Panels bonded and mechanically fastened to the space frame in dedicated bays.",
    icon: "🔩",
    color: "#e8650a",
  },
  {
    num: "06",
    t: "Painting",
    d: "7-stage phosphate + electrostatic paint booth for automotive-grade finish.",
    icon: "🎨",
    color: "#f07020",
  },
  {
    num: "07",
    t: "Interior Installation",
    d: "Seats, panels, flooring, HVAC ducts and luggage bins fitted to spec.",
    icon: "🪑",
    color: "#e8650a",
  },
  {
    num: "08",
    t: "Electrical Integration",
    d: "CAN-bus harnessing, PA, CCTV, telematics and PIS integration.",
    icon: "⚡",
    color: "#f07020",
  },
  {
    num: "09",
    t: "Quality Inspection",
    d: "48-point QA — dimensional, structural, electrical and cosmetic.",
    icon: "🔍",
    color: "#e8650a",
  },
  {
    num: "10",
    t: "Road Testing",
    d: "Loaded and unloaded runs, ride, NVH and brake balance verification.",
    icon: "🛣️",
    color: "#f07020",
  },
  {
    num: "11",
    t: "Delivery",
    d: "Handover with commissioning certificate, spares kit and operator training.",
    icon: "🏁",
    color: "#e8650a",
  },
];

const engineering = [
  { t: "3D CAD/CAM Design", d: "Full-vehicle SolidWorks assemblies drive tooling and cut lists." },
  { t: "Aerodynamic Simulation", d: "CFD-tuned roof, front fascia and mirror geometry." },
  { t: "High-Strength Galvanized Steel", d: "Hollow section frames, hot-dip galvanized post-fab." },
  { t: "Lightweight Aluminium Structures", d: "Roof and side panels in aluminium alloys." },
  { t: "Fire-Retardant Composite Panels", d: "FRP interior panels tested to AIS-153." },
  { t: "Anti-Corrosion Treatment", d: "7-stage phosphating + cathodic electrocoat." },
  { t: "Leak Testing", d: "Every unit rain-tested in dedicated cabin." },
  { t: "Roll Stability Testing", d: "Static tilt-table tested to AIS-153 tilt angle." },
  { t: "Quality Assurance", d: "Every stage signed off by a lead engineer." },
];

function StageCard({ stage, index }: { stage: (typeof stages)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isRight = index % 2 === 1;

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 80px 1fr",
        alignItems: "center",
        gap: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 60}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms`,
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "2rem" }}>
        {!isRight && <CardContent stage={stage} align="right" />}
      </div>

      {/* Center spine */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
        {/* Top connector line */}
        {index > 0 && (
          <div style={{ width: "2px", height: "2rem", background: "linear-gradient(to bottom, transparent, var(--accent))" }} />
        )}
        {/* Node */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: visible ? "var(--accent)" : "var(--surface)",
            border: "2px solid var(--accent)",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "0.85rem",
            letterSpacing: "0.05em",
            color: visible ? "var(--accent-foreground)" : "var(--accent)",
            transition: `background 0.5s ease ${index * 60 + 300}ms, color 0.5s ease ${index * 60 + 300}ms`,
            boxShadow: visible ? "0 0 24px rgba(232,101,10,0.5)" : "none",
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          {stage.num}
        </div>
        {/* Bottom connector line */}
        {index < stages.length - 1 && (
          <div style={{ width: "2px", height: "2rem", background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
        )}
      </div>

      {/* Right side */}
      <div style={{ paddingLeft: "2rem" }}>
        {isRight && <CardContent stage={stage} align="left" />}
      </div>
    </div>
  );
}

function CardContent({ stage, align }: { stage: (typeof stages)[0]; align: "left" | "right" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--surface-2)" : "var(--surface)",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        padding: "1.25rem 1.5rem",
        textAlign: align,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px -12px rgba(232,101,10,0.25)" : "none",
        cursor: "default",
        maxWidth: "420px",
        marginLeft: align === "left" ? 0 : "auto",
      }}
    >
      <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{stage.icon}</div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontSize: "1.1rem",
          color: hovered ? "var(--accent)" : "var(--foreground)",
          transition: "color 0.3s ease",
        }}
      >
        {stage.t}
      </div>
      <p style={{ marginTop: "0.35rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
        {stage.d}
      </p>
    </div>
  );
}

function MobileStageRow({ stage, index }: { stage: (typeof stages)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "stretch" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        {index > 0 && <div style={{ width: "2px", height: "1.5rem", background: "var(--accent)", opacity: 0.4 }} />}
        <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--accent)", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "0.75rem", color: "var(--accent-foreground)", flexShrink: 0, boxShadow: "0 0 16px rgba(232,101,10,0.4)" }}>
          {stage.num}
        </div>
        {index < stages.length - 1 && <div style={{ width: "2px", flex: 1, background: "var(--accent)", opacity: 0.4, minHeight: "1.5rem" }} />}
      </div>
      <div
        ref={ref}
        style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", padding: "1rem 1.25rem", marginBottom: "0.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(20px)", transition: `opacity 0.6s ease ${index * 50}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 50}ms` }}
      >
        <div style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{stage.icon}</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "1rem" }}>{stage.t}</div>
        <p style={{ marginTop: "0.25rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{stage.d}</p>
      </div>
    </div>
  );
}

function MobileTimeline() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {stages.map((s, i) => <MobileStageRow key={s.t} stage={s} index={i} />)}
    </div>
  );
}

export default function ManufacturingPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="— Manufacturing"
        title="A Factory That Runs On Engineering Discipline."
        subtitle="Eleven stages. Zero shortcuts. Every body is engineered, built, tested and signed off in one facility."
        image="/images/pages/manufacturing.jpg"
      />

      {/* ── TIMELINE SECTION ── */}
      <section className="container-x" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
        <Reveal>
          <div className="eyebrow">— The Workflow</div>
          <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Eleven Stages,<br />One Signature.
          </h2>
          <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: "40rem", fontSize: "0.95rem" }}>
            Every bus body passes through a disciplined eleven-stage workflow — from the first engineering brief to the final handover certificate.
          </p>
        </Reveal>

        <div style={{ marginTop: "4rem", position: "relative" }}>
          {/* Continuous spine line (desktop) */}
          {!isMobile && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "linear-gradient(to bottom, transparent, var(--accent) 5%, var(--accent) 95%, transparent)",
                opacity: 0.25,
                transform: "translateX(-50%)",
                pointerEvents: "none",
              }}
            />
          )}

          {isMobile ? (
            <MobileTimeline />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {stages.map((s, i) => (
                <StageCard key={s.t} stage={s} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Progress bar strip */}
        <Reveal>
          <div
            style={{
              marginTop: "4rem",
              display: "flex",
              gap: "4px",
              alignItems: "center",
            }}
          >
            {stages.map((s, i) => (
              <div key={s.num} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                <div
                  style={{
                    height: "4px",
                    width: "100%",
                    background: "var(--accent)",
                    opacity: 0.3 + (i / stages.length) * 0.7,
                    borderRadius: "2px",
                  }}
                />
                <span style={{ fontSize: "9px", fontFamily: "var(--font-display)", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>
                  {s.num}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── ENGINEERING CAPABILITY ── */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <Reveal from="left">
            <div style={{ aspectRatio: "4/3", overflow: "hidden", border: "1px solid var(--border)" }}>
              <img src="/images/pages/chassis.jpg" alt="Structural fabrication" loading="lazy" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
            </div>
          </Reveal>
          <Reveal from="right" delay={150}>
            <div>
              <div className="eyebrow">— Engineering Capability</div>
              <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2rem,5vw,3rem)" }}>Simulate. Build.<br />Verify.</h2>
              <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.8)" }}>
                Nine engineering pillars every body passes through before it earns the Arrival badge.
              </p>
              <ul className="grid sm:grid-cols-2 gap-4" style={{ marginTop: "2rem", listStyle: "none" }}>
                {engineering.map((e) => (
                  <li key={e.t} style={{ border: "1px solid var(--border)", padding: "1rem", background: "var(--background)", transition: "border-color 0.3s, transform 0.3s" }}
                    onMouseEnter={e2 => { (e2.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e2.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e2 => { (e2.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e2.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                  >
                    <div style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em" }}>{e.t}</div>
                    <p style={{ marginTop: "0.25rem", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{e.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INTERIOR ── */}
      <section className="container-x grid lg:grid-cols-2 gap-12 items-center" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div>
          <div className="eyebrow">— Craftsmanship</div>
          <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2rem,5vw,3rem)" }}>Interiors Built Like<br />European Coaches.</h2>
          <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.8)", maxWidth: "32rem" }}>
            Seat rails, luggage bins, HVAC ducts and dashboards are custom-tooled for each order — never off-the-shelf.
          </p>
        </div>
        <div style={{ aspectRatio: "16/10", overflow: "hidden", border: "1px solid var(--border)" }}>
          <img src="/images/pages/interior.jpg" alt="Bus interior craftsmanship" loading="lazy" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
        </div>
      </section>
    </SiteLayout>
  );
}
