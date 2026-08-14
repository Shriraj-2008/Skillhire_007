import React, { useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, RotateCw, Mail, ArrowLeft, Sparkles } from 'lucide-react';
import AuthHeader from '../../components/layout/AuthHeader';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'user@example.com';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);
  const [error, setError] = useState('');

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next box
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) return setError('Please enter 6-digit code');

    try {
      await verifyOtpCode({ email, code });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
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
            Verify Your Email <span className="text-indigo-600">OTP Verification</span>
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            We have sent a 6-digit One Time Password (OTP) to your registered email address.
          </p>
        </div>

        {/* Right OTP Box */}
        <div className="col-span-7 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-center">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
            <Mail size={28} />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">OTP Verification</h2>
            <p className="text-xs text-slate-500">
              Enter the 6-digit code sent to your email <br />
              <span className="font-semibold text-indigo-600">{email}</span>
            </p>
          </div>

          {error && <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-12 text-center text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none"
                />
              ))}
            </div>

            <p className="text-xs text-slate-400">This code will expire in <span className="font-bold text-slate-700">09:45</span> minutes</p>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 flex items-center justify-center gap-2 transition"
            >
              <ShieldCheck size={16} /> Verify Code
            </button>
          </form>

          <div className="space-y-3 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] text-slate-400 absolute font-medium">OR</span>
            </div>
            <button className="w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-100 transition">
              <RotateCw size={14} /> Resend Code (00:45)
            </button>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl text-left flex items-start gap-2.5 text-[11px] text-slate-500 border border-slate-100">
            <ShieldCheck size={16} className="text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-700">Didn't receive the code?</p>
              <p className="text-slate-400">Check your spam folder or click resend code to get a new one.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}