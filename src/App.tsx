/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeForm } from './components/ResumeForm';
import { EmbeddedN8nForm } from './components/EmbeddedN8nForm';
import { WorkflowSection } from './components/WorkflowSection';
import { AtsGuideSection } from './components/AtsGuideSection';
import { SubmissionsDrawer } from './components/SubmissionsDrawer';
import { Footer } from './components/Footer';
import { SubmissionRecord } from './types';
import { Check, Sparkles, AlertCircle, FileText, Layers, Workflow, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'portal' | 'embedded' | 'workflow' | 'guide'>('portal');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('resume_analyze_submissions');
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load submissions from localStorage:', e);
    }
  }, []);

  // Save submissions to localStorage
  const saveSubmissions = (newRecords: SubmissionRecord[]) => {
    setSubmissions(newRecords);
    try {
      localStorage.setItem('resume_analyze_submissions', JSON.stringify(newRecords));
    } catch (e) {
      console.error('Failed to persist submissions to localStorage:', e);
    }
  };

  const handleSubmissionSuccess = (record: SubmissionRecord) => {
    const updated = [record, ...submissions];
    saveSubmissions(updated);
    showToast(`Resume for ${record.name} submitted successfully to n8n!`);
  };

  const handleClearHistory = () => {
    saveSubmissions([]);
    showToast('Submission history cleared');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const scrollToPortal = () => {
    setActiveTab('portal');
    setTimeout(() => {
      const el = document.getElementById('resume-form-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const scrollToWorkflow = () => {
    setActiveTab('workflow');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-rose-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-stone-900 text-white text-xs font-medium rounded-lg shadow-xl border border-stone-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenHistory={() => setIsHistoryOpen(true)}
        submissionCount={submissions.length}
      />

      <main className="flex-1">
        {/* Editorial Hero */}
        <Hero
          onStartAnalysis={scrollToPortal}
          onExploreWorkflow={scrollToWorkflow}
        />

        {/* Navigation Segmented Control Anchor */}
        <div className="border-b border-stone-200 bg-white sticky top-16 z-30 shadow-2xs">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
              <button
                onClick={() => setActiveTab('portal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'portal'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-rose-600" />
                <span>Analysis Portal</span>
              </button>

              <button
                onClick={() => setActiveTab('embedded')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'embedded'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>Live n8n Form</span>
              </button>

              <button
                onClick={() => setActiveTab('workflow')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'workflow'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Workflow className="w-3.5 h-3.5 text-indigo-600" />
                <span>Pipeline Architecture</span>
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'guide'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>ATS Guidelines</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-stone-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Target Webhook Active</span>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'portal' && (
          <>
            <ResumeForm
              onSubmissionSuccess={handleSubmissionSuccess}
              onNavigateToWorkflow={() => setActiveTab('workflow')}
            />
            <WorkflowSection />
            <AtsGuideSection />
          </>
        )}

        {activeTab === 'embedded' && (
          <EmbeddedN8nForm />
        )}

        {activeTab === 'workflow' && (
          <>
            <WorkflowSection />
            <AtsGuideSection />
          </>
        )}

        {activeTab === 'guide' && (
          <>
            <AtsGuideSection />
            <WorkflowSection />
          </>
        )}
      </main>

      {/* History Drawer */}
      <SubmissionsDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        submissions={submissions}
        onClearHistory={handleClearHistory}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
