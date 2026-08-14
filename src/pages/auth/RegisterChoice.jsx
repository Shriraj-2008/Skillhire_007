import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Building2, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function RegisterChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between p-6">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto w-full flex justify-between items-center py-2">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-500/30">
            S
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            Skill<span className="text-indigo-600">Hire</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="text-slate-500">Already have an account?</span>
          <button 
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-white border border-slate-200 text-indigo-600 rounded-xl hover:bg-slate-50 transition font-bold"
          >
            Login
          </button>
        </div>
      </header>

      {/* Main Choice Section */}
      <main className="max-w-5xl mx-auto w-full my-auto py-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3.5 py-1.5 rounded-full text-xs font-bold">
            <Sparkles size={14} /> Join SkillHire Today
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Choose How You Want To <span className="text-indigo-600">Get Started</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            Select your account type to continue. Whether you are looking for your next job or hiring top talent, we've got you covered.
          </p>
        </div>

        {/* Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Candidate Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/80 flex flex-col justify-between space-y-6 hover:border-purple-300 transition-all duration-300 group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-purple-50 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  <UserCheck size={28} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  For Job Seekers
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">Candidate Registration</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Create your profile, showcase verified skills, and get discovered by top hiring companies directly.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>AI-powered Skill Assessments</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>One-click Job Applications</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigate('/candidate/register')}
              className="w-full py-3 px-4 bg-slate-900 group-hover:bg-purple-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
            >
              Register as Candidate <ArrowRight size={16} />
            </button>
          </div>

          {/* Company / HR Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/80 flex flex-col justify-between space-y-6 hover:border-indigo-400 transition-all duration-300 group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <Building2 size={28} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  For Employers & HR
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">Company Registration</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Post job openings, evaluate pre-verified talent, and build high-performing winning teams with ease.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-indigo-500 shrink-0" />
                  <span>Access Pre-verified Talent Pool</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-indigo-500 shrink-0" />
                  <span>Smart Applicant Tracking System (ATS)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigate('/company/register')}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-indigo-200"
            >
              Register as Company <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </main>

      <footer className="text-center py-4">
        <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck size={16} className="text-indigo-600" /> Secure 256-Bit SSL Encryption
        </p>
      </footer>
    </div>
  );
}