import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";
import DeraraImage from "../../assets/10001.jpg";
import logistics from "../../assets/logistics.jpg";
import exemplary from "../../assets/exemplery.jpg";
import integrity from "../../assets/integrity.jpg";
import { Link } from "react-router-dom";

const About = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  return (
    <div className="relative min-h-screen bg-[#FDFCF8] dark:bg-[#0a0a0a] text-gray-900 dark:text-white selection:bg-red-500/30 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none transform-gpu overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200/30 dark:bg-orange-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob" />
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-red-200/30 dark:bg-red-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[10%] left-[10%] w-[600px] h-[600px] bg-green-200/30 dark:bg-green-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80"
          alt="Ethiopian Coffee Highlands"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-5xl px-4 pt-48 pb-20 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-10 tracking-tight leading-[1.1]">
            <span className="text-white drop-shadow-lg">Delivering</span>{" "}
            <span className="text-white/90 drop-shadow-lg">The World's Finest</span>
            <br className="hidden lg:block" />
            <span className="block mt-4 text-[#A37D5C]">Ethiopian Arabica</span>
            <span className="text-white drop-shadow-lg"> Coffee</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 font-medium mb-12 max-w-3xl mx-auto drop-shadow-md">
            From the birthplace of coffee to global markets — rooted in heritage, crafted with precision.
          </p>

          <Link
            to="/contact"
            className="inline-block bg-[#2D543F] text-white text-lg font-bold px-14 py-5 rounded-full shadow-2xl transition duration-300 ease-in-out hover:bg-[#A37D5C] transform hover:scale-105 active:scale-95"
          >
            Request a Quote
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#FDFCF8] dark:to-[#0a0a0a] z-20"></div>
      </section>

      {/* Company Overview & Mission */}
      <section className="relative pt-10 pb-10 md:pb-32 bg-[#FDFCF8] dark:bg-[#0a0a0a] overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-red-50/50 dark:bg-red-900/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 -z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <span className="text-[#A37D5C] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                  Our Heritage
                </span>
                <h2 className="text-5xl md:text-6xl font-black text-[#3B2E24] dark:text-white leading-none font-serif">
                  Who We Are
                </h2>
              </div>

              <div className="space-y-6 text-xl text-[#3B2E24] dark:text-gray-300 leading-relaxed font-medium">
                <p className="border-l-4 border-amber-500 pl-8 py-2">
                  We are a global Ethiopian coffee export company deeply committed to preserving the integrity of
                  single-origin Arabica. Our lineage connects us directly to the ancient coffee forests of Ethiopia,
                  the world's original source.
                </p>
                <p className="opacity-80">
                  Our operations are founded on three pillars: complete transparency from farm to ship, uncompromising
                  quality excellence validated by SCA standards, and sustainable, ethical partnerships with smallholder
                  farmers who are the custodians of this heritage.
                </p>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-12 bg-white dark:bg-[#3B2E24] rounded-[3rem] shadow-2xl text-[#3B2E24] dark:text-white border border-gray-100 dark:border-none overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:scale-125 transition-transform duration-700" />

              <h3 className="text-3xl font-serif italic mb-10 text-amber-600 dark:text-amber-400">
                Our Sacred Commitment
              </h3>
              <ul className="space-y-8">
                {[
                  { title: "Provenance", desc: "Full traceability from specific washing stations." },
                  { title: "Price Integrity", desc: "Above-market returns ensuring farmer prosperity." },
                  { title: "Eco-Harvest", desc: "Minimal impact natural farming practices." },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-6 group/item">
                    <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center shrink-0 group-hover/item:bg-amber-500/20 transition-colors">
                      <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 bg-white dark:bg-[#050505] py-10 md:py-32 px-6 md:px-20 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-24"
          >
            <span className="text-amber-600 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
              Foundational Values
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#3B2E24] dark:text-white font-serif">
              Built on Principles of Excellence
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: "01",
                title: "Exemplary Quality Standards",
                desc: "Every lot undergoes stringent Q-Grade verification by certified experts, ensuring only defect-free, high-scoring beans are approved for global distribution.",
                image: exemplary,
              },
              {
                id: "02",
                title: "Sustainable Integrity",
                desc: "We drive community prosperity through ethical sourcing models that prioritize direct trade equity and regenerative agricultural practices.",
                image: integrity,
              },
              {
                id: "03",
                title: "Transparent Provenance",
                desc: "Our integrated supply chain provides verifiable traceability from the washing station to the final shipment, guaranteeing authentic origin assurance.",
                image:
                  "https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=800&q=80",
              },
              {
                id: "04",
                title: "Precision Logistics",
                desc: "Leveraging robust global networks, we ensure temperature-controlled, timely delivery of your shipments, preserving freshness from port to warehouse.",
                image: logistics,
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col bg-white dark:bg-white/5 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 dark:border-white/10"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="relative p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-[#3B2E24] dark:text-white font-serif leading-tight mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Regions */}
      <section className="hidden md:block relative py-32 px-6 md:px-20 bg-[#FDFCF8] dark:bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="text-amber-600 font-black uppercase tracking-[0.5em] text-[10px] block">
                Regional Significance
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-[#3B2E24] dark:text-white font-serif leading-none">
                Regional <br />
                <span className="text-[#A37D5C]">Flavor Signatures</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                Ethiopia's vast landscape offers a kaleidoscope of profiles. Each region we source from carries its own
                unique flavor signature — from bright, wild floral notes to deep, complex winey undertones.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100"
            >
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80"
                alt="Traditional Ethiopian Coffee Ceremony with Jebena"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2E24]/60 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-serif italic text-2xl">"The Soul of Ethiopian Heritage"</p>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                region: "Yirgacheffe",
                process: "Washed/Natural",
                desc: "Highly aromatic, intensely floral (jasmine), bright lemon acidity, delicate body.",
              },
              {
                region: "Sidama",
                process: "Washed/Natural",
                desc: "Balanced, complex notes of stone fruit, herbal tea, smoothly rounded body.",
              },
              {
                region: "Guji",
                process: "Natural",
                desc: "Pronounced tropical fruit, ripe red berry sweetness, chocolate undertones.",
              },
              {
                region: "Harrar",
                process: "Natural (Dry)",
                desc: "Distinctive winey acidity, intense wild berry, classic sun-dried spice.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 hover:border-amber-500/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-2xl font-serif text-[#3B2E24] dark:text-white group-hover:text-amber-600 transition-colors">
                    {item.region}
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  </div>
                </div>
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4">{item.process}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
