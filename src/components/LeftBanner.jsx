import React from 'react';
import { ShieldCheck, UserCheck, Lock } from 'lucide-react';

export default function LeftBanner({ type = "otp" }) {
  return (
    <div className="w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
      
      {/* Background Decorator Circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Branding / Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-lg">
            S
          </div>
          <span className="font-bold text-xl tracking-wide">SecurePortal</span>
        </div>
      </div>

      {/* Middle Illustration / Features Section */}
      <div className="relative z-10 space-y-6 my-auto max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-medium">
          <ShieldCheck size={14} />
          <span>Two-Factor Authentication</span>
        </div>

        <h1 className="text-4xl font-extrabold leading-tight">
          Secure & Seamless <br /> Verification Process
        </h1>

        <p className="text-indigo-200 text-sm leading-relaxed">
          We prioritize your account security. Verify your details to complete registration and gain access to your personalized dashboard.
        </p>

        {/* Dynamic Feature Highlights */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
            <div className="p-2 bg-indigo-500/30 rounded-xl text-indigo-200">
              <Lock size={18} />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">End-to-End Encrypted</h4>
              <p className="text-[11px] text-indigo-200">Your data and credentials remain fully protected.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
            <div className="p-2 bg-indigo-500/30 rounded-xl text-indigo-200">
              <UserCheck size={18} />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">Instant Account Access</h4>
              <p className="text-[11px] text-indigo-200">Get verified in seconds and manage your portal effortlessly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Text */}
      <div className="relative z-10 text-xs text-indigo-300/80">
        © {new Date().getFullYear()} SecurePortal Inc. All rights reserved.
      </div>
    </div>
  );
}