import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, FileText, CheckSquare, Award, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    { num: 1, icon: <UserPlus className="text-indigo-600" />, title: 'Register', desc: 'Create your account in just 2 minutes. Choose your role.' },
    { num: 2, icon: <FileText className="text-blue-600" />, title: 'Complete Profile', desc: 'Fill in your details, education, skills & projects.' },
    { num: 3, icon: <CheckSquare className="text-purple-600" />, title: 'Take Skill Tests', desc: 'Take industry-relevant tests to get your skills verified.' },
    { num: 4, icon: <Award className="text-emerald-600" />, title: 'Get Verified', desc: 'Showcase your verified badges with total confidence.' },
    { num: 5, icon: <Send className="text-amber-600" />, title: 'Apply Jobs', desc: 'Apply to matched jobs using your single-click profile.' },
    { num: 6, icon: <CheckCircle2 className="text-teal-600" />, title: 'Get Hired', desc: 'Crack interviews and land your dream role with ease.' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-8 space-y-16">
      {/* Title Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
          Simple, Fast & Effective
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900">
          How <span className="text-indigo-600">SkillHire</span> Works?
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          We’ve made the process simple and efficient so you can focus on what truly matters—finding and building the right talent.
        </p>
      </div>


      <div className="grid grid-cols-6 gap-4 relative">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-3 relative">
            <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto">
              {step.num}
            </div>
            <div className="p-3 bg-slate-50 rounded-xl w-fit mx-auto">{step.icon}</div>
            <h3 className="font-bold text-xs text-slate-800">{step.title}</h3>
            <p className="text-[11px] text-slate-500 leading-tight">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 rounded-3xl p-8 text-white flex justify-between items-center shadow-lg shadow-indigo-100">
        <div>
          <h2 className="text-2xl font-bold mb-1">Join Thousands of Successful Professionals</h2>
          <p className="text-indigo-100 text-xs">Start your journey today and experience the future of skill verification.</p>
        </div>
        <button 
          onClick={() => navigate('/register')}
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-xs hover:bg-indigo-50 transition flex items-center gap-2"
        >
          Get Started Now <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}