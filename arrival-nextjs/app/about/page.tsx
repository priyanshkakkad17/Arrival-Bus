"use client";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { useEffect, useRef, useState } from "react";

/* ── Animated counter ── */
function useCounter(target: number, duration = 2000) {
  const [val, setVal] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    setVal(0);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setVal(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

/* ── Parallax hook ── */
function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
}

/* ── Stat ── */
function Stat({ n, label, suffix = "", prefix = "" }: { n: number; label: string; suffix?: string; prefix?: string }) {
  const { val, ref } = useCounter(n);
  return (
    <div ref={ref} className="uv-stat">
      <div className="uv-stat-num" suppressHydrationWarning>{prefix}{val ?? 0}{suffix}</div>
      <div className="uv-stat-label">{label}</div>
    </div>
  );
}

/* ── Timeline item ── */
function TimelineItem({ year, title, desc, i }: { year: string; title: string; desc: string; i: number }) {
  return (
    <Reveal delay={i * 120} from="bottom">
      <div className="uv-timeline-item">
        <div className="uv-timeline-year">{year}</div>
        <div className="uv-timeline-dot" />
        <div className="uv-timeline-title">{title}</div>
        <p className="uv-timeline-desc">{desc}</p>
      </div>
    </Reveal>
  );
}

/* ── Value card ── */
function ValueCard({ icon, title, desc, i }: { icon: string; title: string; desc: string; i: number }) {
  return (
    <Reveal delay={i * 100} from="bottom">
      <div className="uv-value-card">
        <div className="uv-value-icon">{icon}</div>
        <div className="uv-value-title">{title}</div>
        <p className="uv-value-desc">{desc}</p>
        <div className="uv-value-line" />
      </div>
    </Reveal>
  );
}

const TICKER = ["Safety First", "AIS-052 Certified", "50+ Fleets Delivered", "12 State STU Clients", "45,000 sq.ft Plant", "Pune, India", "Since 2015", "Engineer First"];

export default function AboutPage() {
  const parallaxRef = useParallax(0.25);
  const parallaxRef2 = useParallax(0.2);

  return (
    <SiteLayout>
      <style>{`
        /* ── HERO ── */
        .uv-hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .uv-hero-bg {
          position: absolute;
          inset: 0;
          will-change: transform;
        }
        .uv-hero-bg img {
          width: 100%;
          height: 115%;
          object-fit: cover;
          display: block;
        }
        .uv-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(13,13,20,0.92) 0%, rgba(13,13,20,0.55) 60%, rgba(13,13,20,0.3) 100%);
        }
        .uv-hero-overlay2 {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #0d0d14 0%, transparent 50%);
        }
        .uv-hero-content {
          position: relative;
          z-index: 2;
          padding: 0 clamp(1.5rem, 6vw, 7rem);
          max-width: 900px;
        }
        .uv-hero-eyebrow {
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent);
          opacity: 0;
          animation: uvFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
        }
        .uv-hero-title {
          font-family: var(--font-display);
          font-weight: 900;
          text-transform: uppercase;
          font-size: clamp(2rem, 5.5vw, 4.5rem);
          line-height: 0.9;
          letter-spacing: -0.02em;
          margin-top: 1.25rem;
          opacity: 0;
          animation: uvFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.35s forwards;
        }
        .uv-hero-title span { color: var(--accent); }
        .uv-hero-sub {
          margin-top: 2rem;
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          color: rgba(255,255,255,0.7);
          line-height: 1.75;
          max-width: 520px;
          opacity: 0;
          animation: uvFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s forwards;
        }
        .uv-hero-scroll {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          animation: uvFadeUp 0.8s ease 1.2s forwards;
        }
        .uv-hero-scroll-text {
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .uv-hero-scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: scrollLine 1.8s ease-in-out infinite;
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }

        /* ── TICKER ── */
        .uv-ticker {
          background: var(--accent);
          overflow: hidden;
          padding: 0.75rem 0;
          white-space: nowrap;
        }
        .uv-ticker-track {
          display: inline-flex;
          gap: 0;
          animation: uvTicker 28s linear infinite;
        }
        .uv-ticker-item {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #0d0d14;
          padding: 0 2.5rem;
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }
        .uv-ticker-item::after {
          content: '◆';
          font-size: 8px;
          opacity: 0.5;
        }
        @keyframes uvTicker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── STORY SECTION ── */
        .uv-story {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 80vh;
        }
        @media (max-width: 900px) { .uv-story { grid-template-columns: 1fr; } }
        .uv-story-img {
          position: relative;
          overflow: hidden;
          min-height: 500px;
        }
        .uv-story-img-inner {
          position: absolute;
          inset: -10%;
          will-change: transform;
        }
        .uv-story-img-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .uv-story-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent 60%, #0d0d14 100%);
        }
        @media (max-width: 900px) {
          .uv-story-img-overlay { background: linear-gradient(to bottom, transparent 60%, #0d0d14 100%); }
        }
        .uv-story-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(3rem, 6vw, 7rem) clamp(2rem, 5vw, 6rem);
          background: var(--background);
        }
        .uv-story-big {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          text-transform: uppercase;
          line-height: 0.95;
          letter-spacing: -0.01em;
        }
        .uv-story-big span { color: var(--accent); }

        /* ── STATS ── */
        .uv-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--surface);
        }
        @media (max-width: 768px) { .uv-stats { grid-template-columns: repeat(2, 1fr); } }
        .uv-stat {
          padding: 3.5rem 2rem;
          border-right: 1px solid var(--border);
          text-align: center;
          transition: background 0.3s;
        }
        .uv-stat:last-child { border-right: none; }
        .uv-stat:hover { background: var(--surface-2); }
        .uv-stat-num {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          color: var(--accent);
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .uv-stat-label {
          margin-top: 0.5rem;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }

        /* ── TIMELINE ── */
        .uv-timeline-section {
          padding: 7rem 0;
          overflow: hidden;
        }
        .uv-timeline-scroll {
          display: flex;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 3rem clamp(1.5rem, 6vw, 7rem);
          cursor: grab;
        }
        .uv-timeline-scroll::-webkit-scrollbar { display: none; }
        .uv-timeline-item {
          flex-shrink: 0;
          width: 280px;
          padding-right: 3rem;
          border-right: 1px solid var(--border);
          margin-right: 3rem;
          position: relative;
        }
        .uv-timeline-item:last-child { border-right: none; }
        .uv-timeline-year {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 3.5rem;
          color: rgba(255,255,255,0.06);
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
        }
        .uv-timeline-dot {
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 50%;
          margin-bottom: 1rem;
        }
        .uv-timeline-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.75rem;
        }
        .uv-timeline-desc {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
        }

        /* ── VALUES ── */
        .uv-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--border);
        }
        @media (max-width: 1024px) { .uv-values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .uv-values-grid { grid-template-columns: 1fr; } }
        .uv-value-card {
          padding: 3rem 2.5rem;
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          transition: background 0.35s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .uv-value-card:hover { background: var(--surface-2); }
        .uv-value-icon {
          font-size: 2rem;
          margin-bottom: 1.25rem;
          display: block;
        }
        .uv-value-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.75rem;
          transition: color 0.3s;
        }
        .uv-value-card:hover .uv-value-title { color: var(--accent); }
        .uv-value-desc {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
        }
        .uv-value-line {
          position: absolute;
          top: 0; left: 0;
          height: 2px;
          width: 0;
          background: var(--accent);
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .uv-value-card:hover .uv-value-line { width: 100%; }

        /* ── FULL BLEED IMAGE STRIP ── */
        .uv-strip {
          overflow: hidden;
          height: 480px;
          position: relative;
        }
        .uv-strip-track {
          display: flex;
          gap: 3rem;
          height: 100%;
          width: max-content;
          animation: stripScroll 18s linear infinite;
        }
        .uv-strip-track:hover { animation-play-state: paused; }
        @keyframes stripScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .uv-strip-cell {
          flex-shrink: 0;
          width: 520px;
          height: 100%;
          overflow: hidden;
          position: relative;
        }
        @media (max-width: 768px) { .uv-strip { height: 300px; } .uv-strip-cell { width: 320px; } }
        .uv-strip-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1.2s cubic-bezier(0.16,1,0.3,1);
        }
        .uv-strip-track:hover .uv-strip-cell img { transform: scale(1.05); }
        .uv-strip-label {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          background: rgba(13,13,20,0.7);
          padding: 0.35rem 0.75rem;
          backdrop-filter: blur(8px);
        }

        /* ── CTA ── */
        .uv-cta {
          position: relative;
          overflow: hidden;
          padding: 8rem 0;
          text-align: center;
          border-top: 1px solid var(--border);
        }
        .uv-cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(232,101,10,0.12) 0%, transparent 70%);
          pointer-events: none;
          animation: glowPulse 4s ease-in-out infinite;
        }
        .uv-cta-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(2.5rem, 6vw, 5rem);
          text-transform: uppercase;
          line-height: 0.95;
          letter-spacing: -0.01em;
          position: relative;
        }
        .uv-cta-title span { color: var(--accent); }

        /* ── KEYFRAMES ── */
        @keyframes uvFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="uv-hero">
        <div className="uv-hero-bg" ref={parallaxRef}>
          <img src="/fleet.jpg" alt="Arrival Bus fleet" />
        </div>
        <div className="uv-hero-overlay" />
        <div className="uv-hero-overlay2" />
        <div className="uv-hero-content">
          <div className="uv-hero-eyebrow">— About Arrival Bus</div>
          <h1 className="uv-hero-title">
            Built to<br /><span>Last.</span><br />Built to<br />Lead.
          </h1>
          <p className="uv-hero-sub">
            A decade of engineering precision. Fifty fleets. Twelve state STU clients. Every bus we build carries the weight of a promise — to move people safely, reliably, and with dignity.
          </p>
        </div>

      </section>



      {/* ── STORY ── */}
      <section className="uv-story">
        <div className="uv-story-img">
          <div className="uv-story-img-inner" ref={parallaxRef2}>
            <img src="/chassis.jpg" alt="Bus chassis engineering" />
          </div>
          <div className="uv-story-img-overlay" />
        </div>
        <div className="uv-story-text">
          <Reveal from="right">
            <div className="eyebrow">— Our Story</div>
            <h2 className="uv-story-big" style={{ marginTop: "1rem" }}>
              Engineer<br />First.<br /><span>Assemble</span><br />Second.
            </h2>
          </Reveal>
          <Reveal from="right" delay={120}>
            <div style={{ marginTop: "1rem", width: 0, height: "1px", background: "var(--accent)" }} className="line-draw" />
          </Reveal>
          <Reveal from="right" delay={200}>
            <p style={{ marginTop: "1.75rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Founded in 2015, Arrival Bus was born from a single conviction — that Indian bus bodies deserved the same engineering rigour as European coaches. We started with a blank sheet, not a pattern.
            </p>
          </Reveal>
          <Reveal from="right" delay={280}>
            <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Every body is designed from load-path up — chassis FEA, CFD aerodynamics, roll-stability simulation — before a single tube is cut. The result is a bus that outlasts the competition by years.
            </p>
          </Reveal>
          <Reveal from="right" delay={360}>
            <a href="/manufacturing" className="btn-primary" style={{ marginTop: "2.5rem", width: "max-content" }}>
              See How We Build →
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="uv-stats">
        <Stat n={2015} label="Founded" />
        <Stat n={50}   label="Fleets Delivered" suffix="+" />
        <Stat n={12}   label="State STU Clients" />
        <Stat n={45}   label="Manufacturing Floor" suffix="K ft²" />
      </div>

      {/* ── TIMELINE ── */}
      <section className="uv-timeline-section">
        <div style={{ padding: "0 clamp(1.5rem, 6vw, 7rem)" }}>
          <Reveal>
            <div className="eyebrow">— Our Journey</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2rem,5vw,3.5rem)" }}>A Decade of Milestones.</h2>
          </Reveal>
        </div>
        <div className="uv-timeline-scroll">
          {[
            { year: "2015", title: "Founded", desc: "Arrival Bus Pvt. Ltd. incorporated in Pune with a 5,000 sq.ft pilot facility and a team of 12 engineers." },
            { year: "2017", title: "First STU Order", desc: "Secured first government contract — 8 city buses for Maharashtra MSRTC. Delivered on time, zero defects." },
            { year: "2019", title: "Plant Expansion", desc: "Moved to 45,000 sq.ft purpose-built facility. Added CNC tube bending, robotic MIG welding and 7-stage paint booth." },
            { year: "2021", title: "AIS Certification", desc: "Achieved full AIS-052, AIS-119 and AIS-153 certification. First Pune-based body builder to clear all three in one audit." },
            { year: "2023", title: "Electric Ready", desc: "Launched EV-compatible body platform — lighter frame, battery-bay integration, regenerative-brake-optimised structure." },
            { year: "2025", title: "50 Fleets", desc: "Crossed 50 fleet deliveries across 12 states. Expanding to a second plant in Nagpur." },
          ].map((item, i) => (
            <TimelineItem key={item.year} {...item} i={i} />
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ padding: "5rem clamp(1.5rem, 6vw, 7rem) 0" }}>
          <Reveal>
            <div className="eyebrow">— What We Stand For</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2rem,5vw,3.5rem)" }}>Four Non-Negotiables.</h2>
          </Reveal>
        </div>
        <div className="uv-values-grid" style={{ marginTop: "3rem" }}>
          {[
            { icon: "🛡️", title: "Safety",     desc: "Every body certified to AIS-052, AIS-119 and AIS-153. Roll-stability tested. No compromise, ever." },
            { icon: "⚙️", title: "Precision",  desc: "CAD-driven tooling, CNC-cut sections, robotic MIG welding on every structural joint." },
            { icon: "🔩", title: "Durability", desc: "Hot-dip galvanised frames, 7-stage anti-corrosion treatment, tested to 15-year service life." },
            { icon: "✦",  title: "Craft",      desc: "Cabin interiors built like premium European coaches — quiet, refined, resilient." },
          ].map((v, i) => <ValueCard key={v.title} {...v} i={i} />)}
        </div>
      </section>

      {/* ── IMAGE STRIP ── */}
      <div style={{ paddingTop: "4rem" }}>
      <div className="uv-strip">
        <div className="uv-strip-track">
          {[...Array(2)].flatMap((_, r) => [
            { src: "/manufacturing.jpg", label: "Manufacturing" },
            { src: "/interior.jpg",      label: "Interior Craft" },
            { src: "/hero-bus.jpg",      label: "Final Product" },
            { src: "/chassis.jpg",       label: "Engineering" },
            { src: "/fleet.jpg",         label: "Fleet" },
          ].map((img, i) => (
            <div key={`${r}-${i}`} className="uv-strip-cell">
              <img src={img.src} alt={img.label} />
              <span className="uv-strip-label">{img.label}</span>
            </div>
          )))}
        </div>
      </div>
      </div>

      {/* ── CTA ── */}
      <section className="uv-cta">
        <div className="uv-cta-glow" />
        <div className="container-x" style={{ position: "relative" }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>— Work With Us</div>
            <h2 className="uv-cta-title">
              Ready To<br /><span>Spec Your Fleet?</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.6)", fontSize: "1rem", maxWidth: "480px", margin: "1.5rem auto 0" }}>
              Tell us your route, your load, your timeline. We'll engineer the rest.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/contact" className="btn-primary">Get In Touch →</a>
              <a href="/products" className="btn-ghost">View Products</a>
            </div>
          </Reveal>
        </div>
      </section>

    </SiteLayout>
  );
}
