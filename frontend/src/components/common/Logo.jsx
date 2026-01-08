import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import leafLogo from '../../assets/leaf-logo.png';

const Logo = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex items-center gap-0">
      {/* Custom SVG Logo Icon - Derara Leaf Style 
          This SVG mimics the 3-leaf plant with the 'D' curve branding.
          Stroke style matches the neon/outline aesthetic.
      */}
      <img 
        src={leafLogo} 
        alt="Derara Leaf Logo" 
        className="w-[78px] h-[78px] object-contain shrink-0"
      />
      
      <div className="flex flex-col items-start justify-center leading-none">
        {/* DERARA - Red */}
        <span className="text-2xl font-extrabold tracking-wider text-red-600 uppercase font-outfit">
          DERARA
        </span>
        
        {/* BUSINESS - White in Dark, Black in Light */}
        <span 
          className={`text-[0.5rem] font-bold tracking-[0.35em] uppercase w-full text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          BUSINESS
        </span>
      </div>
    </div>
  );
};

export default Logo;
