import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const faqs = [
  { q: "What is SkillHire?", a: "SkillHire is a smart skill verification and hiring platform that connects job seekers with verified skills to top companies." },
  { q: "How do I create an account on SkillHire?", a: "Click on the Register button in the navbar, select whether you are a Candidate or HR, and fill in your details." },
  { q: "How does skill verification work?", a: "Candidates take MCQ skill tests on the platform. Scoring above the passing threshold issues a verified skill badge on your profile." },
  { q: "Is the skill test free?", a: "Yes, standard candidate skill tests are 100% free." }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-5xl mx-auto py-12 px-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900">Frequently Asked <span className="text-indigo-600">Questions</span></h1>
        <p className="text-xs text-slate-500">Find answers to the most common questions about SkillHire.</p>
      </div>

      <div className="space-y-3 max-w-2xl mx-auto">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <button 
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-4 text-left flex justify-between items-center text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              <span>{faq.q}</span>
              <ChevronDown size={16} className={`transition-transform ${openIdx === idx ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
            </button>
            {openIdx === idx && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}