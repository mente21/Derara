import React from "react";

/**
 * ProfessionalLoader Component
 * Displays a clean, professional loading animation with the Derara logo
 * Inspired by Mente's Garage loading style
 * 
 * @param {string} size - Size of the loader (small, medium, large, xlarge, or custom)
 * @param {boolean} centered - Whether to center the loader in its container
 * @param {string} className - Additional CSS classes
 * @param {boolean} fullScreen - Whether to show as a full-screen overlay
 * @param {string} text - Optional loading text to display below the logo
 */
const ProfessionalLoader = ({ 
  size = "medium", 
  centered = true, 
  className = "",
  fullScreen = false,
  text = ""
}) => {
  // Size mapping - increased 2x for better visibility
  const sizeMap = {
    small: "w-32 h-32",
    medium: "w-56 h-56",
    large: "w-80 h-80",
    xlarge: "w-[28rem] h-[28rem]"
  };

  const sizeClass = sizeMap[size] || size;

  const loaderContent = (
    <div className={`${centered && !fullScreen ? "flex flex-col items-center justify-center" : ""} ${className}`}>
      {/* Logo with smooth fade and scale animation */}
      <div className="relative flex flex-col items-center justify-center animate-fade-scale">
        <img
          src="/Derara/logo.png"
          alt="Loading..."
          className={`${sizeClass} object-contain`}
        />
        
        {/* Loading text */}
        {text && (
          <p className="mt-4 text-white text-sm font-medium animate-pulse">
            {text}
          </p>
        )}
      </div>
      
      {/* Custom animations - Mente style */}
      <style jsx>{`
        @keyframes fadeScale {
          0%, 100% {
            opacity: 0.6;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-scale {
          animation: fadeScale 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );

  // Full screen overlay version - Mente style
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fade-in">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default ProfessionalLoader;
