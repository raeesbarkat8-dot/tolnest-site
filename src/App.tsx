import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { TOOLS_DATA } from './data/toolsData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './pages/HomePage';
import { AllToolsPage } from './pages/AllToolsPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Sync hash in URL with page route
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (!hash) {
        setCurrentRoute('home');
      } else if (hash.startsWith('tool-') || hash.startsWith('tool/')) {
        const toolId = hash.replace('tool-', '').replace('tool/', '');
        const exists = TOOLS_DATA.some((t) => t.id === toolId);
        if (exists) {
          setCurrentRoute(`tool-${toolId}` as PageRoute);
        } else {
          setCurrentRoute('home');
        }
      } else if (
        ['all-tools', 'about', 'contact', 'privacy', 'terms', 'disclaimer'].includes(hash)
      ) {
        setCurrentRoute(hash as PageRoute);
      } else {
        setCurrentRoute('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    if (route === 'home') {
      window.location.hash = '';
    } else if (route.startsWith('tool-')) {
      const toolId = route.replace('tool-', '');
      window.location.hash = `#/tool/${toolId}`;
    } else {
      window.location.hash = `#/${route}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update document title, meta description, and canonical URL for non-tool pages
  useEffect(() => {
    if (!currentRoute.startsWith('tool-')) {
      const titles: Record<string, string> = {
        home: 'ToolNest — Free Online Tools for Everyday Problems',
        'all-tools': 'All Online Tools — Complete Free Utility Directory | ToolNest',
        about: 'About Us — Simple Tools. Real Solutions. Free for Everyone | ToolNest',
        contact: 'Contact Us — Feedback & Inquiries | ToolNest',
        privacy: 'Privacy Policy — Client-Side Guarantee & AdSense Compliance | ToolNest',
        terms: 'Terms & Conditions of Service | ToolNest',
        disclaimer: 'Website & Calculators Disclaimer | ToolNest'
      };

      const descriptions: Record<string, string> = {
        home: 'Fast, simple and easy-to-use tools — no complicated software required. Free calculators, image compressors, converters, and utilities.',
        'all-tools': 'Browse all 15 free online tools on ToolNest. Calculate age, loan EMI, BMI, count words, test typing speed, compress images, and convert units.',
        about: 'Learn about ToolNest, our mission to provide high-speed, privacy-first, 100% client-side online tools free for everyone.',
        contact: 'Get in touch with the ToolNest team. Submit suggestions, report bugs, or inquire about free online utilities.',
        privacy: 'ToolNest Privacy Policy. Discover how our 100% client-side browser processing protects your sensitive data and complies with AdSense standards.',
        terms: 'Terms and Conditions for using ToolNest free online calculators and web utilities.',
        disclaimer: 'Legal and technical disclaimer for ToolNest financial, medical, and general calculation utilities.'
      };

      const title = titles[currentRoute] || 'ToolNest — Free Online Tools';
      const desc = descriptions[currentRoute] || 'Fast, simple, and free online tools for everyday problems.';

      document.title = title;

      // Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', desc);

      // OpenGraph Tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', desc);

      // Canonical link
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      const canonicalHash = currentRoute === 'home' ? '' : `#/${currentRoute}`;
      canonical.setAttribute('href', window.location.href.split('#')[0] + canonicalHash);
    }
  }, [currentRoute]);

  // Render current view
  const renderCurrentView = () => {
    if (currentRoute === 'home') {
      return <HomePage onNavigate={navigateTo} />;
    }

    if (currentRoute === 'all-tools') {
      return <AllToolsPage onNavigate={navigateTo} />;
    }

    if (currentRoute === 'about') {
      return <AboutPage onNavigate={navigateTo} />;
    }

    if (currentRoute === 'contact') {
      return <ContactPage onNavigate={navigateTo} />;
    }

    if (currentRoute === 'privacy') {
      return <PrivacyPolicyPage onNavigate={navigateTo} />;
    }

    if (currentRoute === 'terms') {
      return <TermsPage onNavigate={navigateTo} />;
    }

    if (currentRoute === 'disclaimer') {
      return <DisclaimerPage onNavigate={navigateTo} />;
    }

    if (currentRoute.startsWith('tool-')) {
      const toolId = currentRoute.replace('tool-', '');
      const tool = TOOLS_DATA.find((t) => t.id === toolId);
      if (tool) {
        return <ToolDetailPage tool={tool} onNavigate={navigateTo} />;
      }
    }

    return <HomePage onNavigate={navigateTo} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Sticky Navigation Bar adhering to Top Bar Contract */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1 pb-8">
        {renderCurrentView()}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Quick Search Modal (Cmd+K) */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={navigateTo}
      />
    </div>
  );
}
