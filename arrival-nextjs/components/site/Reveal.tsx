"use client";
import { useEffect, useRef, ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  style = {},
  from = "bottom",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  from?: "bottom" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const initial =
    from === "left" ? "translateX(-60px)"
    : from === "right" ? "translateX(60px)"
    : "translateY(40px)";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("revealed");
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`reveal-block ${className}`}
      style={{ ...style, transform: initial }}
    >
      {children}
    </div>
  );
}
