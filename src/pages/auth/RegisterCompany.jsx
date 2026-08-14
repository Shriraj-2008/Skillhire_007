import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building, Globe, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import AuthHeader from '../../components/layout/AuthHeader';

export default function RegisterCompany() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '', website: '', industry: '', companySize: '', description: '', workEmail: '', phone: '', password: '', confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords don't match");
    }
    try {
      await registerCompany(formData);
      navigate('/verify-otp', { state: { email: formData.workEmail } });
    } catch (err) {
      setError(err.response?.data?.message || 'Company registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <AuthHeader rightAction="login" />

      <main className="max-w-6xl mx-auto my-auto w-full px-6 py-4 grid grid-cols-12 gap-12 items-center">
        {/* Left Side Banner */}
        <div className="col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles size={14} /> Smart Skill Verification & Hiring Portal
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 leading-snug">
            Create Your Company Account and <span className="text-indigo-600">Build Winning Teams</span>
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Join thousands of companies that trust SkillHire to find, evaluate and hire verified talent for their organization.
          </p>
        </div>

        {/* Right Form Card */}
        <div className="col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">HR / Company Registration</h2>
            <p className="text-xs text-slate-400">Create your company account to get started.</p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-6 border-b border-slate-100 pb-3 text-xs">
            <div className="flex items-center gap-2 text-indigo-600 font-bold">
              <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs">1</span> Company Info
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-medium">
              <span className="w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-xs">2</span> Contact Info
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-medium">
              <span className="w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-xs">3</span> Verification
            </div>
          </div>

          {error && <div className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-1">Company Details</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Company Name</label>
                <div className="relative">
                  <Building size={14} className="absolute left-3 top-3 text-slate-400" />
                  <input type="text" required value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} placeholder="Enter company name" className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Company Website (Optional)</label>
                <div className="relative">
                  <Globe size={14} className="absolute left-3 top-3 text-slate-400" />
                  <input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="www.company.com" className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Industry Type</label>
                <select value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select industry</option>
                  <option value="IT">IT & Software</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Company Size</label>
                <select value={formData.companySize} onChange={(e) => setFormData({ ...formData, companySize: e.target.value })} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="50+">50+ employees</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Company Description (Optional)</label>
              <textarea rows="2" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Briefly describe your company..." className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>

            <p className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-1 pt-1">Contact Details</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Work Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-3 text-slate-400" />
                  <input type="email" required value={formData.workEmail} onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })} placeholder="Enter work email" className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Phone Number</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-3 text-slate-400" />
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Enter phone number" className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Create Password</label>
                <input type={showPass ? 'text' : 'password'} required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Create password" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Confirm Password</label>
                <input type={showConfirm ? 'text' : 'password'} required value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="Confirm password" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 flex items-center justify-center gap-2 transition">
              Continue <ArrowRight size={16} />
            </button>
          </form>

          <div className="bg-slate-50 p-2.5 rounded-xl text-center flex items-center justify-center gap-2 text-[11px] text-slate-500 border border-slate-100">
            <ShieldCheck size={14} className="text-indigo-600" />
            <span>Your data is safe with us. We never share your information.</span>
          </div>
        </div>
      </main>
    </div>
  );
}