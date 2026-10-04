import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdBanner } from '../components/layout/AdBanner';
import { AlertTriangle, DollarSign, Activity, FileSpreadsheet } from 'lucide-react';

interface DisclaimerPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[{ label: 'Disclaimer' }]}
        onNavigate={onNavigate}
      />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Website & Calculator Disclaimer
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: October 4, 2026
        </p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="block font-semibold mb-1">Informational Purpose Only:</strong>
            All content, calculations, estimates, and utility tools on ToolNest are provided strictly for educational and informational purposes. They do not constitute certified professional financial, legal, or medical advice.
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-bold text-slate-900 mb-1">Financial & Loan Calculations Disclaimer</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculators such as the <strong>EMI / Loan Calculator</strong>, <strong>Percentage Calculator</strong>, and <strong>Currency Converter</strong> utilize standard mathematical and market benchmarks. Actual loan amortizations, interest schedules, bank charges, and currency exchange rates vary by institution, jurisdiction, credit profile, and taxes. Always confirm figures with your accredited financial institution or banking officer before signing financial agreements.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
            <Activity className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-bold text-slate-900 mb-1">Health & Fitness (BMI) Disclaimer</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                The <strong>BMI Calculator</strong> provides an index score based on general population guidelines established by the World Health Organization (WHO). It does not take into account individual muscle mass, bone density, age distribution, or specific clinical conditions. This tool is not intended to substitute for clinical medical evaluation, diagnosis, or personalized nutritional treatment from a licensed physician.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-bold text-slate-900 mb-1">File Processing & Conversions Disclaimer</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                While our <strong>Image Compressor</strong>, <strong>Image Resizer</strong>, <strong>PDF to Word</strong>, and <strong>Word to PDF</strong> tools use state-of-the-art client-side APIs, users should maintain independent backups of original files. ToolNest is not responsible for any file corruption, accidental data loss, or formatting variations resulting from local device processing.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">
          "As-Is" and "As-Available" Warranty
        </h2>
        <p>
          The tools and information on ToolNest are provided on an "as-is" and "as-available" basis without warranties of any kind, whether express or implied. ToolNest makes no representations or warranties concerning the accuracy, completeness, or continuous uninterrupted availability of the site.
        </p>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
};
