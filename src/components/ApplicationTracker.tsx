import React, { useState } from 'react';
import { 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  FileText, 
  Plus, 
  Bell, 
  MessageSquare, 
  ShieldCheck, 
  ChevronRight,
  Info
} from 'lucide-react';
import { ApplicationDraft, ApplicationStatus, StatusAttribution } from '../types';

interface ApplicationTrackerProps {
  applications: ApplicationDraft[];
  onOpenDraft: (app: ApplicationDraft) => void;
  onUpdateStatus: (appId: string, newStatus: ApplicationStatus, attribution: StatusAttribution) => void;
  onAddNote: (appId: string, note: string) => void;
  onCreateReminderForApp: (app: ApplicationDraft) => void;
  onOpenOfficialPortal: (url: string) => void;
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  applications,
  onOpenDraft,
  onUpdateStatus,
  onAddNote,
  onCreateReminderForApp,
  onOpenOfficialPortal
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');
  const [newNoteText, setNewNoteText] = useState<string>('');

  const activeApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const getAttributionBadge = (attribution: StatusAttribution) => {
    switch (attribution) {
      case 'Officially verified':
        return (
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
            Officially Verified
          </span>
        );
      case 'PlacePilot-generated':
        return (
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold border border-teal-200">
            PlacePilot Generated
          </span>
        );
      case 'Citizen-entered':
        return (
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200">
            Citizen Reported
          </span>
        );
      default:
        return (
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F8F7F2] text-[#68736D] font-bold border border-[#E5E9E5]">
            Simulated Demo Data
          </span>
        );
    }
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !activeApp) return;
    onAddNote(activeApp.id, newNoteText.trim());
    setNewNoteText('');
  };

  return (
    <div className="space-y-6 text-[#17231F]">
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E5E9E5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#123D32] text-white text-xs font-bold">
          <Send className="w-3.5 h-3.5 text-[#F4A261]" />
          <span>APPLICATION TRACKER</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#17231F]">
          Application Folio & Status History
        </h2>
        <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed">
          Track application status timelines, record personal notes, and distinguish between citizen-reported, PlacePilot-generated, and officially verified statuses.
        </p>
      </div>

      {/* TRACKER CONTENT */}
      {applications.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Applications List */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E5E9E5] rounded-2xl p-4 space-y-2 shadow-sm h-fit">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#68736D] block px-2 pb-1 border-b border-[#E5E9E5]">
              Applications ({applications.length})
            </span>

            {applications.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`p-3.5 rounded-xl cursor-pointer border transition text-xs space-y-1.5 ${
                  (activeApp?.id === app.id)
                    ? 'bg-[#123D32] text-white border-[#123D32] shadow-sm'
                    : 'bg-[#F8F7F2] text-[#17231F] border-[#E5E9E5] hover:border-[#008F68]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`font-bold px-2 py-0.5 rounded-full ${activeApp?.id === app.id ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                    {app.status}
                  </span>
                  <span className={activeApp?.id === app.id ? 'text-emerald-200' : 'text-[#68736D]'}>
                    {new Date(app.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-bold text-sm line-clamp-1">{app.schemeTitle}</h4>
              </div>
            ))}
          </div>

          {/* Active Application Timeline & Details */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E5E9E5] rounded-2xl p-6 shadow-sm space-y-6">
            {activeApp && (
              <>
                <div className="space-y-2 border-b border-[#E5E9E5] pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#008F68]">Application Details</span>
                    {getAttributionBadge(activeApp.statusAttribution)}
                  </div>
                  <h3 className="font-bold text-lg text-[#17231F]">{activeApp.schemeTitle}</h3>
                  <p className="text-xs text-[#68736D]">Status: <strong className="text-[#008F68]">{activeApp.status}</strong></p>
                </div>

                {/* Audit Checksum if approved */}
                {activeApp.approvalAudit && (
                  <div className="bg-[#F8F7F2] border border-[#E5E9E5] p-3.5 rounded-xl text-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#008F68] block">Audited Human Approval Signature</span>
                    <p className="font-black text-[#17231F]">{activeApp.approvalAudit.auditChecksum}</p>
                    <p className="text-[11px] text-[#68736D]">{activeApp.approvalAudit.statement}</p>
                  </div>
                )}

                {/* Status Timeline */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#123D32]">Status History Timeline</h4>
                  <div className="space-y-2 border-l-2 border-[#008F68] pl-4 text-xs">
                    {activeApp.timeline.map((evt, idx) => (
                      <div key={idx} className="space-y-0.5 relative">
                        <div className="flex items-center justify-between font-bold text-[#17231F]">
                          <span>{evt.status}</span>
                          <span className="text-[10px] text-[#68736D]">{new Date(evt.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-[11px] text-[#68736D]">{evt.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Handoff CTA */}
                {activeApp.officialPortalUrl && (
                  <div className="pt-2">
                    <button
                      onClick={() => onOpenOfficialPortal(activeApp.officialPortalUrl!)}
                      className="w-full py-3 rounded-xl bg-[#008F68] hover:bg-[#007353] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Verified Government Portal</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      ) : (
        <div className="bg-[#FFFFFF] border border-[#E5E9E5] p-8 rounded-2xl text-center space-y-2 text-xs text-[#68736D]">
          <Send className="w-8 h-8 text-[#008F68] mx-auto" />
          <p className="font-bold text-[#17231F]">No Application Drafts in Folio</p>
          <p>Explore schemes and prepare an application draft in Form Studio.</p>
        </div>
      )}
    </div>
  );
};
