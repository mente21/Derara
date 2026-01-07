import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfessionalLoader from "./ProfessionalLoader";

/**
 * RouteLoadingWrapper Component
 * Shows a loading animation during route transitions
 */
const RouteLoadingWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loader when route changes
    setIsLoading(true);

    // Hide loader after a short delay to show the animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading && (
        <ProfessionalLoader 
          fullScreen={true} 
          size="large"
        />
      )}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        {children}
      </div>
    </>
  );
};

export default RouteLoadingWrapper;
