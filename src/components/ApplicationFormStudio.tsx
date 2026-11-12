import React, { useState, useEffect, useMemo } from 'react';
import { 
  Send, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { Scheme, CitizenProfile, DocumentItem, ApplicationDraft } from '../types';
import { getFormTemplateForScheme } from '../data/formTemplates';
import { validateApplicationForm } from '../utils/formValidator';

interface ApplicationFormStudioProps {
  schemes: Scheme[];
  initialSchemeId?: string;
  profile: CitizenProfile;
  documents: DocumentItem[];
  existingDrafts: ApplicationDraft[];
  onSaveDraft: (draft: ApplicationDraft) => void;
  onProceedToApproval: (draft: ApplicationDraft) => void;
}

export const ApplicationFormStudio: React.FC<ApplicationFormStudioProps> = ({
  schemes,
  initialSchemeId = 'MAHA_OBC_SCHOLARSHIP',
  profile,
  documents,
  existingDrafts,
  onSaveDraft,
  onProceedToApproval
}) => {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(initialSchemeId);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<boolean>(false);

  const selectedScheme = schemes.find(s => s.id === selectedSchemeId) || schemes[0];
  const template = useMemo(() => getFormTemplateForScheme(selectedSchemeId), [selectedSchemeId]);
  const allFields = useMemo(() => template.sections.flatMap(s => s.fields), [template]);

  useEffect(() => {
    const existing = existingDrafts.find(d => d.schemeId === selectedSchemeId);
    if (existing && existing.formData && Object.keys(existing.formData).length > 0) {
      setFormData(existing.formData);
      return;
    }

    const prefilled: Record<string, any> = {};

    template.sections.forEach(sec => {
      sec.fields.forEach(field => {
        if (field.profileMapping && (profile as any)[field.profileMapping] !== undefined) {
          prefilled[field.name] = (profile as any)[field.profileMapping];
        }

        if (field.documentExtractionMapping) {
          const matchDoc = documents.find(d => 
            d.documentType.toLowerCase().includes(field.documentExtractionMapping!.documentType.toLowerCase()) ||
            field.documentExtractionMapping!.documentType.toLowerCase().includes(d.documentType.toLowerCase())
          );
          if (matchDoc?.extractedData?.[field.documentExtractionMapping.field]) {
            prefilled[field.name] = matchDoc.extractedData[field.documentExtractionMapping.field];
          }
        }
      });
    });

    setFormData(prefilled);
  }, [selectedSchemeId, profile, documents, existingDrafts, template]);

  const validation = useMemo(() => {
    return validateApplicationForm(allFields, formData);
  }, [allFields, formData]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleResetToProfile = () => {
    const prefilled: Record<string, any> = {};
    template.sections.forEach(sec => {
      sec.fields.forEach(field => {
        if (field.profileMapping && (profile as any)[field.profileMapping] !== undefined) {
          prefilled[field.name] = (profile as any)[field.profileMapping];
        }
      });
    });
    setFormData(prefilled);
  };

  const handleSaveDraft = () => {
    const existing = existingDrafts.find(d => d.schemeId === selectedSchemeId);
    const draft: ApplicationDraft = {
      id: existing?.id || `app-draft-${Date.now()}`,
      citizenId: profile.id,
      schemeId: selectedSchemeId,
      schemeTitle: selectedScheme.title,
      schemeCategory: selectedScheme.category,
      status: 'Draft In Progress',
      statusAttribution: 'PlacePilot-generated',
      formData,
      validationErrors: validation.errors,
      isApprovedByHuman: false,
      notes: ['Draft saved by citizen in Application Form Studio.'],
      timeline: existing?.timeline || [
        { status: 'Saved', timestamp: new Date().toISOString(), note: 'Scheme saved', source: 'Citizen-entered' },
        { status: 'Draft In Progress', timestamp: new Date().toISOString(), note: 'Application draft initialized', source: 'PlacePilot-generated' }
      ],
      officialPortalUrl: selectedScheme.officialApplicationUrl || selectedScheme.officialSourceUrl,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSaveDraft(draft);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
  };

  const handleProceed = () => {
    if (!validation.isValid) {
      alert('Please fill all mandatory required fields before proceeding to Human Approval.');
      return;
    }

    const draft: ApplicationDraft = {
      id: `app-draft-${Date.now()}`,
      citizenId: profile.id,
      schemeId: selectedSchemeId,
      schemeTitle: selectedScheme.title,
      schemeCategory: selectedScheme.category,
      status: 'Ready for Review',
      statusAttribution: 'PlacePilot-generated',
      formData,
      validationErrors: [],
      isApprovedByHuman: false,
      notes: ['Form validation passed with 0 errors.'],
      timeline: [
        { status: 'Saved', timestamp: new Date().toISOString(), note: 'Scheme saved', source: 'Citizen-entered' },
        { status: 'Draft In Progress', timestamp: new Date().toISOString(), note: 'Form fields prefilled from profile & OCR', source: 'PlacePilot-generated' },
        { status: 'Ready for Review', timestamp: new Date().toISOString(), note: 'Form validation passed with 0 errors', source: 'PlacePilot-generated' }
      ],
      officialPortalUrl: selectedScheme.officialApplicationUrl || selectedScheme.officialSourceUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSaveDraft(draft);
    onProceedToApproval(draft);
  };

  return (
    <div className="space-y-6 text-[#E0F2FE] selection:bg-[#38BDF8] selection:text-black font-sans">
      {/* Header - Midnight Blue & Coral & Cyan */}
      <div className="bg-[#0F172A] border border-[#38BDF8]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E293B] text-[#38BDF8] text-xs font-bold border border-[#38BDF8]/30">
          <FileText className="w-3.5 h-3.5 text-[#F87171]" />
          <span>APPLICATION FORM STUDIO</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Prefilled Application Draft Studio
        </h2>

        <p className="text-xs sm:text-sm text-[#E0F2FE]/90 max-w-2xl leading-relaxed">
          Fields are automatically prefilled from your Citizen Profile and verified OCR document data. Review, edit, and validate before proceeding to Human Approval.
        </p>

        <div className="pt-2 max-w-md">
          <label className="text-xs font-bold text-white block mb-1">Select Scheme Form Template</label>
          <select
            value={selectedSchemeId}
            onChange={(e) => setSelectedSchemeId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E293B] border border-[#38BDF8]/40 text-xs font-bold text-white focus:outline-none focus:border-[#38BDF8]"
          >
            {schemes.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* VALIDATION STATUS BANNER */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs shadow-xl ${
        validation.isValid ? 'bg-[#0F172A] border-emerald-500 text-emerald-300' : 'bg-rose-950/80 border-rose-600 text-rose-200'
      }`}>
        <div className="flex items-center space-x-2">
          {validation.isValid ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          )}
          <span className="font-bold">
            {validation.isValid ? 'Form Validation Passed (0 Errors)' : `Incomplete Form: ${validation.errors.length} mandatory field(s) pending`}
          </span>
        </div>

        <button
          onClick={handleResetToProfile}
          className="text-xs font-bold text-[#38BDF8] hover:underline flex items-center space-x-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Re-sync Profile</span>
        </button>
      </div>

      {/* FORM SECTIONS */}
      <div className="bg-[#0F172A] border border-[#38BDF8]/40 rounded-2xl p-6 shadow-2xl space-y-6">
        {template.sections.map((section) => (
          <div key={section.id} className="space-y-4 pb-6 border-b border-[#1E293B] last:border-b-0 last:pb-0">
            <h3 className="font-bold text-sm text-[#38BDF8] uppercase tracking-wider">
              {section.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.fields.map((field) => {
                const hasError = validation.errors.some(e => e.field === field.name);
                return (
                  <div key={field.id} className={`space-y-1 ${field.type === 'textarea' || field.type === 'checkbox' ? 'sm:col-span-2' : ''}`}>
                    <label className="text-xs font-bold text-white block">
                      {field.label} {field.required && <span className="text-[#F87171]">*</span>}
                    </label>

                    {field.type === 'select' ? (
                      <select
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl bg-[#1E293B] border ${hasError ? 'border-rose-500' : 'border-[#334155]'} text-xs font-medium text-white focus:outline-none focus:border-[#38BDF8]`}
                      >
                        <option value="">-- Select --</option>
                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : field.type === 'checkbox' ? (
                      <label className="flex items-center space-x-2 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={!!formData[field.name]}
                          onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                          className="rounded border-[#334155] text-[#38BDF8] focus:ring-[#38BDF8]"
                        />
                        <span className="text-xs font-medium text-white">{field.label}</span>
                      </label>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={`w-full px-3 py-2 rounded-xl bg-[#1E293B] border ${hasError ? 'border-rose-500' : 'border-[#334155]'} text-xs font-medium text-white focus:outline-none focus:border-[#38BDF8]`}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.name] !== undefined ? formData[field.name] : ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={`w-full px-3 py-2 rounded-xl bg-[#1E293B] border ${hasError ? 'border-rose-500' : 'border-[#334155]'} text-xs font-medium text-white focus:outline-none focus:border-[#38BDF8]`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2.5 rounded-xl bg-[#1E293B] text-white hover:bg-[#334155] border border-[#38BDF8]/30 flex items-center space-x-1.5 transition cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#38BDF8]" />
              <span>Save Application Draft</span>
            </button>
            {saveSuccessNotice && <span className="text-emerald-400 font-bold">Draft Saved!</span>}
          </div>

          <button
            onClick={handleProceed}
            className="px-6 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F172A] font-black flex items-center space-x-2 shadow-lg transition cursor-pointer"
          >
            <span>Proceed to Human Approval Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
