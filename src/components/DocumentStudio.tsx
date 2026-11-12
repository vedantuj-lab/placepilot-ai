import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Eye, 
  ShieldCheck, 
  FileCheck, 
  Lock, 
  Sparkles,
  Edit2,
  X
} from 'lucide-react';
import { Scheme, DocumentItem, DocumentStatus } from '../types';

interface DocumentStudioProps {
  schemes: Scheme[];
  initialSchemeId?: string;
  documents: DocumentItem[];
  onSaveDocument: (doc: DocumentItem) => void;
  onDeleteDocument: (docId: string) => void;
  onProceedToForm: (schemeId: string) => void;
}

export const DocumentStudio: React.FC<DocumentStudioProps> = ({
  schemes,
  initialSchemeId = 'MAHA_OBC_SCHOLARSHIP',
  documents,
  onSaveDocument,
  onDeleteDocument,
  onProceedToForm
}) => {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(initialSchemeId);
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<DocumentItem | null>(null);
  const [consentGiven, setConsentGiven] = useState<boolean>(true);
  const [activeUploadDocType, setActiveUploadDocType] = useState<string>('');
  const [isProcessingOcr, setIsProcessingOcr] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedScheme = schemes.find(s => s.id === selectedSchemeId) || schemes[0];
  const requiredList = selectedScheme?.requiredDocuments || [];
  const schemeDocs = documents.filter(d => !d.schemeId || d.schemeId === selectedSchemeId);

  const handleTriggerUpload = (docType: string) => {
    setActiveUploadDocType(docType);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds maximum allowed 5MB limit.');
      return;
    }

    const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid PDF, JPG, or PNG document.');
      return;
    }

    setIsProcessingOcr(true);

    const docType = activeUploadDocType || 'Required Document';
    const isIncome = docType.toLowerCase().includes('income');
    const isCaste = docType.toLowerCase().includes('caste');
    const isDomicile = docType.toLowerCase().includes('domicile');

    setTimeout(() => {
      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        citizenId: 'citizen-demo-01',
        schemeId: selectedSchemeId,
        documentType: docType,
        name: docType,
        fileName: file.name,
        fileType: file.type,
        fileSize: `${Math.round(file.size / 1024)} KB`,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Extracted',
        extractedData: {
          certificateNumber: isIncome ? `INC/REV/2025/${Math.floor(10000 + Math.random() * 90000)}` : isCaste ? `OBC/MH/2022/${Math.floor(10000 + Math.random() * 90000)}` : isDomicile ? `DOM/THN/2023/${Math.floor(10000 + Math.random() * 90000)}` : `CERT/${Date.now().toString().slice(-6)}`,
          candidateName: 'Vedant Sharma',
          issuerAuthority: isIncome ? 'Tahsildar Office, Thane' : 'Sub-Divisional Officer, Maharashtra',
          annualIncome: isIncome ? '150000' : undefined,
          issueDate: '2025-06-12'
        },
        verifiedByCitizen: false,
        consentGranted: consentGiven
      };

      onSaveDocument(newDoc);
      setIsProcessingOcr(false);
      setSelectedDocForPreview(newDoc);
    }, 800);
  };

  const handleVerifyExtractedData = (doc: DocumentItem) => {
    const updated: DocumentItem = {
      ...doc,
      status: 'Verified by Citizen',
      verifiedByCitizen: true
    };
    onSaveDocument(updated);
    setSelectedDocForPreview(null);
  };

  return (
    <div className="space-y-6 text-[#FFEDD5] selection:bg-[#F97316] selection:text-black font-sans">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
      />

      {/* Header - Dark Slate & Copper */}
      <div className="bg-[#0F172A] border border-[#C2410C]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C2410C] text-white text-xs font-bold">
          <FileCheck className="w-3.5 h-3.5 text-[#F97316]" />
          <span>DOCUMENT READINESS STUDIO</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Document Checklist & OCR Studio
        </h2>

        <p className="text-xs sm:text-sm text-[#FFEDD5]/90 max-w-2xl leading-relaxed">
          Upload certificates (PDF/JPG/PNG), extract structured OCR data, and verify document readiness prior to prefilling application forms.
        </p>

        <div className="pt-2 max-w-md">
          <label className="text-xs font-bold text-white block mb-1">Target Scheme Checklist</label>
          <select
            value={selectedSchemeId}
            onChange={(e) => setSelectedSchemeId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E293B] border border-[#C2410C]/50 text-xs font-bold text-white focus:outline-none focus:border-[#F97316]"
          >
            {schemes.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* CONSENT NOTICE */}
      <div className="bg-[#0F172A] border border-[#C2410C]/40 p-4 rounded-2xl flex items-center justify-between text-xs shadow-xl">
        <div className="flex items-center space-x-3">
          <Lock className="w-4 h-4 text-[#F97316]" />
          <span className="font-semibold text-white">
            Private Storage: Uploaded documents are stored securely with encrypted user-level access.
          </span>
        </div>

        <label className="flex items-center space-x-2 cursor-pointer font-bold text-[#F97316]">
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="rounded border-[#C2410C] text-[#F97316] focus:ring-[#F97316]"
          />
          <span>Grant OCR Extraction Consent</span>
        </label>
      </div>

      {/* CHECKLIST MATRIX */}
      <div className="bg-[#0F172A] border border-[#C2410C]/40 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#C2410C]/30 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F97316]">Required Certificate Checklist</span>
            <h3 className="font-bold text-base text-white">{selectedScheme?.title}</h3>
          </div>

          <button
            onClick={() => onProceedToForm(selectedSchemeId)}
            className="px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg transition cursor-pointer"
          >
            <span>Proceed to Form Studio</span>
            <FileText className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {requiredList.map((reqDocName, idx) => {
            const matchedDoc = schemeDocs.find(d => d.documentType === reqDocName || d.name === reqDocName);
            return (
              <div
                key={idx}
                className="bg-[#1E293B] border border-[#C2410C]/30 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#F97316]" />
                    <span className="font-bold text-white text-sm">{reqDocName}</span>
                  </div>

                  {matchedDoc ? (
                    <div className="flex items-center space-x-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded-full bg-[#C2410C] text-white font-bold">
                        {matchedDoc.status}
                      </span>
                      <span className="text-[#FFEDD5]/80">{matchedDoc.fileName} ({matchedDoc.fileSize})</span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-amber-300 font-semibold block">Missing — Upload certificate to complete checklist</span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {matchedDoc ? (
                    <>
                      <button
                        onClick={() => setSelectedDocForPreview(matchedDoc)}
                        className="px-3 py-1.5 rounded-lg bg-[#334155] text-white font-bold hover:bg-[#475569] transition flex items-center space-x-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#F97316]" />
                        <span>Preview OCR</span>
                      </button>

                      <button
                        onClick={() => onDeleteDocument(matchedDoc.id)}
                        className="p-1.5 rounded-lg bg-rose-950 text-rose-300 hover:bg-rose-900 transition cursor-pointer"
                        title="Delete document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleTriggerUpload(reqDocName)}
                      disabled={isProcessingOcr}
                      className="px-4 py-2 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white font-bold transition flex items-center space-x-1.5 shadow-md cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isProcessingOcr ? 'Extracting...' : 'Upload File'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* OCR MODAL */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-[#C2410C] rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-white">
            <button
              onClick={() => setSelectedDocForPreview(null)}
              className="absolute right-4 top-4 text-[#FFEDD5] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F97316]">OCR Extraction Result</span>
              <h3 className="font-bold text-lg text-white">{selectedDocForPreview.name}</h3>
              <p className="text-xs text-[#FFEDD5]/80">File: {selectedDocForPreview.fileName}</p>
            </div>

            <div className="bg-[#1E293B] border border-[#C2410C]/40 p-4 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-[#F97316] block text-[11px] uppercase tracking-wider">Extracted Data Fields</span>
              {selectedDocForPreview.extractedData ? (
                Object.entries(selectedDocForPreview.extractedData).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-[#334155] text-[11px]">
                    <span className="font-bold text-[#FFEDD5]/80 capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-black text-white">{String(v)}</span>
                  </div>
                ))
              ) : (
                <p className="text-[#FFEDD5]/70 italic">No extracted fields available.</p>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-2 text-xs font-bold">
              <button
                onClick={() => setSelectedDocForPreview(null)}
                className="px-4 py-2 rounded-xl bg-[#1E293B] text-white border border-[#334155]"
              >
                Close
              </button>
              <button
                onClick={() => handleVerifyExtractedData(selectedDocForPreview)}
                className="px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white flex items-center space-x-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Verify</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
