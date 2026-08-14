import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Plus, MapPin, Briefcase, 
  Send, PauseCircle, XCircle, MoreVertical, Code, Menu, Bell
} from 'lucide-react';
import CompanySidebar from '../../components/Company/CompanySidebar'; // Shared Sidebar Imported

export default function ManageJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Logged-in Company / Recruiter Details State
  const [currentUser, setCurrentUser] = useState({
    companyName: '',
    isVerified: false,
    role: '',
    initials: ''
  });

  // 1. Dynamic LocalStorage Load
  const loadPublishedJobs = () => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem('publishedJobs')) || [];
      setJobs(savedJobs);
    } catch (e) {
      console.error("LocalStorage parsing error", e);
      setJobs([]);
    }
  };

  useEffect(() => {
    loadPublishedJobs();
    window.addEventListener('jobPublished', loadPublishedJobs);
    window.addEventListener('publishedJobsUpdated', loadPublishedJobs);

    return () => {
      window.removeEventListener('jobPublished', loadPublishedJobs);
      window.removeEventListener('publishedJobsUpdated', loadPublishedJobs);
    };
  }, []);

  // 2. Dynamic Status Update
  const handleStatusChange = (jobId, newStatus) => {
    const updated = jobs.map(j => j.id === jobId ? { ...j, status: newStatus } : j);
    setJobs(updated);
    localStorage.setItem('publishedJobs', JSON.stringify(updated));
    setActiveMenuId(null);
  };

  // 3. Dynamic Job Delete
  const handleDeleteJob = (jobId) => {
    const updated = jobs.filter(j => j.id !== jobId);
    setJobs(updated);
    localStorage.setItem('publishedJobs', JSON.stringify(updated));
    setActiveMenuId(null);
  };

  // Dynamic Metrics
  const stats = useMemo(() => ({
    total: jobs.length,
    active: jobs.filter(j => (j.status || 'Active') === 'Active').length,
    draft: jobs.filter(j => j.status === 'Draft').length,
    closed: jobs.filter(j => j.status === 'Closed').length,
  }), [jobs]);

  // Dynamic Filtering
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const jobTitle = job.jobTitle || job.title || '';
      const skillsStr = Array.isArray(job.skills) ? job.skills.join(', ') : (job.skills || '');
      const locationStr = job.companyLocation || job.location || '';
      const deptStr = job.department || 'Engineering';
      const statusStr = job.status || 'Active';

      const matchesSearch = jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            skillsStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (job.id && String(job.id).includes(searchTerm));
                            
      const matchesStatus = selectedStatus === 'All Status' || statusStr === selectedStatus;
      const matchesDept = selectedDept === 'All Departments' || deptStr === selectedDept;
      const matchesLocation = selectedLocation === 'All Locations' || locationStr.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesStatus && matchesDept && matchesLocation;
    });
  }, [jobs, searchTerm, selectedStatus, selectedDept, selectedLocation]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 text-xs">
      
      {/* Shared Modular Sidebar */}

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Title & Action */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>Dashboard</span>
                <span>&gt;</span>
                <span className="text-slate-600 font-semibold">Manage Jobs</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <Briefcase className="text-indigo-600" size={24} /> Manage Jobs
              </h1>
            </div>

            <button 
              onClick={() => navigate('/company/post-job')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-indigo-200 transition flex items-center gap-2"
            >
              <Plus size={16} /> Post a New Job
            </button>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Briefcase size={22} />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">{stats.total}</span>
                <p className="text-xs font-bold text-slate-700">Total Jobs</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Send size={22} />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">{stats.active}</span>
                <p className="text-xs font-bold text-slate-700">Active Jobs</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <PauseCircle size={22} />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">{stats.draft}</span>
                <p className="text-xs font-bold text-slate-700">Draft Jobs</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <XCircle size={22} />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">{stats.closed}</span>
                <p className="text-xs font-bold text-slate-700">Closed Jobs</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3 justify-between items-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 text-slate-400" size={15} />
              <input 
                type="text" 
                placeholder="Search job title, role or keyword..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Closed</option>
              </select>

              <select 
                value={selectedDept} 
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Analytics</option>
                <option>Support</option>
              </select>

              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option>All Locations</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Remote</option>
              </select>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase">
                    <th className="py-3.5 px-6">Job Details</th>
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Posted On</th>
                    <th className="py-3.5 px-4">Applicants</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => {
                      const skillsText = Array.isArray(job.skills) ? job.skills.join(', ') : (job.skills || 'No skills specified');
                      const jobStatus = job.status || 'Active';
                      
                      return (
                        <tr key={job.id} className="hover:bg-slate-50/50 transition">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0">
                                <Code size={18} />
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 text-xs">{job.jobTitle || job.title || 'Untitled Job'}</h4>
                                <p className="text-[11px] text-slate-400 mt-0.5">{skillsText}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4 font-semibold text-slate-800">{job.department || 'Engineering'}</td>
                          
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                              <MapPin size={13} className="text-slate-400" />
                              {job.companyLocation || job.location || 'Remote'}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-600">
                              {job.employmentType || 'Full-time'}
                            </span>
                          </td>

                          <td className="py-4 px-4 font-bold text-slate-800">
                            {job.createdAt ? new Date(job.createdAt).toLocaleDateString('en-GB') : 'Recently'}
                          </td>

                          <td className="py-4 px-4">
                            <span className="font-bold text-slate-900 text-sm block">{job.applicants || 0}</span>
                          </td>

                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                              jobStatus === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                              jobStatus === 'Draft' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                            }`}>
                              {jobStatus}
                            </span>
                          </td>

                          {/* Action Menu dropdown */}
                          <td className="py-4 px-6 text-right relative">
                            <button 
                              onClick={() => setActiveMenuId(activeMenuId === job.id ? null : job.id)}
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                            >
                              <MoreVertical size={16} />
                            </button>

                            {activeMenuId === job.id && (
                              <div className="absolute right-6 top-12 w-36 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-left">
                                <button 
                                  onClick={() => handleStatusChange(job.id, 'Active')}
                                  className="w-full px-3 py-1.5 text-[11px] hover:bg-slate-50 block font-semibold text-emerald-600"
                                >
                                  Mark Active
                                </button>
                                <button 
                                  onClick={() => handleStatusChange(job.id, 'Closed')}
                                  className="w-full px-3 py-1.5 text-[11px] hover:bg-slate-50 block font-semibold text-amber-600"
                                >
                                  Mark Closed
                                </button>
                                <button 
                                  onClick={() => handleDeleteJob(job.id)}
                                  className="w-full px-3 py-1.5 text-[11px] hover:bg-rose-50 text-rose-600 block font-semibold"
                                >
                                  Delete Job
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400 text-xs">
                        No jobs found.
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