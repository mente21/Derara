import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, Star, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../data/constants";

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

const tagColors = {
  "Best Seller": { bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.4)", color: "#ef4444" },
  "Top Rated": { bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.4)", color: "#f59e0b" },
  "New Arrival": { bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.4)", color: "#22c55e" },
  "Heritage Lot": { bg: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.4)", color: "#a855f7" },
};

// Large featured card
const HeroProductCard = ({ product, inView, delay }) => {
  const tag = tagColors[product.tag] || tagColors["Best Seller"];
  return (
    <Link
      to={`/products`}
      className="group block relative col-span-2 row-span-2 rounded-3xl overflow-hidden cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "#111",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }}
      />

      {/* Tag */}
      {product.tag && (
        <div
          className="absolute top-5 left-5 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{
            background: tag.bg,
            border: `1px solid ${tag.border}`,
            color: tag.color,
            backdropFilter: "blur(8px)",
            fontFamily: "var(--font-outfit)",
          }}
        >
          {product.tag}
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <p
          className="text-xs uppercase tracking-widest font-semibold mb-2"
          style={{ color: "#f59e0b", fontFamily: "var(--font-outfit)" }}
        >
          {product.region} · {product.type}
        </p>
        <h3
          className="text-3xl font-black text-white mb-3 leading-tight group-hover:text-amber-400 transition-colors duration-300"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {product.name}
        </h3>
        <p
          className="text-white/55 text-sm leading-relaxed mb-5 max-w-sm"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {product.short_desc}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} fill={i < (product.rating || 5) ? "#f59e0b" : "none"}
                stroke={i < (product.rating || 5) ? "#f59e0b" : "rgba(255,255,255,0.3)"} />
            ))}
            <span className="text-white/40 text-xs ml-1" style={{ fontFamily: "var(--font-outfit)" }}>
              ({product.rating || 5}.0)
            </span>
          </div>
          <div
            className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-amber-400 transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            View Details <ArrowRight size={15} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Hover border */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ border: "1px solid rgba(245,158,11,0.35)" }}
      />
    </Link>
  );
};

// Small product card
const SmallProductCard = ({ product, inView, delay, onClick }) => {
  const tag = tagColors[product.tag];
  return (
    <button
      onClick={onClick}
      className="group relative block w-full h-full text-left rounded-2xl overflow-hidden cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "#111",
        minHeight: "200px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }}
      />

      {/* Tag */}
      {product.tag && tag && (
        <div
          className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full"
          style={{
            background: tag.bg,
            border: `1px solid ${tag.border}`,
            color: tag.color,
            backdropFilter: "blur(8px)",
            fontFamily: "var(--font-outfit)",
          }}
        >
          {product.tag}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p
          className="text-white/45 text-xs mb-1 uppercase tracking-wider"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {product.region}
        </p>
        <h3
          className="text-white font-bold text-base leading-tight group-hover:text-amber-400 transition-colors duration-300"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {product.name}
        </h3>
      </div>

      {/* Hover border */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
        style={{ border: "1px solid rgba(245,158,11,0.3)" }}
      />
    </button>
  );
};

const Productroll = () => {
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured && p.isVisible !== false);
  const [sectionRef, sectionInView] = useInView(0.08);
  const [heroIndex, setHeroIndex] = useState(0);

  if (featuredProducts.length === 0) return null;

  // Bento layout: current hero is large, rest are small
  const heroProduct = featuredProducts[heroIndex];
  const restProducts = featuredProducts.filter((_, i) => i !== heroIndex);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-[#fafafa] dark:bg-black"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(245,158,11,0.06) 0%, transparent 65%)" }}
      />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(220,38,38,0.05) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-[0.35em] mb-4 px-4 py-2 rounded-full"
              style={{
                color: "#f59e0b",
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.2)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              Our Products
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Featured{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Collections
              </span>
            </h2>
            <p
              className="text-gray-600 dark:text-white/45 mt-3 max-w-md"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Specialty-grade Ethiopian Arabica, sourced from the world's most celebrated growing regions.
            </p>
          </div>
          <Link
            to="/products"
            className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:gap-5"
            style={{
              background: "linear-gradient(135deg, #dc2626, #b91c1c)",
              boxShadow: "0 4px 20px rgba(220,38,38,0.3)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            <Layers size={16} />
            View All Products
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]">
          {/* Hero card - large */}
          <HeroProductCard
            product={heroProduct}
            inView={sectionInView}
            delay={100}
          />
          {/* Smaller cards */}
          {restProducts.slice(0, 4).map((product, i) => {
            const originalIndex = featuredProducts.findIndex(p => p.id === product.id);
            return (
              <SmallProductCard
                key={product.id}
                product={product}
                inView={sectionInView}
                delay={200 + i * 100}
                onClick={() => setHeroIndex(originalIndex)}
              />
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden flex justify-center mt-8">
          <Link
            to="/products"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #dc2626, #b91c1c)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Productroll;
