"use client";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(6, "Valid phone required").max(20),
  product: z.string().max(80).optional(),
  fleet: z.string().max(20).optional(),
  message: z.string().trim().min(10, "Tell us a little more").max(1500),
});

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.25em", color: "var(--muted-foreground)" }}>
      {children}
    </label>
  );
}

function Field({ name, label, type = "text", placeholder, error }: { name: string; label: string; type?: string; placeholder?: string; error?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input type={type} name={name} placeholder={placeholder} style={{ marginTop: "0.5rem", width: "100%", background: "var(--background)", border: "1px solid var(--border)", padding: "0.75rem", fontSize: "0.875rem", outline: "none", color: "var(--foreground)" }} />
      {error && <p style={{ marginTop: "0.25rem", fontSize: "0.75rem", color: "oklch(0.7 0.2 25)" }}>{error}</p>}
    </div>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("ok");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="— Contact"
        title="Speak With Our Lead Engineer."
        subtitle="Share your requirement — chassis, route, capacity, timeline. We revert with a specification-grade quotation within 48 hours."
        image="/images/pages/interior.jpg"
      />

      <section className="container-x grid lg:grid-cols-2 gap-12" style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div style={{ border: "1px solid var(--border)", background: "var(--surface)", padding: "clamp(1.5rem,4vw,2.5rem)" }}>
          <div className="eyebrow">— Request Quotation</div>
          <h2 style={{ marginTop: "0.5rem", fontSize: "clamp(1.75rem,4vw,2.25rem)" }}>Tell Us About<br />Your Fleet.</h2>

          <form onSubmit={onSubmit} style={{ marginTop: "2rem", display: "grid", gap: "1.25rem" }} noValidate>
            <div className="grid md:grid-cols-2 gap-5">
              <Field name="name" label="Full Name *" error={errors.name} />
              <Field name="company" label="Company" error={errors.company} />
              <Field name="email" label="Email *" type="email" error={errors.email} />
              <Field name="phone" label="Phone *" type="tel" error={errors.phone} />
              <div>
                <Label>Product Interest</Label>
                <select name="product" style={{ marginTop: "0.5rem", width: "100%", background: "var(--background)", border: "1px solid var(--border)", padding: "0.75rem", fontSize: "0.875rem", color: "var(--foreground)", outline: "none" }}>
                  {["Select a product","Sleeper Coach","School Bus","Staff Bus","Electric Bus","City / Intercity","Luxury Tourist Coach"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <Field name="fleet" label="Fleet Size" placeholder="e.g. 5 units" error={errors.fleet} />
            </div>
            <div>
              <Label>Requirement *</Label>
              <textarea name="message" rows={5} placeholder="Chassis, routes, seat plan, delivery timeline…" style={{ marginTop: "0.5rem", width: "100%", background: "var(--background)", border: "1px solid var(--border)", padding: "0.75rem", fontSize: "0.875rem", color: "var(--foreground)", outline: "none", resize: "vertical" }} />
              {errors.message && <p style={{ marginTop: "0.25rem", fontSize: "0.75rem", color: "oklch(0.7 0.2 25)" }}>{errors.message}</p>}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", paddingTop: "0.5rem" }}>
              <button type="submit" className="btn-primary"><Send size={16} /> Submit Enquiry</button>
              {status === "ok" && <span style={{ fontSize: "0.875rem", color: "var(--accent)" }}>Thank you — our team will reach out within 48 hours.</span>}
              {status === "error" && <span style={{ fontSize: "0.875rem", color: "oklch(0.7 0.2 25)" }}>Please fix the highlighted fields.</span>}
            </div>
          </form>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ border: "1px solid var(--border)", padding: "2rem" }}>
            <div className="eyebrow">— Head Office</div>
            <ul style={{ marginTop: "1rem", listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.875rem" }}>
              <li style={{ display: "flex", gap: "0.75rem" }}><MapPin size={20} style={{ color: "var(--accent)", flexShrink: 0 }} /> Plot 42, Industrial Estate, Pune, Maharashtra 411019, India</li>
              <li style={{ display: "flex", gap: "0.75rem" }}><Phone size={20} style={{ color: "var(--accent)", flexShrink: 0 }} /> +91 98 2200 1100</li>
              <li style={{ display: "flex", gap: "0.75rem" }}><Mail size={20} style={{ color: "var(--accent)", flexShrink: 0 }} /> sales@arrivalbus.in</li>
              <li style={{ display: "flex", gap: "0.75rem" }}><Clock size={20} style={{ color: "var(--accent)", flexShrink: 0 }} /> Mon–Sat · 09:00 – 18:00 IST</li>
            </ul>
          </div>
          <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
            <div style={{ aspectRatio: "4/3", position: "relative" }}>
              <iframe title="Arrival Bus location" src="https://www.google.com/maps?q=Pune+Industrial+Estate&output=embed" style={{ position: "absolute", inset: 0, height: "100%", width: "100%", filter: "grayscale(1) contrast(1.25)" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
