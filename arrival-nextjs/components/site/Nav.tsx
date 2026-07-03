"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav-header ${scrolled ? "glass" : ""}`}>
      <div className="container-x nav-inner">
        {/* LOGO */}
        <Link href="/" className="nav-logo">
          <img
            src="/logo.svg"
            alt="Arrival Bus"
            style={{ height: "58px", width: "auto", filter: "brightness(0) invert(1)" }}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="nav-links">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link key={l.to} href={l.to} className={`nav-link ${active ? "nav-link-active" : ""}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP CTA */}
        <div className="nav-cta">
          <Link href="/contact" className="btn-primary">Request Quote</Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button className="nav-hamburger" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="nav-mobile">
          <div className="container-x nav-mobile-inner">
            {links.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link key={l.to} href={l.to} onClick={() => setOpen(false)} className={`nav-mobile-link ${active ? "nav-link-active" : ""}`}>
                  {l.label}
                </Link>
              );
            })}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary nav-mobile-btn">
              Request Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
