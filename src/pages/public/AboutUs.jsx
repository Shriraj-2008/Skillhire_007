import React from 'react';
import { Target, Eye, Award, Users } from 'lucide-react';

export default function AboutUs() {
  const team = [
    { name: 'M S DHONI', role: 'CEO & Founder' },
    { name: 'VIRAT KOHLI', role: 'CTO' },
    { name: 'ROHIT SHARMA', role: 'Head of Product' },
    { name: 'SACHIN TENDULKAR', role: 'Head of Growth' }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-8 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
          About SkillHire
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900">
          Empowering Careers Through <span className="text-indigo-600">Verified Skills</span>
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          SkillHire is a smart skill verification and hiring platform that bridges the gap between talent and opportunity through industry-relevant tests.
        </p>
      </div>

      {/* Mission / Vision Grid */}
      <div className="grid grid-cols-3 gap-6">
        <AboutBox icon={<Target className="text-indigo-600" />} title="Our Mission" desc="To bridge the gap between talent and opportunity through verified skills." />
        <AboutBox icon={<Eye className="text-purple-600" />} title="Our Vision" desc="To become the most trusted platform for skill assessment and smart hiring." />
        <AboutBox icon={<Award className="text-emerald-600" />} title="Our Goal" desc="To empower 10M+ candidates to get hired based on true potential." />
      </div>

      {/* Team Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Meet <span className="text-indigo-600">Our Team</span></h2>
          <p className="text-xs text-slate-500">The passionate people behind SkillHire.</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {team.map((m, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-2">
              <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto flex items-center justify-center font-bold text-indigo-600 text-lg">
                {m.name[0]}
              </div>
              <h4 className="font-bold text-xs text-slate-800">{m.name}</h4>
              <p className="text-[11px] text-slate-500">{m.role}</p>
              <div className="pt-2 flex justify-center text-slate-400 hover:text-indigo-600 cursor-pointer">
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AboutBox({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
      <div className="p-3 bg-slate-50 rounded-xl w-fit">{icon}</div>
      <h3 className="font-bold text-sm text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}