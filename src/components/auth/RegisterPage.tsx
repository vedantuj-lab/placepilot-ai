import React, { useState } from 'react';
import { 
  Bot, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Mail, 
  User, 
  MapPin, 
  Languages, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { CitizenProfile, Language } from '../../types';
import { checkPasswordStrength, validateRegistration } from '../../utils/authValidator';

interface RegisterPageProps {
  onRegisterSuccess: (user: CitizenProfile, token: string) => void;
  onNavigateToLogin: () => void;
  onNavigateToLanding: () => void;
}

const INDIAN_STATES = [
  'Maharashtra',
  'Karnataka',
  'Uttar Pradesh',
  'Gujarat',
  'Delhi',
  'Tamil Nadu',
  'Rajasthan',
  'Madhya Pradesh',
  'West Bengal',
  'Bihar',
  'Punjab',
  'Haryana',
  'Telangana',
  'Kerala',
  'Andhra Pradesh',
  'Odisha',
  'Assam',
  'Jharkhand',
  'Chhattisgarh',
  'Uttarakhand',
  'Himachal Pradesh',
  'Goa'
];

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
  onNavigateToLanding
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [district, setDistrict] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const strength = checkPasswordStrength(password);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const check = validateRegistration({
      fullName,
      email,
      password,
      confirmPassword,
      state,
      district,
      language,
      termsAccepted
    });

    if (!check.isValid) {
      setFieldErrors(check.errors);
      return;
    }
    setFieldErrors({});
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          state,
          district,
          language
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed. Please check details.');
      }

      onRegisterSuccess(data.user, data.token);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to register account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#17231F] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full bg-[#FFFFFF] border border-[#E5E9E5] rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

        {/* LEFT PANEL - Branding */}
        <div className="lg:col-span-5 bg-[#123D32] text-white p-8 sm:p-10 flex flex-col justify-between space-y-8 relative">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigateToLanding}>
              <div className="w-10 h-10 rounded-xl bg-[#008F68] flex items-center justify-center shadow-sm">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                PlacePilot<span className="text-[#F4A261]"> AI</span>
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Create Your Citizen Profile
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Join thousands of citizens discovering government benefits and scholarships.
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs font-semibold">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#184d3f] border border-emerald-700/60">
                <ShieldCheck className="w-4 h-4 text-[#F4A261]" />
                <span>Strictly Assigns Citizen Role</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#184d3f] border border-emerald-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Private & Secure Folio</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-emerald-200/80 pt-4 border-t border-emerald-800/80 flex items-center justify-between">
            <span>AgentX PS-01 • Scheme Saathi</span>
            <span className="font-bold text-[#F4A261]">Tech Dynamites</span>
          </div>
        </div>

        {/* RIGHT PANEL - Registration Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-6">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#17231F]">Get Started</h2>
                <p className="text-xs text-[#68736D] mt-0.5">Register for a new citizen account.</p>
              </div>
              <button
                onClick={onNavigateToLogin}
                className="text-xs font-semibold text-[#008F68] hover:underline"
              >
                Sign In Instead
              </button>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#17231F] block">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#68736D] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vedant Sharma"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FFFFFF] border ${
                      fieldErrors.fullName ? 'border-rose-500' : 'border-[#E5E9E5]'
                    } text-xs font-medium text-[#17231F] focus:outline-none focus:border-[#008F68] transition`}
                  />
                </div>
                {fieldErrors.fullName && <p className="text-[11px] text-rose-600">{fieldErrors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#17231F] block">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#68736D] absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. vedant@example.com"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FFFFFF] border ${
                      fieldErrors.email ? 'border-rose-500' : 'border-[#E5E9E5]'
                    } text-xs font-medium text-[#17231F] focus:outline-none focus:border-[#008F68] transition`}
                  />
                </div>
                {fieldErrors.email && <p className="text-[11px] text-rose-600">{fieldErrors.email}</p>}
              </div>

              {/* State & Language grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#17231F] block">State of Residence</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E9E5] text-xs font-medium text-[#17231F] focus:outline-none focus:border-[#008F68] transition"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#17231F] block">Preferred Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E9E5] text-xs font-medium text-[#17231F] focus:outline-none focus:border-[#008F68] transition"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="mr">मराठी (Marathi)</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#17231F] block">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#68736D] absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className={`w-full pl-9 pr-9 py-2.5 rounded-xl bg-[#FFFFFF] border ${
                      fieldErrors.password ? 'border-rose-500' : 'border-[#E5E9E5]'
                    } text-xs font-medium text-[#17231F] focus:outline-none focus:border-[#008F68] transition`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#68736D] hover:text-[#17231F]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.password && <p className="text-[11px] text-rose-600">{fieldErrors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#17231F] block">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#68736D] absolute left-3 top-3" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className={`w-full pl-9 pr-9 py-2.5 rounded-xl bg-[#FFFFFF] border ${
                      fieldErrors.confirmPassword ? 'border-rose-500' : 'border-[#E5E9E5]'
                    } text-xs font-medium text-[#17231F] focus:outline-none focus:border-[#008F68] transition`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-[#68736D] hover:text-[#17231F]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && <p className="text-[11px] text-rose-600">{fieldErrors.confirmPassword}</p>}
              </div>

              {/* Terms Acceptance */}
              <div className="pt-2">
                <label className="flex items-start space-x-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="rounded border-[#E5E9E5] text-[#008F68] focus:ring-[#008F68] mt-0.5"
                  />
                  <span className="text-[#68736D] font-medium leading-normal">
                    I agree to the Terms of Service and Consent Policy for PlacePilot AI document processing.
                  </span>
                </label>
                {fieldErrors.termsAccepted && <p className="text-[11px] text-rose-600">{fieldErrors.termsAccepted}</p>}
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#008F68] hover:bg-[#007353] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition cursor-pointer"
              >
                {isLoading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create Citizen Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-[#E5E9E5] text-center text-xs">
            <span className="text-[#68736D]">Already registered? </span>
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="font-bold text-[#008F68] hover:underline"
            >
              Sign In
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
