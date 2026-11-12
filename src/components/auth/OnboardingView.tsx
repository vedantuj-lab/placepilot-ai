import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Coins, 
  GraduationCap, 
  Users, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';
import { CitizenProfile } from '../../types';
import { SCHEMES_DATA } from '../../data/schemes';
import { SCHEME_RULES } from '../../data/rules';
import { evaluateSchemeEligibility } from '../../utils/rulesEngine';

interface OnboardingViewProps {
  profile: CitizenProfile;
  onComplete: (updatedProfile: CitizenProfile) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  profile,
  onComplete
}) => {
  const [income, setIncome] = useState<number>(profile.annualFamilyIncome || 150000);
  const [educationLevel, setEducationLevel] = useState<CitizenProfile['educationLevel']>(
    profile.educationLevel || 'Undergraduate'
  );
  const [category, setCategory] = useState<CitizenProfile['category']>(profile.category || 'OBC');
  const [areaType, setAreaType] = useState<'Urban' | 'Rural'>(profile.areaType || 'Urban');
  const [rationCardType, setRationCardType] = useState<CitizenProfile['rationCardType']>(
    profile.rationCardType || 'BPL'
  );

  // Live preview candidate profile
  const candidateProfile: CitizenProfile = {
    ...profile,
    annualFamilyIncome: income,
    educationLevel,
    category,
    areaType,
    rationCardType
  };

  // Evaluate matching schemes in real-time
  const matchedSchemes = SCHEMES_DATA.filter((s) => {
    const rule = SCHEME_RULES[s.id];
    if (!rule) return false;
    const res = evaluateSchemeEligibility(rule, candidateProfile);
    return res.outcome === 'ELIGIBLE';
  });

  const handleFinish = () => {
    onComplete(candidateProfile);
  };

  return (
    <div className="min-h-screen bg-[#0e1215] text-[#fdfbf7] flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full mx-auto bg-[#141a1f] border border-[#242e38] rounded-3xl shadow-2xl p-6 sm:p-10">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Welcome to PlacePilot, {profile.fullName}!</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#fdfbf7]">
            Personalize Your Welfare Folio
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-lg mx-auto">
            Provide 3 quick details so our deterministic rules engine can calculate your exact government scheme and scholarship eligibility.
          </p>
        </div>

        <div className="space-y-6">
          {/* 1. Annual Family Income */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#1b2229] border border-[#2b3540]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 text-emerald-400" />
                <label className="text-xs font-bold text-zinc-200">
                  Annual Family Income:
                </label>
              </div>
              <span className="text-sm font-extrabold text-emerald-400 font-mono">
                ₹{income.toLocaleString('en-IN')} / year
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1000000}
              step={25000}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
              <span>₹0 (EWS/BPL)</span>
              <span>₹1.5 Lakh (MahaDBT Cap)</span>
              <span>₹8 Lakh (Creamy Layer Cap)</span>
              <span>₹10L+</span>
            </div>
          </div>

          {/* 2. Education Level & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#1b2229] border border-[#2b3540]">
              <div className="flex items-center space-x-2 mb-2">
                <GraduationCap className="w-4 h-4 text-teal-400" />
                <label className="text-xs font-bold text-zinc-200">
                  Current Education Level
                </label>
              </div>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#141a1f] border border-[#2d3844] text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="10th">Class 10th (Secondary)</option>
                <option value="12th">Class 12th (Higher Secondary)</option>
                <option value="Diploma">Polytechnic Diploma</option>
                <option value="Undergraduate">Undergraduate (B.Tech / B.Sc / B.Com)</option>
                <option value="Postgraduate">Postgraduate (M.Tech / M.Sc / MBA)</option>
                <option value="Doctoral">Doctoral (Ph.D.)</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-[#1b2229] border border-[#2b3540]">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-4 h-4 text-amber-400" />
                <label className="text-xs font-bold text-zinc-200">
                  Social Reservation Category
                </label>
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#141a1f] border border-[#2d3844] text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="General">General / Open</option>
                <option value="OBC">OBC (Other Backward Classes)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
                <option value="Minority">Religious Minority</option>
              </select>
            </div>
          </div>

          {/* Real-Time Live Discovery Teaser */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#162720] to-[#141a1f] border border-emerald-600/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-300 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Deterministic Rules Engine Calculation:</span>
              </span>
              <span className="text-xs font-extrabold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800">
                {matchedSchemes.length} Schemes Matched
              </span>
            </div>
            <p className="text-[11px] text-zinc-300">
              Based on your ₹{income.toLocaleString('en-IN')} income, {category} category, and {educationLevel} study, you qualify for high-value benefits including{' '}
              <span className="text-emerald-300 font-semibold">
                {matchedSchemes[0]?.title || 'Central Sector Scholarships'}
              </span>.
            </p>
          </div>

          {/* Finish Button */}
          <button
            onClick={handleFinish}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-[#0d1e18] shadow-lg shadow-emerald-950/60 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Complete Onboarding & Enter Citizen Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
