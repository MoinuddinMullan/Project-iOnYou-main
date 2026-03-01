import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 transition-all duration-500 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <div className="shrink-0 flex items-center space-x-2 group cursor-pointer">
            <span className="material-symbols-outlined text-orange text-4xl group-hover:rotate-12 transition-transform">
              school
            </span>
            <span className="text-2xl font-bold tracking-tight text-main group-hover:text-orange transition-colors">
              iOnYou
            </span>
          </div>
          
          {/* DESKTOP NAV */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Dashboard', 'Tech Stack', 'Mapping', 'Team'].map((link) => (
                <a 
                  key={link} 
                  className="text-muted hover:text-orange px-3 py-2 rounded-md text-sm font-bold transition-all hover:scale-105" 
                  href="#"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <button className="px-6 py-2 rounded-full bg-orange text-white font-bold shadow-lg hover:shadow-orange/50 hover:scale-105 transition-all">
              Login
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-main"
            >
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-glass-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {['Dashboard', 'Tech Stack', 'Mapping', 'Team'].map((link) => (
                <a key={link} href="#" className="text-main block px-3 py-2 rounded-md text-base font-medium hover:text-orange">
                  {link}
                </a>
             ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;