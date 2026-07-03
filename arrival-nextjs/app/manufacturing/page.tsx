import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing — 11-Stage Bus Body Workflow",
  description: "From CAD to road test — see the eleven-stage industrial workflow behind every Arrival Bus body.",
};

const stages = [
  { t: "Requirement Analysis", d: "Route, chassis, capacity, climate, livery — captured as engineering inputs." },
  { t: "CAD Design", d: "3D SolidWorks models with full BOM, tooling paths and manufacturing drawings." },
  { t: "3D Simulation", d: "FEA on structure, CFD on aerodynamics, thermal analysis on HVAC." },
  { t: "Structural Fabrication", d: "CNC-cut galvanized tube sections, robotic MIG welding on load paths." },
  { t: "Body Assembly", d: "Panels bonded and mechanically fastened to the space frame in dedicated bays." },
  { t: "Painting", d: "7-stage phosphate + electrostatic paint booth for automotive-grade finish." },
  { t: "Interior Installation", d: "Seats, panels, flooring, HVAC ducts and luggage bins fitted to spec." },
  { t: "Electrical Integration", d: "CAN-bus harnessing, PA, CCTV, telematics and PIS integration." },
  { t: "Quality Inspection", d: "48-point QA — dimensional, structural, electrical and cosmetic." },
  { t: "Road Testing", d: "Loaded and unloaded runs, ride, NVH and brake balance verification." },
  { t: "Delivery", d: "Handover with commissioning certificate, spares kit and operator training." },
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

export default function ManufacturingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="— Manufacturing"
        title="A Factory That Runs On Engineering Discipline."
        subtitle="Eleven stages. Zero shortcuts. Every body is engineered, built, tested and signed off in one facility."
        image="/manufacturing.jpg"
      />

      <section className="container-x" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div className="eyebrow">— The Workflow</div>
        <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2rem,5vw,3.5rem)" }}>Eleven Stages,<br />One Signature.</h2>

        <ol style={{ marginTop: "4rem", position: "relative", borderLeft: "1px solid var(--border)", paddingLeft: "2rem", listStyle: "none", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {stages.map((s, i) => (
            <li key={s.t} style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "-2.625rem", top: 0, display: "grid", height: "2rem", width: "2rem", placeItems: "center", background: "var(--accent)", color: "var(--accent-foreground)", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "0.875rem" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--muted-foreground)" }}>Stage {i + 1} of 11</div>
              <div style={{ marginTop: "0.25rem", fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "1.5rem" }}>{s.t}</div>
              <p style={{ marginTop: "0.5rem", maxWidth: "42rem", color: "rgba(255,255,255,0.8)" }}>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <Reveal from="left">
            <div style={{ aspectRatio: "4/3", overflow: "hidden", border: "1px solid var(--border)" }}>
              <img src="/chassis.jpg" alt="Structural fabrication" loading="lazy" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
            </div>
          </Reveal>
          <Reveal from="right" delay={150}>
            <div>
              <div className="eyebrow">— Engineering Capability</div>
              <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2rem,5vw,3rem)" }}>Simulate. Build.<br />Verify.</h2>
              <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.8)" }}>Nine engineering pillars every body passes through before it earns the Arrival badge.</p>
              <ul className="grid sm:grid-cols-2 gap-4" style={{ marginTop: "2rem", listStyle: "none" }}>
                {engineering.map((e) => (
                  <li key={e.t} style={{ border: "1px solid var(--border)", padding: "1rem", background: "var(--background)" }}>
                    <div style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em" }}>{e.t}</div>
                    <p style={{ marginTop: "0.25rem", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{e.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid lg:grid-cols-2 gap-12 items-center" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div>
          <div className="eyebrow">— Craftsmanship</div>
          <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2rem,5vw,3rem)" }}>Interiors Built Like<br />European Coaches.</h2>
          <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.8)", maxWidth: "32rem" }}>Seat rails, luggage bins, HVAC ducts and dashboards are custom-tooled for each order — never off-the-shelf.</p>
        </div>
        <div style={{ aspectRatio: "16/10", overflow: "hidden", border: "1px solid var(--border)" }}>
          <img src="/interior.jpg" alt="Bus interior craftsmanship" loading="lazy" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
        </div>
      </section>
    </SiteLayout>
  );
}
