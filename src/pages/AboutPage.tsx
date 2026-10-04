import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdBanner } from '../components/layout/AdBanner';
import { ShieldCheck, HeartHandshake, Zap, Cpu, Users } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[{ label: 'About Us' }]}
        onNavigate={onNavigate}
      />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About ToolNest
        </h1>
        <p className="text-base text-indigo-700 font-medium">
          “Simple Tools. Real Solutions. Free for Everyone.”
        </p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <h2 className="text-lg font-bold text-slate-900">Our Mission</h2>
        <p>
          At <strong>ToolNest</strong>, we believe everyday software utilities should be immediately accessible, exceptionally fast, and completely free. In a modern internet increasingly cluttered with mandatory accounts, slow server queues, subscription paywalls, and privacy-invasive tracking, ToolNest was created as an antidote.
        </p>
        <p>
          Whether you need to compute your precise chronological age, calculate mortgage payments, check typing speed, shrink an image for an application, or generate an unbreakable password, ToolNest provides genuine mathematical and computational utility right inside your browser.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
          The ToolNest Core Principles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Client-Side Computing</span>
            </div>
            <p className="text-xs text-slate-600">
              Your data belongs to you. Every single calculator, image processor, and converter runs strictly on your machine using standard Web APIs.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Zero Artificial Delays</span>
            </div>
            <p className="text-xs text-slate-600">
              We never hold your files hostage in fake processing queues to force you into premium tiers. Fast, lightweight code ensures immediate results.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <Cpu className="w-4 h-4 text-purple-600" />
              <span>Universal Accessibility</span>
            </div>
            <p className="text-xs text-slate-600">
              Designed from the ground up to render flawlessly on mobile phones, tablets, laptops, and assistive screen readers alike.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <HeartHandshake className="w-4 h-4 text-rose-600" />
              <span>Transparent & Free</span>
            </div>
            <p className="text-xs text-slate-600">
              Free for students, developers, businesses, and everyday people. Clean, non-intrusive ad placements allow us to sustain our infrastructure.
            </p>
          </div>
        </div>

        <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
          Continuous Development
        </h2>
        <p>
          We are committed to actively expanding our suite of utilities. Have an idea for a tool that would simplify your day? Feel free to reach out to us through our{' '}
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Contact page
          </button>
          .
        </p>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
};
