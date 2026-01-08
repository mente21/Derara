import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Services", path: "/services" },
  { name: "Latest Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const { isDarkMode } = useTheme();

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 bg-gray-100 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-300 dark:border-white/10 shadow-inner">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-full group ${isActive
                ? "text-white bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navbar Overlay - Reconstructed */}
      <div
        className={`lg:hidden fixed inset-0 z-40 flex justify-end transition-opacity duration-300 ${mobileOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop (Click to close) */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`relative w-[80%] max-w-sm h-full bg-gray-900 border-l border-white/10 shadow-2xl flex flex-col pt-24 pb-10 px-8 transition-transform duration-500 ease-out transform ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-black/20">
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-widest">
              MENU
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              {/* Close Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links List */}
          <div className="flex-1 overflow-y-auto py-4 px-6 space-y-3">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  className={`group flex items-center justify-between text-lg font-bold uppercase tracking-wider border-b border-white/5 pb-3 transition-all duration-300 ${mobileOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                    } ${isActive
                      ? "text-red-500 border-red-500/50"
                      : "text-white/70 hover:text-white hover:border-white/30"
                    }`}
                >
                  <span>{link.name}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${isActive
                      ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                      : "bg-transparent group-hover:bg-red-500"
                      }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Footer Area */}
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 mt-auto">
            <p className="text-xs text-center text-gray-400 uppercase tracking-widest font-medium">
              Derara © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
