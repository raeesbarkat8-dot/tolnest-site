import React, { useState, useRef } from 'react';
import { Download, Printer, RotateCcw, FileText, Check, Sparkles, BookOpen } from 'lucide-react';

const TEMPLATES = {
  resume: {
    name: 'Modern Resume / CV',
    title: 'Alex Mercer — Senior Software Engineer',
    content: `alex.mercer@example.com · +1 (555) 019-2834 · San Francisco, CA\n\nPROFESSIONAL SUMMARY\nResults-driven Senior Full-Stack Engineer with 8+ years designing scalable cloud platforms, modern web applications, and developer tooling.\n\nCORE COMPETENCIES\n- Frontend: React, TypeScript, Tailwind CSS, Next.js\n- Backend: Node.js, Python, PostgreSQL, REST & GraphQL APIs\n- Cloud & DevOps: Docker, Kubernetes, GCP, AWS, CI/CD Pipelines\n\nWORK EXPERIENCE\nPrincipal Frontend Engineer | Apex Global Systems (2022 – Present)\n- Spearheaded architectural migration of core customer portal, improving Lighthouse performance score from 58 to 98.\n- Mentored team of 10 junior and mid-level engineers in clean code and accessibility practices.\n\nSoftware Engineer | CloudScale Inc. (2018 – 2022)\n- Engineered distributed microservices handling over 50M requests daily with 99.99% uptime.\n\nEDUCATION\nB.S. in Computer Science — University of California, Berkeley (Graduated Magna Cum Laude)`
  },
  invoice: {
    name: 'Commercial Invoice',
    title: 'INVOICE #INV-2026-084',
    content: `INVOICE TO:\nAcme Corporation\n100 Market Street, Suite 400\nSan Francisco, CA 94105\n\nDATE: October 4, 2026\nDUE DATE: November 4, 2026\n\nSERVICES RENDERED:\n1. Full-Stack Web Application Architecture — $4,500.00\n2. Performance Optimization & Auditing — $1,800.00\n3. WCAG AA Accessibility Remediation — $1,200.00\n\nTOTAL AMOUNT DUE: $7,500.00 USD\n\nPAYMENT INSTRUCTIONS:\nBank: First Pacific Bank\nAccount: 4892-0192-3841\nRouting: 121000358\n\nThank you for your business!`
  },
  letter: {
    name: 'Formal Business Letter',
    title: 'Formal Letter of Engagement',
    content: `October 4, 2026\n\nTo Whom It May Concern,\n\nWe are pleased to formally confirm the commencement of our technology collaboration with ToolNest platforms. This engagement reflects our shared commitment to client-side data privacy, exceptional user experience, and accessible web standards.\n\nOur team has reviewed the project specifications and milestone timeline. All engineering deliverables will be submitted in accordance with the agreed technical milestones.\n\nPlease do not hesitate to contact our office should you require any supplementary records or technical certifications.\n\nSincerely,\n\nExecutive Director\nToolNest Development Group`
  }
};

export const WordToPdf: React.FC = () => {
  const [docTitle, setDocTitle] = useState<string>(TEMPLATES.resume.title);
  const [docContent, setDocContent] = useState<string>(TEMPLATES.resume.content);
  const [fontSize, setFontSize] = useState<number>(14);

  const loadTemplate = (key: keyof typeof TEMPLATES) => {
    setDocTitle(TEMPLATES[key].title);
    setDocContent(TEMPLATES[key].content);
  };

  const handlePrintToPdf = () => {
    // Open print window styled for clean vector PDF export
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to export your PDF.');
      return;
    }

    const formattedParagraphs = docContent
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return '<br />';
        if (trimmed.startsWith('- ')) {
          return `<li style="margin-left: 20px;">${trimmed.substring(2)}</li>`;
        }
        if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.includes(':') && !trimmed.includes('.')) {
          return `<h2 style="font-size: 15pt; color: #1e3a8a; margin-top: 18px; margin-bottom: 6px; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px;">${trimmed}</h2>`;
        }
        return `<p style="margin-bottom: 8px;">${trimmed}</p>`;
      })
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${docTitle}</title>
          <style>
            @page {
              size: A4;
              margin: 20mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              font-size: ${fontSize}px;
              line-height: 1.6;
              color: #1e293b;
              margin: 0;
              padding: 0;
            }
            h1 {
              font-size: 20pt;
              color: #0f172a;
              margin-bottom: 12px;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          <h1>${docTitle}</h1>
          <div>${formattedParagraphs}</div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Templates Bar */}
      <div className="flex items-center flex-wrap gap-2 mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1">
          Templates:
        </span>
        <button
          type="button"
          onClick={() => loadTemplate('resume')}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          Resume / CV
        </button>
        <button
          type="button"
          onClick={() => loadTemplate('invoice')}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          Commercial Invoice
        </button>
        <button
          type="button"
          onClick={() => loadTemplate('letter')}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          Business Letter
        </button>
      </div>

      {/* Editor Controls */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <label htmlFor="docTitleInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Document Title (Appears at top of PDF)
            </label>
            <input
              id="docTitleInput"
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="e.g. My Document"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
            />
          </div>

          <div className="flex sm:justify-end items-center gap-3">
            <span className="text-xs text-slate-600">Font Size:</span>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option value={12}>12px (Compact)</option>
              <option value={14}>14px (Standard)</option>
              <option value={16}>16px (Large)</option>
              <option value={18}>18px (Headline focus)</option>
            </select>
          </div>
        </div>

        {/* Content Box */}
        <div>
          <label htmlFor="docContentInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Document Body Content
          </label>
          <textarea
            id="docContentInput"
            rows={14}
            value={docContent}
            onChange={(e) => setDocContent(e.target.value)}
            placeholder="Type or paste your document text here..."
            className="w-full bg-slate-50/70 border border-slate-300 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-sans leading-relaxed"
          />
        </div>

        {/* Export & Reset Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handlePrintToPdf}
            disabled={!docContent.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
          >
            <Printer className="w-4 h-4" />
            <span>Generate & Save PDF (Print Dialog)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setDocTitle('New Document');
              setDocContent('');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Document</span>
          </button>
        </div>
      </div>
    </div>
  );
};
