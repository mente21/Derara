import React, { useState } from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import logo from "../../assets/image.png";
import { Link } from "react-router-dom";
import { CONTACT_INFO } from "../../data/constants";

const socialIcons = {
  Facebook: <FaFacebookF />,
  Instagram: <FaInstagram />,
  LinkedIn: <FaLinkedinIn />,
  Twitter: <FaTwitter />,
  YouTube: <FaYoutube />,
  TikTok: <FaTiktok />,
  Telegram: <FaTelegram />,
  WhatsApp: <FaWhatsapp />,
};

const Footer = () => {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
    }
  };

  return (
    <footer className="relative bg-gray-900 dark:bg-gray-900 text-gray-300 dark:text-gray-300 py-20 px-6 overflow-hidden border-t border-gray-200 dark:border-white/5">
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-slate-900 z-0" />

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/5 dark:bg-red-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col items-start space-y-6">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-12 w-auto">
              <img src={logo} alt="Derara Logo" className="h-full object-contain" />
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Derara<span className="text-red-500">.</span>
            </span>
          </Link>
          <p className="leading-relaxed text-sm lg:text-base max-w-xs text-gray-700 dark:text-gray-400">
            Connecting the world with the rich heritage of Ethiopian coffee. We prioritize sustainable farming, fair
            trade, and exceptional quality in every bean we provide.
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6 uppercase tracking-wider">Explore</h3>
          <ul className="space-y-4">
            {[
              { label: "Home", to: "/" },
              { label: "About Us", to: "/about" },
              { label: "Our Products", to: "/products" },
              { label: "Services", to: "/services" },
              { label: "Gallery", to: "/gallery" },
              { label: "Blog", to: "/blog" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="text-gray-700 dark:text-gray-400 hover:text-red-500 hover:translate-x-2 transition-all duration-300 inline-block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6 uppercase tracking-wider">Contact Us</h3>
          <ul className="space-y-4 text-sm lg:text-base">
            <li>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                className="text-gray-700 dark:text-gray-400 hover:text-red-500 transition-colors block"
              >
                {CONTACT_INFO.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-gray-700 dark:text-gray-400 hover:text-red-500 transition-colors block"
              >
                {CONTACT_INFO.email}
              </a>
            </li>
            <li>
              <span className="block mt-2 text-gray-700 dark:text-gray-400 whitespace-pre-line">
                {CONTACT_INFO.address}
                <br />
                {CONTACT_INFO.city}, {CONTACT_INFO.country}
              </span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6 uppercase tracking-wider">
            Stay Connected
          </h3>
          <p className="text-sm mb-6 text-gray-700 dark:text-gray-400">
            Join our newsletter for origin trips, harvest updates, and market insights.
          </p>
          {subscribed ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-lg">
              <p className="text-green-700 dark:text-green-400 font-semibold text-sm">
                ✓ Thank you for subscribing!
              </p>
            </div>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 p-4 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-red-500 focus:bg-white dark:focus:bg-white/10 placeholder-gray-500 dark:placeholder-gray-600 transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full bg-red-600 dark:bg-white text-white dark:text-black font-bold py-3 px-6 rounded-lg uppercase tracking-wider hover:bg-red-700 dark:hover:bg-red-600 dark:hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 mt-20 pt-8 border-t border-gray-300 dark:border-white/10 flex flex-col md:flex-row justify-between items-center text-sm gap-6">
        <div className="text-gray-700 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Derara Business. All rights reserved.
        </div>

        <div className="flex gap-6">
          {CONTACT_INFO.socials.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.platform}
              className="text-xl text-gray-700 dark:text-gray-400 hover:text-red-500 hover:-translate-y-1 transition-all duration-300"
            >
              {socialIcons[social.platform] || <FaFacebookF />}
            </a>
          ))}
        </div>

        <div className="flex gap-8">
          <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-red-500 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-red-500 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
