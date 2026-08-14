import React, { useState, useEffect, useMemo } from 'react';
import { 
  UserCheck, Calendar, Clock, Gift, Award, 
  Search, Star, Eye, MoreVertical, Download, Settings 
} from 'lucide-react';
import CompanySidebar from '../../components/Company/CompanySidebar';
import CompanyNavbar from '../../components/Company/CompanyNavbar';

export default function Shortlisted() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState('All Jobs');
  const [selectedStage, setSelectedStage] = useState('All Stages');

  // Dynamic Data Fetching
  const loadShortlist = () => {
    try {
      const data = JSON.parse(localStorage.getItem('app_shortlisted')) || [];
      setCandidates(data);
    } catch (e) {
      setCandidates([]);
    }
  };

  useEffect(() => {
    loadShortlist();
    window.addEventListener('shortlistUpdated', loadShortlist);
    return () => window.removeEventListener('shortlistUpdated', loadShortlist);
  }, []);

  const stats = useMemo(() => ({
    total: candidates.length,
    scheduled: candidates.filter(c => c.stage === 'Interview Scheduled').length,
    inProgress: candidates.filter(c => c.stage === 'In Progress').length,
    offers: candidates.filter(c => c.stage === 'Offer Extended').length,
    hired: candidates.filter(c => c.stage === 'Hired').length,
  }), [candidates]);

  const filteredCandidates = useMemo(() => {
    return candidates.filter(cand => {
      const matchSearch = cand.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cand.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchJob = selectedJob === 'All Jobs' || cand.jobTitle === selectedJob;
      const matchStage = selectedStage === 'All Stages' || cand.stage === selectedStage;
      return matchSearch && matchJob && matchStage;
    });
  }, [candidates, searchTerm, selectedJob, selectedStage]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 text-xs">
      <div className="flex-1 flex flex-col overflow-hidden">

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>Dashboard</span>
                <span>&gt;</span>
                <span className="text-slate-600 font-semibold">Shortlisted</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <Star className="text-indigo-600" size={24} /> Shortlisted Candidates
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-white border border-slate-200 text-indigo-600 hover:bg-slate-50 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2">
                <Download size={15} /> Export Shortlist
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2">
                <Settings size={15} /> Manage Shortlist
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <UserCheck size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.total}</span>
                <p className="text-[11px] font-bold text-slate-500">Total Shortlisted</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.scheduled}</span>
                <p className="text-[11px] font-bold text-slate-500">Interview Scheduled</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.inProgress}</span>
                <p className="text-[11px] font-bold text-slate-500">In Progress</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Gift size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.offers}</span>
                <p className="text-[11px] font-bold text-slate-500">Offer Extended</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Award size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.hired}</span>
                <p className="text-[11px] font-bold text-slate-500">Hired Candidates</p>
              </div>
            </div>
          </div>

          {/* Table Strip */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-4 space-y-4">
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 justify-between items-center">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search by name, skills, or job title..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <select 
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold"
                >
                  <option>All Jobs</option>
                  <option>Frontend Developer</option>
                  <option>UI/UX Designer</option>
                  <option>Backend Developer</option>
                </select>

                <select 
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold"
                >
                  <option>All Stages</option>
                  <option>Interview Scheduled</option>
                  <option>In Progress</option>
                  <option>Offer Extended</option>
                  <option>Hired</option>
                </select>
              </div>
            </div>

            {/* Candidate List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                    <th className="py-3 px-4 w-8"><input type="checkbox" className="rounded" /></th>
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">Job Title</th>
                    <th className="py-3 px-4">Shortlisted On</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Next Step</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((cand) => (
                      <tr key={cand.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-3 px-4"><input type="checkbox" className="rounded" /></td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                              {cand.name ? cand.name.charAt(0) : 'C'}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-slate-900 text-xs">{cand.name}</h4>
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700">
                                  {cand.badge || 'Top Match'}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400">{cand.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-800">{cand.jobTitle}</p>
                          <p className="text-[10px] text-slate-400">ID: {cand.jobId || 'JOB-2026-001'}</p>
                        </td>

                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-800">{cand.shortlistedDate || '20 May 2026'}</p>
                        </td>

                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                            cand.stage === 'Interview Scheduled' ? 'bg-blue-50 text-blue-600' :
                            cand.stage === 'In Progress' ? 'bg-amber-50 text-amber-600' :
                            cand.stage === 'Offer Extended' ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {cand.stage}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-800">{cand.nextStep || 'Technical Round'}</p>
                          <p className="text-[10px] text-slate-400">{cand.nextStepTime || '22 May 2026'}</p>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 font-bold text-slate-800">
                            <Star size={13} className="text-amber-400 fill-amber-400" />
                            <span>{cand.rating || '4.8'}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="border border-slate-200 text-indigo-600 hover:bg-indigo-50 font-semibold px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1">
                              <Eye size={12} /> View Profile
                            </button>
                            <button className="p-1 text-slate-400 hover:text-slate-700 rounded">
                              <MoreVertical size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        No shortlisted candidates found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}