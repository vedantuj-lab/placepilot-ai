import React from 'react';
import {
  Home,
  Compass,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
  Layers,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { CitizenProfile } from '../types';

interface AdminSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  profile: CitizenProfile;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentView,
  onNavigate,
  profile,
  onLogout
}) => {
  const menuItems = [
    { id: 'admin', label: 'Overview', icon: Home },
    { id: 'admin_schemes', label: 'Scheme Management', icon: Compass },
    { id: 'admin_scholarships', label: 'Scholarship Management', icon: GraduationCap },
    { id: 'admin_rules', label: 'Eligibility Rules', icon: CheckCircle2 },
    { id: 'admin_sources', label: 'Source Verification', icon: ShieldCheck },
    { id: 'admin_categories', label: 'Categories', icon: Layers },
    { id: 'admin_analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'admin_audit', label: 'Audit Logs', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#18181B] border-r border-[#BE123C]/40 h-screen sticky top-0 flex flex-col justify-between p-4 text-[#FDE047] shadow-2xl z-40 select-none">
      <div className="space-y-6">

        {/* Admin Identity Box */}
        <div className="p-3 bg-[#27272A] border border-[#BE123C]/30 rounded-2xl flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-[#BE123C] flex items-center justify-center text-white font-black text-xs shadow-md">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="truncate flex-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-[#F59E0B] block">Admin Workspace</span>
            <p className="text-xs font-black text-white truncate">{profile.fullName}</p>
            <p className="text-[10px] text-zinc-400 truncate">{profile.email}</p>
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
                    ? 'bg-[#BE123C] text-white shadow-lg'
                    : 'text-zinc-300 hover:text-white hover:bg-[#27272A]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#F59E0B]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-[#3F3F46]">
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
