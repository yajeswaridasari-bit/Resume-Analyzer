import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const n8nUrl = 'https://yajeswari.app.n8n.cloud/form/823ef810-eb63-4cd7-8603-9dd5a568e892';

  return (
    <footer className="bg-stone-900 text-stone-400 text-xs border-t border-stone-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-800">
          <div className="md:col-span-6 space-y-3">
            <span className="font-display text-lg font-bold text-white tracking-tight">
              ResumeAnalyze
            </span>
            <p className="text-stone-400 text-xs leading-relaxed max-w-md">
              Automated resume evaluation platform synchronized with n8n Cloud webhook automation.
              Engineered to format, score, and optimize resumes for interview conversion.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct webhook transmission · Zero unsolicited data sharing</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <div className="font-semibold text-stone-200 text-xs">Resources</div>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <a href="#resume-form-section" className="hover:text-white transition-colors">
                  Upload &amp; Analyze
                </a>
              </li>
              <li>
                <a
                  href={n8nUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>n8n Cloud Form</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://n8n.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>n8n Automation Docs</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <div className="font-semibold text-stone-200 text-xs">Target Endpoint</div>
            <div className="font-mono text-[11px] text-stone-400 break-all p-2.5 bg-stone-950 border border-stone-800 rounded">
              {n8nUrl}
            </div>
            <div className="text-[11px] text-stone-500">
              Form Trigger ID: <span className="font-mono text-stone-400">823ef810-eb63-4cd7</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} ResumeAnalyze. Form integration powered by n8n.
          </div>
          <div className="flex items-center gap-4">
            <a href="#top" className="hover:text-stone-300 transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
