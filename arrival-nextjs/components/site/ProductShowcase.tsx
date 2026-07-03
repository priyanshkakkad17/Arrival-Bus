"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";

const products = [
  { title: "Sleeper Bus Bodies",     img: "/images/products/product-sleeper.jpg",  tag: "Intercity Overnight", href: "/products" },
  { title: "School Bus Bodies",      img: "/images/products/product-school.jpg",   tag: "AIS-052 Safety",      href: "/products" },
  { title: "Electric Bus Bodies",    img: "/images/products/product-electric.jpg", tag: "Zero Emission",       href: "/products" },
  { title: "Staff Bus Bodies",       img: "/images/pages/fleet.jpg",               tag: "Corporate Fleet",     href: "/products" },
  { title: "City & Intercity",       img: "/images/pages/hero-bus.jpg",            tag: "High Utilisation",    href: "/products" },
  { title: "Luxury Tourist Coaches", img: "/images/pages/interior.jpg",            tag: "Premium Interiors",   href: "/products" },
];

const N = products.length;
const INTERVAL = 3500;

/* Returns visual position relative to active: -2, -1, 0, 1, 2 */
function relPos(i: number, active: number) {
  let d = i - active;
  if (d > N / 2)  d -= N;
  if (d < -N / 2) d += N;
  return d;
}

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(i => (i + 1) % N), INTERVAL);
  }, []);

  const stopTimer = () => { if (timerRef.current) clearInterval(timerRef.current); };

  useEffect(() => { startTimer(); return stopTimer; }, [startTimer]);

  const go = (dir: number) => {
    setActive(i => (i + dir + N) % N);
    startTimer();
  };

  const current = products[active];

  return (
    <section
      style={{ background: "#ffffff", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5", padding: "3rem 0", overflow: "hidden" }}
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <div className="eyebrow" style={{ marginBottom: "0.75rem" }}>— The Range</div>
        <h2 style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", color: "#0d0d14" }}>
          Bodies <span style={{ color: "var(--accent)" }}>Engineered</span><br />
          <span style={{ color: "var(--accent)" }}>For Every Mission.</span>
        </h2>
      </div>

      {/* Active card title + tag — between header and carousel */}
      <div style={{ textAlign: "center", marginBottom: "0.4rem", minHeight: "auto" }}>
        <h3 style={{
          fontFamily: "var(--font-display)", fontWeight: 900, textTransform: "uppercase",
          fontSize: "clamp(1.5rem,3.2vw,2.4rem)", letterSpacing: "0.04em", color: "#0d0d14",
          transition: "opacity 0.35s ease",
        }}>
          {current.title}
        </h3>
        <span style={{
          display: "inline-block", marginTop: "0.25rem",
          padding: "0.3rem 1rem", background: "#0d0d14",
          border: "1px solid var(--accent)", borderRadius: "999px",
          fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase",
          fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--accent)",
        }}>
          {current.tag}
        </span>
      </div>

      {/* Coverflow track */}
      <div style={{ position: "relative", height: "clamp(320px,48vw,600px)", perspective: "1400px" }}>

        {/* Left arrow */}
        <button onClick={() => go(-1)} style={arrowStyle("left")}>
          <ChevronLeft size={20} />
        </button>

        {/* Right arrow */}
        <button onClick={() => go(1)} style={arrowStyle("right")}>
          <ChevronRight size={20} />
        </button>

        {products.map((p, i) => {
          const d = relPos(i, active);
          const abs = Math.abs(d);
          if (abs > 2) return null;

          const isCenter = d === 0;
          const tx = d * 52;           // % offset from center
          const ry = d * -32;          // rotateY degrees
          const scale = isCenter ? 1 : abs === 1 ? 0.78 : 0.62;
          const z = isCenter ? 10 : abs === 1 ? 5 : 1;
          const opacity = isCenter ? 1 : abs === 1 ? 0.85 : 0.55;

          return (
            <div
              key={p.title}
              onClick={() => { if (!isCenter) { setActive(i); startTimer(); } }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "clamp(340px,46vw,620px)",
                aspectRatio: "16/9",
                transform: `translate(-50%,-50%) translateX(${tx}%) rotateY(${ry}deg) scale(${scale})`,
                transformOrigin: "center center",
                zIndex: z,
                opacity,
                transition: "all 0.65s cubic-bezier(0.16,1,0.3,1)",
                cursor: isCenter ? "default" : "pointer",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: isCenter
                  ? "0 32px 80px -16px rgba(0,0,0,0.35)"
                  : "0 12px 40px -12px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={p.img}
                alt={p.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* Label */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "2rem 1.25rem 1.25rem",
                background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
              }}>
                <p style={{
                  fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase",
                  fontSize: "clamp(0.85rem,1.6vw,1.1rem)", letterSpacing: "0.1em",
                  color: "#fff", margin: 0,
                }}>
                  {p.tag}
                </p>
              </div>

              {/* Center card CTA button */}
              {isCenter && (
                <Link
                  href={p.href}
                  style={{
                    position: "absolute", bottom: "1.25rem", left: "50%",
                    transform: "translateX(-50%)",
                    display: "grid", placeItems: "center",
                    width: "2.2rem", height: "2.2rem", borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.4)", color: "#fff",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--accent)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                >
                  <ArrowUp size={14} />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", marginTop: "0.75rem" }}>
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); startTimer(); }}
            style={{
              width: i === active ? "1.5rem" : "0.4rem", height: "0.4rem",
              borderRadius: "999px", border: "none", cursor: "pointer", padding: 0,
              background: i === active ? "var(--accent)" : "#d0d0d0",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ maxWidth: "200px", margin: "0.5rem auto 0", height: "2px", background: "#e5e5e5", borderRadius: "999px", overflow: "hidden" }}>
        <div
          key={active}
          style={{
            height: "100%", background: "var(--accent)",
            transformOrigin: "left",
            animation: `cfProgress ${INTERVAL}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes cfProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}

function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: "clamp(0.5rem, 2vw, 2rem)",
    transform: "translateY(-50%)",
    zIndex: 20,
    display: "grid",
    placeItems: "center",
    width: "2.75rem",
    height: "2.75rem",
    borderRadius: "50%",
    background: "#fff",
    border: "1px solid #d0d0d0",
    color: "#0d0d14",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
    transition: "all 0.2s",
  };
}
