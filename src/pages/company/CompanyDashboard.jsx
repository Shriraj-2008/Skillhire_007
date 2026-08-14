import React, { useState, useEffect, useCallback } from 'react';
import { 
  Briefcase, Users, UserCheck, Calendar, UserPlus, 
  ChevronDown, Building2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CompanyDashboard() {
  const { user } = useAuth();
  const companyName = user?.name || user?.companyName || 'Company Admin';

  const [dashboardJobs, setDashboardJobs] = useState([]);
  const [metrics, setMetrics] = useState({
    activeJobs: 0,
    totalApplications: 0,
    shortlisted: 0,
    interviews: 0,
    newCandidates: 0,
    appliedCount: 0,
    rejectedCount: 0
  });

  // Dynamic Data Synchronization
  const syncDashboardData = useCallback(() => {
    // 1. Fetch posted jobs from LocalStorage
    const localJobs = JSON.parse(localStorage.getItem('publishedJobs')) || [];
    
    // 2. Fetch job applications from LocalStorage
    const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];

    // Map & Calculate Applications per Job
    const formattedJobs = localJobs.map((job) => {
      const jobApps = applications.filter((app) => String(app.jobId) === String(job.id));
      const shortlisted = jobApps.filter((app) => app.status === 'Shortlisted').length;
      const interviews = jobApps.filter((app) => app.status === 'Interview').length;

      return {
        id: job.id,
        title: job.jobTitle || job.title || 'Untitled Job',
        apps: jobApps.length,
        shortlisted: shortlisted,
        interviews: interviews,
        date: job.createdAt ? new Date(job.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recently',
        status: job.status || 'Active'
      };
    });

    setDashboardJobs(formattedJobs);

    // Dynamic Metrics Calculation
    const totalApps = applications.length;
    const shortlistedCount = applications.filter(a => a.status === 'Shortlisted').length;
    const interviewCount = applications.filter(a => a.status === 'Interview').length;
    const rejectedCount = applications.filter(a => a.status === 'Rejected').length;
    const appliedCount = applications.filter(a => !a.status || a.status === 'Applied').length;

    setMetrics({
      activeJobs: localJobs.filter(j => (j.status || 'Active') === 'Active').length,
      totalApplications: totalApps,
      shortlisted: shortlistedCount,
      interviews: interviewCount,
      newCandidates: appliedCount,
      appliedCount: appliedCount,
      rejectedCount: rejectedCount
    });
  }, []);

  useEffect(() => {
    syncDashboardData();

    // Event listeners for cross-component sync
    window.addEventListener('publishedJobsUpdated', syncDashboardData);
    window.addEventListener('applicationsUpdated', syncDashboardData);
    window.addEventListener('storage', syncDashboardData);

    return () => {
      window.removeEventListener('publishedJobsUpdated', syncDashboardData);
      window.removeEventListener('applicationsUpdated', syncDashboardData);
      window.removeEventListener('storage', syncDashboardData);
    };
  }, [syncDashboardData]);

  const stats = [
    { title: 'Active Jobs', count: metrics.activeJobs, change: 'Live Status', icon: Briefcase, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'Total Applications', count: metrics.totalApplications, change: 'Live Status', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { title: 'Shortlisted', count: metrics.shortlisted, change: 'Live Status', icon: UserCheck, color: 'text-purple-600 bg-purple-50' },
    { title: 'Interviews Scheduled', count: metrics.interviews, change: 'Live Status', icon: Calendar, color: 'text-violet-600 bg-violet-50' },
    { title: 'New Candidates', count: metrics.newCandidates, change: 'Live Status', icon: UserPlus, color: 'text-sky-600 bg-sky-50' },
  ];

  // Helper function to calculate percentage for doughnut visual
  const getPercentage = (val) => {
    if (!metrics.totalApplications || metrics.totalApplications === 0) return 0;
    return Math.round((val / metrics.totalApplications) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <main className="p-8 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Welcome back, <span className="font-semibold text-slate-800">{companyName}</span>! Here's what's happening with your recruitment.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition">
            <Calendar size={14} /> Realtime Analytics <ChevronDown size={14} />
          </button>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 hover:border-slate-300 transition">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400">{s.title}</p>
                  <p className="text-2xl font-black text-slate-900">{s.count}</p>
                </div>
                <p className="text-[10px] font-bold text-emerald-600">{s.change}</p>
              </div>
            );
          })}
        </div>

        {/* Charts & Status Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Applications Overview</h3>
              <button className="flex items-center gap-1 border border-slate-200 px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
                Current View <ChevronDown size={12} />
              </button>
            </div>
            
            {/* Visual Bar Distribution based on real data */}
            <div className="h-48 border-b border-slate-100 flex items-end justify-around px-4 pb-2 text-[10px] text-slate-400">
              {dashboardJobs.length > 0 ? (
                dashboardJobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="flex flex-col items-center gap-2 h-full justify-end">
                    <div 
                      className="w-8 bg-indigo-500 rounded-t-md transition-all duration-300" 
                      style={{ height: `${Math.min(job.apps * 15 + 10, 100)}%` }}
                    />
                    <span className="truncate w-14 text-center">{job.title}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center w-full h-full text-slate-400 text-xs">
                  No posted jobs yet.
                </div>
              )}
            </div>
          </div>

          {/* Status Breakdown Box */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Applications by Status</h3>
            </div>
            <div className="flex items-center justify-around py-4">
              <div className="w-28 h-28 rounded-full border-8 border-indigo-600 border-t-purple-500 border-r-rose-500 flex items-center justify-center text-center">
                <div>
                  <span className="block text-xl font-black text-slate-900">{metrics.totalApplications}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Total</span>
                </div>
              </div>
              <ul className="text-xs space-y-2 font-medium text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span> 
                  Applied: <span className="font-bold">{metrics.appliedCount} ({getPercentage(metrics.appliedCount)}%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 
                  Shortlisted: <span className="font-bold">{metrics.shortlisted} ({getPercentage(metrics.shortlisted)}%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> 
                  Interview: <span className="font-bold">{metrics.interviews} ({getPercentage(metrics.interviews)}%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> 
                  Rejected: <span className="font-bold">{metrics.rejectedCount} ({getPercentage(metrics.rejectedCount)}%)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Jobs Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Recent Job Postings</h3>
            <span className="text-xs font-semibold text-slate-400">Total: {dashboardJobs.length}</span>
          </div>

          <div className="overflow-x-auto">
            {dashboardJobs.length > 0 ? (
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Job Title</th>
                    <th className="py-3 px-4">Applications</th>
                    <th className="py-3 px-4">Shortlisted</th>
                    <th className="py-3 px-4">Interviews</th>
                    <th className="py-3 px-4">Posted On</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {dashboardJobs.map((j) => (
                    <tr key={j.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">{j.title}</td>
                      <td className="py-3 px-4">{j.apps}</td>
                      <td className="py-3 px-4">{j.shortlisted}</td>
                      <td className="py-3 px-4">{j.interviews}</td>
                      <td className="py-3 px-4">{j.date}</td>
                      <td className="py-3 px-4">
                        <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          {j.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center space-y-2">
                <Building2 className="mx-auto text-slate-300" size={32} />
                <p className="text-xs font-bold text-slate-600">No jobs published yet</p>
                <p className="text-[11px] text-slate-400">Publish a job using the job wizard to view real-time data here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}