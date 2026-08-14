import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-12 pb-8 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8 mb-12">
        <div className="col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="text-lg font-bold text-slate-900">SkillHire</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">Smart Skill Verification & Hiring Portal</p>
          <p className="text-xs text-slate-400">© 2026 SkillHire. All rights reserved.</p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Quick Links</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
            <li><Link to="/features" className="hover:text-indigo-600">Features</Link></li>
            <li><Link to="/how-it-works" className="hover:text-indigo-600">How It Works</Link></li>
            <li><Link to="/about" className="hover:text-indigo-600">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-600">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-indigo-600">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">For Candidates</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li><Link to="/candidate/jobs" className="hover:text-indigo-600">Browse Jobs</Link></li>
            <li><Link to="/candidate/tests" className="hover:text-indigo-600">Skill Tests</Link></li>
            <li><Link to="/candidate/profile" className="hover:text-indigo-600">Create Profile</Link></li>
            <li><Link to="/candidate/applications" className="hover:text-indigo-600">Applications</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">For Companies</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li><Link to="/company/post-job" className="hover:text-indigo-600">Post a Job</Link></li>
            <li><Link to="/company/candidates" className="hover:text-indigo-600">Find Talent</Link></li>
            <li><Link to="/companies" className="hover:text-indigo-600">Pricing</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}