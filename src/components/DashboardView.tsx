import React, { useState } from 'react';
import { 
  Bot, 
  Compass, 
  CheckCircle2, 
  FileText, 
  Send, 
  Bell, 
  User,
  ArrowRight, 
  Building2,
  Clock, 
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  Bookmark,
  Sparkles,
  Plus
} from 'lucide-react';
import { CitizenProfile, Scheme, DocumentItem, ApplicationDraft, ReminderTask, AuditLog } from '../types';

interface DashboardViewProps {
  profile: CitizenProfile;
  completeness: number;
  schemes: Scheme[];
  documents: DocumentItem[];
  applications: ApplicationDraft[];
  reminders: ReminderTask[];
  auditLogs: AuditLog[];
  onNavigate: (view: string, payload?: any) => void;
  onOpenScheme: (scheme: Scheme) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  completeness,
  schemes,
  documents,
  applications,
  reminders,
  auditLogs,
  onNavigate,
  onOpenScheme
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const pendingDocsCount = documents.filter(d => !d.verifiedByCitizen).length;
  const activeAppsCount = applications.length;

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Compass, actionView: 'dashboard' },
    { id: 'find_schemes', label: 'Find Schemes', icon: Compass, actionView: 'explorer' },
    { id: 'scholarships', label: 'Scholarships', icon: GraduationCap, actionView: 'scholarships' },
    { id: 'eligibility', label: 'My Eligibility', icon: CheckCircle2, actionView: 'eligibility' },
    { id: 'documents', label: 'My Documents', icon: FileText, actionView: 'documents' },
    { id: 'applications', label: 'My Applications', icon: Send, actionView: 'applications' },
    { id: 'reminders', label: 'Reminders', icon: Bell, actionView: 'reminders' },
    { id: 'assistant', label: 'Scheme Saathi', icon: Bot, actionView: 'assistant' },
    { id: 'profile', label: 'Profile', icon: User, actionView: 'profile' },
  ];

  const recommendedSchemes = schemes.filter(s =>
    s.state === profile.state || s.level === 'Central'
  ).slice(0, 3);

  const handleSidebarClick = (item: typeof sidebarItems[0]) => {
    setActiveTab(item.id);
    if (item.actionView !== 'dashboard') {
      onNavigate(item.actionView);
    }
  };

  return (
    <div className="space-y-6 text-[#CCFBF1] selection:bg-[#F59E0B] selection:text-black">
      {/* MAIN CONTENT AREA */}
      <div className="space-y-6">

        {/* HEADER */}
        <div className="bg-[#042F2E] border border-[#0D9488]/50 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] block">
              Citizen Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome back, {profile.fullName.split(' ')[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-[#99F6E4]">
              Let's find the government benefits you may qualify for.
            </p>
          </div>

          {/* QUICK ACTIONS */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => onNavigate('explorer')}
              className="px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#115E59] text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#F59E0B]" />
              <span>Find Schemes</span>
            </button>

            <button
              onClick={() => onNavigate('eligibility')}
              className="px-4 py-2.5 rounded-xl bg-[#115E59] hover:bg-[#134E4A] text-white border border-[#0D9488] font-bold text-xs flex items-center space-x-2 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#99F6E4]" />
              <span>Check Eligibility</span>
            </button>

            <button
              onClick={() => onNavigate('form_studio')}
              className="px-4 py-2.5 rounded-xl bg-[#115E59] hover:bg-[#134E4A] text-white border border-[#0D9488] font-bold text-xs flex items-center space-x-2 transition cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#F59E0B]" />
              <span>Prepare Application</span>
            </button>

            <button
              onClick={() => onNavigate('assistant')}
              className="px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-black text-xs flex items-center space-x-2 shadow-sm transition cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>Talk to Scheme Saathi</span>
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('explorer')}
            className="bg-[#042F2E] border border-[#0D9488]/40 hover:border-[#0D9488] p-4 rounded-2xl cursor-pointer transition shadow-md space-y-1"
          >
            <span className="text-[11px] font-semibold text-[#99F6E4]">Recommended</span>
            <div className="text-2xl font-black text-white">{recommendedSchemes.length}</div>
            <p className="text-[10px] text-[#F59E0B] font-bold">Matching Profile</p>
          </div>

          <div
            onClick={() => onNavigate('explorer')}
            className="bg-[#042F2E] border border-[#0D9488]/40 hover:border-[#0D9488] p-4 rounded-2xl cursor-pointer transition shadow-md space-y-1"
          >
            <span className="text-[11px] font-semibold text-[#99F6E4]">Saved Schemes</span>
            <div className="text-2xl font-black text-white">2</div>
            <p className="text-[10px] text-[#99F6E4] font-bold">In Folio</p>
          </div>

          <div
            onClick={() => onNavigate('applications')}
            className="bg-[#042F2E] border border-[#0D9488]/40 hover:border-[#0D9488] p-4 rounded-2xl cursor-pointer transition shadow-md space-y-1"
          >
            <span className="text-[11px] font-semibold text-[#99F6E4]">Active Apps</span>
            <div className="text-2xl font-black text-white">{activeAppsCount}</div>
            <p className="text-[10px] text-teal-300 font-bold">Ready for Handoff</p>
          </div>

          <div
            onClick={() => onNavigate('documents')}
            className="bg-[#042F2E] border border-[#0D9488]/40 hover:border-[#0D9488] p-4 rounded-2xl cursor-pointer transition shadow-md space-y-1"
          >
            <span className="text-[11px] font-semibold text-[#99F6E4]">Pending Docs</span>
            <div className="text-2xl font-black text-white">{pendingDocsCount}</div>
            <p className="text-[10px] text-[#F59E0B] font-bold">Action Needed</p>
          </div>
        </div>

        {/* BELOW SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#042F2E] border border-[#0D9488]/40 rounded-2xl p-5 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-[#0D9488]/30 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <Compass className="w-4 h-4 text-[#F59E0B]" />
                <span>Recommended Schemes</span>
              </h3>
              <button onClick={() => onNavigate('explorer')} className="text-xs font-bold text-[#F59E0B] hover:underline">View All</button>
            </div>

            <div className="space-y-3">
              {recommendedSchemes.map((s) => (
                <div
                  key={s.id}
                  onClick={() => onOpenScheme(s)}
                  className="bg-[#115E59] border border-[#0D9488]/60 hover:border-[#0D9488] p-3.5 rounded-xl cursor-pointer transition space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-[#F59E0B] uppercase">{s.level} • {s.state}</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#042F2E] text-[#99F6E4] font-bold">{s.category}</span>
                  </div>
                  <h4 className="font-bold text-xs text-white line-clamp-1">{s.title}</h4>
                  <p className="text-[11px] text-[#99F6E4] line-clamp-2">{s.eligibilitySummary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#042F2E] border border-[#0D9488]/40 rounded-2xl p-5 space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-[#0D9488]/30 pb-2">
                <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                  <Send className="w-4 h-4 text-teal-300" />
                  <span>Recent Applications</span>
                </h3>
                <button onClick={() => onNavigate('applications')} className="text-xs font-bold text-[#F59E0B] hover:underline">Track All</button>
              </div>

              {applications.length > 0 ? (
                applications.slice(0, 2).map((app) => (
                  <div key={app.id} className="bg-[#115E59] border border-[#0D9488]/60 p-3 rounded-xl space-y-1 text-xs">
                    <span className="font-bold text-white block truncate">{app.schemeTitle}</span>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="px-2 py-0.5 rounded-full bg-[#042F2E] text-[#99F6E4] font-bold">{app.status}</span>
                      <span className="text-[#99F6E4]">{app.statusAttribution}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#99F6E4] italic">No active drafts yet.</p>
              )}
            </div>

            <div className="bg-[#042F2E] border border-[#0D9488]/40 rounded-2xl p-5 space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-[#0D9488]/30 pb-2">
                <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-[#F59E0B]" />
                  <span>Upcoming Reminders</span>
                </h3>
                <button onClick={() => onNavigate('reminders')} className="text-xs font-bold text-[#F59E0B] hover:underline">Planner</button>
              </div>

              {reminders.filter(r => !r.isCompleted).length > 0 ? (
                reminders.filter(r => !r.isCompleted).slice(0, 2).map((rem) => (
                  <div key={rem.id} className="bg-[#115E59] border border-[#0D9488]/60 p-3 rounded-xl space-y-1 text-xs">
                    <span className="font-bold text-white block">{rem.title}</span>
                    <p className="text-[11px] text-[#99F6E4]">{rem.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#99F6E4] italic">No pending reminders.</p>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
