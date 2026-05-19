import React, { useState } from "react";
import { X, Mail, ChevronLeft, Send, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../data/constants";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState("idle"); // idle | submitting | success
  const [formData, setFormData] = useState({ name: "", email: "", address: "", company: "", message: "" });

  const coffeeProducts = PRODUCTS.filter((p) => p.isVisible !== false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setShowForm(false);
    setFormStatus("idle");
    setFormData({ name: "", email: "", address: "", company: "", message: `I'm interested in receiving a sample of the ${product.region} ${product.type || ""}.` });
  };

  return (
    <div className="relative min-h-screen bg-[#FDFCF8] dark:bg-[#0a0a0a] text-gray-900 dark:text-white selection:bg-red-500/30 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none transform-gpu overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200/40 dark:bg-orange-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-200/40 dark:bg-red-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-green-200/40 dark:bg-green-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-6 md:px-20 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-red-500 font-bold tracking-[0.2em] text-sm uppercase animate-fade-in-up">
            Our Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight drop-shadow-2xl">
            Ethiopia's Finest <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Green Coffee
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Sourced exclusively from the renowned high-altitude regions of Ethiopia. Each bean tells a story of
            heritage, soil, and sunlight.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="relative z-10 py-10 px-4 md:px-10 lg:px-20 max-w-[100rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {coffeeProducts.map((product, idx) => {
            let spanClass = "col-span-1 md:col-span-1 lg:col-span-4";
            let heightClass = "h-[450px]";

            if (idx === 0) {
              spanClass = "col-span-1 md:col-span-2 lg:col-span-12";
              heightClass = "h-[500px] lg:h-[650px]";
            } else if (idx === 1 || idx === 4) {
              spanClass = "col-span-1 md:col-span-1 lg:col-span-7";
              heightClass = "h-[450px] lg:h-[500px]";
            } else if (idx === 2 || idx === 3) {
              spanClass = "col-span-1 md:col-span-1 lg:col-span-5";
              heightClass = "h-[450px] lg:h-[500px]";
            } else if (idx === 5 || idx === 6) {
              spanClass = "col-span-1 md:col-span-1 lg:col-span-6";
              heightClass = "h-[450px] lg:h-[500px]";
            } else if (idx === 7) {
              spanClass = "col-span-1 md:col-span-2 lg:col-span-12";
              heightClass = "h-[500px] lg:h-[650px]";
            }

            return (
              <div
                key={product.id}
                className={`group relative rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 ${spanClass} ${heightClass}`}
              >
                {/* Background Image */}
                <img
                  src={product.image}
                  alt={product.region}
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Floating Tag */}
                {product.tag && (
                  <div className="absolute top-6 right-6 bg-red-600/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full z-10 shadow-lg border border-red-500/50">
                    {product.tag}
                  </div>
                )}

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end z-10">
                  <div className="transform transition-transform duration-500 translate-y-0 lg:translate-y-16 group-hover:translate-y-0">
                    <h2 className="text-3xl lg:text-4xl font-black text-white mb-2 leading-tight drop-shadow-md">
                      {product.name}
                    </h2>
                    <p className="text-[#FFC436] font-bold tracking-[0.2em] uppercase text-xs lg:text-sm mb-4">
                      {product.type}
                    </p>

                    <p className="text-gray-300 text-sm lg:text-base font-medium line-clamp-2 mb-6 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-2xl">
                      {product.short_desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                      {product.profile?.split(", ").map((flavor, i) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20"
                        >
                          {flavor}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => openProduct(product)}
                      className="inline-flex items-center justify-center px-10 py-4 bg-[#C66B44] text-white font-bold rounded-xl hover:bg-[#A55233] transition-all shadow-[0_10px_30px_rgba(198,107,68,0.4)] lg:opacity-0 group-hover:opacity-100 duration-500 delay-200 transform hover:-translate-y-1 active:scale-95"
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32 px-6 text-center overflow-hidden mt-20">
        <div className="absolute inset-0 bg-red-500/5 -skew-y-3 transform origin-bottom-right" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Ready to Experience the Origin?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-400">
            Contact our sourcing team for current harvest availability, sample requests, and shipping logistics.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-red-600 rounded-full hover:bg-red-700 hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
          >
            Contact Our Sourcing Team
          </Link>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProduct(null)}
          />

          <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-6xl h-[85vh] shadow-2xl flex flex-col md:flex-row overflow-hidden">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/3 relative h-64 md:h-full">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.region}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
              <div className="absolute bottom-6 left-6 text-white md:hidden">
                <h3 className="text-3xl font-bold">{selectedProduct.region}</h3>
                <p className="opacity-90">{selectedProduct.type}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-2/3 p-8 md:p-12 bg-white dark:bg-slate-900 overflow-y-auto relative">
              {!showForm ? (
                <div className="flex flex-col h-full space-y-6">
                  <div className="hidden md:block">
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{selectedProduct.region}</h3>
                    <p className="text-xl text-gray-500 mt-1">{selectedProduct.type}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">About this Coffee</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      {selectedProduct.long_desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100 dark:border-white/10">
                    <div className="col-span-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Flavor Profile</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProduct.profile.split(", ").map((flavor, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-sm rounded-md"
                          >
                            {flavor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2 mt-auto">
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#C66B44] text-white font-bold rounded-xl hover:bg-[#A55233] hover:shadow-[0_10px_30px_rgba(198,107,68,0.4)] hover:-translate-y-1 transition-all duration-300 shadow-xl"
                    >
                      <Mail className="w-5 h-5" />
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(null)}
                      className="px-8 py-4 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-8">
                    <button
                      onClick={() => setShowForm(false)}
                      className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Inquire about {selectedProduct.region}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>

                  {formStatus === "success" ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Request Sent!</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Thanks for your interest in our {selectedProduct.region}. Our sourcing team will reach out
                          shortly.
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="mt-4 px-8 py-3 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-bold rounded-full hover:bg-gray-200"
                      >
                        Close Window
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="flex-grow flex flex-col space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#1B4D3E]/50 outline-none transition-all"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#1B4D3E]/50 outline-none transition-all"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Address</label>
                          <input
                            type="text"
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#1B4D3E]/50 outline-none transition-all"
                            placeholder="Shipping address"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Company <span className="opacity-50">(Opt)</span>
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#1B4D3E]/50 outline-none transition-all"
                            placeholder="Business name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 flex-grow">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Message</label>
                        <textarea
                          required
                          rows="4"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#1B4D3E]/50 outline-none transition-all resize-none h-full min-h-[120px]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === "submitting"}
                        className="w-full py-4 mt-auto bg-[#C66B44] text-white font-bold rounded-xl hover:bg-[#A55233] hover:-translate-y-1 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {formStatus === "submitting" ? (
                          "Sending Request..."
                        ) : (
                          <>
                            Send Request <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
