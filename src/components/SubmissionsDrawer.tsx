import React from 'react';
import { X, FileText, Trash2, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import { SubmissionRecord } from '../types';

interface SubmissionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: SubmissionRecord[];
  onClearHistory: () => void;
}

export const SubmissionsDrawer: React.FC<SubmissionsDrawerProps> = ({
  isOpen,
  onClose,
  submissions,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-stone-900">Submission History</h3>
            <p className="text-xs text-stone-500">
              {submissions.length} {submissions.length === 1 ? 'record' : 'records'} logged locally
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
            title="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Submissions List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {submissions.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-stone-400 space-y-2">
              <FileText className="w-10 h-10 stroke-1" />
              <div className="text-xs font-medium text-stone-600">No submissions recorded yet</div>
              <p className="text-xs text-stone-400 max-w-xs">
                Submit a resume via the Analysis Portal or live n8n form to see your submission logs here.
              </p>
            </div>
          ) : (
            submissions.map((rec) => (
              <div
                key={rec.id}
                className="p-4 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700 space-y-2.5 hover:border-stone-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold text-stone-900 text-[11px]">{rec.id}</span>
                  <div className="flex items-center gap-1 text-emerald-600 font-medium text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Submitted</span>
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-stone-900 text-sm">{rec.name}</div>
                  <div className="text-stone-500 text-xs">{rec.email}</div>
                  <div className="text-stone-600 text-xs font-medium mt-0.5">{rec.targetRole}</div>
                </div>

                <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between text-[11px] text-stone-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(rec.timestamp).toLocaleDateString()} {new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  {rec.files && rec.files[0] && (
                    <span className="truncate max-w-[140px] text-stone-600">
                      {rec.files[0].name}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          {submissions.length > 0 ? (
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 transition-colors font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          ) : (
            <span className="text-xs text-stone-400">Ready for submissions</span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
