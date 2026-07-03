import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export function StickyCTA() {
  return (
    <>
      <a
        href="https://wa.me/919822001100?text=Hello%20Arrival%20Bus%2C%20I%27d%20like%20a%20quotation"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed", bottom: "1.25rem", right: "1.25rem", zIndex: 40,
          display: "grid", height: "3.5rem", width: "3.5rem", placeItems: "center",
          borderRadius: "9999px", background: "#25D366", color: "#fff",
          boxShadow: "0 12px 40px -8px rgba(37,211,102,0.6)",
          transition: "transform .2s",
        }}
      >
        <MessageCircle size={24} />
      </a>
      <Link
        href="/contact"
        className="btn-primary"
        style={{ position: "fixed", bottom: "1.25rem", left: "1.25rem", zIndex: 40, display: "none" }}
        id="sticky-quote"
      >
        <Phone size={16} /> Get Quotation
      </Link>
      <style>{`@media(min-width:768px){#sticky-quote{display:inline-flex;}}`}</style>
    </>
  );
}
