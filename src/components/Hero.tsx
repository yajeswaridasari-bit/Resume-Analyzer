import React from 'react';
import { ArrowRight, CheckCircle2, Zap, Shield, Sparkles } from 'lucide-react';
import heroImage from '../assets/images/hero_resume_pipeline_1790759089309.jpg';

interface HeroProps {
  onStartAnalysis: () => void;
  onExploreWorkflow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis, onExploreWorkflow }) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100 pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-stone-400">
              <span className="text-rose-400 font-semibold tracking-wide uppercase">n8n Automation Webhook</span>
              <span aria-hidden="true">·</span>
              <span>Cloud Pipeline</span>
              <span aria-hidden="true">·</span>
              <span>Instant ATS Evaluation</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.08]">
              Automated Resume Analysis Built to Land Real Interviews.
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
              Directly connected to the automated n8n workflow. Submit your resume to trigger parsing,
              keyword benchmarking, and career-readiness scoring — designed specifically to help you stand out.
            </p>

            {/* Unboxed Metadata Stats */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-400 pt-1">
              <span className="flex items-center gap-1.5 text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                <span>PDF, DOCX &amp; TXT Supported</span>
              </span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="flex items-center gap-1.5 text-stone-300">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Sub-3-second Trigger Latency</span>
              </span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="flex items-center gap-1.5 text-stone-300">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>End-to-End Secure Processing</span>
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartAnalysis}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-md shadow-md transition-all active:scale-[0.98]"
              >
                <span>Upload &amp; Analyze Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreWorkflow}
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-md transition-colors"
              >
                <span>Inspect n8n Pipeline</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-stone-700/80 bg-stone-800/60 shadow-2xl aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3]">
              <img
                src={heroImage}
                alt="Resume analysis and modern workflow workspace"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-3 bg-stone-900/90 backdrop-blur border border-stone-700/70 rounded text-xs text-stone-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Live n8n Cloud Webhook</div>
                  <div className="font-mono text-[11px] text-stone-400 truncate max-w-[240px] sm:max-w-xs">
                    yajeswari.app.n8n.cloud/form/823ef810...
                  </div>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
