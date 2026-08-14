import React, { useState } from 'react';
import { 
  Search, Bell, User, Briefcase, FileText, Bookmark, 
  MessageSquare, Settings, LogOut, Download, Plus,
  Eye, CheckCircle, Star, Users, MapPin, Grid, List, MoreVertical,
  BarChart2, Menu, Filter, X
} from 'lucide-react';
import CompanySidebar from '../../components/Company/CompanySidebar'; 
import CompanyNavbar from '../../components/Company/CompanyNavbar';// Shared Sidebar Imported

export default function CandidateSearchDashboard() {
  // Dynamic Candidates List (Starts empty)
  const [candidates, setCandidates] = useState([]);

  // Logged-in Company / Recruiter Details State
  const [currentUser, setCurrentUser] = useState({
    companyName: '',
    isVerified: false,
    role: '',
    initials: ''
  });
  
  // Search and Filter States
  const [keyword, setKeyword] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [minExp, setMinExp] = useState('');
  const [maxExp, setMaxExp] = useState('');

  // Form Modal State for Adding Dynamic Candidates
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    role: '',
    experience: '',
    location: '',
    skills: '',
    company: '',
    education: '',
    matchScore: 85,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  });

  // Dynamic Add Candidate Handler
  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (!newCandidate.name || !newCandidate.role) return;

    const formattedData = {
      ...newCandidate,
      id: Date.now(),
      status: 'Active',
      skills: newCandidate.skills ? newCandidate.skills.split(',').map(s => s.trim()).filter(Boolean) : []
    };

    setCandidates([formattedData, ...candidates]);
    setNewCandidate({
      name: '', role: '', experience: '', location: '',
      skills: '', company: '', education: '', matchScore: 85,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    });
    setIsModalOpen(false);
  };

  // Filter Logic
  const filteredCandidates = candidates.filter(c => {
    const matchesKeyword = !keyword || 
      c.name.toLowerCase().includes(keyword.toLowerCase()) || 
      c.role.toLowerCase().includes(keyword.toLowerCase());
    
    const matchesSkill = !selectedSkill || 
      c.skills.some(skill => skill.toLowerCase().includes(selectedSkill.toLowerCase()));

    const matchesLocation = !selectedLocation || 
      c.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const expVal = parseFloat(c.experience) || 0;
    const matchesMinExp = !minExp || expVal >= parseFloat(minExp);
    const matchesMaxExp = !maxExp || expVal <= parseFloat(maxExp);

    return matchesKeyword && matchesSkill && matchesLocation && matchesMinExp && matchesMaxExp;
  });

  const clearFilters = () => {
    setKeyword('');
    setSelectedSkill('');
    setSelectedLocation('');
    setMinExp('');
    setMaxExp('');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 text-xs">
      
      {/* Replaced Inline Sidebar with Modular CompanySidebar */}

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}


        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Header Title Bar */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Candidate Search</h1>
              <p className="text-slate-500 text-xs mt-0.5">Find the right talent for your open positions</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
              >
                <Plus className="w-4 h-4" /> Add Dynamic Candidate
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-50">
                <Bookmark className="w-4 h-4" /> Save Search
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
                <Download className="w-4 h-4" /> Export Candidates
              </button>
            </div>
          </div>

          {/* Dynamic Top Stat Cards */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard icon={Users} title="Total Candidates" value={candidates.length} iconBg="bg-indigo-50 text-indigo-600" />
            <StatCard icon={CheckCircle} title="Matched Candidates" value={filteredCandidates.length} iconBg="bg-emerald-50 text-emerald-600" />
            <StatCard icon={Star} title="Shortlisted" value="0" iconBg="bg-amber-50 text-amber-600" />
            <StatCard icon={Eye} title="Viewed Profiles" value="0" iconBg="bg-blue-50 text-blue-600" />
          </div>

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className="font-medium text-slate-600 mb-1 block">Keywords</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search by name, skills, title..." 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full p-2 pr-8 border border-slate-200 rounded-lg bg-slate-50"
                  />
                  <Search className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-600 mb-1 block">Skills</label>
                <input 
                  type="text"
                  placeholder="Filter by skill..."
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>

              <div>
                <label className="font-medium text-slate-600 mb-1 block">Experience (Years)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" placeholder="Min" 
                    value={minExp} onChange={(e) => setMinExp(e.target.value)}
                    className="w-1/2 p-2 border border-slate-200 rounded-lg bg-slate-50" 
                  />
                  <span className="text-slate-400">-</span>
                  <input 
                    type="number" placeholder="Max" 
                    value={maxExp} onChange={(e) => setMaxExp(e.target.value)}
                    className="w-1/2 p-2 border border-slate-200 rounded-lg bg-slate-50" 
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-600 mb-1 block">Location</label>
                <input 
                  type="text"
                  placeholder="Filter by location..."
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button 
                onClick={clearFilters}
                className="text-indigo-600 font-medium hover:underline text-xs"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Grid Layout: Dynamic Candidates List + Side Filter Widget */}
          <div className="grid grid-cols-12 gap-5">
            
            {/* Candidate List Block */}
            <div className="col-span-9 space-y-3">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Showing {filteredCandidates.length > 0 ? 1 : 0} to {filteredCandidates.length} of {candidates.length} candidates</span>
                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
                  <button className="p-1 bg-indigo-50 text-indigo-600 rounded"><List className="w-4 h-4" /></button>
                  <button className="p-1 text-slate-400 hover:text-slate-600"><Grid className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Dynamic Rendering Section */}
              {filteredCandidates.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl border border-dashed border-slate-300">
                  <p className="text-slate-600 font-medium text-sm">NO CANDIDATE</p>
                </div>
              ) : (
                filteredCandidates.map((candidate) => (
                  <div key={candidate.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-4 hover:shadow-md transition">
                    
                    {/* Candidate Info */}
                    <div className="flex gap-3 w-1/3">
                      <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">{candidate.name}</h3>
                          <span className="bg-emerald-50 text-emerald-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            {candidate.status}
                          </span>
                        </div>
                        <p className="text-slate-500 font-medium mt-0.5">{candidate.role}</p>
                        <p className="text-slate-400 text-[11px] mt-1">{candidate.experience} Years Experience</p>
                        <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-slate-400" /> {candidate.location}
                        </p>
                      </div>
                    </div>

                    {/* Dynamic Skills & Details */}
                    <div className="flex-1 px-4 border-x border-slate-100 space-y-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium block mb-1">Skills</span>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map((skill, index) => (
                            <span key={index} className="bg-indigo-50 text-indigo-600 text-[10px] font-medium px-2 py-0.5 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Current Company</span>
                          <span className="text-slate-700 font-medium">{candidate.company || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Education</span>
                          <span className="text-slate-700 font-medium">{candidate.education || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Block */}
                    <div className="flex flex-col items-center justify-between gap-2 min-w-[120px]">
                      <div className="text-center">
                        <span className="text-[10px] text-slate-400 font-medium block">Match Score</span>
                        <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center font-bold text-xs text-emerald-600 mt-0.5 mx-auto">
                          {candidate.matchScore}%
                        </div>
                      </div>
                      <div className="space-y-1.5 w-full">
                        <button className="w-full py-1.5 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50">View Profile</button>
                        <button className="w-full py-1.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-sm">Shortlist</button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Quick Filters Sidebar Widget */}
            <div className="col-span-3 space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-800 text-xs">Quick Filters</h3>
                <div className="space-y-2">
                  {['Actively Looking', 'Open to Work', 'Experienced (3+ yrs)', 'Recently Active (7 days)', 'Available Immediately'].map((filter, idx) => (
                    <label key={idx} className="flex items-center justify-between text-slate-600 hover:text-slate-900 cursor-pointer">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                        <span>{filter}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* Dynamic Data Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-base font-bold text-slate-900">Add New Candidate</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddCandidate} className="space-y-3">
              <div>
                <label className="font-medium text-slate-600 block mb-1">Full Name</label>
                <input 
                  type="text" required value={newCandidate.name} 
                  onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                  className="w-full border p-2 rounded-lg bg-slate-50" placeholder="e.g. Rahul Sharma" 
                />
              </div>
              <div>
                <label className="font-medium text-slate-600 block mb-1">Role / Designations</label>
                <input 
                  type="text" required value={newCandidate.role} 
                  onChange={(e) => setNewCandidate({...newCandidate, role: e.target.value})}
                  className="w-full border p-2 rounded-lg bg-slate-50" placeholder="e.g. Frontend Developer" 
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-slate-600 block mb-1">Experience (Yrs)</label>
                  <input 
                    type="text" value={newCandidate.experience} 
                    onChange={(e) => setNewCandidate({...newCandidate, experience: e.target.value})}
                    className="w-full border p-2 rounded-lg bg-slate-50" placeholder="e.g. 4.2" 
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-600 block mb-1">Location</label>
                  <input 
                    type="text" value={newCandidate.location} 
                    onChange={(e) => setNewCandidate({...newCandidate, location: e.target.value})}
                    className="w-full border p-2 rounded-lg bg-slate-50" placeholder="e.g. Mumbai, India" 
                  />
                </div>
              </div>
              <div>
                <label className="font-medium text-slate-600 block mb-1">Skills (Comma separated)</label>
                <input 
                  type="text" value={newCandidate.skills} 
                  onChange={(e) => setNewCandidate({...newCandidate, skills: e.target.value})}
                  className="w-full border p-2 rounded-lg bg-slate-50" placeholder="React.js, JavaScript, Tailwind CSS" 
                />
              </div>
              <div>
                <label className="font-medium text-slate-600 block mb-1">Current Company</label>
                <input 
                  type="text" value={newCandidate.company} 
                  onChange={(e) => setNewCandidate({...newCandidate, company: e.target.value})}
                  className="w-full border p-2 rounded-lg bg-slate-50" placeholder="e.g. Tech Corp" 
                />
              </div>
              <div>
                <label className="font-medium text-slate-600 block mb-1">Education</label>
                <input 
                  type="text" value={newCandidate.education} 
                  onChange={(e) => setNewCandidate({...newCandidate, education: e.target.value})}
                  className="w-full border p-2 rounded-lg bg-slate-50" placeholder="e.g. B.Tech CS" 
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)} 
                  className="w-1/2 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
                >
                  Save Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ icon: Icon, title, value, iconBg }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
      <div className={`p-2.5 rounded-xl ${iconBg}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 leading-none">{value}</h3>
        <p className="text-[11px] text-slate-500 font-medium mt-1">{title}</p>
      </div>
    </div>
  );
}