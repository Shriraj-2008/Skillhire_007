import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Users, UserPlus, UserCheck, Calendar, Gift, 
  Search, Download, Settings, MoreVertical, Eye, Filter 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Applications() {
  const { user: companyUser } = useAuth() || {};

  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState('All Jobs');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedSource, setSelectedSource] = useState('All Sources');
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Dynamic Data Load via LocalStorage (Matching key: 'job_applications')
  const loadApplications = useCallback(() => {
    try {
      const storedApps = JSON.parse(localStorage.getItem('job_applications')) || [];
      const storedCompany = JSON.parse(localStorage.getItem('company')) || {};
      const currentCompanyEmail = companyUser?.email || storedCompany?.email;

      // Filter applications relevant to the logged-in company (if companyEmail present)
      const filteredForCompany = currentCompanyEmail
        ? storedApps.filter(app => !app.companyEmail || app.companyEmail === currentCompanyEmail)
        : storedApps;

      setApplications(filteredForCompany);
    } catch (e) {
      setApplications([]);
    }
  }, [companyUser]);

  useEffect(() => {
    loadApplications();
    window.addEventListener('storage', loadApplications);
    window.addEventListener('applicationsUpdated', loadApplications);
    return () => {
      window.removeEventListener('storage', loadApplications);
      window.removeEventListener('applicationsUpdated', loadApplications);
    };
  }, [loadApplications]);

  // Update Status Dynamically across local storage
  const handleStatusChange = (appId, newStatus) => {
    const allStoredApps = JSON.parse(localStorage.getItem('job_applications')) || [];
    const updatedGlobal = allStoredApps.map(a => a.id === appId ? { ...a, status: newStatus } : a);
    
    localStorage.setItem('job_applications', JSON.stringify(updatedGlobal));
    
    // Update local state
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    setActiveMenuId(null);
    window.dispatchEvent(new Event('storage'));
  };

  // Dynamic Job Title Options for Filter Dropdown
  const availableJobTitles = useMemo(() => {
    const titles = applications.map(a => a.jobTitle).filter(Boolean);
    return ['All Jobs', ...Array.from(new Set(titles))];
  }, [applications]);

  // Metrics Logic
  const stats = useMemo(() => ({
    total: applications.length,
    newApps: applications.filter(a => a.status === 'Applied' || a.status === 'New').length,
    shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
    interviews: applications.filter(a => a.status === 'Interview Scheduled').length,
    offers: applications.filter(a => a.status === 'Offer Sent').length,
  }), [applications]);

  // Dynamic Filters
  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const query = searchTerm.toLowerCase();
      const nameMatch = (app.candidateName || '').toLowerCase().includes(query) || 
                        (app.candidateEmail || app.email || '').toLowerCase().includes(query) ||
                        (app.skills && Array.isArray(app.skills) && app.skills.some(s => s.toLowerCase().includes(query)));
      
      const jobMatch = selectedJob === 'All Jobs' || app.jobTitle === selectedJob;
      
      const statusMatch = selectedStatus === 'All Status' || 
                          (selectedStatus === 'New' ? (app.status === 'New' || app.status === 'Applied') : app.status === selectedStatus);
      
      const sourceMatch = selectedSource === 'All Sources' || (app.source || 'SkillHire Platform') === selectedSource;
      
      return nameMatch && jobMatch && statusMatch && sourceMatch;
    });
  }, [applications, searchTerm, selectedJob, selectedStatus, selectedSource]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 text-xs">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>Dashboard</span>
                <span>&gt;</span>
                <span className="text-slate-600 font-semibold">Applications</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <Users className="text-indigo-600" size={24} /> Applications
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-white border border-slate-200 text-indigo-600 hover:bg-slate-50 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2">
                <Download size={15} /> Export Applications
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2">
                <Settings size={15} /> Application Settings
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Users size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.total}</span>
                <p className="text-[11px] font-bold text-slate-500">Total Applications</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <UserPlus size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.newApps}</span>
                <p className="text-[11px] font-bold text-slate-500">New Applications</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <UserCheck size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.shortlisted}</span>
                <p className="text-[11px] font-bold text-slate-500">Shortlisted</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.interviews}</span>
                <p className="text-[11px] font-bold text-slate-500">Interview Scheduled</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Gift size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.offers}</span>
                <p className="text-[11px] font-bold text-slate-500">Offers Sent</p>
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Table Area */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* Filter Strip */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap gap-3 items-center justify-between">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search by name, email, or skills..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select 
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    {availableJobTitles.map(title => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </select>

                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    <option value="All Status">All Status</option>
                    <option value="New">New / Applied</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Offer Sent">Offer Sent</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <select 
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    <option value="All Sources">All Sources</option>
                    <option value="SkillHire Platform">SkillHire Platform</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri.com">Naukri.com</option>
                  </select>

                  <button className="bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1">
                    <Filter size={13} /> Filters
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                        <th className="py-3 px-4 w-8"><input type="checkbox" className="rounded" /></th>
                        <th className="py-3 px-4">Candidate</th>
                        <th className="py-3 px-4">Job Title</th>
                        <th className="py-3 px-4">Applied On</th>
                        <th className="py-3 px-4">Score</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {filteredApps.length > 0 ? (
                        filteredApps.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50/50 transition">
                            <td className="py-3 px-4"><input type="checkbox" className="rounded" /></td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                                  {app.candidateName ? app.candidateName.charAt(0).toUpperCase() : 'C'}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <h4 className="font-bold text-slate-900 text-xs">{app.candidateName || 'Anonymous Candidate'}</h4>
                                    {(app.status === 'Applied' || app.status === 'New') && (
                                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700">New</span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-slate-400">{app.candidateEmail || app.email || 'N/A'}</p>
                                </div>
                              </div>
                            </td>

                            <td className="py-3 px-4">
                              <p className="font-bold text-slate-800">{app.jobTitle}</p>
                              <p className="text-[10px] text-slate-400">ID: {app.jobId || 'N/A'}</p>
                            </td>

                            <td className="py-3 px-4">
                              <p className="font-semibold text-slate-800">{app.appliedAt || app.appliedDate || 'Recent'}</p>
                            </td>

                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700">
                                {app.skillScore || 'N/A'}
                              </span>
                            </td>

                            <td className="py-3 px-4">
                              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                                app.status === 'Applied' || app.status === 'New' ? 'bg-blue-50 text-blue-600' :
                                app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-600' :
                                app.status === 'Interview Scheduled' ? 'bg-amber-50 text-amber-600' :
                                app.status === 'Offer Sent' ? 'bg-purple-50 text-purple-600' :
                                app.status === 'Rejected' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {app.status || 'Applied'}
                              </span>
                            </td>

                            <td className="py-3 px-4 text-right relative">
                              <div className="flex items-center justify-end gap-2">
                                {app.resumeUrl ? (
                                  <a 
                                    href={app.resumeUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="border border-slate-200 text-indigo-600 hover:bg-indigo-50 font-semibold px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1"
                                  >
                                    <Eye size={12} /> Resume
                                  </a>
                                ) : (
                                  <button className="border border-slate-200 text-slate-400 font-semibold px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1 cursor-not-allowed">
                                    <Eye size={12} /> Details
                                  </button>
                                )}

                                <button 
                                  onClick={() => setActiveMenuId(activeMenuId === app.id ? null : app.id)}
                                  className="p-1 text-slate-400 hover:text-slate-700 rounded"
                                >
                                  <MoreVertical size={15} />
                                </button>

                                {activeMenuId === app.id && (
                                  <div className="absolute right-4 top-10 w-40 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-left">
                                    <button 
                                      onClick={() => handleStatusChange(app.id, 'Shortlisted')}
                                      className="w-full px-3 py-1.5 hover:bg-slate-50 text-emerald-600 font-semibold text-xs"
                                    >
                                      Move to Shortlisted
                                    </button>
                                    <button 
                                      onClick={() => handleStatusChange(app.id, 'Interview Scheduled')}
                                      className="w-full px-3 py-1.5 hover:bg-slate-50 text-amber-600 font-semibold text-xs"
                                    >
                                      Schedule Interview
                                    </button>
                                    <button 
                                      onClick={() => handleStatusChange(app.id, 'Offer Sent')}
                                      className="w-full px-3 py-1.5 hover:bg-slate-50 text-purple-600 font-semibold text-xs"
                                    >
                                      Send Offer
                                    </button>
                                    <button 
                                      onClick={() => handleStatusChange(app.id, 'Rejected')}
                                      className="w-full px-3 py-1.5 hover:bg-rose-50 text-rose-600 font-semibold text-xs"
                                    >
                                      Reject Application
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-400">
                            No candidate applications found yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar Overview Widget */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Application Overview</h3>
                
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> New / Applied
                    </span>
                    <span className="font-bold text-slate-900">{stats.newApps}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Shortlisted
                    </span>
                    <span className="font-bold text-slate-900">{stats.shortlisted}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Interview Scheduled
                    </span>
                    <span className="font-bold text-slate-900">{stats.interviews}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Offer Sent
                    </span>
                    <span className="font-bold text-slate-900">{stats.offers}</span>
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Quick Filters</h3>
                <div className="space-y-2">
                  {['New', 'Shortlisted', 'Interview Scheduled', 'Offer Sent', 'Rejected'].map((st) => (
                    <button 
                      key={st}
                      onClick={() => setSelectedStatus(st)}
                      className="w-full flex items-center justify-between text-left hover:text-indigo-600 font-semibold text-slate-600 py-1"
                    >
                      <span>{st}</span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {st === 'New' 
                          ? applications.filter(a => a.status === 'Applied' || a.status === 'New').length 
                          : applications.filter(a => a.status === st).length}
                      </span>
                    </button>
                  ))}
                  <button 
                    onClick={() => { setSelectedStatus('All Status'); setSelectedJob('All Jobs'); setSelectedSource('All Sources'); }}
                    className="text-indigo-600 text-xs font-bold pt-2 block hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}