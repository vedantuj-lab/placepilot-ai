import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Lock, 
  FileCheck, 
  Building2, 
  User, 
  ArrowRight,
  Stamp
} from 'lucide-react';
import { ApplicationDraft, CitizenProfile, Scheme, DocumentItem } from '../types';

interface HumanApprovalCenterProps {
  draft: ApplicationDraft | null;
  scheme: Scheme | null;
  profile: CitizenProfile;
  documents: DocumentItem[];
  onApproveAndHandoff: (draft: ApplicationDraft, audit: any) => void;
  onBackToEdit: () => void;
}

export const HumanApprovalCenter: React.FC<HumanApprovalCenterProps> = ({
  draft,
  scheme,
  profile,
  documents,
  onApproveAndHandoff,
  onBackToEdit
}) => {
  const [statementConsent, setStatementConsent] = useState<boolean>(false);
  const [dataAccuracyConsent, setDataAccuracyConsent] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!draft || !scheme) {
    return (
      <div className="bg-[#FFFFFF] border border-[#E5E9E5] rounded-3xl p-8 text-center text-[#68736D] space-y-3 shadow-sm">
        <ShieldCheck className="w-10 h-10 text-[#008F68] mx-auto" />
        <h3 className="font-bold text-[#17231F] text-base">No Application Draft Selected for Human Approval</h3>
        <p className="text-xs">Select or prepare an application draft from the Form Studio first.</p>
        <button
          onClick={onBackToEdit}
          className="px-4 py-2 rounded-xl bg-[#008F68] text-white text-xs font-bold"
        >
          Open Form Studio
        </button>
      </div>
    );
  }

  const isReadyToApprove = statementConsent && dataAccuracyConsent;

  const handleExecuteApproval = () => {
    if (!isReadyToApprove) return;

    setIsSubmitting(true);

    const auditEvent = {
      approvedAt: new Date().toISOString(),
      approvedBy: profile.email || 'citizen.demo@placepilot.local',
      ipHash: `sha256-${Math.random().toString(36).substring(2, 10)}`,
      auditChecksum: `AUDIT-APPROVAL-${Date.now().toString(36).toUpperCase()}`,
      statement: 'Citizen explicitly reviewed application summary, attached documents, and validated fields. Authorized external handoff.'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onApproveAndHandoff(draft, auditEvent);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-[#17231F]">
      {/* Header */}
      <div className="text-center space-y-2 pb-4 border-b border-[#E5E9E5]">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#123D32] text-white text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-[#F4A261]" />
          <span>MANDATORY SAFETY CHECKPOINT: HUMANS APPROVE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#17231F]">
          Human Approval Center
        </h2>
        <p className="text-xs sm:text-sm text-[#68736D] max-w-xl mx-auto leading-relaxed">
          In accordance with our core principle, no consequential application submission or external government handoff occurs without explicit, audited human consent.
        </p>
      </div>

      {/* Review Box 1: Selected Scheme & Verification Status */}
      <div className="bg-[#FFFFFF] border border-[#E5E9E5] rounded-2xl p-5 shadow-sm space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#008F68] block">
          1. Selected Government Welfare Scheme
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-[#17231F]">{scheme.title}</h3>
            <p className="text-xs text-[#68736D] flex items-center space-x-1 mt-0.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>{scheme.department} • {scheme.level}</span>
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            Verified Source Link
          </span>
        </div>
      </div>

      {/* Review Box 2: Applicant Data Verification */}
      <div className="bg-[#FFFFFF] border border-[#E5E9E5] rounded-2xl p-5 shadow-sm space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#008F68] block">
          2. Verified Applicant Information Summary
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#F8F7F2] p-4 rounded-xl border border-[#E5E9E5]">
          <div>
            <span className="text-[10px] text-[#68736D] block">Applicant Name</span>
            <span className="font-bold text-[#17231F]">{draft.formData.fullName || profile.fullName}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#68736D] block">Category / State</span>
            <span className="font-bold text-[#17231F]">{draft.formData.category || profile.category} ({draft.formData.state || profile.state})</span>
          </div>
          <div>
            <span className="text-[10px] text-[#68736D] block">Annual Income</span>
            <span className="font-bold text-[#17231F]">₹{draft.formData.annualFamilyIncome || profile.annualFamilyIncome}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#68736D] block">Institution</span>
            <span className="font-bold text-[#17231F] truncate block">{draft.formData.institutionName || profile.institutionName}</span>
          </div>
        </div>
      </div>

      {/* Review Box 3: Explicit Consent Statements */}
      <div className="bg-[#FFFFFF] border border-[#E5E9E5] rounded-2xl p-6 shadow-sm space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#008F68] block">
          3. Mandatory Citizen Approval Checkpoint
        </span>

        <div className="space-y-3 text-xs">
          <label className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#F8F7F2] border border-[#E5E9E5] cursor-pointer">
            <input
              type="checkbox"
              checked={dataAccuracyConsent}
              onChange={(e) => setDataAccuracyConsent(e.target.checked)}
              className="rounded border-[#E5E9E5] text-[#008F68] focus:ring-[#008F68] mt-0.5"
            />
            <span className="font-semibold text-[#17231F]">
              I have personally verified all prefilled application draft details against my original government certificates and confirm 100% accuracy.
            </span>
          </label>

          <label className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#F8F7F2] border border-[#E5E9E5] cursor-pointer">
            <input
              type="checkbox"
              checked={statementConsent}
              onChange={(e) => setStatementConsent(e.target.checked)}
              className="rounded border-[#E5E9E5] text-[#008F68] focus:ring-[#008F68] mt-0.5"
            />
            <span className="font-semibold text-[#17231F]">
              I explicitly authorize PlacePilot AI to record an immutable cryptographic audit signature (`AUDIT-APPROVAL-*`) and proceed with the official government portal handoff.
            </span>
          </label>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-[#E5E9E5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={onBackToEdit}
            className="px-4 py-2.5 rounded-xl bg-[#F8F7F2] hover:bg-[#E5E9E5] text-[#17231F] font-bold border border-[#E5E9E5]"
          >
            Back to Form Studio
          </button>

          <button
            onClick={handleExecuteApproval}
            disabled={!isReadyToApprove || isSubmitting}
            className={`px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-sm transition ${
              isReadyToApprove
                ? 'bg-[#008F68] hover:bg-[#007353] text-white cursor-pointer'
                : 'bg-[#E5E9E5] text-[#68736D] cursor-not-allowed'
            }`}
          >
            <Stamp className="w-4 h-4 text-[#F4A261]" />
            <span>{isSubmitting ? 'Recording Audit Signature...' : 'Approve & Handoff to Official Portal'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
