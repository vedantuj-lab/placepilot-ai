import React from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  ArrowRight,
  ShieldCheck, 
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { Scheme, Language } from '../types';

interface SchemeDetailsModalProps {
  scheme: Scheme | null;
  language: Language;
  onClose: () => void;
  onCheckEligibility: (schemeId: string) => void;
  onViewDocuments: (schemeId: string) => void;
  onStartApplication: (schemeId: string) => void;
  onOpenOfficialUrl: (scheme: Scheme, url: string, label: string) => void;
}

export const SchemeDetailsModal: React.FC<SchemeDetailsModalProps> = ({
  scheme,
  language,
  onClose,
  onCheckEligibility,
  onViewDocuments,
  onStartApplication,
  onOpenOfficialUrl
}) => {
  if (!scheme) return null;

  const getTitle = () => {
    if (language === 'hi' && scheme.titleHi) return scheme.titleHi;
    if (language === 'mr' && scheme.titleMr) return scheme.titleMr;
    return scheme.title;
  };

  const getDesc = () => {
    if (language === 'hi' && scheme.descriptionHi) return scheme.descriptionHi;
    if (language === 'mr' && scheme.descriptionMr) return scheme.descriptionMr;
    return scheme.description;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-[#FFFFFF] border border-[#E5E9E5] rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl relative my-auto text-[#17231F]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E5E9E5] flex items-start justify-between bg-[#123D32] text-white rounded-t-3xl">
          <div className="pr-6 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#008F68] text-white">
                {scheme.level === 'Central' ? 'Central Government' : `${scheme.state} State Scheme`}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-900 text-emerald-200 border border-emerald-700">
                {scheme.category}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {getTitle()}
            </h2>
            <p className="text-xs text-emerald-100 flex items-center space-x-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>{scheme.department}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-[#184d3f] transition flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-[#17231F]">
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#008F68]">1. Description</h4>
            <p className="leading-relaxed text-[#68736D]">{getDesc()}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#008F68]">2. Key Benefits</h4>
            <ul className="space-y-1 bg-[#F8F7F2] p-3.5 rounded-xl border border-[#E5E9E5]">
              {scheme.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start space-x-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#008F68] flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-1">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#008F68]">3. Eligibility Criteria Summary</h4>
            <p className="bg-[#F8F7F2] p-3.5 rounded-xl border border-[#E5E9E5] text-[#17231F] font-semibold leading-relaxed">
              {scheme.eligibilitySummary}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#008F68]">4. Required Document Checklist</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scheme.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#F8F7F2] border border-[#E5E9E5] flex items-center space-x-2 font-medium">
                  <FileText className="w-3.5 h-3.5 text-[#008F68]" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#E5E9E5] bg-[#F8F7F2] rounded-b-3xl flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
          <button
            onClick={() => {
              onClose();
              onOpenOfficialUrl(scheme, scheme.officialSourceUrl, 'Visit Official Department Portal');
            }}
            className="px-4 py-2.5 rounded-xl bg-white text-[#17231F] border border-[#E5E9E5] hover:border-[#008F68] flex items-center space-x-1.5 transition"
          >
            <ExternalLink className="w-4 h-4 text-[#008F68]" />
            <span>Open Official Website</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onCheckEligibility(scheme.id);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#008F68] text-white hover:bg-[#007353] flex items-center space-x-1.5 transition shadow-sm"
          >
            <span>Check Rule Eligibility</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
