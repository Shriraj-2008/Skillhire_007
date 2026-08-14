import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, CheckCircle2, Award, Bookmark, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CandidateDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fallback Values if state is loading/empty
  const displayName = user?.name || 'Candidate';
  const appliedCount = user?.appliedJobsCount ?? 0;
  const testsCount = user?.testsCompletedCount ?? 0;
  const certsCount = user?.certificatesCount ?? 0;
  const savedCount = user?.savedJobsCount ?? 0;
  const completionPercent = user?.profileCompletion ?? 25;

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-6">
      {/* Dynamic Header */}
      <div className="bg-indigo-600 rounded-3xl p-8 text-white flex justify-between items-center relative overflow-hidden">
        <div className="space-y-2 z-10">
          <h1 className="text-3xl font-extrabold">Welcome back, {displayName}! 👋</h1>
          <p className="text-indigo-100 text-sm">
            Keep learning, keep improving and let the right opportunity find you.
          </p>
          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => navigate('/candidate/browse-jobs')} 
              className="bg-white text-indigo-600 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-indigo-50 transition"
            >
              Browse Jobs
            </button>
            <button 
              onClick={() => navigate('/candidate/tests')} 
              className="bg-indigo-700/60 border border-indigo-400/30 text-white font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-indigo-700 transition"
            >
              Take Skill Test
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Briefcase size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">{appliedCount}</h3>
            <p className="text-xs text-slate-400">Applied Jobs</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">{testsCount}</h3>
            <p className="text-xs text-slate-400">Tests Completed</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Award size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">{certsCount}</h3>
            <p className="text-xs text-slate-400">Certificates</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Bookmark size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">{savedCount}</h3>
            <p className="text-xs text-slate-400">Saved Jobs</p>
          </div>
        </div>
      </div>

      {/* Profile Progress */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-slate-800">Complete Your Profile</h4>
          <p className="text-xs text-slate-400">
            Increase your profile strength and get better job recommendations.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-extrabold text-indigo-600">{completionPercent}%</span>
          <button 
            onClick={() => navigate('/candidate/edit-profile')} 
            className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition"
          >
            Complete Profile <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}