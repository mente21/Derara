import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, MapPin, Thermometer, Mountain, Droplets } from "lucide-react";
import { Link } from "react-router-dom";

const regions = [
  {
    id: "yirgacheffe",
    name: "Yirgacheffe",
    zone: "Gedeo Zone, SNNPR",
    elevation: "1,700 – 2,200m",
    rainfall: "1,200 – 2,000mm",
    temp: "15 – 24°C",
    process: "Washed & Natural",
    profile: ["Jasmine", "Blueberry", "Lemon Citrus", "Bergamot"],
    desc: "The world's most celebrated coffee origin — Yirgacheffe's washed lots define clarity, florals, and brightness at the highest level.",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.2)",
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=900&q=80",
    dot: { top: "62%", left: "35%" },
  },
  {
    id: "sidama",
    name: "Sidama",
    zone: "Sidama Region, SNNPR",
    elevation: "1,500 – 2,200m",
    rainfall: "1,000 – 1,600mm",
    temp: "16 – 26°C",
    process: "Washed & Natural",
    profile: ["Apricot", "Dark Chocolate", "Herbal Tea", "Citrus Zest"],
    desc: "Balanced, complex, and versatile — Sidama delivers stone-fruit brightness and chocolate depth that works equally well for filter and espresso.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.2)",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    dot: { top: "58%", left: "38%" },
  },
  {
    id: "guji",
    name: "Guji",
    zone: "Guji Zone, Oromia",
    elevation: "1,800 – 2,400m",
    rainfall: "1,400 – 1,800mm",
    temp: "14 – 22°C",
    process: "Natural & Washed",
    profile: ["Tropical Fruit", "Red Berry", "Dark Chocolate", "Rich Body"],
    desc: "High-altitude Guji lots are prized for their exceptional density and the bold tropical-fruit sweetness of their natural-process lots.",
    color: "#22c55e",
    glow: "rgba(34,197,94,0.2)",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=900&q=80",
    dot: { top: "55%", left: "42%" },
  },
  {
    id: "harar",
    name: "Harar",
    zone: "East Hararghe, Oromia",
    elevation: "1,400 – 2,100m",
    rainfall: "700 – 1,000mm",
    temp: "18 – 30°C",
    process: "Natural (Dry)",
    profile: ["Wild Berry", "Winey Acidity", "Blueberry", "Bold Spice"],
    desc: "Ethiopia's most ancient coffee tradition — Harar's wild dry-process Longberry delivers an unmistakable winey intensity and bold spice finish.",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.2)",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=80",
    dot: { top: "44%", left: "68%" },
  },
  {
    id: "limu",
    name: "Limu",
    zone: "Jimma Zone, Oromia",
    elevation: "1,400 – 2,000m",
    rainfall: "1,200 – 1,800mm",
    temp: "15 – 25°C",
    process: "Washed",
    profile: ["Mild Spice", "Winey", "Soft Citrus", "Smooth Finish"],
    desc: "One of Ethiopia's hidden gems — Limu's gentle washed profile and low acidity make it a prized blending component and subtle single origin.",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.2)",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    dot: { top: "48%", left: "28%" },
  },
];

const useInView = (threshold = 0.08) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const CoffeeOrigins = () => {
  const [active, setActive] = useState(0);
  const [sectionRef, inView] = useInView();
  const region = regions[active];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fafafa] dark:bg-[#060606]"
    >
      {/* ── Full-bleed background image with deep overlay ── */}
      <div
        className="absolute inset-0 transition-all duration-700 hidden dark:block"
        style={{
          backgroundImage: `url(${region.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.22) saturate(1.3)",
        }}
      />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(to right, rgba(6,6,6,0.97) 0%, rgba(6,6,6,0.7) 55%, rgba(6,6,6,0.3) 100%)",
        }}
      />
      {/* Accent colour glow matching active region */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${region.glow} 0%, transparent 60%)`,
        }}
      />

      <div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(32px)",
          transition: "all 0.8s ease",
        }}
      >
        {/* Top label */}
        <div className="flex items-center gap-3 mb-14">
          <div
            className="h-px flex-1 max-w-[3rem]"
            style={{ background: `linear-gradient(to right, transparent, ${region.color})` }}
          />
          <span
            className="text-xs font-bold uppercase tracking-[0.35em] px-4 py-2 rounded-full"
            style={{
              color: region.color,
              background: `${region.glow}`,
              border: `1px solid ${region.color}40`,
              fontFamily: "var(--font-outfit)",
              transition: "all 0.4s ease",
            }}
          >
            Ethiopian Coffee Origins
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Region selector + detail */}
          <div>
            <h2
              className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-2 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Explore Our
            </h2>
            <h2
              className="text-5xl md:text-6xl font-black mb-8 leading-tight"
              style={{
                fontFamily: "var(--font-playfair)",
                color: region.color,
                transition: "color 0.4s ease",
              }}
            >
              {region.name}
            </h2>

            {/* Region tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {regions.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => setActive(i)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${i === active ? 'text-white' : 'text-gray-500 dark:text-white/45 bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                  style={{
                    background: i === active ? r.color : undefined,
                    borderColor: i === active ? r.color : undefined,
                    fontFamily: "var(--font-outfit)",
                    transform: i === active ? "scale(1.05)" : "scale(1)",
                    boxShadow: i === active ? `0 0 16px ${r.glow}` : "none",
                  }}
                >
                  {r.name}
                </button>
              ))}
            </div>

            <p
              key={region.id}
              className="text-gray-700 dark:text-white/65 text-lg leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-outfit)", animation: "fadeIn 0.4s ease" }}
            >
              {region.desc}
            </p>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Mountain, label: "Elevation", value: region.elevation },
                { icon: Droplets, label: "Rainfall", value: region.rainfall },
                { icon: Thermometer, label: "Temperature", value: region.temp },
                { icon: MapPin, label: "Process", value: region.process },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${region.color}18`, border: `1px solid ${region.color}30` }}
                  >
                    <Icon size={15} style={{ color: region.color }} />
                  </div>
                  <div>
                    <p
                      className="text-gray-500 dark:text-white/35 text-xs uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-gray-900 dark:text-white text-sm font-semibold"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:gap-5"
              style={{
                background: `linear-gradient(135deg, ${region.color}, ${region.color}cc)`,
                boxShadow: `0 4px 20px ${region.glow}`,
                fontFamily: "var(--font-outfit)",
              }}
            >
              View {region.name} Lots
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* RIGHT — Visual panel: flavor tags + region image card */}
          <div className="hidden lg:flex flex-col gap-6">
            {/* Big image card */}
            <div
              key={`img-${region.id}`}
              className="relative rounded-3xl overflow-hidden"
              style={{
                height: "360px",
                border: `1px solid ${region.color}30`,
                animation: "fadeIn 0.5s ease",
                boxShadow: `0 0 60px ${region.glow}`,
              }}
            >
              <img
                src={region.image}
                alt={region.name}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, rgba(6,6,6,0.85) 0%, rgba(6,6,6,0.1) 60%, transparent 100%)`,
                }}
              />
              {/* Zone badge */}
              <div className="absolute bottom-5 left-5">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(0,0,0,0.65)",
                    border: `1px solid ${region.color}40`,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <MapPin size={12} style={{ color: region.color }} />
                  <span
                    className="text-white/80 text-xs font-medium"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {region.zone}
                  </span>
                </div>
              </div>
            </div>

            {/* Flavor profile tags */}
            <div>
              <p
                className="text-gray-500 dark:text-white/35 text-xs uppercase tracking-widest mb-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Flavor Profile
              </p>
              <div className="flex flex-wrap gap-2">
                {region.profile.map((note, i) => (
                  <span
                    key={note}
                    className="px-4 py-2 rounded-full text-sm font-semibold"
                    style={{
                      background: `${region.color}12`,
                      border: `1px solid ${region.color}35`,
                      color: region.color,
                      fontFamily: "var(--font-outfit)",
                      animation: `fadeIn 0.4s ease ${i * 60}ms both`,
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Thin region list */}
            <div
              className="rounded-2xl p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10"
            >
              <p
                className="text-gray-500 dark:text-white/30 text-xs uppercase tracking-widest mb-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                All Origins
              </p>
              <div className="flex flex-col gap-1">
                {regions.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => setActive(i)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-300 text-left"
                    style={{
                      background: i === active ? `${r.color}10` : "transparent",
                    }}
                  >
                    <span
                      className={`text-sm font-medium ${i === active ? '' : 'text-gray-600 dark:text-white/40'}`}
                      style={{
                        color: i === active ? r.color : undefined,
                        fontFamily: "var(--font-outfit)",
                      }}
                    >
                      {r.name}
                    </span>
                    <span
                      className="text-xs text-gray-400 dark:text-white/20"
                      style={{
                        fontFamily: "var(--font-outfit)",
                      }}
                    >
                      {r.elevation}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffeeOrigins;
