const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('../models/Service');
const Product = require('../models/Product');
const Testimonial = require('../models/Testimonial');
const Certificate = require('../models/Certificate');
const Blog = require('../models/Blog');
const Gallery = require('../models/Gallery');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const services = [
    {
        name: "Ethical Sourcing & Quality",
        description: "Direct partnerships with high-altitude farms in Yirgacheffe and Sidamo, ensuring traceable, single-origin beans and sustainable practices.",
        category: "Sourcing",
    },
    {
        name: "Precision Processing",
        description: "Expert natural and washed processing methods. We handle milling, grading, and testing to meet rigorous international specialty coffee standards.",
        category: "Processing",
    },
    {
        name: "Global Logistics & Export",
        description: "Seamless handling of customs, freight forwarding, and container shipping worldwide, ensuring timely delivery from Addis Ababa to your door.",
        category: "Export",
    },
    {
        name: "Wholesale Partnership",
        description: "Flexible volume contracts for roasters and distributors globally. Personalized consultation to match specific flavor profiles and pricing needs.",
        category: "Partnership",
    },
];

const products = [
    {
      name: "Premium Arabica Roast",
      price: "$24.99",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400&h=400",
      tag: "Best Seller",
    },
    {
      name: "Organic Green Beans",
      price: "$18.50",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&q=80&w=400&h=400",
      tag: "New Arrival",
    },
    {
      name: "Ethiopian Yirgacheffe",
      price: "$29.00",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400&h=400",
      tag: "Signature",
    }
];

const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Procurement Manager",
      company: "Global Coffee Co.",
      feedback: "Derara's commitment to quality is unmatched. Their beans are consistently the highlight of our seasonal blends.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Michael Chen",
      role: "Head Roaster",
      company: "Artisan Roasts",
      feedback: "The transparency in their supply chain gives us total confidence. A partner that truly cares about the farmers.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    }
];

const certificates = [
    {
      title: "Certificate of Competence",
      description: "Issued by Ethiopian Coffee and Tea Authority",
      image: "https://images.unsplash.com/photo-1621243804936-775306a8f2e3?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Best Industry Leader 2024",
      description: "Awarded for exceptional service and innovation.",
      image: "https://images.unsplash.com/photo-1589330694653-731ff1c73f32?auto=format&fit=crop&q=80&w=800",
    }
];

const blogs = [
    {
        title: "Exploring Yirgacheffe: The Floral King",
        description: "Known for its complex floral notes and bright acidity—Ethiopia’s washed coffee classic.",
        category: "Origin Focus",
        author: "Michael Foster",
        image: "https://i.pinimg.com/736x/b4/b7/0c/b4b70c60ad33e944b08285f299e6e814.jpg",
    },
    {
        title: "Sidama: Chocolate & Citrus Balance",
        description: "A balanced cup with citrus brightness and chocolate undertones—perfect for espresso.",
        category: "Tasting Notes",
        author: "Michael Foster",
        image: "https://i.pinimg.com/1200x/8b/4b/ce/8b4bced6cb4a1c1b28a237c63ce85c87.jpg",
    },
    {
        title: "Harar: The Natural, Winey Wildness",
        description: "Naturally processed with fruity, winey notes—Harar delivers Ethiopia’s boldest flavors.",
        category: "Processing Methods",
        author: "Michael Foster",
        image: "https://i.pinimg.com/originals/a6/ac/3e/a6ac3e8d58658376a202e6bbf6571e61.png",
    }
];

const galleryImages = [
    {
        title: "Highland Harvesting",
        category: "Farm",
        description: "Farmers carefully selecting only the ripest red cherries in the Yirgacheffe highlands.",
        image: "https://images.unsplash.com/photo-1501333198300-fd37367d9847?auto=format&fit=crop&q=80&w=1200",
    },
    {
        title: "Traditional Drying Beds",
        category: "Processing",
        description: "Natural sun-drying process on raised African beds to ensure optimal moisture content.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200",
    },
    {
        title: "Quality Inspection",
        category: "Export",
        description: "Rigorous hand-sorting and grading before the beans leave our Addis Ababa facility.",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1200",
    },
    {
        title: "The Art of Roasting",
        category: "Roastery",
        description: "Sample roasting to verify flavour profiles for our international partners.",
        image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=1200",
    },
    {
        title: "Sidama Cherries",
        category: "Farm",
        description: "Freshly picked organic coffee cherries ready for the washing station.",
        image: "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&q=80&w=1200",
    },
    {
        title: "Global Logistics",
        category: "Export",
        description: "Secure packaging and container loading for global distribution.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Service.deleteMany({});
        await Product.deleteMany({});
        await Testimonial.deleteMany({});
        await Certificate.deleteMany({});
        await Blog.deleteMany({});
        await Gallery.deleteMany({});

        // Insert new data
        await Service.insertMany(services);
        await Product.insertMany(products);
        await Testimonial.insertMany(testimonials);
        await Certificate.insertMany(certificates);
        await Blog.insertMany(blogs);
        await Gallery.insertMany(galleryImages);

        console.log('Database seeded successfully with Gallery data!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
