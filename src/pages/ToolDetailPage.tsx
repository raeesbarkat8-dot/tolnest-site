import React, { useState, useEffect } from 'react';
import { ToolInfo, PageRoute } from '../types';
import { TOOLS_DATA } from '../data/toolsData';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdBanner } from '../components/layout/AdBanner';
import { ToolRenderer } from '../components/tools/ToolRenderer';
import { ToolCard } from '../components/common/ToolCard';
import { ToolIcon } from '../components/common/ToolIcon';
import { ChevronDown, CheckCircle2, ShieldCheck, Share2, Check, Lightbulb, BookOpen, HelpCircle, Layers } from 'lucide-react';

interface ToolDetailPageProps {
  tool: ToolInfo;
  onNavigate: (route: PageRoute) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({ tool, onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Sync page title, meta description, OpenGraph, and Canonical URL
  useEffect(() => {
    document.title = `${tool.seoTitle} | ToolNest`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', tool.metaDescription);

    // OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${tool.title} — ToolNest Free Tools`);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', tool.metaDescription);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href.split('#')[0] + `#/tool/${tool.id}`);

    return () => {
      document.title = 'ToolNest — Free Online Tools';
    };
  }, [tool]);

  const relatedTools = TOOLS_DATA.filter((t) =>
    tool.relatedToolIds.includes(t.id)
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  // Structured Data (JSON-LD) for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    operatingSystem: 'All',
    applicationCategory: 'UtilitiesApplication',
    description: tool.metaDescription,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: window.location.origin
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'All Tools',
        item: `${window.location.origin}/#/all-tools`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.title,
        item: `${window.location.origin}/#/tool/${tool.id}`
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* Dynamic SEO JSON-LD scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs with Semantic Schema markup */}
      <Breadcrumbs
        items={[
          { label: 'All Tools', route: 'all-tools' },
          { label: tool.title }
        ]}
        onNavigate={onNavigate}
      />

      {/* Tool Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <ToolIcon name={tool.iconName} className="w-6 h-6 text-indigo-600" />
          </div>

          <div>
            {/* Clean unboxed category label with dot */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <span>{tool.categoryName}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-emerald-600 font-medium">Free Client Utility</span>
            </div>
            {/* Clear H1 Heading */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {tool.title}
            </h1>
            {/* Short Original Introduction */}
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {tool.shortDescription}
            </p>
          </div>
        </div>

        {/* Share Button */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
          >
            {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedShare ? 'Link Copied!' : 'Share Tool'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Tool Container */}
      <section aria-label={`${tool.title} Application`} className="max-w-4xl mx-auto">
        <ToolRenderer toolId={tool.id} />
      </section>

      {/* In-Content Non-Intrusive Advertisement Unit */}
      <div className="max-w-4xl mx-auto">
        <AdBanner slot="in-content" />
      </div>

      {/* Educational & SEO Editorial Content */}
      <section className="max-w-4xl mx-auto space-y-8 pt-2">
        {/* About & Overview */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>About the ToolNest {tool.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            {tool.longDescription}
          </p>

          {/* Key Features List */}
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-3">
            Key Features & Capabilities
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
            {tool.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Step-by-Step Guide with H2 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>How to Use the {tool.title}</span>
          </h2>
          <ol className="space-y-4">
            {tool.howToSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-0.5">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Useful Real-World Examples Section with H2 */}
        {tool.examples && tool.examples.length > 0 && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>Useful Examples & Scenarios</span>
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Practical situations demonstrating how to get the most value from this tool.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tool.examples.map((ex, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">
                    {ex.scenario}
                  </span>
                  <div className="text-[11px] text-slate-600 font-mono bg-white p-2 rounded-lg border border-slate-200/60">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans font-semibold">Input</span>
                    {ex.input}
                  </div>
                  <div className="text-[11px] text-indigo-900 font-mono bg-indigo-50/70 p-2 rounded-lg border border-indigo-100">
                    <span className="text-indigo-400 block text-[10px] uppercase font-sans font-semibold">Result</span>
                    {ex.output}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                    {ex.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Accordion Section with FAQPage Schema & H2 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Common questions regarding accuracy, formulas, and privacy for this utility.
          </p>

          <div className="divide-y divide-slate-100">
            {tool.faqs.map((faq, idx) => {
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

      {/* Internal Links / Related Tools with H2 */}
      {relatedTools.length > 0 && (
        <section className="max-w-7xl mx-auto pt-6 border-t border-slate-200/80">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
            Related Tools You May Find Useful
          </h2>
          <p className="text-xs text-slate-500 mb-5">
            Discover complementary utilities that solve related calculations and productivity tasks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )}

      {/* Footer Leaderboard Ad */}
      <div className="max-w-5xl mx-auto">
        <AdBanner slot="footer" />
      </div>
    </div>
  );
};
