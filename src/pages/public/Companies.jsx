import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';

export default function Companies() {
  const navigate = useNavigate();

  const companiesList = ['Google', 'Microsoft', 'Amazon', 'Tata', 'Infosys', 'Accenture', 'Deloitte', 'Wipro', 'Cognizant'];

  return (
    <div className="max-w-7xl mx-auto py-12 px-8 space-y-16">
      {/* Header Banner */}
      <div className="grid grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
            Top Companies. Verified Talent.
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Trusted by <span className="text-indigo-600">500+ Companies</span> That Hire the Best Talent
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            SkillHire partners with top organizations across industries to help them find, evaluate, and hire verified talent faster.
          </p>
        </div>

        {/* Company Logo Grid Box */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <h4 className="text-xs font-bold text-slate-700">Some of Our Top Partners</h4>
          <div className="grid grid-cols-3 gap-3">
            {companiesList.map((comp, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl text-center text-xs font-bold text-slate-700 border border-slate-100">
                {comp}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Why Companies Choose <span className="text-indigo-600">SkillHire</span></h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Card icon={<ShieldCheck className="text-indigo-600" />} title="Verified & Skilled Talent" desc="Access candidates who have passed standardized skill assessments." />
          <Card icon={<Zap className="text-amber-600" />} title="Faster Hiring" desc="Reduce time-to-hire with automated screening and test scoring." />
          <Card icon={<Users className="text-emerald-600" />} title="Better Quality Hires" desc="Hire candidates based on proven technical competence, not claims." />
        </div>
      </section>
    </div>
  );
}

function Card({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
      <div className="p-3 bg-slate-50 rounded-xl w-fit">{icon}</div>
      <h3 className="font-bold text-sm text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}