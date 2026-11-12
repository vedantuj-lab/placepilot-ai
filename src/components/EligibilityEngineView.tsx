import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  Building2, 
  ArrowRight, 
  FileText, 
  RefreshCw, 
  UserCheck, 
  Edit3, 
  ShieldCheck, 
  BookOpen
} from 'lucide-react';
import { Scheme, CitizenProfile, EligibilityOutcome, EligibilityEvaluation } from '../types';
import { SCHEME_RULES } from '../data/rules';
import { evaluateSchemeEligibility } from '../utils/rulesEngine';

interface EligibilityEngineViewProps {
  schemes: Scheme[];
  initialSchemeId?: string;
  profile: CitizenProfile;
  onUpdateProfile: (p: CitizenProfile) => void;
  onViewDocuments: (schemeId: string) => void;
  onStartApplication: (schemeId: string) => void;
}

export const EligibilityEngineView: React.FC<EligibilityEngineViewProps> = ({
  schemes,
  initialSchemeId = 'MAHA_OBC_SCHOLARSHIP',
  profile,
  onUpdateProfile,
  onViewDocuments,
  onStartApplication
}) => {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(initialSchemeId);

  const selectedScheme = useMemo(() => {
    return schemes.find(s => s.id === selectedSchemeId) || schemes[0];
  }, [schemes, selectedSchemeId]);

  const rule = useMemo(() => {
    return SCHEME_RULES[selectedSchemeId] || null;
  }, [selectedSchemeId]);

  const evaluation: EligibilityEvaluation = useMemo(() => {
    if (!rule) {
      return {
        schemeId: selectedSchemeId,
        outcome: 'NEEDS_OFFICIAL_VERIFICATION',
        summary: 'No automated deterministic rule registered for this scheme. Official department guidelines must be checked.',
        conditionResults: [],
        missingFields: [],
        recommendedAction: 'Verify directly on official department portal.',
        evaluatedAt: new Date().toISOString()
      };
    }
    return evaluateSchemeEligibility(rule, profile);
  }, [rule, profile, selectedSchemeId]);

  const getOutcomeBadge = (outcome: EligibilityOutcome) => {
    switch (outcome) {
      case 'ELIGIBLE':
        return (
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#06B6D4] text-[#3B0764] font-black">
            <CheckCircle2 className="w-5 h-5" />
            <div>
              <span className="font-black text-sm uppercase tracking-wide">ELIGIBLE</span>
              <p className="text-[11px] font-bold">All published rules satisfied</p>
            </div>
          </div>
        );
      case 'NOT_ELIGIBLE':
        return (
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-600 text-white font-black">
            <XCircle className="w-5 h-5" />
            <div>
              <span className="font-black text-sm uppercase tracking-wide">NOT ELIGIBLE</span>
              <p className="text-[11px] font-bold">Conditions not satisfied</p>
            </div>
          </div>
        );
      case 'ADDITIONAL_INFO_REQUIRED':
        return (
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 text-black font-black">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <span className="font-black text-sm uppercase tracking-wide">INFO REQUIRED</span>
              <p className="text-[11px] font-bold">Missing profile fields</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#581C87] text-white font-black">
            <HelpCircle className="w-5 h-5 text-[#06B6D4]" />
            <div>
              <span className="font-black text-sm uppercase tracking-wide">OFFICIAL VERIFICATION</span>
              <p className="text-[11px] font-bold">Check department site</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 text-[#F3E8FF] selection:bg-[#06B6D4] selection:text-black">
      {/* Header - Deep Plum & Electric Violet */}
      <div className="bg-gradient-to-r from-[#3B0764] via-[#581C87] to-[#3B0764] border border-[#7E22CE]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#581C87] text-[#06B6D4] text-xs font-bold border border-[#06B6D4]/30">
          <ShieldCheck className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>DETERMINISTIC ELIGIBILITY ENGINE</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Rule-Based Eligibility Evaluation
        </h2>

        <p className="text-xs sm:text-sm text-[#E9D5FF] max-w-2xl leading-relaxed">
          RULES DECIDE. Our deterministic engine evaluates published government regulations against your profile criteria with full condition transparency and citations.
        </p>

        <div className="pt-2 max-w-md">
          <label className="text-xs font-bold text-white block mb-1">Target Government Scheme / Scholarship</label>
          <select
            value={selectedSchemeId}
            onChange={(e) => setSelectedSchemeId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#581C87] border border-[#7E22CE] text-xs font-bold text-white focus:outline-none focus:border-[#06B6D4]"
          >
            {schemes.map((s) => (
              <option key={s.id} value={s.id}>{s.title} ({s.level})</option>
            ))}
          </select>
        </div>
      </div>

      {/* EVALUATION RESULT BANNER */}
      <div className="bg-[#3B0764] border border-[#7E22CE]/50 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#7E22CE]/40 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#06B6D4]">Selected Scheme</span>
            <h3 className="font-bold text-lg text-white">{selectedScheme?.title}</h3>
            <p className="text-xs text-[#E9D5FF] flex items-center space-x-1 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>{selectedScheme?.department} • {selectedScheme?.level}</span>
            </p>
          </div>

          {getOutcomeBadge(evaluation.outcome)}
        </div>

        <div className="bg-[#581C87] border border-[#7E22CE]/60 p-4 rounded-xl text-xs space-y-1">
          <span className="font-bold text-[#06B6D4] block">Assessment Verdict Summary:</span>
          <p className="text-white leading-relaxed">{evaluation.summary}</p>
        </div>

        {/* CONDITION-BY-CONDITION BREAKDOWN TABLE */}
        {evaluation.conditionResults.length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs text-[#06B6D4] uppercase tracking-wider">
              Published Rule Conditions Breakdown ({evaluation.conditionResults.filter(c => c.result === 'PASS').length} / {evaluation.conditionResults.length} Satisfied)
            </h4>

            <div className="space-y-2">
              {evaluation.conditionResults.map((cond, idx) => {
                const isPass = cond.result === 'PASS';
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                      isPass
                        ? 'bg-[#581C87] border-[#06B6D4]/60 text-white'
                        : 'bg-rose-950/80 border-rose-600 text-rose-100'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <div className="flex items-center space-x-2">
                        {isPass ? (
                          <CheckCircle2 className="w-4 h-4 text-[#06B6D4] flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        )}
                        <span>{cond.field.toUpperCase()} Requirement</span>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isPass ? 'bg-[#06B6D4] text-[#3B0764]' : 'bg-rose-600 text-white'}`}>
                        {cond.result}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#E9D5FF] leading-relaxed pl-6">
                      {cond.comparisonNote}
                    </p>

                    <div className="pl-6 flex flex-wrap items-center justify-between text-[11px] pt-1 text-white font-medium border-t border-[#7E22CE]/40 mt-1">
                      <span>Published Requirement: <strong>{cond.requirementText}</strong></span>
                      <span>Your Info: <strong>{cond.citizenValue !== undefined ? String(cond.citizenValue) : 'Not Provided'}</strong></span>
                    </div>

                    {cond.reference && (
                      <div className="pl-6 text-[10px] text-[#06B6D4] font-semibold italic">
                        Source Citation: {cond.reference}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#7E22CE]/40 flex flex-wrap gap-3 text-xs font-bold">
          <button
            onClick={() => onViewDocuments(selectedSchemeId)}
            className="px-4 py-2.5 rounded-xl bg-[#581C87] hover:bg-[#6B21A8] text-white border border-[#7E22CE] flex items-center space-x-2 transition cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#06B6D4]" />
            <span>Open Document Readiness Studio</span>
          </button>

          <button
            onClick={() => onStartApplication(selectedSchemeId)}
            className="px-5 py-2.5 rounded-xl bg-[#06B6D4] hover:bg-[#0891B2] text-[#3B0764] font-black flex items-center space-x-2 shadow-lg transition cursor-pointer"
          >
            <span>Prepare Application Draft</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
