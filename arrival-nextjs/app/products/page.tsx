"use client";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useState } from "react";

type Product = {
  slug: string; name: string; tagline: string; image: string;
  specs: { k: string; v: string }[]; features: string[]; applications: string[]; industries: string[];
};

const products: Product[] = [
  {
    slug: "sleeper", name: "Sleeper Coaches", tagline: "Overnight intercity travel, engineered for comfort.", image: "/product-sleeper.jpg",
    specs: [{ k: "Length", v: "11.0 – 13.5 m" },{ k: "Berth Config", v: "1×2, 2×1 or 2×2" },{ k: "Capacity", v: "24 – 42 berths" },{ k: "Superstructure", v: "Galvanized tubular + AL panels" }],
    features: ["AIS-119 Certified Berths","Reading Light + USB per Berth","Individual A/C Vents","LED Ambient Lighting","Panic Button & CCTV"],
    applications: ["Overnight Intercity","Premium Tourism","Pilgrimage Routes"],
    industries: ["Tour & Travel","Private Fleet Operators"],
  },
  {
    slug: "school", name: "School Buses", tagline: "Built to the strictest child-safety codes in India.", image: "/product-school.jpg",
    specs: [{ k: "Length", v: "7.5 – 10.5 m" },{ k: "Capacity", v: "32 – 55 students" },{ k: "Compliance", v: "AIS-052 School Bus Code" },{ k: "Emergency Exits", v: "Rear + side + roof hatch" }],
    features: ["High-visibility Yellow Paint","Speed Governor at 40 kmph","GPS + Panic Alarm","Grill Windows","First-Aid + Fire Extinguisher"],
    applications: ["K–12 Schools","Colleges","Coaching Institutes"],
    industries: ["Educational Institutions"],
  },
  {
    slug: "staff", name: "Staff Buses", tagline: "High-utilisation corporate transport with premium comfort.", image: "/fleet.jpg",
    specs: [{ k: "Length", v: "9.0 – 12.0 m" },{ k: "Capacity", v: "35 – 55 seats" },{ k: "A/C", v: "Roof-mount 2×5 TR" },{ k: "Seating", v: "Push-back / recliner" }],
    features: ["USB Charging at every seat","Overhead Luggage Bins","LED Reading Lights","Wi-Fi Router Ready","Reverse Camera + Sensors"],
    applications: ["Corporate Shuttles","IT Parks","Manufacturing Plants"],
    industries: ["Corporate Staff Transport","Private Fleet Operators"],
  },
  {
    slug: "electric", name: "Electric Bus Bodies", tagline: "EV-native platforms, ready for zero-emission mobility.", image: "/product-electric.jpg",
    specs: [{ k: "Body Weight", v: "-18% vs. steel body" },{ k: "Chassis", v: "Ashok Leyland, Tata, Olectra" },{ k: "Structure", v: "Aluminium space frame" },{ k: "HVAC", v: "Inverter A/C, low-load" }],
    features: ["Battery-Compartment Fire Barrier","Regen-Braking Aware Interior","Low-Floor Options","Lightweight Composite Panels","EV Charging Signage Package"],
    applications: ["City Transit","Airport Shuttles","Corporate Green Fleet"],
    industries: ["Government Transport","State Transport Undertakings"],
  },
  {
    slug: "city", name: "City & Intercity Bus Bodies", tagline: "Built for high-cycle urban and intercity operations.", image: "/hero-bus.jpg",
    specs: [{ k: "Length", v: "9.0 – 12.0 m" },{ k: "Config", v: "2×2, 2×3, Low-floor" },{ k: "Capacity", v: "40 – 55 seated" },{ k: "Structure", v: "Galvanized steel skeleton" }],
    features: ["Kneeling Suspension Ready","Wide Doorways","Bell-Push Stop Request","Passenger Info Display","LED Destination Board"],
    applications: ["City Transit","Intercity Routes","BRT Corridors"],
    industries: ["State Transport Undertakings","Government Transport"],
  },
  {
    slug: "luxury", name: "Luxury Tourist Coaches", tagline: "European-grade craftsmanship for premium tour operators.", image: "/interior.jpg",
    specs: [{ k: "Length", v: "12.0 – 13.5 m" },{ k: "Seating", v: "2×1 recliner, 2×2 executive" },{ k: "A/C", v: "Split HVAC, 8+3 TR" },{ k: "Sound", v: "Premium PA + entertainment" }],
    features: ["Leather Upholstery","Personal Reading Light + USB","Onboard Refrigerator","Panoramic Tinted Glazing","Concealed Ambient Lighting"],
    applications: ["Premium Tourism","Corporate Offsites","Wedding Charters"],
    industries: ["Tour & Travel","Private Fleet Operators"],
  },
];

function StepCard({ step, i }: { step: { n: string; title: string; body: string; cta: string | null }; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2.5rem 2rem",
        background: hovered ? "#0d0d14" : "#ffffff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        borderRight: i < 2 ? "1px solid #e5e5e5" : "none",
        transition: "background 0.3s ease",
      }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", fontWeight: 900, lineHeight: 1, color: hovered ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)", userSelect: "none" }}>
        {step.n}
      </div>
      <div style={{ width: "2rem", height: "2px", background: "var(--accent)" }} />
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.06em", color: hovered ? "#ffffff" : "#0d0d14", transition: "color 0.3s" }}>
        {step.title}
      </h3>
      <p style={{ fontSize: "0.9rem", color: hovered ? "rgba(255,255,255,0.65)" : "#666677", lineHeight: 1.7, flex: 1, transition: "color 0.3s" }}>
        {step.body}
      </p>
      {step.cta && (
        <div style={{ marginTop: "0.5rem" }}>
          <Link href={step.cta} className="btn-primary">
            Request Quotation <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="— The Range"
        title="Six Platforms. One Engineering Standard."
        subtitle="From city transit to sleeper luxury — every Arrival body is built on the same engineering discipline."
        image="/hero-bus.jpg"
      />

      <div className="container-x" style={{ paddingTop: "4rem", paddingBottom: "6rem", display: "flex", flexDirection: "column", gap: "6rem" }}>
        {products.map((p, i) => {
          const imgLeft = i % 2 === 0;
          return (
            <article key={p.slug} id={p.slug} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center" style={{ scrollMarginTop: "6rem" }}>

              {/* Image — slides in from left or right */}
              <Reveal from={imgLeft ? "left" : "right"} style={{ order: imgLeft ? 0 : 2 }}>
                <div style={{ aspectRatio: "4/3", overflow: "hidden", border: "1px solid var(--border)" }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="prod-img"
                    style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  />
                </div>
              </Reveal>

              {/* Content — slides in from opposite side */}
              <div style={{ order: imgLeft ? 1 : 1 }}>
                <Reveal from={imgLeft ? "right" : "left"} delay={80}>
                  <div className="eyebrow">— 0{i + 1} / {p.slug.toUpperCase()}</div>
                  <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2rem,5vw,3rem)" }}>{p.name}</h2>
                  <p style={{ marginTop: "1rem", fontSize: "1.125rem", color: "rgba(255,255,255,0.8)", maxWidth: "32rem" }}>{p.tagline}</p>
                </Reveal>

                <Reveal from={imgLeft ? "right" : "left"} delay={160}>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3" style={{ marginTop: "1.5rem", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", paddingTop: "1.25rem", paddingBottom: "1.25rem" }}>
                    {p.specs.map((s) => (
                      <div key={s.k}>
                        <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.25em", color: "var(--muted-foreground)" }}>{s.k}</div>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal from={imgLeft ? "right" : "left"} delay={240}>
                  <div className="grid sm:grid-cols-2 gap-6" style={{ marginTop: "1.5rem" }}>
                    <div>
                      <div className="eyebrow">Features</div>
                      <ul style={{ marginTop: "0.75rem", listStyle: "none", display: "flex", flexDirection: "column", gap: "0.375rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }}>
                        {p.features.map((f) => <li key={f} style={{ display: "flex", gap: "0.5rem" }}><span style={{ color: "var(--accent)" }}>◇</span>{f}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div className="eyebrow">Applications</div>
                      <ul style={{ marginTop: "0.75rem", listStyle: "none", display: "flex", flexDirection: "column", gap: "0.375rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }}>
                        {p.applications.map((f) => <li key={f} style={{ display: "flex", gap: "0.5rem" }}><span style={{ color: "var(--accent)" }}>◇</span>{f}</li>)}
                      </ul>
                    </div>
                  </div>
                </Reveal>

                <Reveal from={imgLeft ? "right" : "left"} delay={300}>
                  <div style={{ marginTop: "1.5rem" }}>
                    <div className="eyebrow">Industries Served</div>
                    <div style={{ marginTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {p.industries.map((x) => (
                        <span key={x} style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", border: "1px solid var(--border)", padding: "0.375rem 0.75rem" }}>{x}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: "2rem" }}>
                    <Link href="/contact" className="btn-primary">Request Quotation <ArrowRight size={16} /></Link>
                  </div>
                </Reveal>
              </div>

            </article>
          );
        })}
      </div>

      {/* ── NEXT STEP SECTION ── */}
      <section style={{ background: "#ffffff", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5", padding: "6rem 0", overflow: "hidden" }}>
        <div className="container-x">

          <Reveal>
            <div className="eyebrow">— Next Step</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2.2rem,5vw,3.5rem)", maxWidth: "36rem", color: "#0d0d14" }}>
              Ready To Configure Your Fleet?
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ marginTop: "0.75rem", width: "3rem", height: "2px", background: "var(--accent)" }} />
          </Reveal>

          <div className="grid sm:grid-cols-3" style={{ marginTop: "3.5rem", border: "1px solid #e5e5e5" }}>
            {[
              { n: "01", title: "Choose Your Platform", body: "Select from Sleeper, School, Staff, Electric, City or Luxury — or tell us your custom requirement.", cta: null },
              { n: "02", title: "Engineering Consultation", body: "Our team reviews your chassis, route profile and compliance needs to spec the right body.", cta: null },
              { n: "03", title: "Get Your Quotation", body: "Receive a detailed build sheet with timelines, certifications and pricing — no surprises.", cta: "/contact" },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 140} from="bottom">
                <StepCard step={step} i={i} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <div style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", gap: "2.5rem", alignItems: "center", borderTop: "1px solid #e5e5e5", paddingTop: "2rem" }}>
              {["AIS-052 Certified", "AIS-119 Certified", "ISO 9001 Process", "Pan-India Delivery", "12-Month Warranty"].map((badge) => (
                <div key={badge} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#888899" }}>
                  <span style={{ color: "var(--accent)", fontSize: "1rem" }}>◇</span>
                  {badge}
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

    </SiteLayout>
  );
}
