import React from 'react';
import {
  Compass,
  GraduationCap,
  CheckCircle2,
  FileText,
  Send,
  Bot,
  Bell,
  User,
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import { CitizenProfile } from '../types';

interface CitizenSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  profile: CitizenProfile;
  onLogout: () => void;
}

export const CitizenSidebar: React.FC<CitizenSidebarProps> = ({
  currentView,
  onNavigate,
  profile,
  onLogout
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: Home },
    { id: 'explorer', label: 'Find Schemes', icon: Compass },
    { id: 'scholarships', label: 'Scholarships', icon: GraduationCap },
    { id: 'eligibility', label: 'Eligibility', icon: CheckCircle2 },
    { id: 'documents', label: 'My Documents', icon: FileText },
    { id: 'applications', label: 'My Applications', icon: Send },
    { id: 'assistant', label: 'Scheme Saathi AI', icon: Bot, highlight: true },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-[#042F2E] border-r border-[#0D9488]/40 h-screen sticky top-0 flex flex-col justify-between p-4 text-[#CCFBF1] shadow-2xl z-40 select-none">
      <div className="space-y-6">

        {/* User Identity Box */}
        <div className="p-3 bg-[#032423] border border-[#0D9488]/30 rounded-2xl flex items-center space-x-3">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="Avatar" className="w-9 h-9 rounded-full border border-[#0D9488] object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#0D9488] flex items-center justify-center text-white font-black text-xs shadow-md">
              {profile.fullName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="truncate flex-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-[#F59E0B] block">Citizen Folio</span>
            <p className="text-xs font-black text-white truncate">{profile.fullName}</p>
            <p className="text-[10px] text-[#99F6E4] truncate">{profile.email}</p>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#0D9488] text-white shadow-lg'
                    : item.highlight
                    ? 'bg-[#2E1065] text-[#22D3EE] border border-[#22D3EE]/30 hover:bg-[#3B1280]'
                    : 'text-[#99F6E4] hover:text-white hover:bg-[#115E59]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-[#22D3EE]' : 'text-[#F59E0B]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-[#0D9488]/30">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-300 hover:bg-rose-950/80 hover:text-rose-200 transition cursor-pointer border border-rose-900/40"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
