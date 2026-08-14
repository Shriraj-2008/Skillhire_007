import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftBanner from '../../components/LeftBanner';
import { useAuth } from '../../context/AuthContext';
import { 
  Mail, ShieldCheck, RotateCcw, User, Phone, Lock, Eye, EyeOff, 
  ArrowRight, Building2, Globe 
} from 'lucide-react';

export default function Register() {
  const { registerUser } = useAuth() || {};
  const navigate = useNavigate();

  // Role State: 'candidate' | 'company'
  const [role, setRole] = useState('candidate');

  // Step State: 'form' | 'otp'
  const [step, setStep] = useState('form');

  // Unified Form State
  const [formData, setFormData] = useState({
    name: '',           // Candidate Name OR HR Name
    companyName: '',     // Company only
    website: '',         // Company only
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // OTP Timer Logic
  useEffect(() => {
    if (step !== 'otp' || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, step]);

  const handleRoleSwitch = (selectedRole) => {
    setRole(selectedRole);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (role === 'candidate' && !formData.name) {
      setError('Please enter your full name.');
      return;
    }

    if (role === 'company' && (!formData.companyName || !formData.name)) {
      setError('Please enter Company Name and Contact Person Name.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    setStep('otp');
    setTimer(45);
  };

  // Improved OTP Input Logic
  const handleOtpChange = (val, index) => {
    // Only allow digits
    if (val && !/^\d+$/.test(val)) return;

    const newOtp = [...otp];
    // Take the last entered character if multiple characters are typed
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Move to next input if digit entered
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Improved Backspace / Arrow Key Navigation
  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
          const newOtp = [...otp];
          newOtp[index - 1] = '';
          setOtp(newOtp);
        }
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  // Paste OTP Logic (6 digits ek saath paste karne ke liye)
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];

    digits.forEach((digit, idx) => {
      newOtp[idx] = digit;
    });

    setOtp(newOtp);

    // Focus on the last pasted field or next empty field
    const targetIdx = Math.min(digits.length, 5);
    const targetInput = document.getElementById(`otp-input-${targetIdx}`);
    if (targetInput) targetInput.focus();
  };

  const handleResendOTP = () => {
    if (timer > 0) return;
    alert(`New OTP sent to ${formData.email}!`);
    setOtp(['', '', '', '', '', '']);
    setTimer(45);
    setError('');
    // Focus first input box
    document.getElementById('otp-input-0')?.focus();
  };

  // OTP Verification & Redirection
  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length < 6) {
      setError('Please enter a complete 6-digit OTP.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (registerUser) {
        await registerUser({
          ...formData,
          role: role
        });
      }

      setLoading(false);
      
      // Route Navigation matched with App.jsx
      if (role === 'company') {
        navigate('/company/dashboard');
      } else {
        navigate('/candidate/dashboard');
      }
    } catch (err) {
      setLoading(false);
      setError('Verification failed. Please try again.');
    }
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex min-h-[calc(100vh-73px)]">
      {/* Left Banner */}
      <LeftBanner type={step === 'form' ? `${role}-register` : 'otp'} />

      {/* Right Form Box */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center bg-slate-50/50">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          
          {error && (
            <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl font-medium text-center">
              {error}
            </div>
          )}

          {step === 'form' ? (
            <>
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
                <p className="text-xs text-slate-400">Join SkillHire to get started</p>
              </div>

              {/* Role Switcher */}
              <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('candidate')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                    role === 'candidate'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Candidate
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('company')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                    role === 'company'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Company / HR
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {/* Company Specific Fields */}
                {role === 'company' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Company Name</label>
                      <div className="relative">
                        <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          name="companyName"
                          placeholder="e.g. Acme Corporation"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-indigo-600 transition"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Company Website (Optional)</label>
                      <div className="relative">
                        <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          name="website"
                          placeholder="www.company.com"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-indigo-600 transition"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {role === 'company' ? 'HR / Recruiter Name' : 'Full Name'}
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder={role === 'company' ? 'Enter HR contact name' : 'Enter full name'}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-indigo-600 transition"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {role === 'company' ? 'Work Email Address' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder={role === 'company' ? 'hr@company.com' : 'Enter email address'}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-indigo-600 transition"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-indigo-600 transition"
                      required
                    />
                  </div>
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-8 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-indigo-600 transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Confirm Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-8 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-indigo-600 transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg ${
                    role === 'company' 
                      ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' 
                      : 'bg-purple-600 hover:bg-purple-700 shadow-purple-200'
                  }`}
                >
                  Continue to OTP <ArrowRight size={16} />
                </button>
              </form>

              <p className="text-xs text-slate-500 text-center pt-2">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </>
          ) : (
            /* OTP Screen */
            <div className="text-center space-y-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
                role === 'company' ? 'bg-indigo-100 text-indigo-600' : 'bg-purple-100 text-purple-600'
              }`}>
                <Mail size={32} />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">OTP Verification</h2>
                <p className="text-xs text-slate-400">
                  Welcome <span className="font-semibold text-slate-700">{formData.name}</span>, enter code sent to <br />
                  <span className="text-indigo-600 font-bold">{formData.email}</span>
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-6">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                      onPaste={handleOtpPaste}
                      className="w-12 h-14 text-center text-lg font-bold border border-slate-300 rounded-xl focus:border-indigo-600 outline-none transition"
                    />
                  ))}
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  Expires in <span className="text-indigo-600 font-bold">{formatTimer(timer)}</span>
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg ${
                    role === 'company' 
                      ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' 
                      : 'bg-purple-600 hover:bg-purple-700 shadow-purple-200'
                  }`}
                >
                  <ShieldCheck size={16} /> {loading ? 'Saving Profile...' : 'Verify & Complete'}
                </button>
              </form>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-[11px] text-slate-400 font-medium">OR</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={timer > 0}
                className={`w-full flex items-center justify-center gap-2 border py-2.5 rounded-xl text-xs font-semibold transition ${
                  timer > 0
                    ? 'border-slate-200 text-slate-400 cursor-not-allowed bg-slate-50'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <RotateCcw size={14} />
                {timer > 0 ? `Resend Code (${formatTimer(timer)})` : 'Resend Code Now'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}