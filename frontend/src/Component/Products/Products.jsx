import React from "react";
import yirgacheffeImage from "../../assets/Yirgacheffe.png";
import sidamaImage from "../../assets/sidamma.png";
import limuImage from "../../assets/limu.png";
import gujiImage from "../../assets/guji.png";
import harrarImage from "../../assets/harrar-dry.png";

const Products = () => {
  // Define the core color palette
  const COLOR_PRIMARY = "#A37D5C"; // Earthy Coffee
  const COLOR_SECONDARY = "#2D543F"; // Deep Forest Green
  const COLOR_TEXT = "#3B2E24"; // Rich Dark Brown
  const COLOR_BG = "#F8F5F1"; // Light Cream

  const coffeeProducts = [
    {
      id: 1,
      region: "Yirgacheffe",
      type: "Washed Process",
      profile:
        "Intense floral aroma, jasmine notes, bright citrus acidity, clean finish.",
      elevation: "1,800 - 2,200m",
      score: "89+",
      image: yirgacheffeImage,
    },
    {
      id: 2,
      region: "Sidama",
      type: "Natural Process",
      profile:
        "Balanced complexity, stone fruit (apricot), subtle winey notes, medium body.",
      elevation: "1,500 - 2,200m",
      score: "87+",
      image: sidamaImage,
    },
    {
      id: 3,
      region: "Guji",
      type: "Natural Process",
      profile:
        "Explosive red berry sweetness (strawberry/blueberry), chocolate undertones, creamy mouthfeel.",
      elevation: "1,800 - 2,300m",
      score: "90+",
      image: gujiImage,
    },
    {
      id: 4,
      region: "Harrar",
      type: "Dry Process",
      profile:
        "Classic wild blueberry, pungent spice, distinct winey character, heavy body.",
      elevation: "1,400 - 2,000m",
      score: "85+",
      image: harrarImage,
    },
    {
      id: 5,
      region: "Limu",
      type: "Washed Process",
      profile:
        "Well-balanced, sweet flavor, low acidity, light spice and honey notes.",
      elevation: "1,100 - 1,900m",
      score: "86+",
      image: limuImage,
    },
  ];

  return (
    <div className="Playfair Display bg-[#0F1727]">
      {/* Products Hero/Intro */}
      <section
        className={`bg-[${COLOR_SECONDARY}] py-24 px-6 md:px-20 text-center`}
      >
        <h1 className={`text-5xl font-bold text-white mb-4`}>
          Our Premium Ethiopian Green Coffee
        </h1>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
          Explore our curated selection of single-origin Arabica, sourced from
          the most renowned growing regions of Ethiopia.
        </p>
      </section>

      {/* Product Catalog */}
      <section className={`bg-[${COLOR_BG}] py-20 px-6 md:px-20`}>
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl font-bold text-[${COLOR_TEXT}] mb-12 text-center`}
          >
            Lot Availability & Flavor Profiles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {coffeeProducts.map((product) => (
              <div
                key={product.id}
                className="transform hover:scale-110 bg-white rounded-xl shadow-xl overflow-hidden transform hover:shadow-2xl transition duration-300"
              >
                {/* Product Image */}
                <div className="h-48 relative">
                  <img
                    src={product.image}
                    alt={`${product.region} coffee`}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-0 right-0 bg-[${COLOR_SECONDARY}] text-white text-sm font-semibold px-4 py-2 rounded-bl-xl`}
                  >
                    Score: {product.score}
                  </span>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <span
                    className={`text-xs uppercase tracking-widest font-semibold text-[${COLOR_PRIMARY}]`}
                  >
                    {product.type}
                  </span>
                  <h3
                    className={`text-2xl font-bold text-[${COLOR_TEXT}] mt-1 mb-3`}
                  >
                    {product.region}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-700">
                    <p>Profile: {product.profile}</p>
                    <p className="text-gray-500">
                      Elevation: {product.elevation}
                    </p>
                  </div>

                  {/* <a
                    href="#quote"
                    className={`mt-4 inline-block w-full text-center bg-[${COLOR_PRIMARY}] text-white py-2 rounded-lg font-semibold hover:bg-[#8D6B4E] transition duration-200`}
                  >
                    Inquire on Lot {product.id}
                  </a>*/}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Product Certifications/Trust Section */}
      <section
        className={`bg-white py-20 px-6 md:px-20 border-t border-gray-100`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl font-bold text-[${COLOR_TEXT}] mb-8 text-center`}
          >
            Quality Assurance & Sourcing Integrity
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {/* QA Point 1 */}
            <div className="p-4">
              <div className={`text-5xl text-[${COLOR_SECONDARY}] mb-3`}>
                🔬
              </div>
              <h4 className={`font-semibold text-lg text-[${COLOR_TEXT}]`}>
                Rigorous Lab Testing
              </h4>
              <p className="text-gray-600">
                Moisture, density, and defect analysis to meet international
                standards.
              </p>
            </div>
            {/* QA Point 2 */}
            <div className="p-4">
              <div className={`text-5xl text-[${COLOR_SECONDARY}] mb-3`}>
                🥇
              </div>
              <h4 className={`font-semibold text-lg text-[${COLOR_TEXT}]`}>
                SCA Certified Grades
              </h4>
              <p className="text-gray-600">
                Cupping scores verified by licensed Q-Graders for guaranteed
                quality.
              </p>
            </div>
            {/* QA Point 3 */}
            <div className="p-4">
              <div className={`text-5xl text-[${COLOR_SECONDARY}] mb-3`}>
                📜
              </div>
              <h4 className={`font-semibold text-lg text-[${COLOR_TEXT}]`}>
                Documentation & Logistics
              </h4>
              <p className="text-gray-600">
                Full lot separation and clear export documentation for smooth
                shipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="quote"
        className={`bg-[${COLOR_TEXT}] py-16 px-6 md:px-20 text-center`}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Import?</h2>
        <p className="text-lg text-white mb-6">
          Contact our sales team today to discuss current crop availability,
          pricing, and freight options.
        </p>
        <a
          href="#"
          className={`inline-block bg-[#2D543F] text-white text-lg font-semibold px-12 py-3 rounded-full shadow-lg hover:bg-[#A37D5C] transition duration-200`}
        >
          Get a Custom Quote
        </a>
      </section>
    </div>
  );
};

export default Products;
