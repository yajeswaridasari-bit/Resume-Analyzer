import React from 'react';
import { FileText, History, ExternalLink, Activity } from 'lucide-react';

interface NavbarProps {
  activeTab: 'portal' | 'embedded' | 'workflow' | 'guide';
  onSelectTab: (tab: 'portal' | 'embedded' | 'workflow' | 'guide') => void;
  onOpenHistory: () => void;
  submissionCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenHistory,
  submissionCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-stone-900/95 backdrop-blur border-b border-stone-800 text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-xl font-bold tracking-tight text-white hover:text-rose-400 transition-colors shrink-0"
        >
          ResumeAnalyze
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <button
            onClick={() => onSelectTab('portal')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'portal'
                ? 'text-white border-b-2 border-rose-500 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Analysis Portal
          </button>
          <button
            onClick={() => onSelectTab('embedded')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'embedded'
                ? 'text-white border-b-2 border-rose-500 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Live n8n Form
          </button>
          <button
            onClick={() => onSelectTab('workflow')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'workflow'
                ? 'text-white border-b-2 border-rose-500 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Workflow Architecture
          </button>
          <button
            onClick={() => onSelectTab('guide')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'guide'
                ? 'text-white border-b-2 border-rose-500 font-semibold'
                : 'hover:text-white'
            }`}
          >
            ATS Guidelines
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-800 rounded-md border border-stone-700 transition-colors whitespace-nowrap"
            title="View submission history"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Submissions</span>
            {submissionCount > 0 && (
              <span className="font-mono text-[11px] bg-stone-700 text-stone-200 px-1.5 py-0.2 rounded">
                {submissionCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              onSelectTab('portal');
              const el = document.getElementById('resume-form-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-md shadow-sm transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Upload Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};
