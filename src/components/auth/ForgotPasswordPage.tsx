import React, { useState } from 'react';
import { 
  Bot, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  RefreshCw 
} from 'lucide-react';
import { validateEmail, checkPasswordStrength } from '../../utils/authValidator';

interface ForgotPasswordPageProps {
  onNavigateToLogin: () => void;
  onNavigateToLanding: () => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  onNavigateToLogin,
  onNavigateToLanding
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Direct reset simulation tab for hackathon test convenience
  const [showDirectReset, setShowDirectReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    const check = validateEmail(email);
    if (!check.isValid) {
      setEmailError(check.error || 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setIsSubmitted(true);
      setFeedbackMessage(data.message || 'If an account exists with this email address, a password recovery link has been dispatched to your inbox.');
    } catch {
      // Security: Always show generic success to prevent enumeration
      setIsSubmitted(true);
      setFeedbackMessage('If an account exists with this email address, a password recovery link has been dispatched to your inbox.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);

    const strength = checkPasswordStrength(newPassword);
    if (!strength.isValid) {
      setResetError(strength.feedback[0] || 'Password does not meet minimum strength requirements.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password reset failed');
      setResetSuccess(true);
    } catch (err: any) {
      setResetError(err.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1215] text-[#fdfbf7] flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Navigation */}
      <div className="max-w-md w-full mx-auto mb-4 flex items-center justify-between">
        <button
          onClick={onNavigateToLogin}
          className="inline-flex items-center space-x-2 text-xs text-zinc-400 hover:text-emerald-400 transition"
        >
          <span>← Back to Sign In</span>
        </button>
        <button
          onClick={onNavigateToLanding}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition"
        >
          Home
        </button>
      </div>

      <div className="max-w-md w-full mx-auto bg-[#141a1f] border border-[#242e38] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3 shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#fdfbf7]">
            {showDirectReset ? 'Set New Password' : 'Reset Your Password'}
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            {showDirectReset 
              ? 'Enter your new secure password below to regain access to your citizen folio.'
              : 'Enter your registered email address and we will dispatch a secure link to reset your account credentials.'}
          </p>
        </div>

        {!showDirectReset ? (
          <>
            {isSubmitted ? (
              <div className="space-y-5 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs">
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-emerald-300 text-sm">Dispatched Verification Link</p>
                      <p className="mt-1 text-emerald-200/90 leading-relaxed">
                        {feedbackMessage}
                      </p>
                      <p className="mt-2 text-[11px] text-zinc-400">
                        Target address: <span className="font-mono text-emerald-300">{email}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1a222a] border border-[#2d3844] text-xs text-zinc-300 space-y-2">
                  <p className="font-semibold text-zinc-200">Next Steps:</p>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-400 text-[11px]">
                    <li>Check your spam and junk folders if the message doesn't appear in 2 minutes.</li>
                    <li>Security tokens expire automatically after 60 minutes.</li>
                  </ul>
                </div>

                {/* Resend Email Button */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFeedbackMessage(null);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-[#2d3844] bg-[#1a2026] hover:bg-[#202830] text-zinc-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Try Different Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDirectReset(true)}
                    className="py-2.5 px-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 text-xs font-semibold transition"
                  >
                    Test Reset Now →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendResetLink} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-zinc-500" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError(null);
                      }}
                      placeholder="citizen.demo@placepilot.local or personal email"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1b2229] border text-sm text-[#fdfbf7] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition ${
                        emailError ? 'border-red-500' : 'border-[#2d3844] focus:border-emerald-500'
                      }`}
                    />
                  </div>
                  {emailError && (
                    <p className="text-[11px] text-red-400 mt-1">{emailError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-[#0d1e18] shadow-lg shadow-emerald-950/60 transition flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                      <span>Dispatching Link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Recovery Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </>
        ) : (
          /* Direct Password Reset Form (for dev/testing) */
          <div className="space-y-4">
            {resetSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="font-bold text-sm text-white">Password Updated Successfully!</p>
                <p className="text-zinc-300">
                  Your new credentials have been safely stored. You can now sign in to your Citizen Dashboard.
                </p>
                <button
                  onClick={onNavigateToLogin}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 text-[#0d1e18] font-bold text-xs"
                >
                  Go to Sign In →
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                {resetError && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
                    {resetError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1b2229] border border-[#2d3844] text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full px-3.5 pr-10 py-2 rounded-xl bg-[#1b2229] border border-[#2d3844] text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400"
                    >
                      {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1b2229] border border-[#2d3844] text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-500 text-[#0d1e18] hover:bg-emerald-400 transition"
                >
                  {isLoading ? 'Updating...' : 'Save New Password'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowDirectReset(false)}
                  className="w-full text-center text-xs text-zinc-400 hover:text-zinc-200"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        )}

        {/* Back to Login Link */}
        <div className="mt-6 pt-4 border-t border-[#242e38] text-center">
          <span className="text-xs text-zinc-400">
            Remember your credentials?{' '}
          </span>
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
