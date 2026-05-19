import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import carasol1 from "../../assets/carasol1.png";
import carasol2 from "../../assets/carasol2.png";
import carasol3 from "../../assets/carasol3_opt.jpg";
import carasol4 from "../../assets/carasol44_opt.jpg";

const slides = [
  {
    img: carasol1,
    tag: "BIRTHPLACE OF COFFEE",
    title: "Premium Ethiopian",
    accent: "Coffee Export",
    sub: "Delivering the world's finest Arabica — from our highland farms to your roastery.",
    cta: "Explore Origins",
    ctaLink: "/products",
    align: "left",
  },
  {
    img: carasol2,
    tag: "GLOBAL PARTNERSHIPS",
    title: "Trusted By",
    accent: "the World",
    sub: "We export with integrity, traceability, and a passion for quality that partners rely on.",
    cta: "Our Certifications",
    ctaLink: "/about",
    align: "right",
  },
  {
    img: carasol3,
    tag: "FARM TO FREIGHT",
    title: "Direct From",
    accent: "Ethiopian Farmers",
    sub: "Empowering smallholder communities while sourcing the finest traceable green coffee.",
    cta: "Our Story",
    ctaLink: "/about",
    align: "left",
  },
  {
    img: carasol4,
    tag: "SENSORY EXCELLENCE",
    title: "Experience the",
    accent: "Richness",
    sub: "Complex, aromatic, and vibrant — Ethiopian coffee unlike anything else in the world.",
    cta: "View Products",
    ctaLink: "/products",
    align: "right",
  },
];

const INTERVAL = 5500;

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
      if (elapsed < INTERVAL) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    const timer = setTimeout(() => {
      goNext();
    }, INTERVAL);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [current]);

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 800);
    setCurrent(idx);
  };

  const goPrev = () => goTo((current - 1 + slides.length) % slides.length);
  const goNext = () => goTo((current + 1) % slides.length);

  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          {/* Background image with subtle Ken Burns */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.img})`,
              transform: i === current ? "scale(1.05)" : "scale(1)",
              transition: "transform 6s ease-out",
            }}
          />
          {/* Dark overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                slide.align === "left"
                  ? "linear-gradient(to right, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.15) 100%)"
                  : "linear-gradient(to left, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.15) 100%)",
            }}
          />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }} />

          {/* Text content */}
          <div
            className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-28"
            style={{ alignItems: slide.align === "right" ? "flex-end" : "flex-start" }}
          >
            <div
              className="max-w-2xl"
              style={{ textAlign: slide.align === "right" ? "right" : "left" }}
            >
              {/* Tag */}
              <div
                className="inline-flex items-center gap-2 mb-5"
                style={{
                  opacity: i === current ? 1 : 0,
                  transform: i === current ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.7s ease 0.2s",
                }}
              >
                <span className="w-8 h-px bg-amber-400" />
                <span
                  className="text-xs font-bold tracking-[0.3em] uppercase"
                  style={{ color: "#f59e0b" }}
                >
                  {slide.tag}
                </span>
                <span className="w-8 h-px bg-amber-400" />
              </div>

              {/* Title */}
              <h1
                className="text-5xl md:text-7xl font-black text-white leading-none mb-3"
                style={{
                  fontFamily: "var(--font-playfair)",
                  opacity: i === current ? 1 : 0,
                  transform: i === current ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.8s ease 0.35s",
                }}
              >
                {slide.title}{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {slide.accent}
                </span>
              </h1>

              {/* Sub */}
              <p
                className="text-lg md:text-xl text-white/80 font-medium mb-8 max-w-lg leading-relaxed"
                style={{
                  fontFamily: "var(--font-outfit)",
                  opacity: i === current ? 1 : 0,
                  transform: i === current ? "translateY(0)" : "translateY(25px)",
                  transition: "all 0.8s ease 0.5s",
                }}
              >
                {slide.sub}
              </p>

              {/* CTA */}
              <div
                style={{
                  opacity: i === current ? 1 : 0,
                  transform: i === current ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s ease 0.65s",
                }}
              >
                <a
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:gap-5 hover:shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                    boxShadow: "0 4px 24px rgba(220,38,38,0.35)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  {slide.cta}
                  <ChevronRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-20">
        <div
          className="h-full transition-none"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(to right, #ef4444, #f59e0b)",
          }}
        />
      </div>

      {/* Slide Counter */}
      <div
        className="absolute top-6 right-8 z-20 text-white/70 text-sm font-mono tracking-widest"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        <span className="text-white text-xl font-bold">{String(current + 1).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        {String(slides.length).padStart(2, "0")}
      </div>

      {/* Nav Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group relative flex items-center justify-center"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className="block rounded-full transition-all duration-400"
              style={{
                width: i === current ? "2rem" : "0.5rem",
                height: "0.5rem",
                background: i === current
                  ? "linear-gradient(to right, #ef4444, #f59e0b)"
                  : "rgba(255,255,255,0.35)",
              }}
            />
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 right-8 z-20 flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest uppercase"
        style={{ fontFamily: "var(--font-outfit)" }}>
        <span>Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </div>
  );
};

export default Carousel;
