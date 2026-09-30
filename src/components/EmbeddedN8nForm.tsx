import React, { useState } from 'react';
import { ExternalLink, RotateCw, AlertTriangle, Check, Copy } from 'lucide-react';

export const EmbeddedN8nForm: React.FC = () => {
  const n8nUrl = 'https://yajeswari.app.n8n.cloud/form/823ef810-eb63-4cd7-8603-9dd5a568e892';
  const [key, setKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(n8nUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="bg-stone-50 py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-rose-600 tracking-wider uppercase mb-1">
              Direct Cloud Webhook Frame
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Live n8n Form Renderer
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Live view of the official n8n cloud form. Submitting here triggers the exact same backend automation workflow.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded hover:bg-stone-50 transition-colors"
              title="Reload form iframe"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Reload Frame</span>
            </button>

            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded hover:bg-stone-50 transition-colors"
              title="Copy original n8n Form URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy URL'}</span>
            </button>

            <a
              href={n8nUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Embedded Iframe Container */}
        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-xs">
          <div className="bg-stone-100/80 px-4 py-2.5 border-b border-stone-200 flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-mono truncate">{n8nUrl}</span>
            </div>
            <span className="text-[11px] text-stone-400 font-medium">SSL Encrypted</span>
          </div>

          <div className="relative min-h-[640px] w-full bg-white flex flex-col items-center">
            <iframe
              key={key}
              src={n8nUrl}
              title="n8n Resume Form"
              className="w-full h-[680px] border-0"
              allow="clipboard-write"
              loading="lazy"
            />
          </div>

          <div className="bg-stone-50 px-4 py-3 border-t border-stone-200 text-xs text-stone-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              If this iframe does not render due to third-party browser cookie shields, use the <strong>Analysis Portal</strong> tab or click <strong>Open in New Tab</strong> above.
            </span>
            <span className="text-stone-400 font-mono text-[11px]">Workflow node: form-trigger</span>
          </div>
        </div>
      </div>
    </div>
  );
};
