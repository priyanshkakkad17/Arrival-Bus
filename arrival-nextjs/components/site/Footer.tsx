import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ marginTop: "6rem", borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div style={{ display: "grid", height: "2.5rem", width: "2.5rem", placeItems: "center", background: "var(--accent)", color: "var(--accent-foreground)", fontWeight: 900, fontSize: "1.125rem" }}>A</div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em" }}>Arrival Bus</div>
              <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--muted-foreground)" }}>Pvt. Ltd.</div>
            </div>
          </div>
          <p style={{ marginTop: "1.25rem", fontSize: "0.875rem", color: "var(--muted-foreground)", maxWidth: "18rem" }}>
            Premium bus body manufacturing engineered for commercial, school, intercity, luxury and electric mobility.
          </p>
          <div className="flex gap-3" style={{ marginTop: "1.5rem" }}>
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" style={{ display: "grid", height: "2.25rem", width: "2.25rem", placeItems: "center", border: "1px solid var(--border)", color: "var(--foreground)", transition: "all .2s" }}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>Products</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }}>
            {["Sleeper Coaches","School Buses","Staff Buses","Electric Bus Bodies","City & Intercity","Luxury Tourist Coaches"].map((x) => (
              <li key={x}><Link href="/products" style={{ color: "inherit", textDecoration: "none" }}>{x}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>Industries</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }}>
            {["Government Transport","State Transport Undertakings","Educational Institutions","Tour & Travel","Corporate Staff Transport","Private Fleet Operators"].map((x) => (
              <li key={x}><Link href="/industries" style={{ color: "inherit", textDecoration: "none" }}>{x}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>Contact</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }}>
            <li className="flex gap-2"><MapPin size={16} style={{ marginTop: "2px", color: "var(--accent)", flexShrink: 0 }} /> Plot 42, Industrial Estate, Pune, Maharashtra, India</li>
            <li className="flex gap-2"><Phone size={16} style={{ marginTop: "2px", color: "var(--accent)", flexShrink: 0 }} /> +91 98 2200 1100</li>
            <li className="flex gap-2"><Mail size={16} style={{ marginTop: "2px", color: "var(--accent)", flexShrink: 0 }} /> sales@arrivalbus.in</li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
          <div>© {new Date().getFullYear()} Arrival Bus Pvt. Ltd. — All rights reserved.</div>
          <div>ISO 9001:2015 Certified · CMVR / AIS Compliant</div>
        </div>
      </div>
    </footer>
  );
}
