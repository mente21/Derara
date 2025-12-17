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
              className={`relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-full ${
                isActive
                  ? "text-white bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                  : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navbar Overlay - Reconstructed */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute right-0 top-0 h-screen w-[280px] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: isDarkMode ? '#111827' : '#ffffff' }}
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
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 border-l-4 ${
                    isActive
                      ? "bg-red-50 text-red-600 border-red-600 shadow-sm"
                      : "bg-gray-50 text-gray-700 border-transparent hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  style={{
                    backgroundColor: isActive 
                      ? (isDarkMode ? 'rgba(220, 38, 38, 0.1)' : '#fef2f2')
                      : (isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb'),
                    color: isActive 
                      ? '#dc2626' 
                      : (isDarkMode ? '#e5e7eb' : '#374151'),
                    borderColor: isActive ? '#dc2626' : 'transparent'
                  }}
                >
                  {link.name}
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
