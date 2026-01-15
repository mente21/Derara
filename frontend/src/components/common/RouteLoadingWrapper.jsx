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
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    const isAuthSwitch = 
      (prevPath.includes('/login') && location.pathname.includes('/sign-up')) ||
      (prevPath.includes('/sign-up') && location.pathname.includes('/login'));

    if (!isAuthSwitch) {
      // Show loader only if NOT switching between auth pages
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
    
    setPrevPath(location.pathname);
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
