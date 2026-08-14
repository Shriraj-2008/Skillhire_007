// src/pages/candidate/AppliedJobs.jsx
import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { Briefcase, MoreVertical, Filter, ArrowRight } from 'lucide-react';

export default function AppliedJobs() {
  const { jobs } = useJobs();
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter out only applied jobs
  const appliedList = jobs.filter((job) => job.applied);

  const filterTabList = appliedList.filter((job) => {
    if (activeFilter === 'Under Review') return job.status === 'Under Review';
    if (activeFilter === 'Shortlisted') return job.status === 'Shortlisted';
    if (activeFilter === 'Rejected') return job.status === 'Rejected';
    return true;
  });

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6 bg-slate-50/50 min-h-screen text-slate-800">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Applied Jobs</h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          Dashboard <span className="mx-1">&gt;</span> <span className="text-slate-600">Applied Jobs</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Applied Jobs List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Tabs Filter */}
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <div className="flex gap-2 text-xs font-semibold">
              <button onClick={() => setActiveFilter('All')} className={`pb-2 px-1 border-b-2 transition ${activeFilter === 'All' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>
                All Applied ({appliedList.length})
              </button>
              <button onClick={() => setActiveFilter('Under Review')} className={`pb-2 px-1 border-b-2 transition ${activeFilter === 'Under Review' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>
                Under Review ({appliedList.filter(j => j.status === 'Under Review').length})
              </button>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              <Filter size={12} /> Filter
            </button>
          </div>

          {/* Cards or Empty State */}
          {filterTabList.length > 0 ? (
            filterTabList.map((job) => (
              <div key={job.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 p-2 flex items-center justify-center border border-slate-200">
                    <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{job.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">{job.company} • {job.location} • {job.salary}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Applied on {job.appliedDate || '20 May 2026'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      ● {job.status}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">Application ID: {job.id}</p>
                  </div>

                  <button className="text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100">
                    View Details
                  </button>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Briefcase size={40} className="text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No Applied Jobs Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Aapne abhi tak kisi job ke liye apply nahi kiya hai. Browse Jobs page par jaakar apply karein.
              </p>
            </div>
          )}
        </div>

        {/* Right Sidebar Overview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800">Application Overview</h3>
            <div className="flex items-center justify-between">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <span className="text-xl font-extrabold text-slate-800">{appliedList.length}</span>
              </div>
              <div className="space-y-1 text-xs font-medium text-slate-600">
                <p>● Under Review: {appliedList.filter(j => j.status === 'Under Review').length}</p>
                <p>● Shortlisted: {appliedList.filter(j => j.status === 'Shortlisted').length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}