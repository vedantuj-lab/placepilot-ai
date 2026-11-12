import React, { useState } from 'react';
import { 
  Compass, 
  GraduationCap, 
  Globe,
  Menu, 
  X,
  Bot,
  User,
  LogOut,
  LogIn,
  Sparkles,
  HelpCircle,
  Info,
  Home,
  ShieldCheck,
  Send,
  FileText,
  CheckCircle2,
  Bell,
  Search
} from 'lucide-react';
import { CitizenProfile, Language } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  profile: CitizenProfile;
  onProfileChange: (p: CitizenProfile) => void;
  onResetDemo: () => void;
  onResetAdmin: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  profile,
  onProfileChange,
  onResetDemo,
  onResetAdmin,
  isAuthenticated,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  const publicNavItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'explorer', label: 'Explore Schemes', icon: Compass },
    { id: 'scholarships', label: 'Scholarships', icon: GraduationCap },
  ];

  const handleLangChange = (lang: Language) => {
    onProfileChange({ ...profile, language: lang });
    setLangMenuOpen(false);
  };

  const getLangLabel = () => {
    switch (profile.language) {
      case 'hi': return 'हिंदी';
      case 'mr': return 'मराठी';
      default: return 'English';
    }
  };

  const logoDestination = !isAuthenticated
    ? 'landing'
    : profile.role === 'admin'
    ? 'admin'
    : 'dashboard';

  const isCitizenWorkspace = isAuthenticated && profile.role === 'citizen';
  const isAdminWorkspace = isAuthenticated && profile.role === 'admin';

  return (
    <header className={`sticky top-0 z-50 border-b shadow-xl text-white font-sans transition-colors ${
      isAdminWorkspace
        ? 'bg-[#18181B] border-[#BE123C]/50'
        : isCitizenWorkspace
        ? 'bg-[#042F2E] border-[#0D9488]/50'
        : 'bg-[#0F172A] border-[#1E293B]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand Logo & Workspace Label */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate(logoDestination)}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${
              isAdminWorkspace ? 'bg-[#BE123C]' : 'bg-[#10B981]'
            }`}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black text-white tracking-tight">
                PlacePilot<span className={isAdminWorkspace ? 'text-[#F59E0B]' : 'text-[#10B981]'}> AI</span>
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                isAdminWorkspace
                  ? 'bg-[#BE123C] text-white border-amber-400/40'
                  : isCitizenWorkspace
                  ? 'bg-[#0D9488] text-white border-teal-300/40'
                  : 'bg-[#1E293B] text-[#38BDF8] border-[#38BDF8]/30'
              }`}>
                {isAdminWorkspace ? 'Admin Workspace' : isCitizenWorkspace ? 'Citizen Workspace' : 'Scheme Saathi'}
              </span>
            </div>
          </div>

          {/* Public Center Nav (ONLY WHEN UNAUTHENTICATED) */}
          {!isAuthenticated && (
            <nav className="hidden lg:flex items-center space-x-1">
              {publicNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    currentView === item.id ? 'bg-[#10B981] text-black shadow-md' : 'text-zinc-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          )}

          {/* Authenticated Workspace Header Search (FOR CITIZENS) */}
          {isCitizenWorkspace && (
            <div className="hidden md:flex flex-1 max-w-xs mx-6 relative">
              <Search className="w-4 h-4 text-teal-300 absolute left-3 top-2.5" />
              <input
                type="text"
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onNavigate('explorer');
                  }
                }}
                placeholder="Search schemes or scholarships..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#032423] border border-[#0D9488]/40 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
              />
            </div>
          )}

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/20 border border-white/10 text-xs font-bold text-white hover:border-[#10B981] transition cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#10B981]" />
                <span>{getLangLabel()}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[#1E293B] border border-[#334155] rounded-xl shadow-2xl py-1 z-50 text-xs">
                  <button onClick={() => handleLangChange('en')} className={`w-full text-left px-3 py-2 font-bold hover:bg-[#334155] ${profile.language === 'en' ? 'text-[#10B981]' : 'text-white'}`}>English</button>
                  <button onClick={() => handleLangChange('hi')} className={`w-full text-left px-3 py-2 font-bold hover:bg-[#334155] ${profile.language === 'hi' ? 'text-[#10B981]' : 'text-white'}`}>हिंदी (Hindi)</button>
                  <button onClick={() => handleLangChange('mr')} className={`w-full text-left px-3 py-2 font-bold hover:bg-[#334155] ${profile.language === 'mr' ? 'text-[#10B981]' : 'text-white'}`}>मराठी (Marathi)</button>
                </div>
              )}
            </div>

            {/* Authenticated User Menu (NO PUBLIC LOGIN BUTTONS INSIDE WORKSPACE!) */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg font-black text-xs transition shadow-md cursor-pointer ${
                    isAdminWorkspace ? 'bg-[#F59E0B] text-black hover:bg-amber-400' : 'bg-[#10B981] text-black hover:bg-[#059669]'
                  }`}
                >
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt="Avatar" className="w-5 h-5 rounded-full object-cover border border-white/40" />
                  ) : (
                    <User className="w-3.5 h-3.5" />
                  )}
                  <span>{profile.fullName.split(' ')[0]}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#1E293B] border border-[#334155] rounded-xl shadow-2xl py-2 z-50 text-xs space-y-1 text-white">
                    <div className="px-3 py-1 border-b border-[#334155] mb-1">
                      <p className="font-bold text-white truncate">{profile.fullName}</p>
                      <p className="text-[10px] text-zinc-400 truncate">{profile.email}</p>
                      <span className="inline-block mt-1 text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">
                        {profile.role.toUpperCase()}
                      </span>
                    </div>

                    {isCitizenWorkspace && (
                      <>
                        <button onClick={() => { onNavigate('dashboard'); setUserDropdownOpen(false); }} className="w-full text-left px-3 py-1.5 font-bold hover:bg-[#334155] text-white">Citizen Dashboard</button>
                        <button onClick={() => { onNavigate('profile'); setUserDropdownOpen(false); }} className="w-full text-left px-3 py-1.5 font-bold hover:bg-[#334155] text-white">Citizen Profile</button>
                      </>
                    )}

                    {isAdminWorkspace && (
                      <>
                        <button onClick={() => { onNavigate('admin'); setUserDropdownOpen(false); }} className="w-full text-left px-3 py-1.5 font-bold hover:bg-[#334155] text-white">Admin Dashboard</button>
                        <button onClick={() => { onNavigate('admin_audit'); setUserDropdownOpen(false); }} className="w-full text-left px-3 py-1.5 font-bold hover:bg-[#334155] text-white">Audit Logs</button>
                      </>
                    )}

                    <div className="border-t border-[#334155] pt-1">
                      <button onClick={() => { onLogout(); setUserDropdownOpen(false); }} className="w-full text-left px-3 py-1.5 font-bold text-rose-400 hover:bg-rose-950 flex items-center space-x-1 cursor-pointer">
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold text-[#C7D2FE] bg-[#1E1B4B] hover:bg-[#2E2A72] transition border border-[#4338CA]"
                >
                  Citizen Login
                </button>
                <button
                  onClick={() => onNavigate('admin_login')}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold text-amber-400 bg-[#18181B] hover:bg-[#27272A] transition border border-[#3F3F46]"
                >
                  Admin Login
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-black bg-[#10B981] hover:bg-[#059669] transition shadow-md"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A] border-b border-[#1E293B] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {!isAuthenticated && publicNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2.5 rounded-lg text-left text-sm font-bold ${
                  currentView === item.id ? 'bg-[#10B981] text-black' : 'text-white hover:bg-[#1E293B]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1E293B] flex flex-col space-y-2">
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }} className="w-full py-2.5 rounded-lg bg-[#1E1B4B] text-[#C7D2FE] font-bold text-xs border border-[#4338CA]">Citizen Login</button>
                <button onClick={() => { onNavigate('admin_login'); setMobileMenuOpen(false); }} className="w-full py-2.5 rounded-lg bg-[#18181B] text-amber-400 font-bold text-xs border border-[#3F3F46]">Admin Login</button>
              </div>
            ) : (
              <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="w-full py-2.5 rounded-lg bg-rose-950 text-rose-300 font-bold text-xs border border-rose-800">Sign Out ({profile.fullName.split(' ')[0]})</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
