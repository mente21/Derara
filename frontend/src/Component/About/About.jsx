import React from "react";

const About = () => {
  return (
    <div className="Playfair Display">
      {/* ☕ Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center justify-center text-center">
        {/* Background Image with a rich overlay */}
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80"
          alt="Ethiopian Coffee Highlands"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-6xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-snug">
            Delivering the World’s Finest{" "}
            <span className="text-[#A37D5C]">Ethiopian Arabica</span> Coffee
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light mb-8 max-w-2xl mx-auto">
            From the birthplace of coffee to global markets — rooted in
            heritage, crafted with precision.
          </p>

          <a
            href="#contact"
            className="inline-block mt-4 bg-[#2D543F]  text-white text-lg font-semibold px-12 py-4 rounded-full shadow-2xl transition duration-300 ease-in-out hover:bg-[#A37D5C] transform hover:scale-105"
          >
            Request a Quote
          </a>
        </div>
      </section>

      {/* 📜 Company Overview & Mission */}
      <section className="bg-[#F8F5F1] py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#E7C58A] font-semibold uppercase tracking-widest mb-3">
                Our Story
              </p>
              <h2 className="text-4xl font-bold text-[#3B2E24] mb-6 border-l-4 border-[#FFD700] pl-4">
                Who We Are
              </h2>
              <p className="text-lg text-[#3B2E24] leading-relaxed mb-6">
                We are a global Ethiopian coffee export company deeply committed
                to preserving the integrity of single-origin Arabica. Our
                lineage connects us directly to the ancient coffee forests of
                Ethiopia, the world's original source.
              </p>
              <p className="text-lg text-[#3B2E24] leading-relaxed">
                Our operations are founded on three pillars: complete
                transparency from farm to ship, uncompromising quality
                excellence validated by SCA standards, and sustainable, ethical
                partnerships with smallholder farmers who are the custodians of
                this heritage.
              </p>
            </div>

            {/* Value Proposition Card */}
            <div className="p-8 bg-white rounded-xl transform  shadow-2xl border-t-4 border-[#FFD700] mt-12">
              <h3 className="text-2xl font-bold text-[#2D543F] mb-4">
                Our Commitment
              </h3>
              <ul className="space-y-3 text-[#3B2E24]">
                <li className="flex items-center">
                  <span className="text-[#A37D5C] mr-3 text-xl">✓</span>
                  Full provenance from specific washing stations.
                </li>
                <li className="flex items-center">
                  <span className="text-[#A37D5C] mr-3 text-xl">✓</span>
                  Above-market prices ensuring farmer livelihood.
                </li>
                <li className="flex items-center">
                  <span className="text-[#A37D5C] mr-3 text-xl">✓</span>
                  Minimal impact processing and natural farming practices.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 Values Section - Grid with modern icons/emojis */}
      <section className="bg-white py-24 px-6 md:px-20 ">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3B2E24] text-center mb-16">
            Core Values That Define Us
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {/* Card 1: Quality */}
            <div className="transform hover:scale-110 text-center p-6 border-b-4 border-[#FFD700] hover:shadow-lg transition hover:bg-gray-300 duration-300 rounded-md">
              <div className="text-4xl text-[#A37D5C] mb-4">✨</div>
              <h3 className="text-xl font-bold text-[#3B2E24] mb-2 ">
                Unmatched Quality
              </h3>
              <p className="text-gray-600">
                Rigorous SCA-standard grading, comprehensive cupping reports,
                and tight moisture control for peak flavor preservation.
              </p>
            </div>

            {/* Card 2: Sustainability */}
            <div className="transform hover:scale-110 text-center p-6 border-b-4 hover:bg-gray-300 border-[#FFD700] hover:shadow-lg transition duration-300 rounded-md">
              <div className="text-4xl text-[#2D543F] mb-4">🌿</div>
              <h3 className="text-xl font-bold text-[#3B2E24] mb-2">
                True Sustainability
              </h3>
              <p className="text-gray-600">
                Supporting bio-diverse, shade-grown coffee farms and ensuring
                equitable returns for every partner in the chain.
              </p>
            </div>

            {/* Card 3: Transparency */}
            <div className=" hover:bg-gray-300 transform hover:scale-110 text-center p-6 border-b-4 border-[#FFD700] hover:shadow-lg transition duration-300 rounded-md">
              <div className="text-4xl text-[#A37D5C] mb-4">🔗</div>
              <h3 className="text-xl font-bold text-[#3B2E24] mb-2">
                Seed-to-Ship Transparency
              </h3>
              <p className="text-gray-600">
                Providing complete lot separation and detailed provenance for
                buyers who demand ethical sourcing and clear origins.
              </p>
            </div>

            {/* Card 4: Reliability */}
            <div className="hover:bg-gray-300 transform hover:scale-110 text-center p-6 border-b-4 border-[#FFD700] hover:shadow-lg transition duration-300 rounded-md">
              <div className="text-4xl text-[#2D543F] mb-4">🚢</div>
              <h3 className="text-xl font-bold text-[#3B2E24] mb-2">
                Global Logistics Reliability
              </h3>
              <p className="text-gray-600">
                Proven track record of consistent supply chain management and
                guaranteed on-time global delivery via established partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🗺️ Coffee Regions - Flavor Profiles */}
      <section className="bg-[#F8F5F1] py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3B2E24] mb-12 text-center">
            The Signatures of Ethiopian Coffee
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Region 1: Yirgacheffe */}
            <div className="transform hover:scale-110 p-6 bg-white rounded-lg shadow-md border-l-4 border-[#A37D5C]">
              <h4 className="text-2xl text-[#2D543F] font-bold mb-2">
                Yirgacheffe
              </h4>
              <p className="text-sm text-[#A37D5C] mb-3 uppercase tracking-wider">
                Washed/Natural
              </p>
              <p className="text-gray-700">
                Highly aromatic, intensely floral (jasmine/honeysuckle), bright
                lemon acidity, and delicate body.
              </p>
            </div>
            {/* Region 2: Sidama */}
            <div className="transform hover:scale-110 p-6 bg-white rounded-lg shadow-md border-l-4 border-[#A37D5C]">
              <h4 className="text-2xl text-[#2D543F] font-bold mb-2">Sidama</h4>
              <p className="text-sm text-[#A37D5C] mb-3 uppercase tracking-wider">
                Washed/Natural
              </p>
              <p className="text-gray-700">
                Balanced, complex notes of stone fruit, herbal tea, and a
                wonderfully smooth, rounded body.
              </p>
            </div>
            {/* Region 3: Guji */}
            <div className="transform hover:scale-110 p-6 bg-white rounded-lg shadow-md border-l-4 border-[#A37D5C]">
              <h4 className="text-2xl text-[#2D543F] font-bold mb-2">Guji</h4>
              <p className="text-sm text-[#A37D5C] mb-3 uppercase tracking-wider">
                Natural
              </p>
              <p className="text-gray-700">
                Pronounced tropical fruit, ripe red berry sweetness, with a
                clean finish and chocolate undertones.
              </p>
            </div>
            {/* Region 4: Harrar */}
            <div className="transform hover:scale-110 p-6 bg-white rounded-lg shadow-md border-l-4 border-[#A37D5C]">
              <h4 className="text-2xl text-[#2D543F] font-bold mb-2">Harrar</h4>
              <p className="text-sm text-[#A37D5C] mb-3 uppercase tracking-wider">
                Natural (Dry Processed)
              </p>
              <p className="text-gray-700">
                Distinctive winey acidity, intense wild berry, and classic
                sun-dried spice character.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 Why Choose Us / CTA */}
      <section className="bg-white py-24 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#2D543F] font-semibold uppercase tracking-widest mb-3">
            Partner with the Source
          </p>
          <h2 className="text-4xl font-bold text-[#3B2E24] mb-8">
            Your Direct Connection to Ethiopian Excellence
          </h2>

          <div className="grid sm:grid-cols-3 gap-8 mt-10">
            {/* Benefit 1 */}
            <div className=" transform hover:scale-110 p-6 bg-[#F8F5F1] rounded-xl border border-gray-200">
              <div className="text-3xl text-[#A37D5C] mb-3">🏅</div>
              <h3 className="font-bold text-lg text-[#3B2E24]">
                Q Grader Certified
              </h3>
              <p className="text-gray-600 mt-1">
                Every lot is cupped and verified by licensed Q-Graders.
              </p>
            </div>
            {/* Benefit 2 */}
            <div className="transform hover:scale-110 p-6 bg-[#F8F5F1] rounded-xl border border-gray-200">
              <div className="text-3xl text-[#2D543F] mb-3">🤝</div>
              <h3 className="font-bold text-lg text-[#3B2E24]">
                Farmer Direct Pricing
              </h3>
              <p className="text-gray-600 mt-1">
                Ethical, traceable sourcing ensures fair wealth distribution.
              </p>
            </div>
            {/* Benefit 3 */}
            <div className="transform hover:scale-110 p-6 bg-[#F8F5F1] rounded-xl border border-gray-200">
              <div className="text-3xl text-[#A37D5C] mb-3">🌐</div>
              <h3 className="font-bold text-lg text-[#3B2E24]">
                Global Logistics
              </h3>
              <p className="text-gray-600 mt-1">
                FOB/CIF shipments managed with precision to any port worldwide.
              </p>
            </div>
          </div>

          <a
            id="contact"
            href="#"
            className="inline-block mt-12 bg-[#2D543F] hover:bg-[#A37D5C] text-white text-lg font-semibold px-16 py-4 rounded-full shadow-xl transition duration-300 ease-in-out hover:bg-[#1E3B2E] transform hover:translate-y-[-2px]"
          >
            Get Started: Contact Our Sales Team
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
