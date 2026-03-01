import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true); // Default to Dark if you prefer "Classy" look

  useEffect(() => {
    // Apply the class to the html tag
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full glass-card hover:bg-orange/20 transition-all group"
      title="Toggle Theme"
    >
      <span className="material-symbols-outlined text-orange group-hover:rotate-180 transition-transform duration-500">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;