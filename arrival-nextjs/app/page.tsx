import Link from "next/link";
import { ArrowRight, Download, Calendar, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { ProductShowcase } from "@/components/site/ProductShowcase";
import { EngFeatureSlider } from "@/components/site/EngFeatureSlider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arrival Bus Pvt. Ltd. — Premium Bus Body Manufacturing",
  description: "Engineering safer, smarter and stronger bus bodies.",
};

const process = [
  "Requirement Analysis","CAD Design","3D Simulation","Structural Fabrication",
  "Body Assembly","Painting","Interior Installation","Electrical Integration",
  "Quality Inspection","Road Testing","Delivery",
];

const engFeatures = [
  { icon: "Cpu",    t: "3D CAD/CAM Design",       d: "Every body engineered in SolidWorks with FEA-verified load paths." },
  { icon: "Zap",    t: "Aerodynamic Simulation",   d: "CFD-tuned profiles reduce drag and improve fuel efficiency." },
  { icon: "Shield", t: "Galvanized Steel Frame",   d: "High-strength, corrosion-resistant hollow sections." },
  { icon: "Cog",    t: "Aluminum Structures",      d: "Lightweight superstructure lowers kerb weight without loss of rigidity." },
  { icon: "Wrench", t: "Composite Panels",         d: "Fire-retardant FRP panels engineered to AIS-153." },
  { icon: "Award",  t: "Roll Stability Tested",    d: "Every unit passes tilt, leak and vibration protocols." },
];

export default function HomePage() {
  return (
    <SiteLayout>

      {/* ── HERO ── */}
      <section className="hero-section">
        <img src="/hero-bus.jpg" alt="Premium luxury coach" className="hero-img" />
        <div className="hero-overlay-bottom" />
        <div className="hero-overlay-left" />

        <div className="container-x hero-content">
          <div style={{ maxWidth: "46rem" }}>
            <div className="eyebrow hero-eyebrow" style={{ marginBottom: "1.25rem" }}>
              — Premium Bus Body Manufacturing
            </div>
            <h1 className="hero-title">
              Engineering{" "}
              <span style={{ color: "var(--accent)" }}>Safer</span>,<br />
              Smarter &amp; Stronger<br />
              Bus Bodies.
            </h1>
            <p className="hero-sub" style={{ marginTop: "1.5rem", maxWidth: "32rem", fontSize: "1.05rem", color: "rgba(245,245,247,0.75)", lineHeight: 1.7 }}>
              Arrival Bus Pvt. Ltd. designs and manufactures premium customized bus bodies for school transport, sleeper coaches, electric buses, city buses, staff buses and luxury coaches.
            </p>
            <div className="hero-btns" style={{ marginTop: "2.25rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link href="/contact" className="btn-primary">Request Custom Quotation <ArrowRight size={15} /></Link>
              <a href="#brochure" className="btn-ghost"><Download size={15} /> Product Brochure</a>
              <Link href="/contact" className="btn-ghost"><Calendar size={15} /> Factory Visit</Link>
              <Link href="/contact" className="btn-ghost"><Phone size={15} /> Speak with Lead Engineer</Link>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", textAlign: "right" }}>
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--muted-foreground)" }}>Model 01</div>
          <div style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>ABL Marathon 3-Axle</div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section style={{ borderBottom: "1px solid var(--border)", padding: "1.25rem 0", overflow: "hidden", background: "var(--surface)" }}>
        <div className="animate-marquee" style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap" }}>
          {[...Array(2)].map((_, k) => (
            <div key={k} style={{ display: "flex", gap: "4rem", flexShrink: 0 }}>
              {["ISO 9001:2015","CMVR Certified","AIS-052 School Bus","AIS-153 Fire Safety","BIS Structural Testing","AIS-119 Sleeper","Government Empanelled","EV-Ready Platforms"].map((x) => (
                <span key={x} style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--muted-foreground)" }}>◇ {x}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="container-x" style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
        <div style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {[
            { n: "10+", l: "Years Engineering Experience", d: "Continuous R&D across coach, city and EV platforms." },
            { n: "50+", l: "Bus Bodies Delivered", d: "Serving STUs, schools, corporates and tour operators." },
            { n: "100%", l: "Customized Manufacturing", d: "Every chassis engineered to the customer's specification." },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 120}>
              <div className="stat-card">
                <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--muted-foreground)" }}>0{i + 1} / Metric</div>
                <div style={{ marginTop: "0.75rem", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "5rem", lineHeight: 1, color: "var(--foreground)" }}>{s.n}</div>
                <div style={{ marginTop: "0.75rem", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "1rem" }}>{s.l}</div>
                <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "var(--muted-foreground)", maxWidth: "18rem", lineHeight: 1.6 }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <ProductShowcase />

      {/* ── MANUFACTURING TIMELINE ── */}
      <section style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
        <div className="container-x">
          <Reveal>
            <div style={{ maxWidth: "48rem", marginBottom: "4rem" }}>
              <div className="eyebrow" style={{ marginBottom: "0.75rem" }}>— Manufacturing Workflow</div>
              <h2 style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}>From Blueprint<br />To Highway.</h2>
              <p style={{ marginTop: "1.25rem", color: "rgba(245,245,247,0.7)", maxWidth: "36rem", lineHeight: 1.7 }}>
                An eleven-stage industrial workflow monitored end-to-end by our engineering QA team.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            {process.map((step, i) => (
              <Reveal key={step} delay={i * 60}>
                <div className="stage-card">
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--accent)", marginBottom: "0.6rem" }}>
                    Stage {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>{step}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* animated bus */}
          <div style={{ position: "relative", marginTop: "4rem", height: "5rem", overflow: "hidden", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            <div style={{ position: "absolute", insetInline: 0, top: "50%", height: "1px", background: "var(--border)" }} />
            <svg viewBox="0 0 240 60" style={{ height: "3.5rem", width: "9rem", color: "var(--accent)" }} className="animate-drive" fill="currentColor" aria-hidden>
              <rect x="10" y="14" width="200" height="30" rx="4" />
              <rect x="20" y="20" width="30" height="14" fill="#0d0d14" />
              <rect x="55" y="20" width="30" height="14" fill="#0d0d14" />
              <rect x="90" y="20" width="30" height="14" fill="#0d0d14" />
              <rect x="125" y="20" width="30" height="14" fill="#0d0d14" />
              <rect x="160" y="20" width="40" height="14" fill="#0d0d14" />
              <circle cx="45" cy="48" r="7" />
              <circle cx="180" cy="48" r="7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── ENGINEERING FEATURES ── */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="container-x" style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
          <div style={{ display: "grid", gap: "4rem", gridTemplateColumns: "1fr" }} className="lg-two-col">

            {/* LEFT — text + nav */}
            <Reveal from="left">
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                <div className="eyebrow" style={{ marginBottom: "0.75rem" }}>— Engineering Capability</div>
                <h2 style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", lineHeight: 1.1 }}>Built To<br />Engineering<br />First Principles.</h2>
                <p style={{ marginTop: "1.5rem", color: "rgba(245,245,247,0.7)", maxWidth: "28rem", lineHeight: 1.7 }}>
                  We don&apos;t stamp bodies — we engineer them. Every subsystem is simulated, tested and certified before it ever meets a chassis.
                </p>

                {/* Feature card display */}
                <div style={{ marginTop: "2.5rem", border: "1px solid var(--border)", padding: "1.5rem", background: "var(--background)", minHeight: "7rem" }}>
                  <EngFeatureSlider features={engFeatures} />
                </div>
              </div>
            </Reveal>

            {/* RIGHT — image */}
            <Reveal from="right" delay={150}>
              <div style={{ aspectRatio: "4/5", overflow: "hidden", border: "1px solid var(--border)", width: "100%" }}>
                <img src="/manufacturing.jpg" alt="Bus assembly line" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="brochure" className="container-x" style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
        <Reveal>
          <div style={{ position: "relative", overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface)", padding: "clamp(2.5rem,5vw,4.5rem)" }}>
            <div className="cta-glow" style={{ right: "-4rem", top: "-4rem", height: "20rem", width: "20rem", background: "var(--accent)" }} />
            <div className="cta-glow" style={{ left: "-4rem", bottom: "-4rem", height: "14rem", width: "14rem", background: "#3b4fd4" }} />
            <div style={{ position: "relative", display: "grid", gap: "2.5rem", gridTemplateColumns: "1fr auto", alignItems: "end" }} className="cta-grid">
              <div>
                <div className="eyebrow" style={{ marginBottom: "0.75rem" }}>— Next Step</div>
                <h2 style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", maxWidth: "32rem" }}>Let's Build The Body<br />Your Fleet Deserves.</h2>
                <p style={{ marginTop: "1.25rem", maxWidth: "36rem", color: "rgba(245,245,247,0.7)", lineHeight: 1.7 }}>
                  Share your route profile, chassis and passenger count. Our lead engineer will revert with a specification-grade quotation within 48 hours.
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                <Link href="/contact" className="btn-primary">Request Quotation <ArrowRight size={15} /></Link>
                <a href="#" className="btn-ghost"><Download size={15} /> Brochure PDF</a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <style>{`
        @media (min-width: 1024px) {
          .lg-two-col { grid-template-columns: 1fr 1fr !important; }
          .cta-grid { grid-template-columns: 1fr auto !important; }
        }
        @media (max-width: 768px) {
          .cta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </SiteLayout>
  );
}
