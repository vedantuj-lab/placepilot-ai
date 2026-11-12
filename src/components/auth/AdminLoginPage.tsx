import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  KeyRound,
  Building2,
  ShieldAlert
} from 'lucide-react';
import { CitizenProfile } from '../../types';
import { validateEmail } from '../../utils/authValidator';
import { supabase, isSupabaseConfigured } from '../../utils/supabaseClient';

interface AdminLoginPageProps {
  onLoginSuccess: (user: CitizenProfile, token: string, rememberMe: boolean) => void;
  onNavigateToCitizenLogin: () => void;
  onNavigateToLanding: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigateToCitizenLogin,
  onNavigateToLanding
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});

  const handleAdminSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    const errors: { email?: string; password?: string } = {};

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      errors.email = emailCheck.error;
    }
    if (!password) {
      errors.password = 'Admin password is required.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    setIsLoading(true);

    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          throw new Error(error.message);
        }
        if (data.user) {
          const meta = data.user.user_metadata || {};
          const adminUser: CitizenProfile = {
            id: data.user.id,
            fullName: meta.full_name || meta.name || 'Pooja Kulkarni (Admin)',
            email: email,
            state: 'Maharashtra',
            district: 'Mumbai',
            pinCode: '400001',
            category: 'General',
            annualFamilyIncome: 500000,
            language: 'en',
            consentGiven: true,
            role: 'admin'
          };
          onLoginSuccess(adminUser, data.session?.access_token || `token-${Date.now()}`, rememberMe);
          return;
        }
      }

      // Try Express backend endpoint safely
      let data: any = null;
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await res.json();
        }
        if (res.ok && data?.user && data.user.role === 'admin') {
          onLoginSuccess(data.user, data.token || `token-${Date.now()}`, rememberMe);
          return;
        }
      } catch {}

      // Fallback for admin demo credentials
      if (email === 'admin.demo@placepilot.local' || password === 'AdminPassword2026!') {
        const adminUser: CitizenProfile = {
          id: 'admin-demo-01',
          fullName: 'Pooja Kulkarni (Admin)',
          email: 'admin.demo@placepilot.local',
          state: 'Maharashtra',
          district: 'Mumbai',
          pinCode: '400001',
          category: 'General',
          annualFamilyIncome: 500000,
          language: 'en',
          consentGiven: true,
          role: 'admin'
        };
        onLoginSuccess(adminUser, 'demo_token_admin', rememberMe);
        return;
      }

      throw new Error('Access Denied: Invalid administrator credentials.');
    } catch (err: any) {
      setErrorMessage(err.message || 'Admin login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillAdminDemo = () => {
    setEmail('admin.demo@placepilot.local');
    setPassword('AdminPassword2026!');
    setValidationErrors({});
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#18181B] text-[#F4F4F5] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#881337] selection:text-white">
      <div className="max-w-4xl w-full bg-[#27272A] border border-[#3F3F46] rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

        {/* LEFT PANEL - Charcoal & Burgundy Branding */}
        <div className="lg:col-span-5 bg-[#881337] text-white p-8 sm:p-10 flex flex-col justify-between space-y-8 relative">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigateToLanding}>
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-black flex items-center justify-center shadow-md font-extrabold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  PlacePilot<span className="text-[#F59E0B]"> ADMIN</span>
                </span>
                <p className="text-[10px] text-rose-200 uppercase font-bold tracking-wider">
                  Government Portal Gateway
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Administrative Workspace
              </h1>
              <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
                Authorized government portal for managing scheme catalogues, verifying source URLs, and inspecting security audit logs.
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs font-semibold">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#4C0519] border border-rose-800/80">
                <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
                <span>Restricted Access: Officers Only</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#4C0519] border border-rose-800/80">
                <Building2 className="w-4 h-4 text-rose-300" />
                <span>Source Verification Monitor</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-rose-200/80 pt-4 border-t border-rose-800/80 flex items-center justify-between">
            <span>AgentX PS-01 • Admin Workspace</span>
            <span className="font-bold text-[#F59E0B]">Tech Dynamites</span>
          </div>
        </div>

        {/* RIGHT PANEL - Admin Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-6">

            <div className="flex items-center justify-between border-b border-[#3F3F46] pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F59E0B] block">Portal 2 of 2</span>
                <h2 className="text-2xl font-black text-white">Admin Authentication</h2>
              </div>
              <button
                onClick={onNavigateToCitizenLogin}
                className="text-xs font-bold text-rose-400 hover:underline"
              >
                Switch to Citizen Login
              </button>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-600 text-rose-200 text-xs font-medium flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Quick Demo Fill */}
            <div className="bg-[#18181B] border border-[#3F3F46] p-3.5 rounded-xl text-xs space-y-2">
              <span className="font-bold text-amber-400 block text-[11px] uppercase tracking-wider">
                ⚡ 1-Click Quick Admin Demo
              </span>
              <button
                type="button"
                onClick={fillAdminDemo}
                className="w-full px-3 py-2 rounded-lg bg-[#27272A] border border-[#3F3F46] text-xs font-bold text-amber-400 hover:bg-[#3F3F46] transition text-left flex items-center justify-between"
              >
                <span>⚙️ Demo Admin Account (Pooja Kulkarni)</span>
                <span className="text-[10px] text-zinc-400">admin.demo@placepilot.local</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAdminSignIn} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-zinc-200 block">Admin Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin.demo@placepilot.local"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#18181B] border ${
                      validationErrors.email ? 'border-rose-500' : 'border-[#3F3F46]'
                    } text-xs font-medium text-white focus:outline-none focus:border-[#F59E0B] transition`}
                  />
                </div>
                {validationErrors.email && <p className="text-[11px] text-rose-400">{validationErrors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-200 block">Admin Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security password"
                    className={`w-full pl-9 pr-9 py-2.5 rounded-xl bg-[#18181B] border ${
                      validationErrors.password ? 'border-rose-500' : 'border-[#3F3F46]'
                    } text-xs font-medium text-white focus:outline-none focus:border-[#F59E0B] transition`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {validationErrors.password && <p className="text-[11px] text-rose-400">{validationErrors.password}</p>}
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#3F3F46] text-[#881337] focus:ring-[#881337]"
                  />
                  <span className="font-medium text-zinc-400">Remember admin session</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition cursor-pointer"
              >
                {isLoading ? (
                  <span>Authenticating Admin Credentials...</span>
                ) : (
                  <>
                    <span>Sign In to Admin Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-[#3F3F46] text-center text-xs text-zinc-400">
            <span>Public registration disabled. Admin accounts are assigned via secure backend authorization.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
