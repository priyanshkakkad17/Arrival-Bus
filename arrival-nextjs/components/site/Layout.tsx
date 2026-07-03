import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { StickyCTA } from "./StickyCTA";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <StickyCTA />
    </div>
  );
}

export function PageHero({
  eyebrow, title, subtitle, image,
}: {
  eyebrow: string; title: string; subtitle?: string; image?: string;
}) {
  return (
    <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
      {image && (
        <>
          <img src={image} alt="" style={{ position: "absolute", inset: 0, height: "100%", width: "100%", objectFit: "cover", opacity: 0.4 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(20,20,40,0.6), rgba(20,20,40,0.7), var(--background))" }} />
        </>
      )}
      <div className="container-x" style={{ position: "relative", paddingTop: "10rem", paddingBottom: "6rem" }}>
        <div className="eyebrow animate-rise">{eyebrow}</div>
        <h1 className="animate-rise" style={{ marginTop: "1rem", fontSize: "clamp(2.5rem,8vw,5rem)", animationDelay: "80ms" }}>{title}</h1>
        {subtitle && (
          <p className="animate-rise" style={{ marginTop: "1.5rem", maxWidth: "42rem", fontSize: "1.125rem", color: "rgba(255,255,255,0.8)", animationDelay: "160ms" }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
