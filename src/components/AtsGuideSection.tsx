import React from 'react';
import { Target, CheckCircle2, AlertOctagon, Sparkles, TrendingUp } from 'lucide-react';

export const AtsGuideSection: React.FC = () => {
  return (
    <div className="bg-stone-50 py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <div className="text-xs font-semibold text-rose-600 tracking-wider uppercase mb-1">
            Career Readiness Playbook
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            How to Pass Modern ATS Scanners &amp; Land Calls
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Modern Applicant Tracking Systems parse text into hierarchical database fields before a recruiter ever reads it.
            Follow these field-tested principles to ensure maximum interview conversion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-rose-600">01. FORMATTING</span>
              <Target className="w-4 h-4 text-stone-400" />
            </div>
            <h3 className="font-display text-base font-bold text-stone-900">
              Single-Column Linear Flow
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Multi-column layouts, graphical skill bars, and Canva text boxes frequently scramble parser read-order.
              Use a clean single-column sequence with standard section headers like "Experience", "Education", and "Skills".
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs text-stone-500">
              <span className="text-emerald-600 font-bold">Tip:</span> Avoid placing crucial phone or email links inside headers/footers.
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-rose-600">02. METRICS</span>
              <TrendingUp className="w-4 h-4 text-stone-400" />
            </div>
            <h3 className="font-display text-base font-bold text-stone-900">
              Quantifiable Impact (The XYZ Formula)
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every bullet should answer: <em>"Accomplished [X], as measured by [Y], by doing [Z]"</em>.
              Quantifying latency decreases, revenue generated, team headcount, or cycle time jumps your ranking by 3.8x.
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs text-stone-500">
              <span className="text-emerald-600 font-bold">Tip:</span> Aim for at least one number, percentage, or currency figure per role.
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-rose-600">03. KEYWORDS</span>
              <Sparkles className="w-4 h-4 text-stone-400" />
            </div>
            <h3 className="font-display text-base font-bold text-stone-900">
              Exact Keyword Alignment
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              If a job posting lists "TypeScript", don't write just "JavaScript". If it specifies "CI/CD Pipeline Automation",
              match the exact terminology in your competencies section without awkward artificial stuffing.
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs text-stone-500">
              <span className="text-emerald-600 font-bold">Tip:</span> Re-tailor 3–5 core keyword bullet points for each high-priority application.
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-rose-600">04. FILE HYGIENE</span>
              <AlertOctagon className="w-4 h-4 text-stone-400" />
            </div>
            <h3 className="font-display text-base font-bold text-stone-900">
              Clean File Protocol
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Save directly from Google Docs or Word as text-encoded PDF or DOCX. Never submit flattened raster images or scans.
              Always use professional file naming: <code className="font-mono text-[11px] text-stone-800">Firstname_Lastname_Resume.pdf</code>.
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs text-stone-500">
              <span className="text-emerald-600 font-bold">Tip:</span> Keep total file size under 5 MB for rapid enterprise scanner parsing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
