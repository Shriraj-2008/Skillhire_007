import React, { useState, useEffect, useMemo } from 'react';
import { Users, Briefcase, Calendar, FileText, Search, Trash2, RefreshCw, Layers, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const [interviews, setInterviews] = useState([]);
  const [applications, setApplications] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);

  const loadAllProjectData = () => {
    try {
      setInterviews(JSON.parse(localStorage.getItem('app_interviews')) || []);
      setApplications(JSON.parse(localStorage.getItem('app_applications')) || []);
      setCandidates(JSON.parse(localStorage.getItem('registered_candidates')) || []);
      setJobs(JSON.parse(localStorage.getItem('app_jobs')) || []);
    } catch (e) {
      console.error('Data load error:', e);
    }
  };

  useEffect(() => {
    loadAllProjectData();

    const handleEvents = () => loadAllProjectData();
    window.addEventListener('interviewsUpdated', handleEvents);
    window.addEventListener('applicationsUpdated', handleEvents);
    window.addEventListener('jobsUpdated', handleEvents);
    window.addEventListener('storage', handleEvents);

    return () => {
      window.removeEventListener('interviewsUpdated', handleEvents);
      window.removeEventListener('applicationsUpdated', handleEvents);
      window.removeEventListener('jobsUpdated', handleEvents);
      window.removeEventListener('storage', handleEvents);
    };
  }, []);

  const stats = useMemo(() => ({
    totalJobs: jobs.length,
    totalCandidates: candidates.length,
    totalApplications: applications.length,
    totalInterviews: interviews.length,
  }), [jobs, candidates, applications, interviews]);

  const handleDeleteItem = (key, id, eventName) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const currentList = JSON.parse(localStorage.getItem(key)) || [];
      const updatedList = currentList.filter(item => item.id !== id && item.email !== id);
      localStorage.setItem(key, JSON.stringify(updatedList));
      window.dispatchEvent(new Event(eventName));
      loadAllProjectData();
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 text-xs">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col p-4 border-r border-slate-800">
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-slate-800 mb-6">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-base">A</div>
          <div>
            <h2 className="text-sm font-bold text-white">Admin Control</h2>
            <p className="text-[10px] text-slate-500">Real-Time Sync</p>
          </div>
        </div>

        <nav className="space-y-1.5 font-medium flex-1">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl ${activeTab === 'overview' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}>
            <Activity size={16} /> Overview
          </button>
          <button onClick={() => setActiveTab('jobs')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl ${activeTab === 'jobs' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}>
            <Briefcase size={16} /> Posted Jobs ({jobs.length})
          </button>
          <button onClick={() => setActiveTab('candidates')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl ${activeTab === 'candidates' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}>
            <Users size={16} /> Candidates ({candidates.length})
          </button>
          <button onClick={() => setActiveTab('applications')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl ${activeTab === 'applications' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}>
            <FileText size={16} /> Applications ({applications.length})
          </button>
          <button onClick={() => setActiveTab('interviews')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl ${activeTab === 'interviews' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}>
            <Calendar size={16} /> Interviews ({interviews.length})
          </button>
        </nav>

        <button onClick={loadAllProjectData} className="w-full border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2">
          <RefreshCw size={14} /> Refresh Data
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Layers className="text-indigo-600" size={24} /> Admin Portal
          </h1>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-white outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <Briefcase className="text-indigo-600" size={24} />
            <div>
              <span className="text-xl font-black">{stats.totalJobs}</span>
              <p className="text-[11px] font-bold text-slate-500">Live Jobs</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <Users className="text-blue-600" size={24} />
            <div>
              <span className="text-xl font-black">{stats.totalCandidates}</span>
              <p className="text-[11px] font-bold text-slate-500">Candidates</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <FileText className="text-amber-600" size={24} />
            <div>
              <span className="text-xl font-black">{stats.totalApplications}</span>
              <p className="text-[11px] font-bold text-slate-500">Applications</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <Calendar className="text-emerald-600" size={24} />
            <div>
              <span className="text-xl font-black">{stats.totalInterviews}</span>
              <p className="text-[11px] font-bold text-slate-500">Interviews</p>
            </div>
          </div>
        </div>

        {/* Data View */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <h3 className="font-extrabold text-sm text-slate-900 mb-4 capitalize">{activeTab} Live Data</h3>
          
          {activeTab === 'jobs' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b">
                  <th className="py-2 px-3">Title</th>
                  <th className="py-2 px-3">Department</th>
                  <th className="py-2 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j.id} className="border-b">
                    <td className="py-2 px-3 font-bold">{j.title || j.jobTitle}</td>
                    <td className="py-2 px-3">{j.company || j.department || 'HR'}</td>
                    <td className="py-2 px-3 text-right">
                      <button onClick={() => handleDeleteItem('app_jobs', j.id, 'jobsUpdated')} className="text-rose-500">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'interviews' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b">
                  <th className="py-2 px-3">Candidate</th>
                  <th className="py-2 px-3">Job Title</th>
                  <th className="py-2 px-3">Date & Time</th>
                  <th className="py-2 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((i) => (
                  <tr key={i.id} className="border-b">
                    <td className="py-2 px-3 font-bold">{i.candidateName}</td>
                    <td className="py-2 px-3">{i.jobTitle}</td>
                    <td className="py-2 px-3">{i.date} ({i.time})</td>
                    <td className="py-2 px-3 text-right">
                      <button onClick={() => handleDeleteItem('app_interviews', i.id, 'interviewsUpdated')} className="text-rose-500">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}