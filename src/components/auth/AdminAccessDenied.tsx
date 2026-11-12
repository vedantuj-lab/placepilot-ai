import React from 'react';
import { ShieldAlert, Lock, ArrowLeft, UserCheck, ShieldCheck } from 'lucide-react';
import { CitizenProfile } from '../../types';

interface AdminAccessDeniedProps {
  currentUser: CitizenProfile;
  onReturnToDashboard: () => void;
  onSwitchToAdminDemo: () => void;
}

export const AdminAccessDenied: React.FC<AdminAccessDeniedProps> = ({
  currentUser,
  onReturnToDashboard,
  onSwitchToAdminDemo
}) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#141a1f] border border-red-900/50 rounded-3xl shadow-2xl p-6 sm:p-8 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-3xl bg-red-950/80 border border-red-700/60 text-red-400 flex items-center justify-center mx-auto shadow-lg shadow-red-950/50">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-red-950 border border-red-800 text-red-300 font-mono font-bold">
            SECURITY CHALLENGE: 403 FORBIDDEN
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#fdfbf7] mt-3">
            Admin Access Restricted
          </h2>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            The Administration Workspace is restricted to authorized welfare officers and scheme managers. Citizens cannot modify scheme catalogues or audit logs.
          </p>
        </div>

        {/* Current Identity Details */}
        <div className="p-3.5 rounded-xl bg-[#1b2229] border border-[#2d3844] text-xs text-left space-y-1.5 font-mono">
          <div className="flex justify-between text-zinc-400">
            <span>Signed In As:</span>
            <span className="text-zinc-200 truncate max-w-[180px]">{currentUser.fullName}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Email:</span>
            <span className="text-zinc-300 truncate max-w-[180px]">{currentUser.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Current Role:</span>
            <span className="text-red-400 font-bold uppercase">{currentUser.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Required Role:</span>
            <span className="text-emerald-400 font-bold uppercase">admin</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={onReturnToDashboard}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#1f2832] hover:bg-[#283442] text-zinc-200 border border-[#374453] transition flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Citizen Dashboard</span>
          </button>

          <button
            onClick={onSwitchToAdminDemo}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-[#0d1e18] shadow-md shadow-amber-950/40 transition flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Switch to Admin Demo (Pooja Kulkarni)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
