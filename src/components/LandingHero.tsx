import React, { useState } from 'react';
import { 
  Bot, 
  Compass, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Send, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Globe,
  Check,
  Building2,
  Users,
  Search,
  FileCheck
} from 'lucide-react';
import { SCHEME_CATEGORIES } from '../data/schemes';
import { Scheme } from '../types';

interface LandingHeroProps {
  onNavigate: (view: string) => void;
  onSelectCategory: (cat: string) => void;
  featuredSchemes: Scheme[];
  onOpenScheme: (s: Scheme) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onNavigate,
  onSelectCategory,
  featuredSchemes,
  onOpenScheme
}) => {
  const officialPortals = [
    { name: 'myScheme Portal', category: 'Central Govt', url: 'https://www.myscheme.gov.in/', desc: 'National One-Stop Government Scheme Search' },
    { name: 'National Scholarship Portal', category: 'Central Govt', url: 'https://scholarships.gov.in/', desc: 'Central & State Merit/Need Scholarships' },
    { name: 'MahaDBT Portal', category: 'Maharashtra', url: 'https://mahadbt.maharashtra.gov.in/', desc: 'Direct Benefit Transfer Scholarships & Grants' },
    { name: 'UMANG Portal', category: 'Central Govt', url: 'https://www.umang.gov.in/', desc: 'Unified Mobile App for New-Age Governance' },
    { name: 'India.gov.in', category: 'National Portal', url: 'https://www.india.gov.in/', desc: 'National Portal of India' }
  ];

  return (
    <div className="space-y-16 pb-12 font-sans selection:bg-[#4CC9F0] selection:text-black">

      {/* 1. HERO SECTION - Futuristic Deep Navy & Violet Palette */}
      <section className="bg-gradient-to-br from-[#0A1128] via-[#1C1A52] to-[#3A0CA3] text-white rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative border border-[#3A0CA3]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

          {/* Left Side Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#3A0CA3]/80 text-[#4CC9F0] text-xs font-bold tracking-wider uppercase border border-[#4CC9F0]/30 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#4CC9F0] animate-pulse"></span>
              <span>AGENTX PS-01 · SCHEME SAATHI</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-[1.15] tracking-tight">
              Government benefits, <span className="bg-gradient-to-r from-[#4CC9F0] to-[#F43F5E] bg-clip-text text-transparent">made easier for everyone.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#C7D2FE] leading-relaxed">
              Discover government schemes and scholarships, check your eligibility, prepare documents and get help with applications — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('explorer')}
                className="px-6 py-3.5 rounded-xl bg-[#4CC9F0] hover:bg-[#38BDF8] text-[#0A1128] font-black text-sm flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <Compass className="w-4 h-4" />
                <span>Discover Schemes</span>
              </button>

              <button
                onClick={() => onNavigate('assistant')}
                className="px-6 py-3.5 rounded-xl bg-[#3A0CA3] hover:bg-[#4C1D95] text-white border border-[#4CC9F0]/40 font-bold text-sm flex items-center justify-center space-x-2 transition"
              >
                <Bot className="w-4 h-4 text-[#4CC9F0]" />
                <span>Talk to Scheme Saathi</span>
              </button>
            </div>

            <div className="pt-4 border-t border-[#3A0CA3] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#C7D2FE] font-semibold">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-[#4CC9F0]" />
                <span>Hindi, Marathi & English</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#4CC9F0]" />
                <span>Transparent Eligibility Checks</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#4CC9F0]" />
                <span>Citizen-Controlled Applications</span>
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Scheme Readiness Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A1128] border border-[#3A0CA3] text-white rounded-2xl p-6 shadow-2xl space-y-5 relative">
              <div className="flex items-center justify-between border-b border-[#3A0CA3] pb-3">
                <div>
                  <div className="text-[10px] uppercase font-extrabold tracking-wider text-[#4CC9F0]">DEMONSTRATION PREVIEW</div>
                  <h2 className="font-bold text-base text-white">Scheme Readiness Preview</h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#3A0CA3] text-[#4CC9F0] border border-[#4CC9F0]/40 font-bold">
                  Sample Data
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-[#1C1A52] p-3.5 rounded-xl flex items-center justify-between border border-[#3A0CA3]">
                  <div className="flex items-center space-x-3">
                    <Compass className="w-4 h-4 text-[#4CC9F0]" />
                    <span>Relevant schemes discovered</span>
                  </div>
                  <span className="font-black text-sm text-[#4CC9F0]">12 Schemes</span>
                </div>

                <div className="bg-[#1C1A52] p-3.5 rounded-xl flex items-center justify-between border border-[#3A0CA3]">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Eligibility matches</span>
                  </div>
                  <span className="font-black text-sm text-emerald-400">4 Verified</span>
                </div>

                <div className="bg-[#1C1A52] p-3.5 rounded-xl flex items-center justify-between border border-[#3A0CA3]">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-4 h-4 text-amber-300" />
                    <span>Documents pending</span>
                  </div>
                  <span className="font-black text-sm text-amber-300">2 Required</span>
                </div>

                <div className="bg-[#1C1A52] p-3.5 rounded-xl flex items-center justify-between border border-[#3A0CA3]">
                  <div className="flex items-center space-x-3">
                    <Send className="w-4 h-4 text-[#F43F5E]" />
                    <span>Application draft ready</span>
                  </div>
                  <span className="font-black text-sm text-[#F43F5E]">1 Draft</span>
                </div>
              </div>

              <p className="text-[11px] text-[#C7D2FE]/80 italic text-center pt-1 border-t border-[#3A0CA3]">
                * Sample demonstration values. Actual records generated upon citizen sign in.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW IT WORKS - 4 Simple Steps */}
      <section className="space-y-8 text-white">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-[#4CC9F0] uppercase tracking-wider">How It Works</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Four simple steps to your government benefits
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#0A1128] border border-[#3A0CA3] rounded-2xl p-6 space-y-3 shadow-lg">
            <span className="text-2xl font-black text-[#4CC9F0]">01</span>
            <h3 className="font-bold text-base text-white">Discover</h3>
            <p className="text-xs text-[#C7D2FE] leading-relaxed">
              Find government schemes and scholarships matching your state, category, education, and income.
            </p>
          </div>

          <div className="bg-[#0A1128] border border-[#3A0CA3] rounded-2xl p-6 space-y-3 shadow-lg">
            <span className="text-2xl font-black text-[#4CC9F0]">02</span>
            <h3 className="font-bold text-base text-white">Check</h3>
            <p className="text-xs text-[#C7D2FE] leading-relaxed">
              Understand your eligibility through published, transparent government rules with citations.
            </p>
          </div>

          <div className="bg-[#0A1128] border border-[#3A0CA3] rounded-2xl p-6 space-y-3 shadow-lg">
            <span className="text-2xl font-black text-[#4CC9F0]">03</span>
            <h3 className="font-bold text-base text-white">Prepare</h3>
            <p className="text-xs text-[#C7D2FE] leading-relaxed">
              Collect required certificates, verify extracted OCR details, and prefill your application draft.
            </p>
          </div>

          <div className="bg-[#0A1128] border border-[#3A0CA3] rounded-2xl p-6 space-y-3 shadow-lg">
            <span className="text-2xl font-black text-[#4CC9F0]">04</span>
            <h3 className="font-bold text-base text-white">Apply</h3>
            <p className="text-xs text-[#C7D2FE] leading-relaxed">
              Review your application, explicitly approve it, and proceed safely to the official government portal.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MAIN FEATURE GROUPS */}
      <section className="space-y-8 text-white">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-[#4CC9F0] uppercase tracking-wider">Features</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Designed for clarity, trust, and simplicity
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0A1128] border border-[#3A0CA3] rounded-2xl p-6 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#3A0CA3] text-[#4CC9F0] flex items-center justify-center font-bold">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Scheme Discovery</h3>
            <p className="text-xs sm:text-sm text-[#C7D2FE] leading-relaxed">
              Search across Central and State government databases with simple filters for scholarships, agriculture, healthcare, housing, and social welfare.
            </p>
          </div>

          <div className="bg-[#0A1128] border border-[#3A0CA3] rounded-2xl p-6 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#3A0CA3] text-emerald-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Eligibility Intelligence</h3>
            <p className="text-xs sm:text-sm text-[#C7D2FE] leading-relaxed">
              Our deterministic rules engine evaluates published government conditions line-by-line, giving you clear eligibility verdicts with official source references.
            </p>
          </div>

          <div className="bg-[#0A1128] border border-[#3A0CA3] rounded-2xl p-6 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#3A0CA3] text-amber-300 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Application Readiness</h3>
            <p className="text-xs sm:text-sm text-[#C7D2FE] leading-relaxed">
              Upload certificates in Document Studio, extract OCR data automatically, and prefill application form drafts without typing repetitive information.
            </p>
          </div>

          <div className="bg-[#0A1128] border border-[#3A0CA3] rounded-2xl p-6 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#3A0CA3] text-[#F43F5E] flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Application Companion</h3>
            <p className="text-xs sm:text-sm text-[#C7D2FE] leading-relaxed">
              Scheme Saathi speaks English, Hindi, and Marathi, offering voice input, document checklists, and follow-up reminders so you never miss a deadline.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SCHEME SAATHI AI SECTION */}
      <section className="bg-gradient-to-r from-[#2E1065] via-[#3A0CA3] to-[#0A1128] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#3A0CA3] space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#2E1065] text-[#4CC9F0] text-xs font-bold border border-[#4CC9F0]/40">
            <Bot className="w-4 h-4 text-[#F43F5E]" />
            <span>AI ASSISTANT PREVIEW</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Meet Scheme Saathi, your multi-lingual companion
          </h2>
          <p className="text-xs sm:text-sm text-[#C7D2FE]">
            Ask questions naturally in English, Hindi, or Marathi and receive instant guidance based on published rules.
          </p>
        </div>

        <div className="bg-[#0A1128] border border-[#3A0CA3] rounded-2xl p-5 space-y-4 max-w-2xl text-xs">
          <div className="flex items-start space-x-3">
            <div className="w-7 h-7 rounded-full bg-[#F43F5E] text-white font-bold flex items-center justify-center flex-shrink-0">
              You
            </div>
            <div className="bg-[#1C1A52] text-white p-3 rounded-2xl rounded-tl-none font-medium border border-[#3A0CA3]">
              "मुझे महाराष्ट्र में पढ़ाई के लिए scholarship चाहिए।"
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-7 h-7 rounded-full bg-[#4CC9F0] text-[#0A1128] font-bold flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#2E1065] border border-[#3A0CA3] text-white p-3 rounded-2xl rounded-tl-none space-y-1">
              <p className="font-bold text-[#4CC9F0]">Scheme Saathi:</p>
              <p>I can help you discover relevant scholarships. First, tell me your current education level.</p>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => onNavigate('assistant')}
            className="px-6 py-3 rounded-xl bg-[#4CC9F0] hover:bg-[#38BDF8] text-[#0A1128] font-black text-sm inline-flex items-center space-x-2 shadow-lg transition"
          >
            <Bot className="w-4 h-4" />
            <span>Talk to Scheme Saathi</span>
          </button>
        </div>
      </section>

      {/* 5. OFFICIAL PORTALS SECTION */}
      <section className="space-y-6 text-white">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-extrabold text-[#4CC9F0] uppercase tracking-wider">Verified Sources</span>
          <h2 className="text-2xl font-black text-white">Official Government Portals</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {officialPortals.map((portal, idx) => (
            <a
              key={idx}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0A1128] border border-[#3A0CA3] hover:border-[#4CC9F0] p-4 rounded-xl flex items-start justify-between space-x-3 transition group shadow-md"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4CC9F0] block">
                  {portal.category}
                </span>
                <h3 className="font-bold text-sm text-white group-hover:text-[#4CC9F0] transition">
                  {portal.name}
                </h3>
                <p className="text-xs text-[#C7D2FE]">
                  {portal.desc}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-[#C7D2FE] group-hover:text-[#4CC9F0] flex-shrink-0 mt-1" />
            </a>
          ))}
        </div>

        <p className="text-[11px] text-center text-[#C7D2FE] italic">
          * PlacePilot AI provides discovery, eligibility checking, and document readiness assistance. PlacePilot AI does not claim official government endorsement or authority.
        </p>
      </section>
    </div>
  );
};
