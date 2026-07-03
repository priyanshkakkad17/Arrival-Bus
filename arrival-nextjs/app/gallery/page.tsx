"use client";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { useState, useEffect, useRef } from "react";

type Item = { src: string; alt: string; cat: "Manufacturing"|"Factory"|"Interiors"|"Projects"|"Luxury"|"Electric"|"School" };

const items: Item[] = [
  { src: "/images/pages/manufacturing.jpg",  alt: "Assembly line",          cat: "Manufacturing" },
  { src: "/images/pages/chassis.jpg",        alt: "Bus chassis",            cat: "Factory"       },
  { src: "/images/pages/interior.jpg",       alt: "Luxury interior",        cat: "Interiors"     },
  { src: "/images/pages/hero-bus.jpg",       alt: "Marathon coach",         cat: "Projects"      },
  { src: "/images/pages/fleet.jpg",          alt: "Delivered fleet",        cat: "Luxury"        },
  { src: "/images/products/product-electric.jpg", alt: "Electric bus",      cat: "Electric"      },
  { src: "/images/products/product-school.jpg", alt: "School bus",          cat: "School"        },
  { src: "/images/products/product-sleeper.jpg",alt: "Sleeper coach",       cat: "Projects"      },
  { src: "/images/pages/interior.jpg",       alt: "Cabin ambient lighting", cat: "Luxury"        },
  { src: "/images/pages/manufacturing.jpg",  alt: "Robotic welding cell",   cat: "Manufacturing" },
  { src: "/images/pages/chassis.jpg",        alt: "Structural frame",       cat: "Factory"       },
  { src: "/images/pages/fleet.jpg",          alt: "Ready for dispatch",     cat: "Projects"      },
];

const cats = ["All","Manufacturing","Factory","Interiors","Projects","Luxury","Electric","School"] as const;

/* ── Single animated card ── */
function GalleryCard({ item, index, tall }: { item: Item; index: number; tall: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        // stagger delay based on position in row (index % 3)
        setTimeout(() => setVisible(true), (index % 3) * 120);
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <figure
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        border: "1px solid var(--border)",
        margin: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.97)",
        transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div style={{ aspectRatio: tall ? "4/5" : "4/3" }}>
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          style={{
            height: "100%", width: "100%", objectFit: "cover",
            transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1)",
            display: "block",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.07)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
      <figcaption style={{
        position: "absolute", insetInline: 0, bottom: 0,
        padding: "1.25rem",
        background: "linear-gradient(to top, rgba(13,13,20,0.95) 0%, rgba(13,13,20,0.5) 60%, transparent 100%)",
      }}>
        <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--accent)" }}>{item.cat}</div>
        <div style={{ marginTop: "0.25rem", fontFamily: "var(--font-display)", textTransform: "uppercase", fontWeight: 600, fontSize: "0.875rem" }}>{item.alt}</div>
      </figcaption>
    </figure>
  );
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<(typeof cats)[number]>("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(false); setTimeout(() => setMounted(true), 50); }, [filter]);

  const filtered = filter === "All" ? items : items.filter((i) => i.cat === filter);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="— Gallery"
        title="From The Floor. From The Fleet."
        subtitle="A visual record of manufacturing, interiors and delivered projects."
        image="/images/pages/manufacturing.jpg"
      />

      <section className="container-x" style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>

        {/* Filter tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: "0.5rem 1.25rem", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em",
              fontFamily: "var(--font-display)", fontWeight: 600, border: "1px solid",
              borderColor: filter === c ? "var(--accent)" : "var(--border)",
              background: filter === c ? "var(--accent)" : "transparent",
              color: filter === c ? "var(--accent-foreground)" : "var(--foreground)",
              cursor: "pointer", transition: "all .25s",
            }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        {mounted && (
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            style={{ marginTop: "2.5rem" }}
          >
            {filtered.map((item, i) => (
              <GalleryCard key={`${filter}-${i}`} item={item} index={i} tall={i % 5 === 0} />
            ))}
          </div>
        )}

      </section>
    </SiteLayout>
  );
}
