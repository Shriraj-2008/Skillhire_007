import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, UserCheck, Calendar, Award, Clock, 
  Download, Filter 
} from 'lucide-react';
import CompanySidebar from '../../components/Company/CompanySidebar';
import CompanyNavbar from '../../components/Company/CompanyNavbar';

export default function ReportsAnalytics() {
  const [metrics, setMetrics] = useState({
    jobsPosted: 0,
    applications: 0,
    shortlisted: 0,
    interviews: 0,
    hires: 0,
    avgTimeToHire: 0
  });

  // Calculate Metrics Dynamic Data
  useEffect(() => {
    try {
      const jobs = JSON.parse(localStorage.getItem('publishedJobs')) || [];
      const apps = JSON.parse(localStorage.getItem('app_applications')) || [];
      const short = JSON.parse(localStorage.getItem('app_shortlisted')) || [];
      const inter = JSON.parse(localStorage.getItem('app_interviews')) || [];

      setMetrics({
        jobsPosted: jobs.length,
        applications: apps.length,
        shortlisted: short.length,
        interviews: inter.length,
        hires: short.filter(s => s.stage === 'Hired').length,
        avgTimeToHire: 18
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 text-xs">
      <div className="flex-1 flex flex-col overflow-hidden">

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>Dashboard</span>
                <span>&gt;</span>
                <span className="text-slate-600 font-semibold">Reports & Analytics</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <TrendingUp className="text-indigo-600" size={24} /> Reports & Analytics
              </h1>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2">
              <Download size={15} /> Download Report
            </button>
          </div>

          {/* Dynamic Top Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                <TrendingUp size={16} />
              </div>
              <span className="text-xl font-black text-slate-900 block">{metrics.jobsPosted}</span>
              <p className="text-[11px] font-bold text-slate-500">Jobs Posted</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <Users size={16} />
              </div>
              <span className="text-xl font-black text-slate-900 block">{metrics.applications}</span>
              <p className="text-[11px] font-bold text-slate-500">Applications</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <UserCheck size={16} />
              </div>
              <span className="text-xl font-black text-slate-900 block">{metrics.shortlisted}</span>
              <p className="text-[11px] font-bold text-slate-500">Shortlisted</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                <Calendar size={16} />
              </div>
              <span className="text-xl font-black text-slate-900 block">{metrics.interviews}</span>
              <p className="text-[11px] font-bold text-slate-500">Interviews</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                <Award size={16} />
              </div>
              <span className="text-xl font-black text-slate-900 block">{metrics.hires}</span>
              <p className="text-[11px] font-bold text-slate-500">Hires</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
                <Clock size={16} />
              </div>
              <span className="text-xl font-black text-slate-900 block">{metrics.avgTimeToHire} Days</span>
              <p className="text-[11px] font-bold text-slate-500">Avg. Time to Hire</p>
            </div>
          </div>

          {/* Performance Data Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Top Performing Jobs</h3>
              <div className="space-y-3">
                <div className="flex justify-between font-bold text-slate-500 text-[11px] border-b pb-2">
                  <span>Job Title</span>
                  <span>Applications</span>
                  <span>Shortlisted</span>
                  <span>Hired</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-bold text-slate-800">Frontend Developer</span>
                  <span>{metrics.applications}</span>
                  <span>{metrics.shortlisted}</span>
                  <span>{metrics.hires}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Hiring Funnel Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Applications</span>
                  <span className="font-bold">{metrics.applications}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-full"></div>
                </div>

                <div className="flex justify-between text-xs pt-2">
                  <span>Shortlisted</span>
                  <span className="font-bold">{metrics.shortlisted}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-3/4"></div>
                </div>

                <div className="flex justify-between text-xs pt-2">
                  <span>Interviews</span>
                  <span className="font-bold">{metrics.interviews}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
