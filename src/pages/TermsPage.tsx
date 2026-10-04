import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdBanner } from '../components/layout/AdBanner';

interface TermsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[{ label: 'Terms & Conditions' }]}
        onNavigate={onNavigate}
      />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: October 4, 2026
        </p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
        <p>
          By accessing and using <strong>ToolNest</strong>, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this site.
        </p>

        <h2 className="text-base font-bold text-slate-900">2. Description of Service & Free License</h2>
        <p>
          ToolNest grants users a free, revocable, non-exclusive license to use the calculators, converters, image processors, and text generators available on the platform for personal, academic, and lawful business operations.
        </p>

        <h2 className="text-base font-bold text-slate-900">3. User Conduct and Restrictions</h2>
        <p>When utilizing ToolNest utilities, you agree not to:</p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
          <li>Attempt to interfere with or disrupt website services or servers.</li>
          <li>Use automated scrapers, bots, or extraction scripts in a manner that degrades performance for other users.</li>
          <li>Use our utilities to produce or transmit illegal, abusive, or harmful materials.</li>
        </ul>

        <h2 className="text-base font-bold text-slate-900">4. Intellectual Property</h2>
        <p>
          All site designs, logos, software algorithms, styling, and editorial texts on ToolNest are the proprietary intellectual property of ToolNest. Output documents, compressed images, and generated passwords created through our tools belong entirely to you.
        </p>

        <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability</h2>
        <p>
          In no event shall ToolNest, its creators, or partners be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the tools or materials provided on this platform.
        </p>

        <h2 className="text-base font-bold text-slate-900">6. Modifications to Terms</h2>
        <p>
          We reserve the right to revise these Terms of Service at any time without prior notice. Continued use of ToolNest following any modifications indicates your acceptance of the updated terms.
        </p>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
};
