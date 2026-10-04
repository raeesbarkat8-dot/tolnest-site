import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdBanner } from '../components/layout/AdBanner';
import { ShieldCheck } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[{ label: 'Privacy Policy' }]}
        onNavigate={onNavigate}
      />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: October 4, 2026 · Compliant with GDPR, CCPA, and Google AdSense Publisher Policies
        </p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="block font-semibold mb-1">Our Privacy Guarantee:</strong>
            ToolNest is architected so that your documents, image files, passwords, financial entries, and dates of birth are processed 100% locally on your device using client-side JavaScript. None of this data is ever sent to or stored on our servers.
          </div>
        </div>

        <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
        <p>
          Unlike platforms requiring user registrations, ToolNest does not require you to provide personally identifiable information to use our online calculators and utilities.
        </p>
        <p>
          When you optionally submit a message through our Contact Us form, we receive your name, email address, and inquiry details solely to respond to your communication.
        </p>

        <h2 className="text-base font-bold text-slate-900">2. Cookies and Advertising Partners (Google AdSense)</h2>
        <p>
          We use third-party advertising partners, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website.
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
          <li>
            Google, as a third-party vendor, uses cookies to serve ads on ToolNest.
          </li>
          <li>
            Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
          </li>
          <li>
            Users may opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Google Ads Settings
            </a>
            .
          </li>
          <li>
            Alternatively, users can opt out of third-party vendors' use of cookies for personalized advertising by visiting{' '}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              aboutads.info
            </a>
            .
          </li>
        </ul>

        <h2 className="text-base font-bold text-slate-900">3. Log Files</h2>
        <p>
          ToolNest follows a standard procedure of utilizing basic server log files. These files log visitors when they visit web pages (standard for hosting services). The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, and referring/exit pages. These are not linked to any information that is personally identifiable and are used solely for website maintenance and security auditing.
        </p>

        <h2 className="text-base font-bold text-slate-900">4. GDPR Data Protection Rights</h2>
        <p>
          Under the General Data Protection Regulation (GDPR), every user is entitled to data rights including:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
          <li>The right to access – You have the right to request copies of your personal data.</li>
          <li>The right to rectification – You have the right to request correction of inaccurate data.</li>
          <li>The right to erasure – You have the right to request deletion of your personal data under certain conditions.</li>
        </ul>

        <h2 className="text-base font-bold text-slate-900">5. California Consumer Privacy Act (CCPA)</h2>
        <p>
          Under CCPA, California consumers have the right to request that a business disclose the categories and specific pieces of personal data collected, and request the deletion of personal data. ToolNest does not sell personal consumer data.
        </p>

        <h2 className="text-base font-bold text-slate-900">6. Contact for Privacy Inquiries</h2>
        <p>
          If you have questions about this Privacy Policy, please contact our team at{' '}
          <span className="font-semibold text-slate-800">privacy@toolnest.app</span> or submit a query on our Contact page.
        </p>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
};
