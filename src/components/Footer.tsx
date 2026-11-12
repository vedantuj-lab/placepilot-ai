import React from 'react';
import { Bot, ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#123D32] text-white text-xs py-10 mt-16 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#008F68] flex items-center justify-center text-white font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-base font-black text-white">
                PlacePilot<span className="text-[#F4A261]"> AI</span>
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Government benefits, made easier for everyone. An agentic welfare scheme and scholarship companion for Indian citizens.
            </p>
            <div className="text-[11px] text-emerald-200/80 font-medium">
              <p>Problem Statement: AgentX — PS-01: Scheme Saathi</p>
              <p>Team: Tech Dynamites</p>
              <p>Shree L.R. Tiwari College of Engineering</p>
            </div>
          </div>

          {/* Col 2: Core Philosophy */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#F4A261]">
              Core Principles
            </h4>
            <div className="space-y-2 text-xs text-emerald-100/90">
              <p><strong>Rules Decide:</strong> Deterministic rules engine evaluates eligibility from published criteria.</p>
              <p><strong>AI Assists:</strong> Multi-lingual companion helps find schemes and prepare checklists.</p>
              <p><strong>Humans Approve:</strong> Explicit authorization enforced before official portal submission.</p>
            </div>
          </div>

          {/* Col 3: Official Reference Sources */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#F4A261]">
              Official Reference Portals
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-100/90">
              <li>
                <a href="https://mahadbt.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1">
                  <span>MahaDBT Portal (Maharashtra)</span>
                  <ExternalLink className="w-3 h-3 text-emerald-300" />
                </a>
              </li>
              <li>
                <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1">
                  <span>National Scholarship Portal (NSP)</span>
                  <ExternalLink className="w-3 h-3 text-emerald-300" />
                </a>
              </li>
              <li>
                <a href="https://www.myscheme.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1">
                  <span>myScheme (Govt of India)</span>
                  <ExternalLink className="w-3 h-3 text-emerald-300" />
                </a>
              </li>
              <li>
                <a href="https://www.umang.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1">
                  <span>UMANG Unified Portal</span>
                  <ExternalLink className="w-3 h-3 text-emerald-300" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Transparency Disclaimer */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#F4A261]">
              Citizen Trust & Transparency
            </h4>
            <p className="text-[11px] text-emerald-100/80 leading-relaxed">
              PlacePilot AI never fabricates government submission confirmations or official application statuses. All application handoffs direct to official government domains (.gov.in / .nic.in).
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-200/80 gap-2">
          <p>© 2026 PlacePilot AI • PS-01: Scheme Saathi • Built for Indian Citizens</p>
          <p className="font-bold text-[#F4A261]">Team Tech Dynamites • Shree L.R. Tiwari College of Engineering</p>
        </div>
      </div>
    </footer>
  );
};
