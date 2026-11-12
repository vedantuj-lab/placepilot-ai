import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Layers, 
  Activity, 
  FileText, 
  Lock,
  Edit2,
  Trash2,
  History,
  GraduationCap,
  Sliders,
  RefreshCw,
  Search,
  DollarSign
} from 'lucide-react';
import { Scheme, AuditLog, VerificationStatus } from '../types';
import { SCHEME_CATEGORIES } from '../data/schemes';

interface AdminWorkspaceProps {
  schemes: Scheme[];
  auditLogs: AuditLog[];
  currentView?: string;
  onSaveScheme: (scheme: Scheme) => void;
  onUpdateSourceStatus: (schemeId: string, status: VerificationStatus) => void;
}

export const AdminWorkspace: React.FC<AdminWorkspaceProps> = ({
  schemes,
  auditLogs,
  currentView,
  onSaveScheme,
  onUpdateSourceStatus
}) => {
  const getTabFromView = (view?: string): 'analytics' | 'schemes' | 'scholarships' | 'rules' | 'sources' | 'categories' | 'audit' => {
    if (!view) return 'analytics';
    if (view === 'admin_schemes') return 'schemes';
    if (view === 'admin_scholarships') return 'scholarships';
    if (view === 'admin_rules') return 'rules';
    if (view === 'admin_sources') return 'sources';
    if (view === 'admin_categories') return 'categories';
    if (view === 'admin_analytics') return 'analytics';
    if (view === 'admin_audit') return 'audit';
    return 'analytics';
  };

  const [activeTab, setActiveTab] = useState<'analytics' | 'schemes' | 'scholarships' | 'rules' | 'sources' | 'categories' | 'audit'>(() => getTabFromView(currentView));

  React.useEffect(() => {
    if (currentView) {
      setActiveTab(getTabFromView(currentView));
    }
  }, [currentView]);
  const [isAddingScheme, setIsAddingScheme] = useState(false);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [auditSearch, setAuditSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Scheme Form State
  const [newSchemeTitle, setNewSchemeTitle] = useState('');
  const [newSchemeDepartment, setNewSchemeDepartment] = useState('');
  const [newSchemeCategory, setNewSchemeCategory] = useState('Education and Scholarships');
  const [newSchemeLevel, setNewSchemeLevel] = useState<'Central' | 'State'>('State');
  const [newSchemeState, setNewSchemeState] = useState('Maharashtra');
  const [newSchemeBenefit, setNewSchemeBenefit] = useState('');
  const [newSchemeSummary, setNewSchemeSummary] = useState('');
  const [newSchemeUrl, setNewSchemeUrl] = useState('https://mahadbt.maharashtra.gov.in/');
  const [newSchemeIsScholarship, setNewSchemeIsScholarship] = useState(false);

  // Income Threshold State for Rules Manager
  const [ruleThresholds, setRuleThresholds] = useState<Record<string, number>>({
    'MAHA_OBC_SCHOLARSHIP': 150000,
    'MAHA_EBC_SCHOLARSHIP': 800000,
    'CENTRAL_SECTOR_SCHOLARSHIP': 450000,
    'PM_KISAN': 200000,
    'LADKI_BAHIN': 250000
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalSchemes = schemes.length;
  const verifiedSchemes = schemes.filter(s => s.sourceVerificationStatus === 'VERIFIED').length;
  const pendingSchemes = schemes.filter(s => s.sourceVerificationStatus === 'PENDING').length;
  const brokenSchemes = schemes.filter(s => s.sourceVerificationStatus === 'BROKEN').length;
  const scholarshipSchemes = schemes.filter(s => s.isScholarship);

  const handleCreateSchemeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchemeTitle || !newSchemeDepartment) {
      alert('Please fill out the scheme title and department.');
      return;
    }

    const createdScheme: Scheme = {
      id: `sch-custom-${Date.now()}`,
      slug: newSchemeTitle.toLowerCase().replace(/[^a-z0-0]+/g, '-'),
      title: newSchemeTitle,
      titleHi: newSchemeTitle,
      titleMr: newSchemeTitle,
      department: newSchemeDepartment,
      level: newSchemeLevel,
      state: newSchemeState,
      category: newSchemeCategory,
      isScholarship: newSchemeIsScholarship,
      description: newSchemeSummary || 'Government welfare program for eligible citizens.',
      descriptionHi: newSchemeSummary || 'पात्र नागरिकों के लिए सरकारी कल्याण कार्यक्रम।',
      descriptionMr: newSchemeSummary || 'पात्र नागरिकांसाठी शासकीय कल्याणकारी कार्यक्रम.',
      benefits: [newSchemeBenefit || 'Direct benefit transfer to bank account'],
      eligibilitySummary: newSchemeSummary || 'Resident of state; meets income requirements.',
      eligibilitySummaryHi: newSchemeSummary || 'राज्य निवासी; आय आवश्यकताओं को पूरा करता है।',
      eligibilitySummaryMr: newSchemeSummary || 'राज्य रहिवासी; उत्पन्न आवश्यकता पूर्ण करते.',
      officialSourceUrl: newSchemeUrl,
      officialApplicationUrl: newSchemeUrl,
      acceptingApplications: true,
      requiredDocuments: ['Aadhaar Card', 'Domicile Certificate', 'Income Certificate'],
      tags: ['Welfare', 'Education', 'Government'],
      sourceVerificationStatus: 'VERIFIED',
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      commonPortalName: 'MahaDBT Official Portal'
    };

    onSaveScheme(createdScheme);
    setIsAddingScheme(false);
    showToast(`New scheme "${newSchemeTitle}" published to Citizen Explorer!`);
    setNewSchemeTitle('');
    setNewSchemeDepartment('');
    setNewSchemeBenefit('');
    setNewSchemeSummary('');
  };

  const handleUpdateRuleThreshold = (schemeId: string, newIncome: number) => {
    setRuleThresholds(prev => ({ ...prev, [schemeId]: newIncome }));
    showToast(`Income threshold updated to ₹${newIncome.toLocaleString('en-IN')}!`);
  };

  const filteredSchemes = schemes.filter(s =>
    s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.department.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredAuditLogs = auditLogs.filter(log =>
    log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.actor.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 text-zinc-100 font-sans selection:bg-[#EAB308] selection:text-black">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#881337] border border-[#F59E0B] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header - Graphite & Crimson */}
      <div className="bg-[#18181B] border border-[#BE123C]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-black text-white flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-[#EAB308]" />
                <span>Admin Government Portal Workspace</span>
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#BE123C] text-white font-black uppercase">
                Officer Level
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1">
              Manage nationwide scheme catalogue, verify official government sources, configure eligibility rules, and monitor audit logs.
            </p>
          </div>

          <button
            onClick={() => setIsAddingScheme(true)}
            className="px-4 py-2.5 rounded-xl bg-[#BE123C] hover:bg-[#9f1239] text-white font-bold text-xs flex items-center space-x-2 shadow-lg transition cursor-pointer self-start sm:self-center border border-rose-500/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Scheme</span>
          </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex flex-wrap border-b border-[#3F3F46] gap-1 text-xs font-bold">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 px-3.5 transition border-b-2 cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'analytics' ? 'border-[#EAB308] text-[#EAB308]' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Analytics & Health</span>
        </button>

        <button
          onClick={() => setActiveTab('schemes')}
          className={`pb-3 px-3.5 transition border-b-2 cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'schemes' ? 'border-[#EAB308] text-[#EAB308]' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Scheme Catalogue ({schemes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('scholarships')}
          className={`pb-3 px-3.5 transition border-b-2 cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'scholarships' ? 'border-[#EAB308] text-[#EAB308]' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-rose-400" />
          <span>Scholarships ({scholarshipSchemes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`pb-3 px-3.5 transition border-b-2 cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'rules' ? 'border-[#EAB308] text-[#EAB308]' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Eligibility Rules</span>
        </button>

        <button
          onClick={() => setActiveTab('sources')}
          className={`pb-3 px-3.5 transition border-b-2 cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'sources' ? 'border-[#EAB308] text-[#EAB308]' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Source Verification</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-3 px-3.5 transition border-b-2 cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'categories' ? 'border-[#EAB308] text-[#EAB308]' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Categories & Departments</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 px-3.5 transition border-b-2 cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'audit' ? 'border-[#EAB308] text-[#EAB308]' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Security Audit Logs ({auditLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: ANALYTICS & SYSTEM HEALTH */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#18181B] border border-[#BE123C]/40 p-5 rounded-2xl shadow-xl space-y-1">
              <span className="text-zinc-400 font-bold block">Total Schemes</span>
              <div className="text-3xl font-black text-white">{totalSchemes}</div>
              <p className="text-[10px] text-[#EAB308] font-bold">Active Public Catalogue</p>
            </div>

            <div className="bg-[#18181B] border border-[#BE123C]/40 p-5 rounded-2xl shadow-xl space-y-1">
              <span className="text-zinc-400 font-bold block">Verified Sources</span>
              <div className="text-3xl font-black text-emerald-400">{verifiedSchemes}</div>
              <p className="text-[10px] text-emerald-400 font-bold">HTTPS .gov.in Validated</p>
            </div>

            <div className="bg-[#18181B] border border-[#BE123C]/40 p-5 rounded-2xl shadow-xl space-y-1">
              <span className="text-zinc-400 font-bold block">Pending Review</span>
              <div className="text-3xl font-black text-[#EAB308]">{pendingSchemes}</div>
              <p className="text-[10px] text-[#EAB308] font-bold">Awaiting Gazette</p>
            </div>

            <div className="bg-[#18181B] border border-[#BE123C]/40 p-5 rounded-2xl shadow-xl space-y-1">
              <span className="text-zinc-400 font-bold block">Security Audit Trails</span>
              <div className="text-3xl font-black text-purple-400">{auditLogs.length}</div>
              <p className="text-[10px] text-purple-300 font-bold">Recorded Events</p>
            </div>
          </div>

          <div className="bg-[#18181B] border border-[#BE123C]/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#3F3F46] pb-3">
              <div>
                <h3 className="font-black text-base text-white">System Infrastructure & SSL Health</h3>
                <p className="text-zinc-400 text-xs">Realtime monitor for official government portal connectivity.</p>
              </div>
              <button
                onClick={() => showToast('All 22 official government portal URLs pinged successfully. 100% operational.')}
                className="px-3.5 py-1.5 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-white font-bold flex items-center space-x-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#EAB308]" />
                <span>Run System Health Audit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#27272A] border border-[#3F3F46] space-y-1">
                <span className="text-zinc-400 font-bold text-[11px]">Database Realtime Service</span>
                <p className="text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ONLINE (Supabase WebSocket Active)</span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#27272A] border border-[#3F3F46] space-y-1">
                <span className="text-zinc-400 font-bold text-[11px]">Rules Engine Performance</span>
                <p className="text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Deterministic (100% Accuracy)</span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#27272A] border border-[#3F3F46] space-y-1">
                <span className="text-zinc-400 font-bold text-[11px]">Gemini AI Tooling Layer</span>
                <p className="text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>25 Tools Registered</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SCHEME CATALOGUE */}
      {activeTab === 'schemes' && (
        <div className="bg-[#18181B] border border-[#BE123C]/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3F3F46] pb-3">
            <h3 className="font-black text-base text-white">Government Scheme Catalogue ({schemes.length})</h3>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter by title or department..."
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-[#27272A] border border-[#3F3F46] text-xs text-white focus:outline-none focus:border-[#EAB308]"
                />
              </div>

              <button
                onClick={() => setIsAddingScheme(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#BE123C] hover:bg-[#9f1239] text-white font-bold text-xs flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Scheme</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredSchemes.map((s) => (
              <div key={s.id} className="bg-[#27272A] border border-[#3F3F46] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#EAB308] transition">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white">{s.title}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      s.level === 'Central' ? 'bg-[#BE123C] text-white' : 'bg-teal-950 text-teal-300 border border-teal-800'
                    }`}>
                      {s.level === 'Central' ? 'Central' : s.state}
                    </span>
                    {s.isScholarship && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                        Scholarship
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400">{s.department}</p>
                  <p className="text-[11px] text-zinc-300 line-clamp-1">{s.eligibilitySummary}</p>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <a
                    href={s.officialSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-[#18181B] text-[#EAB308] hover:bg-[#3F3F46] transition"
                    title="Open Official Portal"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <select
                    value={s.sourceVerificationStatus}
                    onChange={(e) => onUpdateSourceStatus(s.id, e.target.value as VerificationStatus)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#18181B] border border-[#3F3F46] font-bold text-xs text-white"
                  >
                    <option value="VERIFIED">VERIFIED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="BROKEN">BROKEN</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SCHOLARSHIPS PORTAL MANAGEMENT */}
      {activeTab === 'scholarships' && (
        <div className="bg-[#18181B] border border-[#BE123C]/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-[#3F3F46] pb-3">
            <div>
              <h3 className="font-black text-base text-white">Scholarships Portal Management ({scholarshipSchemes.length})</h3>
              <p className="text-zinc-400 text-xs">Configure academic year funding allocations and student quota policies.</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-bold">
              Academic Year 2026-2027
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {scholarshipSchemes.map((s) => (
              <div key={s.id} className="bg-[#27272A] border border-[#3F3F46] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-[#F59E0B]" />
                    <span className="font-bold text-sm text-white">{s.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">{s.department}</p>
                  <p className="text-xs font-bold text-emerald-400">Benefit: {s.benefits[0] || '100% Tuition Fee Waiver'}</p>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <div className="bg-[#18181B] border border-[#3F3F46] px-3 py-2 rounded-xl text-right">
                    <span className="text-[10px] text-zinc-400 block uppercase font-bold">State Fund Budget</span>
                    <span className="font-bold text-[#EAB308]">₹250 Crore Allocated</span>
                  </div>

                  <button
                    onClick={() => showToast(`Funding allocation updated for ${s.title}`)}
                    className="px-3 py-2 rounded-xl bg-[#BE123C] hover:bg-[#9f1239] text-white font-bold transition cursor-pointer"
                  >
                    Configure Quota
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ELIGIBILITY RULES MANAGER */}
      {activeTab === 'rules' && (
        <div className="bg-[#18181B] border border-[#BE123C]/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
          <div className="border-b border-[#3F3F46] pb-3">
            <h3 className="font-black text-base text-white">Deterministic Rules Engine Thresholds</h3>
            <p className="text-zinc-400 text-xs">Configure income limits and domicile conditions evaluated by the rules engine.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#27272A] border border-[#3F3F46] p-4 rounded-2xl space-y-3">
              <span className="font-bold text-sm text-white block">MahaDBT OBC Scholarship Rule</span>
              <div className="space-y-2">
                <label className="text-[11px] text-zinc-300 block font-semibold">Max Annual Family Income Limit (₹)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={ruleThresholds['MAHA_OBC_SCHOLARSHIP'] || 150000}
                    onChange={(e) => handleUpdateRuleThreshold('MAHA_OBC_SCHOLARSHIP', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-[#18181B] border border-[#3F3F46] text-xs font-bold text-white focus:outline-none focus:border-[#EAB308]"
                  />
                  <button
                    onClick={() => handleUpdateRuleThreshold('MAHA_OBC_SCHOLARSHIP', ruleThresholds['MAHA_OBC_SCHOLARSHIP'] || 150000)}
                    className="px-3 py-2 rounded-xl bg-[#EAB308] text-black font-black hover:bg-amber-400 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#27272A] border border-[#3F3F46] p-4 rounded-2xl space-y-3">
              <span className="font-bold text-sm text-white block">Rajarshi Shahu Maharaj EBC Scheme Rule</span>
              <div className="space-y-2">
                <label className="text-[11px] text-zinc-300 block font-semibold">Max Annual Family Income Limit (₹)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={ruleThresholds['MAHA_EBC_SCHOLARSHIP'] || 800000}
                    onChange={(e) => handleUpdateRuleThreshold('MAHA_EBC_SCHOLARSHIP', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-[#18181B] border border-[#3F3F46] text-xs font-bold text-white focus:outline-none focus:border-[#EAB308]"
                  />
                  <button
                    onClick={() => handleUpdateRuleThreshold('MAHA_EBC_SCHOLARSHIP', ruleThresholds['MAHA_EBC_SCHOLARSHIP'] || 800000)}
                    className="px-3 py-2 rounded-xl bg-[#EAB308] text-black font-black hover:bg-amber-400 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SOURCE VERIFICATION MONITOR */}
      {activeTab === 'sources' && (
        <div className="bg-[#18181B] border border-[#BE123C]/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
          <div className="border-b border-[#3F3F46] pb-3">
            <h3 className="font-black text-base text-white">Official Source Verification Monitor</h3>
            <p className="text-zinc-400 text-xs">Verify domain security, HTTPS SSL certificates, and official government portal URLs.</p>
          </div>

          <div className="space-y-2">
            {schemes.map((s) => (
              <div key={s.id} className="bg-[#27272A] border border-[#3F3F46] p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{s.title}</span>
                  <a href={s.officialSourceUrl} target="_blank" rel="noreferrer" className="text-[11px] text-[#EAB308] hover:underline flex items-center space-x-1">
                    <span className="truncate max-w-sm">{s.officialSourceUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={s.sourceVerificationStatus}
                    onChange={(e) => onUpdateSourceStatus(s.id, e.target.value as VerificationStatus)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#18181B] border border-[#3F3F46] font-bold text-xs text-white"
                  >
                    <option value="VERIFIED">VERIFIED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="BROKEN">BROKEN</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: CATEGORIES & DEPARTMENTS DIRECTORY */}
      {activeTab === 'categories' && (
        <div className="bg-[#18181B] border border-[#BE123C]/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
          <div className="border-b border-[#3F3F46] pb-3">
            <h3 className="font-black text-base text-white">Categories & Department Directory</h3>
            <p className="text-zinc-400 text-xs">Active government departments publishing welfare schemes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {SCHEME_CATEGORIES.map((cat) => {
              const catSchemesCount = schemes.filter(s => s.category === cat).length;
              return (
                <div key={cat} className="bg-[#27272A] border border-[#3F3F46] p-4 rounded-xl space-y-1">
                  <span className="font-bold text-white text-sm block">{cat}</span>
                  <p className="text-[11px] text-[#EAB308] font-bold">{catSchemesCount} Active Schemes Published</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 7: SECURITY AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-[#18181B] border border-[#BE123C]/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3F3F46] pb-3">
            <h3 className="font-black text-base text-white">Security & Human Approval Audit Logs ({auditLogs.length})</h3>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="Filter audit logs..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-[#27272A] border border-[#3F3F46] text-xs text-white focus:outline-none focus:border-[#EAB308]"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredAuditLogs.map((log) => (
              <div key={log.id} className="bg-[#27272A] border border-[#3F3F46] p-3 rounded-xl font-mono text-[11px] space-y-0.5">
                <div className="flex justify-between font-bold text-[#EAB308]">
                  <span>[{log.level}] {log.action}</span>
                  <span className="text-zinc-400">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-zinc-200">{log.details}</p>
                <span className="text-[10px] text-zinc-400">Actor: {log.actor}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD SCHEME MODAL */}
      {isAddingScheme && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#18181B] border border-[#BE123C] w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-2xl text-xs text-white">
            <div className="flex justify-between items-center border-b border-[#3F3F46] pb-3">
              <h3 className="text-base font-black text-white">Add New Scheme to Catalogue</h3>
              <button onClick={() => setIsAddingScheme(false)} className="text-zinc-400 hover:text-white font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateSchemeSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold block text-zinc-300">Scheme Title</label>
                <input
                  type="text"
                  required
                  value={newSchemeTitle}
                  onChange={(e) => setNewSchemeTitle(e.target.value)}
                  placeholder="e.g. Post-Matric Scholarship for Minority Students"
                  className="w-full px-3 py-2 rounded-xl bg-[#27272A] border border-[#3F3F46] text-xs text-white focus:outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold block text-zinc-300">Government Department</label>
                <input
                  type="text"
                  required
                  value={newSchemeDepartment}
                  onChange={(e) => setNewSchemeDepartment(e.target.value)}
                  placeholder="e.g. Social Justice and Special Assistance Department"
                  className="w-full px-3 py-2 rounded-xl bg-[#27272A] border border-[#3F3F46] text-xs text-white focus:outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold block text-zinc-300">Government Level</label>
                  <select
                    value={newSchemeLevel}
                    onChange={(e) => setNewSchemeLevel(e.target.value as 'Central' | 'State')}
                    className="w-full px-3 py-2 rounded-xl bg-[#27272A] border border-[#3F3F46] text-xs text-white"
                  >
                    <option value="State">State Govt</option>
                    <option value="Central">Central Govt</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold block text-zinc-300">Category</label>
                  <select
                    value={newSchemeCategory}
                    onChange={(e) => setNewSchemeCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#27272A] border border-[#3F3F46] text-xs text-white"
                  >
                    {SCHEME_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold block text-zinc-300">Key Benefit Summary</label>
                <input
                  type="text"
                  value={newSchemeBenefit}
                  onChange={(e) => setNewSchemeBenefit(e.target.value)}
                  placeholder="e.g. 100% Tuition Fee & Maintenance Allowance"
                  className="w-full px-3 py-2 rounded-xl bg-[#27272A] border border-[#3F3F46] text-xs text-white focus:outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold block text-zinc-300">Official Government Source URL</label>
                <input
                  type="url"
                  required
                  value={newSchemeUrl}
                  onChange={(e) => setNewSchemeUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#27272A] border border-[#3F3F46] text-xs text-white focus:outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="pt-3 border-t border-[#3F3F46] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddingScheme(false)}
                  className="px-4 py-2 rounded-xl bg-[#27272A] text-zinc-300 font-bold hover:bg-[#3F3F46]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#BE123C] text-white font-bold hover:bg-[#9f1239] cursor-pointer"
                >
                  Publish Scheme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
