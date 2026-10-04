import React from 'react';
import { PageRoute } from '../../types';
import { TOOLS_DATA } from '../../data/toolsData';
import { ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculators = TOOLS_DATA.filter((t) => t.category === 'calculators').slice(0, 5);
  const textAndMedia = TOOLS_DATA.filter((t) => t.category === 'text' || t.category === 'media').slice(0, 5);
  const convertersAndUtils = TOOLS_DATA.filter((t) => t.category === 'converters' || t.category === 'utilities').slice(0, 5);

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 pr-0 lg:pr-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                TN
              </span>
              <span className="text-xl font-bold tracking-tight text-white">ToolNest</span>
            </div>
            <p className="text-indigo-300 font-medium text-sm mb-3">
              Simple Tools. Real Solutions. Free for Everyone.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 max-w-sm">
              ToolNest is your high-speed, privacy-first utility hub. Every calculation, conversion, and image optimization processes 100% locally in your browser. No signups, no watermarks, completely free.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero server logging · 100% Browser client-side</span>
            </div>
          </div>

          {/* Column 1: Calculators */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Calculators
            </h3>
            <ul className="space-y-2 text-xs">
              {calculators.map((tool) => (
                <li key={tool.id}>
                  <button
                    type="button"
                    onClick={() => handleNav(`tool-${tool.id}` as PageRoute)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {tool.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Text & Media */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Text & Media
            </h3>
            <ul className="space-y-2 text-xs">
              {textAndMedia.map((tool) => (
                <li key={tool.id}>
                  <button
                    type="button"
                    onClick={() => handleNav(`tool-${tool.id}` as PageRoute)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {tool.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Navigation & Trust
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('home')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('all-tools')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  All Tools
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('privacy')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('terms')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('disclaimer')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 ToolNest. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="hover:text-slate-400 transition-colors"
            >
              Home
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleNav('all-tools')}
              className="hover:text-slate-400 transition-colors"
            >
              All Tools
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleNav('about')}
              className="hover:text-slate-400 transition-colors"
            >
              About
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="hover:text-slate-400 transition-colors"
            >
              Contact
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleNav('privacy')}
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleNav('terms')}
              className="hover:text-slate-400 transition-colors"
            >
              Terms
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleNav('disclaimer')}
              className="hover:text-slate-400 transition-colors"
            >
              Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
