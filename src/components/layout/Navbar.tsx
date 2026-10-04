import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { Search, Menu, X, Sparkles, Layers } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', route: 'home' as PageRoute },
    { label: 'All Tools', route: 'all-tools' as PageRoute },
    { label: 'About', route: 'about' as PageRoute },
    { label: 'Contact', route: 'contact' as PageRoute },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element Brand mark */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
            >
              <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-indigo-700 transition-colors">
                TN
              </span>
              <span className="text-slate-900 group-hover:text-indigo-600 transition-colors">ToolNest</span>
            </button>
          </div>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  type="button"
                  onClick={() => handleNav(link.route)}
                  className={`transition-colors py-1 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded ${
                    isActive ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200/80 px-3 py-2 rounded-lg transition-colors border border-slate-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Search tools"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search tools...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-200 text-slate-400">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => handleNav('all-tools')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Explore 15 Tools</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2 shadow-lg animate-in fade-in duration-150">
          {navLinks.map((link) => (
            <button
              key={link.route}
              type="button"
              onClick={() => handleNav(link.route)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === link.route
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => handleNav('all-tools')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Layers className="w-4 h-4" />
              <span>Browse All Tools</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
