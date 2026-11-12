import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  CheckCircle2, 
  Award, 
  Calendar, 
  Building2, 
  FileText, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Scheme, Language, CitizenProfile } from '../types';

interface ScholarshipPortalProps {
  schemes: Scheme[];
  language: Language;
  profile: CitizenProfile;
  onViewDetails: (scheme: Scheme) => void;
  onCheckEligibility: (schemeId: string) => void;
  onViewDocuments: (schemeId: string) => void;
  onOpenOfficialUrl: (scheme: Scheme, url: string, label: string) => void;
}

export const ScholarshipPortal: React.FC<ScholarshipPortalProps> = ({
  schemes,
  language,
  profile,
  onViewDetails,
  onCheckEligibility,
  onViewDocuments,
  onOpenOfficialUrl
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('2025-26');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const scholarships = useMemo(() => {
    return schemes.filter(s => s.isScholarship);
  }, [schemes]);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter(s => {
      if (selectedYear !== 'All' && s.academicYear && s.academicYear !== selectedYear) {
        return false;
      }

      if (selectedState !== 'All') {
        if (s.state !== selectedState && s.state !== 'All India') return false;
      }

      if (selectedType !== 'All') {
        const matchesType = s.tags.some(t => t.toLowerCase() === selectedType.toLowerCase()) ||
          s.title.toLowerCase().includes(selectedType.toLowerCase());
        if (!matchesType) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [scholarships, selectedYear, selectedType, selectedState, searchQuery]);

  return (
    <div className="space-y-6 text-[#FFE4E6] selection:bg-[#FDE047] selection:text-black">
      {/* Header - Burgundy & Champagne Gold */}
      <div className="bg-gradient-to-r from-[#4C0519] via-[#881337] to-[#4C0519] border border-[#F43F5E]/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#881337] text-[#FDE047] text-xs font-bold border border-[#FDE047]/30">
          <GraduationCap className="w-3.5 h-3.5 text-[#FDE047]" />
          <span>DEDICATED SCHOLARSHIP PORTAL</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white">
          Higher Education & Skill Scholarships
        </h2>

        <p className="text-xs sm:text-sm text-[#FECDD3] leading-relaxed max-w-2xl">
          Discover post-matric, pre-matric, merit-cum-means, girl child, and reserved category scholarships for academic year {selectedYear}. Verified against official guidelines from MahaDBT, NSP, and AICTE.
        </p>

        <div className="pt-2 flex items-center space-x-2 text-xs text-[#FECDD3]">
          <span className="font-semibold text-white">Logged Student:</span>
          <span className="font-bold text-[#FDE047]">{profile.fullName}</span>
          <span>• {profile.educationLevel || 'Undergraduate'}</span>
          <span>• Income: ₹{profile.annualFamilyIncome.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* FILTER TOOLBAR */}
      <div className="bg-[#4C0519] border border-[#F43F5E]/30 p-5 rounded-2xl shadow-xl space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#FDE047] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scholarships by course, category (OBC, SC, EBC, Girls) or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#881337] border border-[#F43F5E]/40 text-xs font-medium text-white focus:outline-none focus:border-[#FDE047] transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#FECDD3] block text-[11px]">Academic Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#881337] border border-[#F43F5E]/40 font-medium text-white focus:outline-none focus:border-[#FDE047]"
            >
              <option value="2025-26">2025-26 (Current Session)</option>
              <option value="2026-27">2026-27 (Upcoming Session)</option>
              <option value="All">All Academic Years</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#FECDD3] block text-[11px]">Scholarship Category / Tag</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#881337] border border-[#F43F5E]/40 font-medium text-white focus:outline-none focus:border-[#FDE047]"
            >
              <option value="All">All Categories (OBC, General/EBC, SC, Girls, Hostels)</option>
              <option value="OBC">OBC Scholarships</option>
              <option value="EBC">EBC / General Fee Waivers</option>
              <option value="Girls">Girls Education</option>
              <option value="Hostel">Hostel Maintenance Allowance</option>
              <option value="Merit">Merit-cum-Means</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#FECDD3] block text-[11px]">State / Region</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#881337] border border-[#F43F5E]/40 font-medium text-white focus:outline-none focus:border-[#FDE047]"
            >
              <option value="Maharashtra">Maharashtra (MahaDBT)</option>
              <option value="All India">All India / Central Sector (NSP)</option>
              <option value="All">All Regions</option>
            </select>
          </div>
        </div>
      </div>

      {/* SCHOLARSHIP CARDS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredScholarships.map((sch) => (
          <div key={sch.id} className="bg-[#4C0519] border border-[#F43F5E]/40 hover:border-[#FDE047] rounded-2xl p-5 shadow-xl flex flex-col justify-between transition space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FDE047] px-2.5 py-0.5 rounded-full bg-[#881337] border border-[#F43F5E]/40">
                  {sch.state === 'All India' ? 'Central Scholarship' : `${sch.state} State`}
                </span>
                <span className="text-[11px] font-bold text-[#FECDD3] flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-[#FDE047]" />
                  <span>{sch.academicYear || '2025-26'}</span>
                </span>
              </div>

              <h3
                onClick={() => onViewDetails(sch)}
                className="font-bold text-base text-white hover:text-[#FDE047] cursor-pointer transition line-clamp-2"
              >
                {sch.title}
              </h3>

              <p className="text-xs text-[#FECDD3] line-clamp-2 leading-relaxed">
                {sch.description}
              </p>

              <div className="bg-[#881337] border border-[#F43F5E]/30 p-3 rounded-xl text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FDE047] block">Eligibility Snapshot</span>
                <p className="text-white font-medium line-clamp-2">{sch.eligibilitySummary}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F43F5E]/30 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onViewDetails(sch)}
                className="py-2 px-3 rounded-lg bg-[#881337] hover:bg-[#9f1239] text-white font-bold border border-[#F43F5E]/40 transition text-center"
              >
                View Details
              </button>

              <button
                onClick={() => onCheckEligibility(sch.id)}
                className="py-2 px-3 rounded-lg bg-[#F43F5E] hover:bg-[#e11d48] text-white font-bold transition flex items-center justify-center space-x-1 shadow-md"
              >
                <span>Check Rules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
