// src/pages/candidate/SavedJobs.jsx
import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { Bookmark, Trash2, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SavedJobs() {
  const { jobs, toggleSaveJob } = useJobs();
  const [activeTab, setActiveTab] = useState('All Saved');

  // Filter only saved jobs
  const savedJobsList = jobs.filter(j => j.isSaved);

  const fullTimeCount = savedJobsList.filter(j => j.type === 'Full Time').length;
  const hybridCount = savedJobsList.filter(j => j.mode === 'Hybrid').length;
  const remoteCount = savedJobsList.filter(j => j.mode === 'Remote').length;

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bookmark className="text-indigo-600" size={24} /> Saved Jobs
          </h1>
          <p className="text-xs text-slate-400">View and manage all jobs you have bookmarked for later.</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main List */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="flex gap-6 border-b border-slate-200 pb-3 text-xs font-semibold">
            <button onClick={() => setActiveTab('All Saved')} className={`pb-3 ${activeTab === 'All Saved' ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold' : 'text-slate-500'}`}>
              All Saved ({savedJobsList.length})
            </button>
          </div>

          {savedJobsList.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
              <p className="text-slate-500 text-sm font-semibold">No saved jobs found.</p>
              <Link to="/candidate/browsejobs" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-semibold">
                Browse Jobs
              </Link>
            </div>
          ) : (
            savedJobsList.map(job => (
              <div key={job.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm hover:border-indigo-100 transition">
                <div className="flex items-start gap-4">
                  <img src={job.logo} alt={job.company} className="w-10 h-10 object-contain rounded-lg p-1 bg-slate-50 border" />
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{job.title}</h3>
                    <p className="text-xs text-slate-500">{job.company} • <span className="text-slate-400">{job.location}</span></p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">{job.type}</span>
                      <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">{job.mode}</span>
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{job.salary}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link to={`/candidate/job/${job.id}`} className="text-xs font-semibold bg-slate-100 text-slate-700 px-4 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition">
                    View Details
                  </Link>
                  <button onClick={() => toggleSaveJob(job.id)} className="p-2 text-slate-400 hover:text-rose-600 transition" title="Remove Bookmark">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Stats Overview */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">Saved Jobs Overview</h3>
            <div className="flex justify-between text-xs text-slate-600"><span>Full Time</span><span className="font-bold">{fullTimeCount}</span></div>
            <div className="flex justify-between text-xs text-slate-600"><span>Hybrid</span><span className="font-bold">{hybridCount}</span></div>
            <div className="flex justify-between text-xs text-slate-600"><span>Remote</span><span className="font-bold">{remoteCount}</span></div>
            <Link to="/candidate/applied-jobs" className="flex items-center justify-between text-xs text-indigo-600 font-bold pt-2 border-t border-slate-100">
              Go to Applied Jobs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}