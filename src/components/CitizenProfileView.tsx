import React, { useState } from 'react';
import { 
  User, 
  CheckCircle2, 
  Save, 
  Trash2, 
  ShieldCheck, 
  GraduationCap, 
  MapPin, 
  DollarSign, 
  Globe,
  RotateCcw
} from 'lucide-react';
import { CitizenProfile, Language } from '../types';

interface CitizenProfileViewProps {
  profile: CitizenProfile;
  completeness: number;
  onSaveProfile: (profile: CitizenProfile) => void;
  onResetDemo: () => void;
  onResetAdmin: () => void;
  onDeleteAccount: () => void;
}

export const CitizenProfileView: React.FC<CitizenProfileViewProps> = ({
  profile,
  completeness,
  onSaveProfile,
  onResetDemo,
  onResetAdmin,
  onDeleteAccount
}) => {
  const [formData, setFormData] = useState<CitizenProfile>({ ...profile });
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleChange = (field: keyof CitizenProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-[#DDD6FE] font-sans selection:bg-[#14B8A6] selection:text-black">
      {/* Header - Muted Indigo & Teal */}
      <div className="bg-[#312E81] border border-[#14B8A6]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E1B4B] text-[#14B8A6] text-xs font-bold border border-[#14B8A6]/30">
              <User className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>CITIZEN PROFILE FOLIO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Profile & Welfare Attributes
            </h2>
            <p className="text-xs sm:text-sm text-[#DDD6FE]/80">
              Required for deterministic scheme matching and form prefilling.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onResetDemo}
              className="px-3 py-1.5 rounded-xl bg-[#1E1B4B] text-[#14B8A6] border border-[#14B8A6]/40 text-xs font-bold transition cursor-pointer"
            >
              MH Demo Profile
            </button>
            <button
              type="button"
              onClick={onResetAdmin}
              className="px-3 py-1.5 rounded-xl bg-[#1E1B4B] text-amber-300 border border-amber-500/40 text-xs font-bold transition cursor-pointer"
            >
              Admin Demo
            </button>
          </div>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Profile updated! Eligibility evaluations will reflect your changes.</span>
        </div>
      )}

      {/* Completeness Bar */}
      <div className="bg-[#312E81] border border-[#14B8A6]/40 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white uppercase tracking-wider">
            Profile Completeness Gauge
          </span>
          <span className="font-black text-[#14B8A6]">{completeness}%</span>
        </div>
        <div className="w-full h-2.5 bg-[#1E1B4B] rounded-full overflow-hidden border border-[#14B8A6]/30">
          <div 
            className="h-full bg-[#14B8A6] transition-all duration-300"
            style={{ width: `${completeness}%` }}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-[#312E81] border border-[#14B8A6]/40 rounded-2xl p-6 shadow-2xl space-y-6 text-xs text-white">

        <div className="space-y-4 border-b border-[#1E1B4B] pb-6">
          <h3 className="font-bold text-sm text-[#14B8A6] uppercase tracking-wider">Personal & Demographics</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-white block">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#1E1B4B] border border-[#14B8A6]/40 text-xs text-white focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white block">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#1E1B4B] border border-[#14B8A6]/40 text-xs text-white focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white block">State Domicile</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#1E1B4B] border border-[#14B8A6]/40 text-xs text-white focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white block">Caste Category</label>
              <select
                value={formData.category || 'OBC'}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#1E1B4B] border border-[#14B8A6]/40 text-xs text-white focus:outline-none focus:border-[#14B8A6]"
              >
                <option value="General">General / EWS</option>
                <option value="OBC">OBC (Other Backward Classes)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="Minority">Minority Community</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-b border-[#1E1B4B] pb-6">
          <h3 className="font-bold text-sm text-[#14B8A6] uppercase tracking-wider">Income & Education</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-white block">Annual Family Income (₹)</label>
              <input
                type="number"
                value={formData.annualFamilyIncome}
                onChange={(e) => handleChange('annualFamilyIncome', Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#1E1B4B] border border-[#14B8A6]/40 text-xs text-white focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white block">Education Level</label>
              <select
                value={formData.educationLevel || 'Undergraduate'}
                onChange={(e) => handleChange('educationLevel', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#1E1B4B] border border-[#14B8A6]/40 text-xs text-white focus:outline-none focus:border-[#14B8A6]"
              >
                <option value="Undergraduate">Undergraduate Degree</option>
                <option value="Postgraduate">Postgraduate Degree</option>
                <option value="Diploma">Diploma Technical</option>
                <option value="School">School (Class 9-12)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white block">Course Name</label>
              <input
                type="text"
                value={formData.courseName || ''}
                onChange={(e) => handleChange('courseName', e.target.value)}
                placeholder="e.g. B.Tech Computer Engineering"
                className="w-full px-3 py-2 rounded-xl bg-[#1E1B4B] border border-[#14B8A6]/40 text-xs text-white focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white block">Institution Name</label>
              <input
                type="text"
                value={formData.institutionName || ''}
                onChange={(e) => handleChange('institutionName', e.target.value)}
                placeholder="e.g. Shree L.R. Tiwari College of Engineering"
                className="w-full px-3 py-2 rounded-xl bg-[#1E1B4B] border border-[#14B8A6]/40 text-xs text-white focus:outline-none focus:border-[#14B8A6]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onDeleteAccount}
            className="text-xs font-bold text-rose-300 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Local Folio Data</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#14B8A6] hover:bg-[#0D9488] text-black font-black flex items-center space-x-2 shadow-lg transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
