import React, { useRef, useEffect, useState } from "react";
import { Flag, Award, TrendingUp, Users, Calendar } from "lucide-react";
import { HISTORY_DATA } from "../../data/constants";
import localFarmers from "./images/localfarmers.png";
import excellence from "./images/excellence.jpg";
import globalVision from "./images/globalvision.png";

const getDisplayImage = (img) => {
  if (!img) return localFarmers;
  if (img === "localfarmers.png") return localFarmers;
  if (img === "excellence.jpg") return excellence;
  if (img === "globalvision.png") return globalVision;
  return img;
};

const iconMap = { Flag, Award, TrendingUp, Users, Calendar };

const accentColors = [
  { text: "#ef4444", glow: "rgba(239,68,68,0.25)", border: "rgba(239,68,68,0.2)", bg: "rgba(239,68,68,0.07)" },
  { text: "#f59e0b", glow: "rgba(245,158,11,0.25)", border: "rgba(245,158,11,0.2)", bg: "rgba(245,158,11,0.07)" },
  { text: "#3b82f6", glow: "rgba(59,130,246,0.25)", border: "rgba(59,130,246,0.2)", bg: "rgba(59,130,246,0.07)" },
];

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

const OurHistory = () => {
  const historyData = [...HISTORY_DATA].sort((a, b) => (a.order || 0) - (b.order || 0));
  const [sectionRef, sectionInView] = useInView(0.08);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #080505 60%, #0a0a0a 100%)" }}
    >
      {/* Dot grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div
          className="text-center mb-20"
          style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.75s ease",
          }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.35em] mb-4 px-4 py-2 rounded-full"
            style={{
              color: "#f59e0b",
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.22)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            Our Journey
          </span>
          <h2
            className="text-5xl md:text-6xl font-black text-white mt-3 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Rooted in{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ef4444, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ethiopia
            </span>
            ,
            <br className="hidden md:block" />
            Built for the World
          </h2>
          <p
            className="text-white/45 text-lg mt-5 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            From the birthplace of coffee to international tables — our story is one of heritage, craft, and ambition.
          </p>
        </div>

        {/* Reversed layout — alternating full-width rows */}
        <div className="flex flex-col gap-10">
          {historyData.map((item, index) => {
            const Icon = iconMap[item.icon] || Flag;
            const accent = accentColors[index % accentColors.length];
            const isEven = index % 2 === 0;
            const delay = index * 140;

            return (
              <div
                key={index}
                className="group rounded-3xl overflow-hidden"
                style={{
                  opacity: sectionInView ? 1 : 0,
                  transform: sectionInView
                    ? "translateY(0)"
                    : isEven ? "translateX(-30px)" : "translateX(30px)",
                  transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${accent.border}`,
                }}
              >
                {/* Two-column: text side + image side — REVERSED per row */}
                <div
                  className={`flex flex-col md:flex-row ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Image side */}
                  <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden flex-shrink-0">
                    <img
                      src={getDisplayImage(item.image)}
                      alt={item.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      style={{ minHeight: "280px" }}
                    />
                    {/* Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isEven
                          ? "linear-gradient(to left, rgba(10,8,8,0.85) 0%, rgba(10,8,8,0.1) 100%)"
                          : "linear-gradient(to right, rgba(10,8,8,0.85) 0%, rgba(10,8,8,0.1) 100%)",
                      }}
                    />
                    {/* Step badge floating on image */}
                    <div
                      className="absolute top-5 left-5 flex items-center gap-2"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: accent.bg,
                          border: `1px solid ${accent.border}`,
                          boxShadow: `0 0 18px ${accent.glow}`,
                        }}
                      >
                        <Icon size={18} style={{ color: accent.text }} />
                      </div>
                      <span
                        className="text-xs font-bold px-2 py-1 rounded-md"
                        style={{
                          background: "rgba(0,0,0,0.6)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: accent.text,
                          fontFamily: "var(--font-outfit)",
                          backdropFilter: "blur(8px)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Text side */}
                  <div
                    className="md:w-1/2 flex flex-col justify-center p-8 md:p-12"
                    style={{ background: "transparent" }}
                  >
                    <h3
                      className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight group-hover:opacity-90 transition-opacity duration-300"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {item.title}
                    </h3>
                    <div
                      className="w-12 h-1 rounded-full mb-5"
                      style={{ background: `linear-gradient(to right, ${accent.text}, transparent)` }}
                    />
                    <p
                      className="text-white/60 leading-relaxed text-base md:text-lg"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurHistory;
