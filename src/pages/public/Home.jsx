import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, UserPlus, CheckCircle, Award, Target, Briefcase, Smile, ShieldCheck, Users, Building, Bell } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-20 py-12 px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="grid grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles size={14} /> Smart Skill Verification & Hiring Portal
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
            Find Jobs Based on Your <span className="text-indigo-600">Verified Skills</span>
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            SkillHire helps students and professionals showcase their true skills through verified tests and get hired by top companies.
          </p>
          <div className="flex gap-4 pt-2">
            <button onClick={() => navigate('/register')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition text-sm flex items-center gap-2 shadow-lg shadow-indigo-100">
              Get Started <ArrowRight size={16} />
            </button>
            <button onClick={() => navigate('/candidate/tests')} className="bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition text-sm">
              Take Demo Test
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
            <div><p className="text-xl font-bold text-slate-900">10K+</p><p className="text-xs text-slate-500">Active Users</p></div>
            <div><p className="text-xl font-bold text-slate-900">500+</p><p className="text-xs text-slate-500">Companies</p></div>
            <div><p className="text-xl font-bold text-slate-900">25K+</p><p className="text-xs text-slate-500">Skills Verified</p></div>
          </div>
        </div>

  
      </section>

      {/* Why Choose SkillHire */}
      <section className="text-center space-y-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Why Choose <span className="text-indigo-600">SkillHire?</span></h2>
          <p className="text-slate-500 text-xs mt-1">Everything you need to verify, showcase, and hire talent.</p>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <FeatureBadge icon={<UserPlus className="text-indigo-600" />} title="Structured Profile" desc="Create a professional profile with details." />
          <FeatureBadge icon={<Award className="text-blue-600" />} title="Skill Verification" desc="Take skill tests & get verified." />
          <FeatureBadge icon={<Target className="text-emerald-600" />} title="Smart Matching" desc="Get matched with top jobs." />
          <FeatureBadge icon={<Building className="text-purple-600" />} title="Top Companies" desc="Connect with top employers." />
          <FeatureBadge icon={<Bell className="text-amber-600" />} title="Real-time Alerts" desc="Stay updated with notifications." />
          <FeatureBadge icon={<ShieldCheck className="text-teal-600" />} title="Secure & Reliable" desc="Enterprise grade security." />
        </div>
      </section>
    </div>
  );
}

function FeatureBadge({ icon, title, desc }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-left space-y-2">
      <div className="p-2 bg-slate-50 rounded-xl w-fit">{icon}</div>
      <h4 className="font-bold text-xs text-slate-800">{title}</h4>
      <p className="text-[11px] text-slate-500 leading-tight">{desc}</p>
    </div>
  );
}