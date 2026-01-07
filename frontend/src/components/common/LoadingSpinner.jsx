import React from "react";

/**
 * LoadingSpinner Component
 * Displays a rotating favicon as a loading indicator
 * 
 * @param {string} size - Size of the spinner (small, medium, large, or custom px value)
 * @param {boolean} centered - Whether to center the spinner in its container
 * @param {string} className - Additional CSS classes
 */
const LoadingSpinner = ({ 
  size = "medium", 
  centered = true, 
  className = "" 
}) => {
  // Size mapping
  const sizeMap = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
    xlarge: "w-24 h-24"
  };

  const sizeClass = sizeMap[size] || size;

  return (
    <div 
      className={`${centered ? "flex items-center justify-center" : ""} ${className}`}
    >
      <img
        src="/Derara/image.png"
        alt="Loading..."
        className={`${sizeClass} animate-spin`}
        style={{
          animation: "spin 1s linear infinite"
        }}
      />
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
