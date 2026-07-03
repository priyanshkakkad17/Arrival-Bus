"use client";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import Link from "next/link";
import { useState } from "react";
import { Building2, GraduationCap, Bus, Landmark, Briefcase, Users, ArrowRight } from "lucide-react";

const industries = [
  { icon: Landmark,     t: "Government Transport",       d: "Bodies engineered to central and state government procurement specifications with full CMVR / AIS compliance.",                          color: "#0d0d14" },
  { icon: Bus,          t: "State Transport Undertakings",d: "High-cycle city and intercity platforms tuned for uptime, low maintenance and 15-year service life.",                                   color: "#0d0d14" },
  { icon: GraduationCap,t: "Educational Institutions",   d: "AIS-052 school bus bodies with speed governors, GPS, panic alerts and reinforced child-safe interiors.",                                color: "#0d0d14" },
  { icon: Building2,    t: "Tour & Travel Operators",    d: "Sleeper and luxury coaches built to the finish standard of European coach builders.",                                                    color: "#0d0d14" },
  { icon: Briefcase,    t: "Corporate Staff Transport",  d: "Push-back seating, USB, Wi-Fi-ready staff coaches for IT parks, manufacturing hubs and BPOs.",                                          color: "#0d0d14" },
  { icon: Users,        t: "Private Fleet Operators",    d: "Custom liveries, custom seat plans, custom entertainment — engineered around your route economics.",                                     color: "#0d0d14" },
];

const certifications = [
  "AIS-052 School Bus","AIS-119 Sleeper Coach","AIS-153 Fire Safety",
  "CMVR Rule 125E","BIS Structural Testing","ISO 9001:2015 QMS",
  "GeM Empanelled Supplier","STU Tender Compliant",
];

function IndustryCard({ it, i }: { it: typeof industries[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = it.icon;
  return (
    <Reveal delay={i * 90} from="bottom">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `1px solid ${hovered ? "transparent" : "rgba(0,0,0,0.12)"}`,
          background: hovered ? it.color : "#ffffff",
          padding: "2.25rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 32px 64px -16px rgba(0,0,0,0.35)"
            : "0 1px 4px rgba(0,0,0,0.06)",
          cursor: "default",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* top accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "3px",
          background: "var(--accent)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }} />

        {/* number + icon row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <Icon
            size={34}
            style={{
              color: hovered ? "#fff" : "var(--accent)",
              transition: "color 0.3s",
            }}
          />
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.5rem",
            fontWeight: 900,
            lineHeight: 1,
            color: hovered ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
            transition: "color 0.3s",
            userSelect: "none",
          }}>
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>

        {/* title */}
        <div style={{
          marginTop: "1.75rem",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          fontSize: "clamp(1.25rem,2vw,1.5rem)",
          lineHeight: 1.1,
          color: hovered ? "#ffffff" : "var(--background)",
          transition: "color 0.3s",
        }}>
          {it.t}
        </div>

        {/* divider */}
        <div style={{
          marginTop: "1rem",
          height: "1px",
          background: hovered ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)",
          transition: "background 0.3s",
        }} />

        {/* description */}
        <p style={{
          marginTop: "1rem",
          fontSize: "0.875rem",
          lineHeight: 1.75,
          color: hovered ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.55)",
          flex: 1,
          transition: "color 0.3s",
        }}>
          {it.d}
        </p>

        {/* enquire link */}
        <Link
          href="/contact"
          style={{
            marginTop: "1.75rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: hovered ? "#fff" : "var(--accent)",
            textDecoration: "none",
            transition: "color 0.3s, gap 0.3s",
          }}
          onMouseEnter={e => (e.currentTarget.style.gap = "0.75rem")}
          onMouseLeave={e => (e.currentTarget.style.gap = "0.4rem")}
        >
          Enquire <ArrowRight size={13} />
        </Link>
      </div>
    </Reveal>
  );
}

function CertBadge({ x, i }: { x: string; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={i * 60} from="bottom">
      <li
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
          padding: "1rem 1.25rem",
          background: hovered ? "var(--surface-2)" : "var(--background)",
          fontFamily: "var(--font-display)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontSize: "0.875rem",
          color: hovered ? "#fff" : "var(--foreground)",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          cursor: "default",
        }}
      >
        <span style={{ color: "var(--accent)" }}>◇</span>
        {x}
      </li>
    </Reveal>
  );
}

export default function IndustriesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="— Industries Served"
        title="Fleets That Trust Our Engineering."
        subtitle="From central government STUs to boutique tour operators — we build to the standard the customer demands, not the standard the market accepts."
        image="/fleet.jpg"
      />

      {/* ── INDUSTRY CARDS ── */}
      <section style={{ background: "#f4f4f6", paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div className="container-x">

          <Reveal>
            <div className="eyebrow" style={{ color: "var(--accent)" }}>— Who We Build For</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2rem,5vw,3.5rem)", color: "var(--background)" }}>
              Six Industries.<br />One Build Standard.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div style={{ marginTop: "0.75rem", width: "0", height: "2px", background: "var(--accent)" }} className="line-draw" />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" style={{ marginTop: "3.5rem" }}>
            {industries.map((it, i) => (
              <IndustryCard key={it.t} it={it} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="container-x grid lg:grid-cols-3 gap-10" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div>
            <Reveal from="left">
              <div className="eyebrow">— Compliance</div>
              <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(1.75rem,4vw,2.5rem)" }}>
                Certified For<br />Every Procurement.
              </h2>
            </Reveal>
            <Reveal from="left" delay={120}>
              <div style={{ marginTop: "1rem", width: "0", height: "1px", background: "var(--accent)" }} className="line-draw" />
            </Reveal>
            <Reveal from="left" delay={200}>
              <p style={{ marginTop: "1.25rem", fontSize: "0.9rem", color: "var(--muted-foreground)", lineHeight: 1.75 }}>
                Every Arrival body ships with the certifications your procurement team needs — no chasing, no delays.
              </p>
            </Reveal>
          </div>

          <ul className="lg:col-span-2 grid sm:grid-cols-2 gap-4" style={{ listStyle: "none" }}>
            {certifications.map((x, i) => (
              <CertBadge key={x} x={x} i={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: "var(--background)", padding: "5rem 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container-x" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
          <Reveal from="left">
            <div>
              <div className="eyebrow">— Start A Project</div>
              <h2 style={{ marginTop: "0.5rem", fontSize: "clamp(1.75rem,4vw,2.75rem)" }}>
                Tell Us Your Fleet Requirement.
              </h2>
            </div>
          </Reveal>
          <Reveal from="right" delay={100}>
            <Link href="/contact" className="btn-primary">
              Request Quotation <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

    </SiteLayout>
  );
}
