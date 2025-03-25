
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8 rounded-md bg-primary flex items-center justify-center shadow-sm">
        <span className="absolute inset-0 bg-white/20 rounded-md animate-pulse-subtle"></span>
        <svg 
          className="w-5 h-5 text-white" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="font-medium text-xl">TextLens</div>
    </div>
  );
};

export default Logo;
