import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, Clock, PlayCircle, CheckCircle, XCircle, 
  Search, Plus, X, Video
} from 'lucide-react';

export default function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [candidatesList, setCandidatesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Scheduling Interview
  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    jobTitle: '',
    interviewType: 'Technical Round',
    interviewer: '',
    date: '',
    time: '',
    meetingLink: '',
    status: 'Upcoming'
  });

  // Load existing interviews and applied candidates from LocalStorage
  const loadData = () => {
    try {
      const scheduledData = JSON.parse(localStorage.getItem('app_interviews')) || [];
      setInterviews(scheduledData);

      // Load candidates who applied for jobs to populate selection dropdown
      const applications = JSON.parse(localStorage.getItem('app_applications')) || [];
      const profiles = JSON.parse(localStorage.getItem('registered_candidates')) || [];
      
      // Merge unique candidate data
      const combined = [...applications, ...profiles];
      setCandidatesList(combined);
    } catch (e) {
      setInterviews([]);
      setCandidatesList([]);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('interviewsUpdated', loadData);
    window.addEventListener('storage', loadData);
    return () => {
      window.removeEventListener('interviewsUpdated', loadData);
      window.removeEventListener('storage', loadData);
    };
  }, []);

  // Handle Candidate Selection from Applied Data
  const handleCandidateSelect = (e) => {
    const selectedEmail = e.target.value;
    const selectedCandidate = candidatesList.find(
      c => c.email?.toLowerCase() === selectedEmail.toLowerCase()
    );

    if (selectedCandidate) {
      setFormData(prev => ({
        ...prev,
        candidateName: selectedCandidate.name || selectedCandidate.candidateName || prev.candidateName,
        email: selectedCandidate.email || prev.email,
        jobTitle: selectedCandidate.jobTitle || selectedCandidate.appliedJob || prev.jobTitle
      }));
    } else {
      setFormData(prev => ({ ...prev, email: selectedEmail }));
    }
  };

  // Save new scheduled interview
  const handleScheduleInterview = (e) => {
    e.preventDefault();
    if (!formData.candidateName || !formData.date || !formData.time) {
      alert('Please fill candidate details, date, and time.');
      return;
    }

    const newInterview = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const updatedInterviews = [newInterview, ...interviews];
    localStorage.setItem('app_interviews', JSON.stringify(updatedInterviews));
    
    // Broadcast event so candidate portal updates instantly
    window.dispatchEvent(new Event('interviewsUpdated'));

    setIsModalOpen(false);
    setFormData({
      candidateName: '',
      email: '',
      jobTitle: '',
      interviewType: 'Technical Round',
      interviewer: '',
      date: '',
      time: '',
      meetingLink: '',
      status: 'Upcoming'
    });
  };

  // Status Change Handler
  const handleStatusChange = (id, newStatus) => {
    const updated = interviews.map(i => i.id === id ? { ...i, status: newStatus } : i);
    localStorage.setItem('app_interviews', JSON.stringify(updated));
    window.dispatchEvent(new Event('interviewsUpdated'));
  };

  // Metrics calculation
  const stats = useMemo(() => ({
    total: interviews.length,
    upcoming: interviews.filter(i => i.status === 'Upcoming').length,
    inProgress: interviews.filter(i => i.status === 'In Progress').length,
    completed: interviews.filter(i => i.status === 'Completed').length,
    cancelled: interviews.filter(i => i.status === 'Cancelled').length,
  }), [interviews]);

  // Search & Filter
  const filtered = useMemo(() => {
    return interviews.filter(i => {
      const matchSearch = i.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          i.interviewer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = selectedStatus === 'All Status' || i.status === selectedStatus;
      return matchSearch && matchStatus;
    });
  }, [interviews, searchTerm, selectedStatus]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 text-xs">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>Dashboard</span>
                <span>&gt;</span>
                <span className="text-slate-600 font-semibold">Interviews</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <Calendar className="text-indigo-600" size={24} /> Company Interviews
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition"
              >
                <Plus size={15} /> Schedule Interview
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.total}</span>
                <p className="text-[11px] font-bold text-slate-500">Total Scheduled</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.upcoming}</span>
                <p className="text-[11px] font-bold text-slate-500">Upcoming</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <PlayCircle size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.inProgress}</span>
                <p className="text-[11px] font-bold text-slate-500">In Progress</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.completed}</span>
                <p className="text-[11px] font-bold text-slate-500">Completed</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <XCircle size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900">{stats.cancelled}</span>
                <p className="text-[11px] font-bold text-slate-500">Cancelled</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-80">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search candidate, job title, interviewer..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold"
              >
                <option>All Status</option>
                <option>Upcoming</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                    <th className="py-3 px-4 w-8"><input type="checkbox" className="rounded" /></th>
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">Applied Job Title</th>
                    <th className="py-3 px-4">Interview Round</th>
                    <th className="py-3 px-4">Interviewer</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.length > 0 ? (
                    filtered.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-3 px-4"><input type="checkbox" className="rounded" /></td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{item.candidateName}</div>
                          <div className="text-[10px] text-slate-400">{item.email}</div>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800">{item.jobTitle || 'N/A'}</td>
                        <td className="py-3 px-4">{item.interviewType || 'Technical Round'}</td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{item.interviewer || 'Assigning...'}</td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-800">{item.date}</p>
                          <p className="text-[10px] text-slate-400">{item.time}</p>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border-none cursor-pointer focus:ring-0 ${
                              item.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' :
                              item.status === 'In Progress' ? 'bg-amber-50 text-amber-600' :
                              item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                            }`}
                          >
                            <option value="Upcoming">Upcoming</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {item.meetingLink ? (
                              <a 
                                href={item.meetingLink} 
                                target="_blank" 
                                rel="noreferrer"
                                className="border border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-semibold px-2 py-1 rounded-lg text-[11px] flex items-center gap-1"
                              >
                                <Video size={12} /> Join Link
                              </a>
                            ) : (
                              <span className="text-[10px] text-slate-400 italic">No link</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        No interviews scheduled yet. Click "Schedule Interview" to set up a round.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modal for Scheduling New Interview */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">Schedule Candidate Interview</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleScheduleInterview} className="space-y-3 text-xs">
              {/* Select from Applied Candidates */}
              {candidatesList.length > 0 && (
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Select Applied Candidate (Optional)</label>
                  <select
                    onChange={handleCandidateSelect}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500 bg-slate-50"
                  >
                    <option value="">-- Choose Candidate --</option>
                    {candidatesList.map((cand, idx) => (
                      <option key={idx} value={cand.email}>
                        {(cand.name || cand.candidateName || 'Candidate')} - {cand.email} ({cand.jobTitle || cand.appliedJob || 'Applied'})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Candidate Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.candidateName}
                  onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Candidate Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="candidate@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Applied Job Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. MERN Stack Dev"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Interviewer Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Tech Lead"
                    value={formData.interviewer}
                    onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Interview Round Type</label>
                <select 
                  value={formData.interviewType}
                  onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                >
                  <option value="Technical Round">Technical Round</option>
                  <option value="HR Round">HR Round</option>
                  <option value="System Design">System Design</option>
                  <option value="Final Screening">Final Screening</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Time</label>
                  <input 
                    type="time" 
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Meeting Link (Google Meet / Zoom)</label>
                <input 
                  type="url" 
                  placeholder="https://meet.google.com/..."
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
                >
                  Schedule Round
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}