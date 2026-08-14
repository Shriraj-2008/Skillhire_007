import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Send, Shield, Zap, Lock, Sparkles } from 'lucide-react';
import AuthHeader from '../../components/layout/AuthHeader';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendForgotPassword({ email });
      setMessage('Password reset link sent to your registered email.');
      setTimeout(() => navigate('/verify-otp', { state: { email } }), 2000);
    } catch (err) {
      setMessage('Failed to send reset email. Check your address.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <AuthHeader rightAction="login" />

      <main className="max-w-6xl mx-auto my-auto w-full px-6 py-4 grid grid-cols-12 gap-12 items-center">
        {/* Left Banner */}
        <div className="col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles size={14} /> Smart Skill Verification & Hiring Portal
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 leading-snug">
            Forgot Your <span className="text-indigo-600">Password?</span>
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            No worries! Enter your registered email address and we’ll send you a link to reset your password.
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3"><div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Mail size={16} /></div><div><h4 className="text-xs font-bold text-slate-800">Secure Recovery</h4><p className="text-[11px] text-slate-500">Reset your password securely via email.</p></div></div>
            <div className="flex items-center gap-3"><div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Shield size={16} /></div><div><h4 className="text-xs font-bold text-slate-800">Safe & Trusted</h4><p className="text-[11px] text-slate-500">Your data is protected with industry-standard security.</p></div></div>
            <div className="flex items-center gap-3"><div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Zap size={16} /></div><div><h4 className="text-xs font-bold text-slate-800">Quick Process</h4><p className="text-[11px] text-slate-500">Get back to your account in just a few minutes.</p></div></div>
          </div>
        </div>

        {/* Right Reset Box */}
        <div className="col-span-7 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-center">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
            <Lock size={28} />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Reset Your Password</h2>
            <p className="text-xs text-slate-500">Enter your email address and we'll send you a reset link.</p>
          </div>

          {message && <div className="text-xs text-indigo-700 bg-indigo-50 p-3 rounded-xl border border-indigo-100">{message}</div>}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 flex items-center justify-center gap-2 transition"
            >
              <Send size={15} /> Send Reset Link
            </button>
          </form>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] text-slate-400 absolute font-medium">OR</span>
          </div>

          <button className="w-full py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 transition">
            <span>Recover with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
}
