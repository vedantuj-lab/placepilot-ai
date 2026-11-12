import React from 'react';
import { ExternalLink, ShieldCheck, AlertTriangle, X, CheckCircle2, Lock } from 'lucide-react';
import { Scheme } from '../types';

interface OfficialRedirectModalProps {
  scheme: Scheme | null;
  targetUrl: string;
  actionLabel?: string;
  onClose: () => void;
}

export const OfficialRedirectModal: React.FC<OfficialRedirectModalProps> = ({
  scheme,
  targetUrl,
  actionLabel = 'Apply on Official Portal',
  onClose
}) => {
  if (!scheme && !targetUrl) return null;

  const urlObj = (() => {
    try {
      return new URL(targetUrl);
    } catch {
      return null;
    }
  })();

  const isGovDomain = urlObj?.hostname.endsWith('.gov.in') || urlObj?.hostname.endsWith('.nic.in');
  const isHttps = urlObj?.protocol === 'https:';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in text-[#17231F]">
      <div className="bg-[#FFFFFF] border border-[#E5E9E5] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#68736D] hover:text-[#17231F] hover:bg-[#F8F7F2] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#123D32] flex items-center justify-center text-white">
            <ShieldCheck className="w-5 h-5 text-[#F4A261]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#17231F]">Official Government Portal Handoff</h3>
            <p className="text-xs text-[#68736D]">PlacePilot AI • Safe External Redirection</p>
          </div>
        </div>

        {/* Target Details */}
        <div className="bg-[#F8F7F2] border border-[#E5E9E5] rounded-xl p-4 mb-4 space-y-2 text-xs">
          <div>
            <span className="text-[10px] text-[#68736D] font-bold uppercase block">Selected Scheme</span>
            <p className="font-bold text-[#17231F] text-sm">{scheme?.title || 'Government Welfare Portal'}</p>
          </div>

          <div className="pt-2 border-t border-[#E5E9E5]">
            <span className="text-[10px] text-[#68736D] font-bold uppercase block">Verified Government Destination</span>
            <p className="font-mono text-[#008F68] font-bold break-all mt-0.5">{targetUrl}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {isGovDomain && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                <CheckCircle2 className="w-3 h-3 text-[#008F68]" />
                <span>Verified .gov.in Domain</span>
              </span>
            )}
            {isHttps && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-bold text-[10px]">
                <Lock className="w-3 h-3 text-slate-700" />
                <span>Encrypted SSL (HTTPS)</span>
              </span>
            )}
          </div>
        </div>

        <p className="text-xs text-[#68736D] leading-relaxed mb-6">
          You are leaving PlacePilot AI to access the verified official government portal. PlacePilot AI assists you in preparing document checklists and prefilling your draft. Consequential submission is completed on the government portal. Never share OTPs or passwords.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 text-xs font-bold">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#F8F7F2] text-[#17231F] border border-[#E5E9E5]"
          >
            Cancel
          </button>
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#008F68] hover:bg-[#007353] text-white flex items-center space-x-2 shadow-sm transition"
          >
            <span>{actionLabel}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
