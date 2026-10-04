import React, { useState } from 'react';
import { PageRoute } from '../types';
import { TOOLS_DATA, CATEGORIES_CONFIG, HOMEPAGE_FAQS } from '../data/toolsData';
import { ToolCard } from '../components/common/ToolCard';
import { AdBanner } from '../components/layout/AdBanner';
import { Search, ShieldCheck, Zap, Lock, Sparkles, Layers, ArrowRight, ChevronDown, Clock, Star } from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const recentlyAddedTools = TOOLS_DATA.filter((t) => t.recentlyAdded);
  const popularTools = TOOLS_DATA.filter((t) => t.popular);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const homepageFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOMEPAGE_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="space-y-12">
      {/* Homepage FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />

      {/* Hero Section */}
      <section className="pt-8 pb-4 text-center max-w-4xl mx-auto px-4">
        {/* Brand Kicker */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-widest mb-3">
          <span>Free Online Utilities</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>100% Client-Side Privacy</span>
        </div>

        {/* Strong Headline */}
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight text-balance mb-4">
          Free Online Tools for Everyday Problems
        </h1>

        {/* Short Explanation */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance mb-8">
          Fast, simple and easy-to-use tools — no complicated software required. Calculate finances, convert units, compress media, and format documents instantly in your browser.
        </p>

        {/* Hero Search Bar */}
        <div className="max-w-xl mx-auto relative mb-6">
          <div className="relative flex items-center shadow-sm rounded-2xl bg-white border border-slate-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a tool (e.g. age, loan, compression, QR, password)..."
              className="w-full bg-transparent px-3 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 px-3 py-1 mr-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Search Quick Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-400">Popular:</span>
          {['Age Calculator', 'Word Counter', 'EMI Calculator', 'QR Generator', 'Password Generator'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSearchQuery(item.toLowerCase())}
              className="hover:text-indigo-600 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Top Advertisement Placement */}
      <div className="max-w-5xl mx-auto px-4">
        <AdBanner slot="header" />
      </div>

      {/* Main Tools Catalog / Popular Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {searchQuery ? `Search Results (${filteredTools.length})` : 'Popular Everyday Tools'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {searchQuery ? 'Showing matching tools for your query' : 'Our most frequently used utilities by students, professionals, and creators'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('all-tools')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group whitespace-nowrap"
          >
            <span>View All 15 Tools</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto mb-8 max-w-full">
          {CATEGORIES_CONFIG.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-200/80 rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-sm font-semibold text-slate-800">No tools match your search</p>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Try searching for different keywords or explore our complete catalog.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>

      {/* Recently Added Tools Section */}
      {!searchQuery && recentlyAddedTools.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Recently Added Tools
                </h2>
                <p className="text-xs text-slate-500">
                  Freshly built utilities added to our free online platform
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('all-tools')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group whitespace-nowrap"
            >
              <span>Explore Directory</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyAddedTools.slice(0, 3).map((tool) => (
              <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )}

      {/* Mid-Content Ad Unit */}
      <div className="max-w-5xl mx-auto px-4">
        <AdBanner slot="in-content" />
      </div>

      {/* Why ToolNest / Value Proposition Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Why Millions Choose ToolNest
          </h2>
          <p className="text-sm text-slate-600">
            Engineered from first principles for instant execution, total privacy, and maximum clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              100% Client-Side Privacy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your calculations, images, and text documents are processed locally on your device hardware. No personal files are ever uploaded or saved on external servers.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Zero Latency & No Signups
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Skip login forms and paywalls. Every tool works instantly upon loading. Enjoy fast, lightweight, and clutter-free utility execution.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Mathematical Accuracy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Each algorithm is audited against standard financial, medical, and scientific formulas. Clear step-by-step breakdowns give you total confidence in your results.
            </p>
          </div>
        </div>
      </section>

      {/* Homepage FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Everything you need to know about using ToolNest free online utilities.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {HOMEPAGE_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 hover:text-indigo-600 transition-colors gap-3"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Leaderboard Ad */}
      <div className="max-w-5xl mx-auto px-4">
        <AdBanner slot="footer" />
      </div>
    </div>
  );
};
