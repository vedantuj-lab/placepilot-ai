import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Bookmark, 
  BookmarkCheck, 
  FileText, 
  ExternalLink, 
  Volume2, 
  ShieldCheck, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { Scheme, Language } from '../types';

interface SchemeCardProps {
  scheme: Scheme;
  language: Language;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onViewDetails: (scheme: Scheme) => void;
  onCheckEligibility: (schemeId: string) => void;
  onViewDocuments: (schemeId: string) => void;
  onOpenOfficialUrl: (scheme: Scheme, url: string, label: string) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  language,
  isSaved,
  onToggleSave,
  onViewDetails,
  onCheckEligibility,
  onViewDocuments,
  onOpenOfficialUrl
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const getLocalizedTitle = () => {
    if (language === 'hi' && scheme.titleHi) return scheme.titleHi;
    if (language === 'mr' && scheme.titleMr) return scheme.titleMr;
    return scheme.title;
  };

  const getLocalizedDesc = () => {
    if (language === 'hi' && scheme.descriptionHi) return scheme.descriptionHi;
    if (language === 'mr' && scheme.descriptionMr) return scheme.descriptionMr;
    return scheme.description;
  };

  const getLocalizedSummary = () => {
    if (language === 'hi' && scheme.eligibilitySummaryHi) return scheme.eligibilitySummaryHi;
    if (language === 'mr' && scheme.eligibilitySummaryMr) return scheme.eligibilitySummaryMr;
    return scheme.eligibilitySummary;
  };

  const speakScheme = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }
      window.speechSynthesis.cancel();
      const text = `${getLocalizedTitle()}. ${getLocalizedDesc()}`;
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'mr') utterance.lang = 'mr-IN';
      else utterance.lang = 'en-IN';
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-[#1E1B4B] border border-[#4338CA]/60 hover:border-[#A5B4FC] rounded-2xl p-5 shadow-xl flex flex-col justify-between transition-all duration-200 group text-[#EEF2FF]">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              scheme.level === 'Central'
                ? 'bg-[#4C1D95] text-white border border-[#A5B4FC]/30'
                : 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
            }`}>
              {scheme.level === 'Central' ? 'Central Govt' : `${scheme.state} State`}
            </span>

            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#2E2A72] text-[#C7D2FE] border border-[#4338CA]">
              {scheme.category}
            </span>

            {scheme.isScholarship && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#4C0519] text-[#FDE047] border border-[#F43F5E]/40 flex items-center space-x-1">
                <GraduationCap className="w-3 h-3 text-[#FDE047]" />
                <span>Scholarship</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={speakScheme}
              className={`p-1.5 rounded-lg transition ${isPlayingAudio ? 'bg-[#A5B4FC] text-black' : 'text-[#C7D2FE] hover:text-white hover:bg-[#2E2A72]'}`}
              title="Listen to summary"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleSave(scheme.id)}
              className={`p-1.5 rounded-lg transition ${isSaved ? 'text-[#FDE047] bg-[#4C0519]' : 'text-[#C7D2FE] hover:text-white hover:bg-[#2E2A72]'}`}
              title={isSaved ? 'Remove Bookmark' : 'Bookmark Scheme'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onViewDetails(scheme)}
          className="text-base font-bold text-white hover:text-[#A5B4FC] transition cursor-pointer leading-snug mb-1"
        >
          {getLocalizedTitle()}
        </h3>

        <p className="text-xs text-[#C7D2FE] flex items-center space-x-1 mb-3">
          <Building2 className="w-3.5 h-3.5 flex-shrink-0 text-[#A5B4FC]" />
          <span className="truncate">{scheme.department}</span>
        </p>

        <p className="text-xs text-[#C7D2FE] line-clamp-2 leading-relaxed mb-4">
          {getLocalizedDesc()}
        </p>

        {scheme.benefits.length > 0 && (
          <div className="bg-[#2E2A72] border border-[#4338CA] p-3 rounded-xl mb-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A5B4FC] block">Key Benefit</span>
            <p className="text-xs font-bold text-white line-clamp-1">
              {scheme.benefits[0]}
            </p>
          </div>
        )}

        <div className="space-y-1 mb-4 text-xs">
          <span className="font-bold text-white block text-[11px]">Eligibility Criteria:</span>
          <p className="text-[#C7D2FE] line-clamp-2 leading-relaxed">
            {getLocalizedSummary()}
          </p>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3 border-t border-[#4338CA] space-y-2">
        <div className="flex items-center justify-between text-[11px] text-[#C7D2FE]">
          <span className="flex items-center space-x-1 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Source Verified</span>
          </span>
          {scheme.commonPortalName && (
            <span className="font-medium truncate max-w-[120px] text-[#A5B4FC]">{scheme.commonPortalName}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <button
            onClick={() => onViewDetails(scheme)}
            className="py-2 px-3 rounded-lg bg-[#2E2A72] hover:bg-[#3730A3] text-white font-bold border border-[#4338CA] transition text-center cursor-pointer"
          >
            View Details
          </button>

          <button
            onClick={() => onCheckEligibility(scheme.id)}
            className="py-2 px-3 rounded-lg bg-[#4C1D95] hover:bg-[#5B21B6] text-white font-bold transition flex items-center justify-center space-x-1 cursor-pointer border border-[#A5B4FC]/30 shadow-md"
          >
            <span>Check Rules</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A5B4FC]" />
          </button>
        </div>
      </div>
    </div>
  );
};
