import React, { useState } from 'react';
import { PageRoute } from '../types';
import { TOOLS_DATA, CATEGORIES_CONFIG } from '../data/toolsData';
import { ToolCard } from '../components/common/ToolCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdBanner } from '../components/layout/AdBanner';
import { Search } from 'lucide-react';

interface AllToolsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AllToolsPage: React.FC<AllToolsPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = TOOLS_DATA.filter((tool) => {
    const matchesQuery =
      tool.title.toLowerCase().includes(search.toLowerCase()) ||
      tool.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      tool.categoryName.toLowerCase().includes(search.toLowerCase());

    const matchesCat = selectedCat === 'all' || tool.category === selectedCat;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'All Tools' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          All Free Online Tools
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Explore our complete directory of free utilities designed to solve everyday calculations, file conversions, text formatting, and image tasks without installation.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter tools by keyword..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {CATEGORIES_CONFIG.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCat === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Top Banner Ad */}
      <AdBanner slot="header" />

      {/* Tools Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>Showing {filtered.length} of {TOOLS_DATA.length} tools</span>
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="text-indigo-600 hover:text-indigo-800"
            >
              Clear filter
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl">
            <p className="text-sm font-semibold text-slate-800">No matching tools found</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting a different category.</p>
          </div>
        )}
      </div>

      {/* Footer Banner Ad */}
      <AdBanner slot="footer" />
    </div>
  );
};
