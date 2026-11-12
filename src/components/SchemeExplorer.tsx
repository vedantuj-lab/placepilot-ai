import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Compass, 
  RotateCcw, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  SlidersHorizontal 
} from 'lucide-react';
import { Scheme, Language } from '../types';
import { SCHEME_CATEGORIES } from '../data/schemes';
import { SchemeCard } from './SchemeCard';

interface SchemeExplorerProps {
  schemes: Scheme[];
  language: Language;
  savedSchemeIds: string[];
  initialCategory?: string;
  onToggleSave: (id: string) => void;
  onViewDetails: (scheme: Scheme) => void;
  onCheckEligibility: (schemeId: string) => void;
  onViewDocuments: (schemeId: string) => void;
  onOpenOfficialUrl: (scheme: Scheme, url: string, label: string) => void;
}

export const SchemeExplorer: React.FC<SchemeExplorerProps> = ({
  schemes,
  language,
  savedSchemeIds,
  initialCategory,
  onToggleSave,
  onViewDetails,
  onCheckEligibility,
  onViewDocuments,
  onOpenOfficialUrl
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [onlyAccepting, setOnlyAccepting] = useState<boolean>(false);
  const [onlyScholarships, setOnlyScholarships] = useState<boolean>(false);

  const statesList = useMemo(() => {
    const states = new Set<string>();
    schemes.forEach(s => {
      if (s.state && s.state !== 'All India') states.add(s.state);
    });
    return Array.from(states).sort();
  }, [schemes]);

  const filteredSchemes = useMemo(() => {
    return schemes.filter(s => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = s.title.toLowerCase().includes(q) || (s.titleHi && s.titleHi.toLowerCase().includes(q)) || (s.titleMr && s.titleMr.toLowerCase().includes(q));
        const matchDesc = s.description.toLowerCase().includes(q);
        const matchDept = s.department.toLowerCase().includes(q);
        const matchTags = s.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchDept && !matchTags) return false;
      }

      if (selectedCategory !== 'All' && s.category !== selectedCategory) {
        return false;
      }

      if (selectedLevel !== 'All' && s.level !== selectedLevel) {
        return false;
      }

      if (selectedState !== 'All') {
        if (s.state !== selectedState && s.state !== 'All India') return false;
      }

      if (onlyAccepting && !s.acceptingApplications) {
        return false;
      }

      if (onlyScholarships && !s.isScholarship) {
        return false;
      }

      return true;
    });
  }, [schemes, searchTerm, selectedCategory, selectedLevel, selectedState, onlyAccepting, onlyScholarships]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedState('All');
    setOnlyAccepting(false);
    setOnlyScholarships(false);
  };

  return (
    <div className="space-y-6 text-[#EEF2FF] selection:bg-[#A5B4FC] selection:text-black">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#4338CA]">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center space-x-2">
            <Compass className="w-6 h-6 text-[#A5B4FC]" />
            <span>Government Scheme Explorer</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#C7D2FE] mt-1">
            Catalogue of verified Central and State Government welfare schemes & assistance programs.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-[#4C1D95] text-[#A5B4FC] font-bold border border-[#A5B4FC]/30">
            {filteredSchemes.length} Schemes Available
          </span>
        </div>
      </div>

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="bg-[#1E1B4B] border border-[#4338CA] p-5 rounded-2xl shadow-xl space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#A5B4FC] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by scheme title, department, keyword or eligibility tag..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#2E2A72] border border-[#4338CA] text-xs font-medium text-white focus:outline-none focus:border-[#A5B4FC] transition"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-3 top-3 text-xs font-bold text-[#A5B4FC]">
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#C7D2FE] block text-[11px]">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#2E2A72] border border-[#4338CA] font-medium text-white focus:outline-none focus:border-[#A5B4FC]"
            >
              <option value="All">All Categories</option>
              {SCHEME_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#C7D2FE] block text-[11px]">Government Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#2E2A72] border border-[#4338CA] font-medium text-white focus:outline-none focus:border-[#A5B4FC]"
            >
              <option value="All">All Levels (Central & State)</option>
              <option value="Central">Central Government</option>
              <option value="State">State Government</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#C7D2FE] block text-[11px]">State / UT</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#2E2A72] border border-[#4338CA] font-medium text-white focus:outline-none focus:border-[#A5B4FC]"
            >
              <option value="All">All States / UTs</option>
              {statesList.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4 pt-4 sm:pt-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyScholarships}
                onChange={(e) => setOnlyScholarships(e.target.checked)}
                className="rounded border-[#4338CA] text-[#A5B4FC] focus:ring-[#A5B4FC]"
              />
              <span className="font-semibold text-white">Scholarships Only</span>
            </label>

            <button onClick={handleResetFilters} className="text-[#A5B4FC] hover:text-white font-bold flex items-center space-x-1">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* SCHEME CARDS GRID */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              language={language}
              isSaved={savedSchemeIds.includes(scheme.id)}
              onToggleSave={onToggleSave}
              onViewDetails={onViewDetails}
              onCheckEligibility={onCheckEligibility}
              onViewDocuments={onViewDocuments}
              onOpenOfficialUrl={onOpenOfficialUrl}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#1E1B4B] border border-[#4338CA] rounded-2xl p-10 text-center space-y-3">
          <Compass className="w-10 h-10 text-[#A5B4FC] mx-auto" />
          <h3 className="font-bold text-white text-base">No Matching Schemes Found</h3>
          <p className="text-xs text-[#C7D2FE] max-w-md mx-auto">
            Try adjusting your search terms or filters to explore more Central and State welfare programs.
          </p>
          <button onClick={handleResetFilters} className="px-4 py-2 rounded-xl bg-[#4C1D95] text-white font-bold text-xs">
            Reset Search Filters
          </button>
        </div>
      )}
    </div>
  );
};
