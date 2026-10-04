import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageRoute } from '../../types';

interface BreadcrumbItem {
  label: string;
  route?: PageRoute;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (route: PageRoute) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-1 text-xs text-slate-500 flex items-center flex-wrap gap-1.5 mb-2">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="hover:text-indigo-600 transition-colors inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            {isLast || !item.route ? (
              <span className="font-medium text-slate-800 truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => item.route && onNavigate(item.route)}
                className="hover:text-indigo-600 transition-colors truncate max-w-[150px] sm:max-w-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
