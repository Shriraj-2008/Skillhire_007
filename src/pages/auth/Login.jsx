import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Building, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, Briefcase, TrendingUp } from 'lucide-react';
import AuthHeader from '../../components/layout/AuthHeader';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [role, setRole] = useState('candidate');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: true });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Extract Dynamic Name from Email (e.g. lucky@gmail.com -> Lucky)
      const rawName = formData.email.split('@')[0] || 'User';
      const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

      const loggedInUser = {
        id: Date.now(),
        name: formattedName,
        email: formData.email,
        role: role,
        appliedJobsCount: 4,
        skillsVerified: 3,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.email}`,
        recentActivity: [
          { id: 1, text: 'Passed React JS Assessment', date: 'Today' },
          { id: 2, text: 'Applied for Frontend Developer at Tech Corp', date: 'Yesterday' }
        ]
      };

      // Context me Data Save Karein
      if (login) login(loggedInUser);

      // Redirection
      if (role === 'candidate') {
        navigate('/candidate/dashboard');
      } else {
        navigate('/company/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <AuthHeader rightAction="register" />

      {/* Main Container - Desktop Grid (5 Columns Left, 7 Columns Right) */}
      <div className="flex-1 flex items-center justify-center p-6">
        <main className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Side Feature Banner */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-slate-900 leading-snug">
                {role === 'candidate' ? (
                  <>Find Jobs Based on Your <span className="text-indigo-600">Verified Skills</span></>
                ) : (
                  <>Find Top Talent for Your <span className="text-indigo-600">Company</span></>
                )}
              </h1>
              <p className="text-xs text-slate-500 leading-relaxed">
                {role === 'candidate'
                  ? 'Join thousands of students and professionals who have verified their skills and are getting hired by top companies.'
                  : 'SkillHire helps companies discover, evaluate and hire verified candidates with the right skills to build stronger teams.'}
              </p>
            </div>

            <div className="space-y-4">
              {role === 'candidate' ? (
                <>
                  <BannerFeature icon={<CheckCircle2 className="text-indigo-600" size={18} />} title="Verified Skills" desc="Prove your skills with our industry-relevant tests" />
                  <BannerFeature icon={<Briefcase className="text-indigo-600" size={18} />} title="Top Opportunities" desc="Get noticed by top companies looking for skilled talent" />
                  <BannerFeature icon={<TrendingUp className="text-indigo-600" size={18} />} title="Smart Matching" desc="We match you with jobs that fit your skills and goals" />
                </>
              ) : (
                <>
                  <BannerFeature icon={<User className="text-indigo-600" size={18} />} title="Verified Candidates" desc="Hire from a pool of pre-verified and skilled professionals." />
                  <BannerFeature icon={<Briefcase className="text-indigo-600" size={18} />} title="Smart Hiring Tools" desc="Assess, shortlist and collaborate with ease." />
                  <BannerFeature icon={<TrendingUp className="text-indigo-600" size={18} />} title="Better Matches" desc="AI-powered matching to find the right fit for your role." />
                </>
              )}
            </div>
          </div>

          {/* Right Form Card */}
          <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-slate-900">
                {role === 'candidate' ? 'Welcome Back!' : 'HR / Company Login'}
              </h2>
              <p className="text-xs text-slate-400">
                {role === 'candidate' ? 'Login to your account to continue' : 'Welcome back! Please login to your company account.'}
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
              <button
                type="button"
                onClick={() => setRole('candidate')}
                className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                  role === 'candidate' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <User size={15} /> Candidate Login
              </button>
              <button
                type="button"
                onClick={() => setRole('hr')}
                className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                  role === 'hr' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building size={15} /> HR / Company Login
              </button>
            </div>

            {error && <div className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {role === 'candidate' ? 'Email Address' : 'Work Email'}
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={role === 'candidate' ? 'Enter your email' : 'Enter your work email'}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember Me
                </label>
                <Link to="/forgot-password" className="text-indigo-600 font-semibold hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'} <ArrowRight size={16} />
              </button>
            </form>

            {/* Social Logins */}
            <div className="space-y-3 pt-2">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-white px-3 text-[11px] text-slate-400 absolute font-medium">or continue with</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button type="button" className="py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 transition">
                  <span>Google</span>
                </button>
                <button type="button" className="py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 transition">
                  <span>GitHub</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl text-center flex items-center justify-center gap-2 text-[11px] text-slate-500 border border-slate-100">
              <ShieldCheck size={14} className="text-indigo-600" />
              <span>Your data is safe with us. We never share your information.</span>
            </div>
          </div>
        </main>
      </div>

      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-100">
        © 2026 SkillHire. All rights reserved. | <Link to="/privacy" className="hover:underline">Privacy Policy</Link> | <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
      </footer>
    </div>
  );
}

function BannerFeature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 shrink-0">{icon}</div>
      <div>
        <h4 className="text-xs font-bold text-slate-800">{title}</h4>
        <p className="text-[11px] text-slate-500 leading-tight">{desc}</p>
      </div>
    </div>
  );
}