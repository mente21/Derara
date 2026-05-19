// ============================================================
// constants.js — Static data for the Derara frontend.
// Replaces all API calls to the backend.
// ============================================================

// ----------------------------------------------------------
// CONTACT INFO (replaces /ops/contact-info)
// ----------------------------------------------------------
export const CONTACT_INFO = {
  phone: "+251 984 00 87 75",
  email: "derarabusiness53@gmail.com",
  address: "Akaki-Kality Sub-City, Woreda 13, Tullu Dimtu",
  city: "Addis Ababa",
  country: "Ethiopia",
  socials: [
    { platform: "LinkedIn",  url: "#" },
    { platform: "Instagram", url: "#" },
    { platform: "Twitter",   url: "#" },
    { platform: "Facebook",  url: "#" },
    { platform: "Telegram",  url: "#" },
    { platform: "WhatsApp",  url: "#" },
  ],
};

// ----------------------------------------------------------
// OUR HISTORY (replaces /ops/history)
// ----------------------------------------------------------
export const HISTORY_DATA = [
  {
    title: "Ethiopian Roots",
    description:
      "Born in the heart of Addis Ababa, Derara was founded with a singular mission: to honor Ethiopia's coffee heritage. We started by building direct relationships with local farmers to ensure every bean tells the story of its origin.",
    icon: "Flag",
    image: "localfarmers.png",
    order: 0,
  },
  {
    title: "Local Excellence",
    description:
      "By implementing sustainable export practices and innovative processing methods, we've set new benchmarks for quality in Ethiopia. Our foundation is built on empowering our community and perfecting our craft.",
    icon: "Award",
    image: "excellence.jpg",
    order: 1,
  },
  {
    title: "Global Vision",
    description:
      "Our journey is just beginning. With plans to establish presence in major global hubs like Dubai and London, we are committed to being the premier bridge between Ethiopian soil and the international stage.",
    icon: "TrendingUp",
    image: "globalvision.png",
    order: 2,
  },
];

// ----------------------------------------------------------
// CERTIFICATES (replaces /ops/certificates)
// ----------------------------------------------------------
import cert1 from "../assets/certeficate1.png";
import cert2 from "../assets/certeficate2.png";
import cert3 from "../assets/certeficate3.png";
import cert4 from "../assets/certeficate4.png";
import cert5 from "../assets/certeficate5.png";

export const CERTIFICATES = [
  {
    id: "c1",
    title: "ISO 9001:2015 Quality Management",
    description: "Certified for maintaining international quality management standards across all operations.",
    image: cert1,
    isVisible: true,
  },
  {
    id: "c2",
    title: "Organic Export Certification",
    description: "Recognized for our commitment to organic and sustainable coffee farming practices.",
    image: cert2,
    isVisible: true,
  },
  {
    id: "c3",
    title: "Ethiopian Coffee & Tea Authority",
    description: "Fully licensed and accredited by the Ethiopian Coffee & Tea Authority for export.",
    image: cert3,
    isVisible: true,
  },
  {
    id: "c4",
    title: "Fair Trade Certification",
    description: "Ensuring above-market returns to smallholder farmers through ethical trade practices.",
    image: cert4,
    isVisible: true,
  },
  {
    id: "c5",
    title: "SCA Member — Specialty Coffee Association",
    description: "Proud member of the global specialty coffee community upholding the highest standards.",
    image: cert5,
    isVisible: true,
  },
];

// ----------------------------------------------------------
// TESTIMONIALS (replaces /ops/testimonials)
// ----------------------------------------------------------
export const TESTIMONIALS = [
  {
    id: "t1",
    feedback:
      "Derara's Yirgacheffe lot was the most floral, complex green coffee we've sourced in a decade. Exceptional traceability and seamless logistics.",
    name: "Hans Gruber",
    role: "Head Buyer",
    company: "Vienna Roasters GmbH",
    image: "https://i.pravatar.cc/150?img=11",
    isVisible: true,
  },
  {
    id: "t2",
    feedback:
      "Working with Derara transformed our supply chain. Their Guji Natural is now the cornerstone of our flagship espresso blend. Highly recommend.",
    name: "Sophie Laurent",
    role: "Procurement Director",
    company: "Café de Paris SAS",
    image: "https://i.pravatar.cc/150?img=47",
    isVisible: true,
  },
  {
    id: "t3",
    feedback:
      "Incredible consistency batch after batch. The Sidama Washed exceeded our SCA cupping score expectations by two points. Truly world-class.",
    name: "James Okafor",
    role: "Q-Grader & Founder",
    company: "Lagos Specialty Coffee Co.",
    image: "https://i.pravatar.cc/150?img=68",
    isVisible: true,
  },
  {
    id: "t4",
    feedback:
      "Derara's communication and documentation are impeccable. They make international green coffee procurement feel effortless.",
    name: "Yuki Tanaka",
    role: "Import Manager",
    company: "Tokyo Bean Trade Ltd.",
    image: "https://i.pravatar.cc/150?img=32",
    isVisible: true,
  },
  {
    id: "t5",
    feedback:
      "From sample approval to container delivery, Derara is the benchmark for professional Ethiopian green coffee export.",
    name: "Carlos Mendes",
    role: "Co-Founder",
    company: "São Paulo Specialty Roasters",
    image: "https://i.pravatar.cc/150?img=59",
    isVisible: true,
  },
];

// ----------------------------------------------------------
// PRODUCTS (replaces /ops/products)
// ----------------------------------------------------------
import yirgachafenatural from "../assets/yirgachafenatural.png";
import yirgachafeWashed from "../assets/yirgachafeWashed.png";
import sidamaWashed from "../assets/sidamaWashed.png";
import sidamaImage from "../assets/sidamma.jpg";
import limuWashed from "../assets/limuWashed.png";
import gujiImage from "../assets/guji.jpg";
import gujiNatural from "../assets/gujiNatural.png";
import harrarImage from "../assets/harrar.jpg";

export const PRODUCTS = [
  {
    id: "p1",
    name: "Yirgacheffe Natural",
    region: "Yirgacheffe",
    type: "Natural Process",
    image: yirgachafenatural,
    short_desc:
      "Intensely aromatic with blueberry, jasmine, and tropical fruit notes. A world-renowned natural-process classic from the birthplace of coffee.",
    long_desc:
      "Our Yirgacheffe Natural is sourced exclusively from smallholder farmers in the Gedeo Zone at elevations above 1,900 meters. The natural (dry) process preserves the fruit's sweetness, creating an exceptional cup with pronounced blueberry, jasmine, and tropical sweetness. Perfect for filter and pour-over brewing methods.",
    profile: "Blueberry, Jasmine, Tropical Fruit, Bergamot",
    rating: 5,
    tag: "Best Seller",
    isFeatured: true,
    isVisible: true,
  },
  {
    id: "p2",
    name: "Yirgacheffe Washed",
    region: "Yirgacheffe",
    type: "Washed Process",
    image: yirgachafeWashed,
    short_desc:
      "Crystal-clear floral and citrus expression. The washed process delivers a pristine, high-clarity cup prized by specialty roasters worldwide.",
    long_desc:
      "Fully washed to highlight the terroir of the Yirgacheffe region. This lot presents a bright, clean profile with vivid lemon citrus, delicate peach, and jasmine floral notes. The high altitude and meticulous washing station processing produce a cup of remarkable elegance and transparency.",
    profile: "Lemon Citrus, Peach, Jasmine, Clean Sweetness",
    rating: 5,
    tag: "Top Rated",
    isFeatured: true,
    isVisible: true,
  },
  {
    id: "p3",
    name: "Sidama Washed",
    region: "Sidama",
    type: "Washed Process",
    image: sidamaWashed,
    short_desc:
      "A beautifully balanced cup with stone fruit brightness and chocolate undertones — ideal for espresso and milk-based drinks.",
    long_desc:
      "Our Sidama Washed is sourced from cooperative washing stations in the SNNPR region at 1,700–2,000m elevation. The careful fermentation and washing process yields a balanced, complex cup with notes of apricot, herbal tea, and a smooth chocolate finish. A versatile choice for both filter and espresso applications.",
    profile: "Apricot, Herbal Tea, Dark Chocolate, Citrus Zest",
    rating: 5,
    isFeatured: true,
    isVisible: true,
  },
  {
    id: "p4",
    name: "Sidama Natural",
    region: "Sidama",
    type: "Natural Process",
    image: sidamaImage,
    short_desc:
      "Rich and full-bodied with strawberry jam and wine-like complexity. A premium natural lot that captivates with every sip.",
    long_desc:
      "This Sidama Natural lot is sun-dried on raised African beds for 25–30 days, developing an extraordinary sweetness and complexity. Expect a full-bodied cup with notes of strawberry, red wine, and dark berries. Ideal for roasters seeking a distinctive natural lot with consistent quality.",
    profile: "Strawberry Jam, Red Wine, Dark Berry, Full Body",
    rating: 5,
    isVisible: true,
  },
  {
    id: "p5",
    name: "Limu Washed",
    region: "Limu",
    type: "Washed Process",
    image: limuWashed,
    short_desc:
      "A rare, gentle cup from the western highlands — mild acidity, soft spice, and a wine-like finish that lingers.",
    long_desc:
      "Limu is one of Ethiopia's lesser-known but highly prized growing regions. This washed lot from the Jimma Zone presents a uniquely mild, low-acid profile with subtle spice, wine-like character, and a smooth, clean finish. An excellent choice for espresso blending or single-origin filter.",
    profile: "Mild Spice, Winey, Soft Citrus, Smooth Finish",
    rating: 4,
    isVisible: true,
  },
  {
    id: "p6",
    name: "Guji Natural",
    region: "Guji",
    type: "Natural Process",
    image: gujiNatural,
    short_desc:
      "Bold tropical fruit and red berry sweetness with rich chocolate undertones. Guji's finest natural expression.",
    long_desc:
      "Sourced from the Guji zone in the Oromia Region at altitudes of 1,800–2,200m, this natural lot is a showcase of Ethiopia's diverse terroir. Extended drying on raised beds produces intense tropical fruit sweetness, ripe red berry, and a decadent chocolate finish. A crowd-pleasing lot for adventurous roasters.",
    profile: "Tropical Fruit, Red Berry, Dark Chocolate, Rich Body",
    rating: 5,
    tag: "New Arrival",
    isFeatured: true,
    isVisible: true,
  },
  {
    id: "p7",
    name: "Guji Washed",
    region: "Guji",
    type: "Washed Process",
    image: gujiImage,
    short_desc:
      "A clean, elegant expression of the Guji terroir with bright acidity and stone fruit complexity.",
    long_desc:
      "Our Guji Washed lot showcases the precision possible when Ethiopian terroir meets meticulous processing. The fully washed method reveals bright citrus, stone fruit, and a floral complexity unique to the Guji zone. Excellent for specialty filter applications and pour-over enthusiasts.",
    profile: "Stone Fruit, Bright Citrus, Floral, Clean",
    rating: 4,
    isVisible: true,
  },
  {
    id: "p8",
    name: "Harar Longberry",
    region: "Harrar",
    type: "Natural Process (Dry)",
    image: harrarImage,
    short_desc:
      "Ethiopia's most distinctive wild coffee — bold winey acidity, intense blueberry, and ancient sun-dried character.",
    long_desc:
      "The Harar region in Eastern Ethiopia produces one of the world's most distinctive and sought-after coffees. The ancient dry-process tradition creates an unmistakable cup with wild, winey acidity, intense blueberry and dark fruit notes, and a characteristic spice finish. A true heritage coffee for connoisseurs.",
    profile: "Wild Berry, Blueberry, Winey Acidity, Spice, Bold",
    rating: 5,
    tag: "Heritage Lot",
    isFeatured: true,
    isVisible: true,
  },
];

// ----------------------------------------------------------
// BLOG POSTS (replaces /ops/blogs + static blogPosts from assets.js)
// ----------------------------------------------------------
export const BLOG_POSTS = [
  {
    id: "b1",
    title: "Exploring Yirgacheffe: The Floral King",
    description:
      "Known for its complex floral notes and bright acidity — Ethiopia's washed coffee classic that has captivated roasters and baristas worldwide for generations.",
    content:
      "Yirgacheffe sits at the heart of Ethiopia's Gedeo Zone, an area celebrated for producing some of the world's most distinctive and sought-after green coffees. At elevations ranging from 1,700 to 2,200 meters above sea level, the combination of rich volcanic soils, abundant rainfall, and a mild, consistent climate creates the perfect conditions for exceptional Arabica. The washed coffees from this region are particularly prized for their extraordinary clarity and floral intensity, often described as the benchmark for clean, origin-forward specialty coffee.\n\nThe processing methods employed at Yirgacheffe's washing stations are central to the region's reputation. After careful hand-picking of only the ripest red cherries, the fruit is pulped, fermented in water tanks for 36 to 48 hours, and then washed clean before being dried on raised African beds. This meticulous process strips away the fruit layer to allow the bean's intrinsic terroir to shine through, producing the vivid jasmine florals, bright lemon citrus, and delicate peach notes that define the Yirgacheffe profile.\n\nAt Derara, we work directly with smallholder farmers and cooperative washing stations in the Yirgacheffe woreda. Our sourcing model is built on transparency and long-term relationships, ensuring that farmers receive above-market premiums for their exceptional work. We conduct pre-shipment cupping at every stage, from wet mill to dry mill, to guarantee that only defect-free, high-scoring lots are selected for our export portfolio. This commitment to traceability is what allows us to offer our roasting partners full confidence in the origin and quality of every bag.",
    image: "https://i.pinimg.com/736x/b4/b7/0c/b4b70c60ad33e944b08285f299e6e814.jpg",
    category: "Origin Focus",
    author: "Mentesnot D.",
    date: "Dec 05, 2025",
    createdAt: "2025-12-05T09:00:00Z",
  },
  {
    id: "b2",
    title: "Sidama: Chocolate & Citrus Balance",
    description:
      "A balanced cup with citrus brightness and chocolate undertones — perfect for espresso blends and milk-based drinks requiring complexity and sweetness.",
    content:
      "The Sidama zone of southern Ethiopia is one of the country's premier coffee-growing regions, known for producing a distinctive style of coffee that bridges the gap between the vibrant florals of Yirgacheffe and the wild intensity of Harar. Sidama coffees are celebrated for their exceptional balance — a quality that makes them a favorite among specialty roasters crafting both single-origin offerings and sophisticated espresso blends. The region's diverse microclimates, ranging from the cool highlands of Bensa to the warmer valleys near Hawassa, contribute to the complexity of flavor found across different Sidama lots.\n\nWashed processing is the dominant method in Sidama, and it is here that the region's most nuanced coffees are produced. The fermentation and washing process, combined with slow drying on raised beds, creates a cup of remarkable clarity with layered notes of stone fruit, herbal tea, and a smooth, lingering chocolate finish. This profile translates exceptionally well across brewing methods, performing with equal distinction as a bright, tea-like pour-over or a rich, sweet espresso with a caramel body. Natural-process Sidama lots, while less common, offer an entirely different dimension of intensity, with strawberry and red wine notes that have drawn significant interest from innovative roasters.\n\nOur Sidama sourcing is concentrated in the Bensa and Arbegona sub-zones, where altitude and soil composition consistently yield top-tier green coffee. We partner with washing stations that are committed to environmental sustainability, including water recycling systems and composting of spent coffee pulp. Every lot we export undergoes SCA-standard cupping evaluation to ensure it meets our minimum score threshold.",
    image: "https://i.pinimg.com/1200x/8b/4b/ce/8b4bced6cb4a1c1b28a237c63ce85c87.jpg",
    category: "Tasting Notes",
    author: "Mentesnot D.",
    date: "Nov 28, 2025",
    createdAt: "2025-11-28T09:00:00Z",
  },
  {
    id: "b3",
    title: "Harar: The Natural, Winey Wildness",
    description:
      "Naturally processed with fruity, winey notes — Harar delivers Ethiopia's boldest and most ancient flavors, born from centuries of sun-dried tradition.",
    content:
      "In the ancient walled city of Harar in eastern Ethiopia, coffee is not merely a product — it is a living cultural institution. Harar is one of the oldest coffee-growing regions in the world, and its dry-process tradition predates modern processing methods by centuries. The wild, unsorted forest coffees grown by Oromo farmers at elevations of 1,400 to 2,000 meters are harvested, dried whole on the cherry with the fruit intact, and then sorted and milled after an extended drying period of up to six weeks. This ancient method is responsible for the unmistakable character of Harar coffee: intense wild berry, pronounced winey acidity, and a bold, complex spice finish.\n\nThe Harar Longberry variety — named for the distinctive elongated shape of its large beans — is particularly prized by connoisseurs and specialty roasters seeking a truly unique origin expression. The longberry's size and density contribute to a bold, full-bodied cup that can withstand darker roast profiles while still retaining its distinctive fruit character. For lighter roast applications, the Harar Longberry reveals extraordinary complexity, with layers of blueberry, blackberry, dark chocolate, and a distinctive mocha sweetness that is unlike any other Ethiopian origin.\n\nAt Derara, we source our Harar lots from established trader networks with deep roots in the local farming community. Given the decentralized nature of Harar coffee production — where individual farmers often own just a few trees — aggregation and careful sorting are essential to achieving lot consistency. Our team conducts thorough defect analysis and moisture testing on all Harar lots before export, ensuring that the wild character of this legendary origin is captured at its best.",
    image: "https://i.pinimg.com/originals/a6/ac/3e/a6ac3e8d58658376a202e6bbf6571e61.png",
    category: "Processing Methods",
    author: "Mentesnot D.",
    date: "Nov 20, 2025",
    createdAt: "2025-11-20T09:00:00Z",
  },
  {
    id: "b4",
    title: "Sustainable Farming Practices in Ethiopian Coffee",
    description:
      "How Ethiopia is leading the way in organic and sustainable coffee farming methods that protect biodiversity, empower farmers, and ensure long-term quality.",
    content:
      "Ethiopia's coffee sector is uniquely positioned at the intersection of ancient tradition and modern sustainability. The vast majority of Ethiopia's coffee is grown by smallholder farmers under forest and garden cultivation systems that are, by their nature, organic. Without the capital or infrastructure for industrial agriculture, Ethiopian farmers have continued to farm in harmony with the forest ecosystem for generations, creating a de facto model of sustainable production that the global specialty coffee industry is only beginning to fully appreciate and document.\n\nThe forest coffee growing system, practiced particularly in the western regions of Kaffa, Sheka, and Bench-Maji, represents the world's most biodiverse coffee cultivation environment. Coffee plants grow beneath a canopy of indigenous trees, sharing the ecosystem with hundreds of species of birds, mammals, and plants. This shade-grown system naturally regulates temperature and moisture, reduces the need for chemical inputs, and produces coffees of remarkable complexity that reflect the true biodiversity of the forest floor. The Ethiopian government and international NGOs have increasingly recognized the conservation value of these forest coffee systems, and certification programs are beginning to help farmers access premium markets for their wild-harvested production.\n\nAt Derara, sustainability is not a marketing claim but a foundational business principle. We actively support our sourcing partners in accessing organic and Rainforest Alliance certifications, which provide both environmental accountability and market access to premium buyers. We also invest in community training programs focused on post-harvest processing, water conservation, and soil health — practical interventions that improve cup quality and farmer livelihoods simultaneously.",
    image: "https://i.pinimg.com/1200x/f7/27/f5/f727f57d88bd40fb0458f038975102c2.jpg",
    category: "Sustainability",
    author: "Mentesnot D.",
    date: "Nov 10, 2025",
    createdAt: "2025-11-10T09:00:00Z",
  },
  {
    id: "b5",
    title: "The Art of Green Coffee Grading",
    description:
      "Understanding the rigorous Ethiopian commodity exchange grading system and how it ensures the consistency that global specialty buyers demand.",
    content:
      "Green coffee grading is the foundation of quality assurance in the Ethiopian export system. Before any lot is approved for export through the Ethiopian Commodity Exchange (ECX) or direct export, it must pass through a rigorous physical inspection and cupping evaluation process that assigns a grade from 1 (the highest) to 9 based on defect counts, moisture content, screen size, and cup quality. This grading system is the backbone of Ethiopia's reputation as a world-class origin, providing buyers with a standardized framework for assessing lot quality across thousands of different washing stations and dry mills.\n\nThe defect grading process is particularly critical. Trained inspectors manually sort through a 300-gram sample from each lot, counting and categorizing defects according to SCA standards. Primary defects such as full black beans, full sour beans, and dried cherries carry a higher defect weighting and directly impact the lot's grade, while secondary defects like partial blacks, broken beans, and insect damage are counted at a lower weighting. A Grade 1 lot must contain zero primary defects and a maximum of three secondary defects per 300 grams — a standard that requires exceptional care throughout the harvesting, processing, and milling chain.\n\nDerara's quality control team works closely with our mill partners to conduct pre-shipment lot analysis that mirrors and in some cases exceeds the ECX grading standards. Our in-house cupping program evaluates every export lot for aroma, flavor, aftertaste, acidity, body, balance, uniformity, clean cup, sweetness, and overall impression according to the SCA cupping protocol. Only lots scoring 84 points or above on the 100-point scale are approved for our specialty export portfolio.",
    image: "https://i.pinimg.com/736x/6a/7b/9a/6a7b9a09d97a0e0a5a6496ae7ee378a3.jpg",
    category: "Quality & Grading",
    author: "Mentesnot D.",
    date: "Oct 30, 2025",
    createdAt: "2025-10-30T09:00:00Z",
  },
  {
    id: "b6",
    title: "Coffee Ceremony Traditions of Ethiopia",
    description:
      "A deep dive into the cultural significance of the Ethiopian coffee ceremony — a ritual of community, hospitality, and connection that has endured for centuries.",
    content:
      "In Ethiopia, the coffee ceremony — known as 'Buna' — is far more than a beverage preparation ritual. It is a profound social institution, a gesture of hospitality and respect, and a daily affirmation of community bonds that has been practiced for centuries across all of Ethiopia's diverse ethnic and regional cultures. Anthropologists and historians trace the origins of the ceremony to the ancient forests of Kaffa, the legendary birthplace of Coffea Arabica, where the beverage's stimulating properties were first recognized and its preparation first ritualized. Today, the ceremony remains one of the most important social customs in Ethiopian culture, practiced in homes, offices, and public spaces throughout the country every day.\n\nThe ceremony itself is a multi-stage process that unfolds over one to three hours, beginning with the washing and roasting of green coffee beans over a small charcoal brazier. The host — traditionally a woman — roasts the beans in a flat pan, stirring constantly until they reach the desired darkness, then presents the aromatic smoke to guests by waving the pan before them as an olfactory blessing. The roasted beans are then ground by hand in a traditional wooden mortar and pestle, brewed in a clay pot called a jebena, and strained through a grass filter into small handleless cups called sinis. The coffee is traditionally served three times — the first cup (Abol), the second (Tona), and the third (Baraka, meaning blessing) — with each successive cup becoming progressively milder as more water is added to the grounds.\n\nFor Derara, the coffee ceremony is not merely a cultural artifact but a living reminder of the deep human significance of the coffee we export. Every bag of Yirgacheffe, Sidama, or Harar that leaves our warehouse carries with it the weight of this centuries-old tradition — the hands that picked the cherries, the communities that depend on the harvest, and the shared rituals that make Ethiopian coffee so much more than a commodity.",
    image: "https://i.pinimg.com/1200x/42/e5/50/42e550517036057a9c3d173682932001.jpg",
    category: "Culture & Heritage",
    author: "Mentesnot D.",
    date: "Oct 20, 2025",
    createdAt: "2025-10-20T09:00:00Z",
  },
];

// ----------------------------------------------------------
// GALLERY (replaces /ops/gallery)
// ----------------------------------------------------------
export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Yirgacheffe Washing Station",
    description: "Morning activity at the cooperative washing station in the Gedeo Zone.",
    category: "Processing",
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g2",
    title: "Sun-Drying on Raised Beds",
    description: "Natural-process cherries drying on traditional African raised beds.",
    category: "Processing",
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g3",
    title: "Smallholder Farmer Portrait",
    description: "A partner farmer from the Sidama region during the 2024 harvest season.",
    category: "Farmers",
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g4",
    title: "Green Coffee Cupping",
    description: "Our Q-Graders conducting rigorous pre-shipment cupping evaluation.",
    category: "Quality",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g5",
    title: "Ethiopian Coffee Forest",
    description: "Wild Arabica trees growing in their natural forest habitat in the Kaffa region.",
    category: "Origin",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g6",
    title: "Coffee Ceremony",
    description: "The traditional Ethiopian coffee ceremony — a timeless cultural institution.",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g7",
    title: "Export Container Loading",
    description: "Preparing a full-container load of specialty Yirgacheffe for European export.",
    category: "Logistics",
    image: "https://images.unsplash.com/photo-1494961104209-3c223057bd26?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g8",
    title: "Hand-Sorting Green Coffee",
    description: "Skilled workers at the dry mill performing final hand-sorting before bagging.",
    category: "Quality",
    image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g9",
    title: "Harar Heritage Farms",
    description: "Ancient Harar coffeelands where dry-process traditions have continued for centuries.",
    category: "Origin",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g10",
    title: "Community Training Program",
    description: "Derara-sponsored post-harvest processing training for cooperative members.",
    category: "Farmers",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g11",
    title: "Precision Milling",
    description: "Hulling and density-sorting at our partner dry mill facility in Addis Ababa.",
    category: "Processing",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g12",
    title: "Guji Highland Landscape",
    description: "The breathtaking highland terrain of the Guji zone where our coffees are grown.",
    category: "Origin",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=800&q=80",
  },
];
