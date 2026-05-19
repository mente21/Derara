import React, { useEffect, useRef, useState } from "react";
import { Globe, Package, Star, Users } from "lucide-react";

const stats = [
  { icon: Globe, value: 20, suffix: "+", label: "Export Countries", color: "#ef4444" },
  { icon: Package, value: 500, suffix: "+ MT", label: "Annual Export Volume", color: "#f59e0b" },
  { icon: Star, value: 84, suffix: "+", label: "SCA Cup Score (Min)", color: "#22c55e" },
  { icon: Users, value: 1200, suffix: "+", label: "Partner Farmers", color: "#3b82f6" },
];

const useCountUp = (target, duration = 1600, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const StatItem = ({ icon: Icon, value, suffix, label, color, start }) => {
  const count = useCountUp(value, 1600, start);
  return (
    <div className="flex flex-col items-center text-center px-8 py-6 group">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}18`, border: `1px solid ${color}40` }}
      >
        <Icon size={26} style={{ color }} />
      </div>
      <div
        className="text-4xl font-black text-white mb-1"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {count}
        <span style={{ color }}>{suffix}</span>
      </div>
      <p
        className="text-sm text-white/50 tracking-wide uppercase font-medium"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {label}
      </p>
    </div>
  );
};

const StatsBar = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a0505 50%, #0f0f0f 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full blur-[100px] opacity-30"
          style={{ background: "radial-gradient(ellipse, #dc2626 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} start={visible} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
