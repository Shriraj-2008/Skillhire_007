import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  UserCheck, Calendar, Clock, Gift, Award, 
  Search, Star, Eye, MoreVertical, Download, Settings,
  X, Mail, Phone, MapPin, FileText, ExternalLink, CheckCircle2, Trash2
} from 'lucide-react';

export default function Shortlisted() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState('All Jobs');
  const [selectedStage, setSelectedStage] = useState('All Stages');
  
  // UI States
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Unified Dynamic Data Fetching
  const loadShortlist = useCallback(() => {
    try {
      // 1. Primary Source: Main Job Applications array filter for 'Shortlisted' status
      const mainApps = JSON.parse(localStorage.getItem('job_applications')) || [];
      const shortlistedFromApps = mainApps.filter(app => app.status === 'Shortlisted');

      // 2. Secondary Source: Legacy/Direct app_shortlisted array
      const appShortlisted = JSON.parse(localStorage.getItem('app_shortlisted')) || [];

      // Combine both sources and remove duplicates based on candidate ID
      const combinedMap = new Map();
      
      [...shortlistedFromApps, ...appShortlisted].forEach(item => {
        combinedMap.set(item.id, {
          id: item.id,
          name: item.candidateName || item.name || 'Anonymous Candidate',
          email: item.candidateEmail || item.email || 'N/A',
          phone: item.candidatePhone || item.phone || 'N/A',
          jobTitle: item.jobTitle || 'N/A',
          jobId: item.jobId || 'JOB-2026-001',
          shortlistedDate: item.appliedAt || item.appliedDate || item.shortlistedDate || 'Recent',
          stage: item.stage || item.status || 'Interview Scheduled',
          nextStep: item.nextStep || 'Technical Round',
          nextStepTime: item.nextStepTime || 'Schedule Pending',
          rating: item.rating || item.skillScore || '4.8',
          badge: item.badge || 'Top Match',
          resumeUrl: item.resumeUrl || null,
          resumeName: item.resumeName || null,
          coverLetter: item.coverLetter || null,
          skills: item.skills || [],
          location: item.location || 'N/A',
          rawObject: item
        });
      });

      setCandidates(Array.from(combinedMap.values()));
    } catch (e) {
      setCandidates([]);
    }
  }, []);

  useEffect(() => {
    loadShortlist();

    // Event listeners for cross-tab and cross-component syncing
    const handleSync = () => loadShortlist();

    window.addEventListener('storage', handleSync);
    window.addEventListener('shortlistUpdated', handleSync);
    window.addEventListener('applicationsUpdated', handleSync);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('shortlistUpdated', handleSync);
      window.removeEventListener('applicationsUpdated', handleSync);
    };
  }, [loadShortlist]);

  // Handle Stage Changes dynamically across storage
  const handleStageChange = (candId, newStage) => {
    // Update main applications list
    const mainApps = JSON.parse(localStorage.getItem('job_applications')) || [];
    const updatedMainApps = mainApps.map(a => a.id === candId ? { ...a, stage: newStage, status: newStage === 'Rejected' ? 'Rejected' : 'Shortlisted' } : a);
    localStorage.setItem('job_applications', JSON.stringify(updatedMainApps));

    // Update app_shortlisted list if present
    const appShortlisted = JSON.parse(localStorage.getItem('app_shortlisted')) || [];
    const updatedShortlist = appShortlisted.map(a => a.id === candId ? { ...a, stage: newStage } : a);
    localStorage.setItem('app_shortlisted', JSON.stringify(updatedShortlist));

    // Refresh UI state
    setActiveMenuId(null);
    if (selectedCandidate && selectedCandidate.id === candId) {
      setSelectedCandidate(prev => ({ ...prev, stage: newStage }));
    }

    window.dispatchEvent(new Event('applicationsUpdated'));
    window.dispatchEvent(new Event('shortlistUpdated'));
  };

  // Remove Candidate from Shortlist
  const handleRemoveShortlist = (candId) => {
    if (window.confirm("Kya aap is candidate ko Shortlist se hatana chahte hain?")) {
      // Revert status in main job_applications to 'Applied' or remove shortlisted tag
      const mainApps = JSON.parse(localStorage.getItem('job_applications')) || [];
      const updatedMainApps = mainApps.map(a => a.id === candId ? { ...a, status: 'Applied' } : a);
      localStorage.setItem('job_applications', JSON.stringify(updatedMainApps));

      // Remove from app_shortlisted
      const appShortlisted = JSON.parse(localStorage.getItem('app_shortlisted')) || [];
      const updatedShortlist = appShortlisted.filter(a => a.id !== candId);
      localStorage.setItem('app_shortlisted', JSON.stringify(updatedShortlist));

      if (selectedCandidate && selectedCandidate.id === candId) {
        setSelectedCandidate(null);
      }

      setActiveMenuId(null);
      window.dispatchEvent(new Event('applicationsUpdated'));
      window.dispatchEvent(new Event('shortlistUpdated'));
    }
  };

  // Metrics
  const stats = useMemo(() => ({
    total: candidates.length,
    scheduled: candidates.filter(c => c.stage === 'Interview Scheduled').length,
    inProgress: candidates.filter(c => c.stage === 'In Progress').length,
    offers: candidates.filter(c => c.stage === 'Offer Extended' || c.stage === 'Offer Sent').length,
    hired: candidates.filter(c => c.stage === 'Hired').length,
  }), [candidates]);

  // Dynamic Available Jobs Options
  const availableJobTitles = useMemo(() => {
    const titles = candidates.map(c => c.jobTitle).filter(Boolean);
    return ['All Jobs', ...Array.from(new Set(titles))];
  }, [candidates]);

  // Filter Logic
  const filteredCandidates = useMemo(() => {
    return candidates.filter(cand => {
      const matchSearch = cand.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cand.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (cand.skills && cand.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())));
      
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
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
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
                  {availableJobTitles.map(title => (
                    <option key={title} value={title}>{title}</option>
                  ))}
                </select>

                <select 
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold"
                >
                  <option value="All Stages">All Stages</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Offer Extended">Offer Extended</option>
                  <option value="Hired">Hired</option>
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
                              {cand.name ? cand.name.charAt(0).toUpperCase() : 'C'}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-slate-900 text-xs">{cand.name}</h4>
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700">
                                  {cand.badge}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400">{cand.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-800">{cand.jobTitle}</p>
                          <p className="text-[10px] text-slate-400">ID: {cand.jobId}</p>
                        </td>

                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-800">{cand.shortlistedDate}</p>
                        </td>

                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                            cand.stage === 'Interview Scheduled' ? 'bg-blue-50 text-blue-600' :
                            cand.stage === 'In Progress' ? 'bg-amber-50 text-amber-600' :
                            cand.stage === 'Offer Extended' || cand.stage === 'Offer Sent' ? 'bg-purple-50 text-purple-600' :
                            cand.stage === 'Hired' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                          }`}>
                            {cand.stage}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-800">{cand.nextStep}</p>
                          <p className="text-[10px] text-slate-400">{cand.nextStepTime}</p>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 font-bold text-slate-800">
                            <Star size={13} className="text-amber-400 fill-amber-400" />
                            <span>{cand.rating}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right relative">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => setSelectedCandidate(cand)}
                              className="border border-slate-200 text-indigo-600 hover:bg-indigo-50 font-semibold px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1 transition shadow-sm"
                            >
                              <Eye size={12} /> View Profile
                            </button>
                            
                            <button 
                              onClick={() => setActiveMenuId(activeMenuId === cand.id ? null : cand.id)}
                              className="p-1 text-slate-400 hover:text-slate-700 rounded"
                            >
                              <MoreVertical size={15} />
                            </button>

                            {/* Dropdown Action Menu */}
                            {activeMenuId === cand.id && (
                              <div className="absolute right-4 top-10 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-left">
                                <button 
                                  onClick={() => handleStageChange(cand.id, 'Interview Scheduled')}
                                  className="w-full px-3 py-1.5 hover:bg-slate-50 text-blue-600 font-semibold text-xs text-left"
                                >
                                  Schedule Interview
                                </button>
                                <button 
                                  onClick={() => handleStageChange(cand.id, 'In Progress')}
                                  className="w-full px-3 py-1.5 hover:bg-slate-50 text-amber-600 font-semibold text-xs text-left"
                                >
                                  Mark In Progress
                                </button>
                                <button 
                                  onClick={() => handleStageChange(cand.id, 'Offer Extended')}
                                  className="w-full px-3 py-1.5 hover:bg-slate-50 text-purple-600 font-semibold text-xs text-left"
                                >
                                  Extend Offer
                                </button>
                                <button 
                                  onClick={() => handleStageChange(cand.id, 'Hired')}
                                  className="w-full px-3 py-1.5 hover:bg-slate-50 text-emerald-600 font-semibold text-xs text-left"
                                >
                                  Mark as Hired
                                </button>

                                <div className="border-t border-slate-100 my-1"></div>

                                <button 
                                  onClick={() => handleRemoveShortlist(cand.id)}
                                  className="w-full px-3 py-1.5 hover:bg-rose-50 text-rose-600 font-bold text-xs flex items-center gap-1.5 text-left"
                                >
                                  <Trash2 size={13} /> Remove Shortlist
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        No shortlisted candidates found matching your selection.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Candidate Profile Details Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-100 animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md">
                  {selectedCandidate.name ? selectedCandidate.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedCandidate.name}</h2>
                  <p className="text-xs text-indigo-600 font-semibold">Shortlisted for: {selectedCandidate.jobTitle}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCandidate(null)} 
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Contact Information */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Contact Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Mail size={16} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Email Address</p>
                      <p className="font-semibold text-slate-800">{selectedCandidate.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Phone size={16} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Phone Number</p>
                      <p className="font-semibold text-slate-800">{selectedCandidate.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <MapPin size={16} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Location</p>
                      <p className="font-semibold text-slate-800">{selectedCandidate.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Clock size={16} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Shortlisted On</p>
                      <p className="font-semibold text-slate-800">{selectedCandidate.shortlistedDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {selectedCandidate.skills && selectedCandidate.skills.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCandidate.skills.map((skill, idx) => (
                      <span key={idx} className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-bold text-[11px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Cover Letter */}
              {selectedCandidate.coverLetter && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cover Letter</h3>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-xs leading-relaxed whitespace-pre-line">
                    {selectedCandidate.coverLetter}
                  </div>
                </div>
              )}

              {/* Resume Document */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Resume Document</h3>
                {selectedCandidate.resumeUrl ? (
                  <a 
                    href={selectedCandidate.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 font-bold transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText size={18} />
                      <span>{selectedCandidate.resumeName || 'Candidate_Resume.pdf'}</span>
                    </div>
                    <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 italic">
                    No resume document attached.
                  </div>
                )}
              </div>

              {/* Stage Progress Update */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Update Stage</h3>
                <div className="flex flex-wrap gap-2">
                  {['Interview Scheduled', 'In Progress', 'Offer Extended', 'Hired'].map((stageOption) => (
                    <button
                      key={stageOption}
                      onClick={() => handleStageChange(selectedCandidate.id, stageOption)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        selectedCandidate.stage === stageOption
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {selectedCandidate.stage === stageOption && <CheckCircle2 size={12} />}
                      {stageOption}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <button 
                onClick={() => handleRemoveShortlist(selectedCandidate.id)}
                className="bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 font-bold px-4 py-2 rounded-xl transition text-xs flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Remove Shortlist
              </button>

              <button 
                onClick={() => setSelectedCandidate(null)}
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold px-4 py-2 rounded-xl transition text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}