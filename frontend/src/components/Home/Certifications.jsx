import React, { useRef, useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "../../data/constants";

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const Stars = () => (
  <div className="flex gap-1 mb-6">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={15} fill="#f59e0b" stroke="none" />
    ))}
  </div>
);

const Certifications = () => {
  const testimonials = TESTIMONIALS.filter((t) => t.isVisible !== false);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [sectionRef, inView] = useInView(0.1);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
    setCurrent((idx + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const active = testimonials[current];

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #080808 0%, #110303 50%, #080808 100%)" }}
    >
      {/* Top edge glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-1 pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(220,38,38,0.4), transparent)" }}
      />
      {/* Ambient blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none rounded-full blur-[120px]"
        style={{ background: "radial-gradient(ellipse, rgba(220,38,38,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.35em] mb-4 px-4 py-2 rounded-full"
            style={{
              color: "#ef4444",
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.2)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            Partner Voices
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-white mt-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Trusted by Roasters{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ef4444, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Worldwide
            </span>
          </h2>
        </div>

        {/* Split layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          {/* LEFT — Feature quote (3 cols) */}
          <div className="lg:col-span-3">
            <div
              key={current}
              className="relative h-full rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(220,38,38,0.09) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(220,38,38,0.2)",
                animation: "fadeIn 0.45s ease",
                minHeight: "380px",
              }}
            >
              {/* Big decorative quote mark */}
              <Quote
                size={80}
                className="absolute -top-2 -right-2 opacity-[0.06]"
                style={{ color: "#ef4444" }}
              />

              <div>
                <Stars />
                <p
                  className="text-white/90 text-xl md:text-2xl font-medium leading-relaxed mb-10"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  "{active.feedback}"
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={active.image}
                      alt={active.name}
                      className="w-14 h-14 rounded-full object-cover"
                      style={{ border: "2px solid rgba(220,38,38,0.5)" }}
                    />
                    <span
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white"
                      style={{ background: "linear-gradient(135deg, #ef4444, #b91c1c)" }}
                    >
                      ✓
                    </span>
                  </div>
                  <div>
                    <p
                      className="text-white font-bold text-base"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {active.name}
                    </p>
                    <p
                      className="text-white/45 text-sm"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {active.role} · {active.company}
                    </p>
                  </div>
                </div>

                {/* Arrow controls */}
                <div className="flex gap-2">
                  <button
                    onClick={() => goTo(current - 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                    aria-label="Previous"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => goTo(current + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                      color: "#fff",
                      border: "none",
                    }}
                    aria-label="Next"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Stacked mini cards (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                className="text-left w-full rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 group"
                style={{
                  background: i === current
                    ? "linear-gradient(135deg, rgba(220,38,38,0.12), rgba(255,255,255,0.04))"
                    : "rgba(255,255,255,0.025)",
                  border: i === current
                    ? "1px solid rgba(220,38,38,0.3)"
                    : "1px solid rgba(255,255,255,0.06)",
                  transform: i === current ? "translateX(4px)" : "translateX(0)",
                }}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-0.5"
                  style={{ border: i === current ? "2px solid rgba(220,38,38,0.5)" : "2px solid rgba(255,255,255,0.1)" }}
                />
                <div className="min-w-0">
                  <p
                    className="font-bold text-sm mb-0.5 truncate"
                    style={{
                      color: i === current ? "#fff" : "rgba(255,255,255,0.6)",
                      fontFamily: "var(--font-outfit)",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs mb-2 truncate"
                    style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-outfit)" }}
                  >
                    {t.company}
                  </p>
                  <p
                    className="text-xs leading-relaxed line-clamp-2"
                    style={{
                      color: i === current ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.3)",
                      fontFamily: "var(--font-outfit)",
                    }}
                  >
                    "{t.feedback}"
                  </p>
                </div>
              </button>
            ))}

            {/* Progress dots */}
            <div className="flex gap-2 pt-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    height: "4px",
                    width: i === current ? "2rem" : "0.5rem",
                    background: i === current
                      ? "linear-gradient(to right, #ef4444, #f59e0b)"
                      : "rgba(255,255,255,0.15)",
                  }}
                  aria-label={`Go to ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
