import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, MapPin, Briefcase, Bookmark, Send, CheckCircle2, Building2 } from 'lucide-react';

export default function BrowseJobs() {
  const { user: authUser } = useAuth() || {};

  const [allJobs, setAllJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Dynamic Candidate Data Fetching
  const getCandidateDetails = () => {
    const candidateProfile = JSON.parse(localStorage.getItem('candidate_profile')) || {};
    const registeredUser = JSON.parse(localStorage.getItem('user')) || {};
    const quizResults = JSON.parse(localStorage.getItem('candidate_quiz_results')) || {};

    return {
      candidateEmail: authUser?.email || candidateProfile?.email || registeredUser?.email || '',
      candidateName: authUser?.name || candidateProfile?.fullName || registeredUser?.fullName || '',
      candidatePhone: candidateProfile?.phone || registeredUser?.phone || '',
      skills: candidateProfile?.skills || [],
      skillScore: quizResults?.score !== undefined ? `${quizResults.score}%` : 'N/A',
      resumeUrl: candidateProfile?.resumeUrl || ''
    };
  };

  // Only load jobs that companies have posted in localStorage
  const loadJobs = useCallback(() => {
    const localJobs = JSON.parse(localStorage.getItem('publishedJobs')) || [];
    const candidate = getCandidateDetails();
    const existingApplications = JSON.parse(localStorage.getItem('job_applications')) || [];

    const formattedLocalJobs = localJobs.map(j => {
      const jobId = j.id;
      const isApplied = existingApplications.some(
        app => app.jobId === jobId && app.candidateEmail === candidate.candidateEmail
      );

      return {
        id: jobId,
        title: j.jobTitle || j.title,
        company: j.companyName || j.company,
        companyEmail: j.companyEmail || j.email,
        skills: Array.isArray(j.skills) ? j.skills : [],
        experience: j.experience || 'Not Specified',
        location: j.companyLocation || j.location || 'Not Specified',
        salary: j.minSalary && j.maxSalary ? `₹${j.minSalary} - ₹${j.maxSalary}` : j.salary || 'Not Specified',
        type: j.employmentType || j.workMode || j.type || 'Full Time',
        summary: j.jobSummary || j.description || 'No summary provided.',
        applied: isApplied
      };
    });

    setAllJobs(formattedLocalJobs);

    // Dynamic selection logic based on real jobs available
    setSelectedJob(prevSelected => {
      if (formattedLocalJobs.length === 0) return null;
      if (!prevSelected) return formattedLocalJobs[0];
      const stillExists = formattedLocalJobs.find(j => j.id === prevSelected.id);
      return stillExists || formattedLocalJobs[0];
    });
  }, []);

  useEffect(() => {
    loadJobs();
    window.addEventListener('publishedJobsUpdated', loadJobs);
    window.addEventListener('storage', loadJobs);
    return () => {
      window.removeEventListener('publishedJobsUpdated', loadJobs);
      window.removeEventListener('storage', loadJobs);
    };
  }, [loadJobs]);

  const handleApplyNow = (job) => {
    const candidate = getCandidateDetails();

    if (!candidate.candidateEmail) {
      alert("Please login as a Candidate to apply for jobs!");
      return;
    }

    const newApplication = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.company,
      companyEmail: job.companyEmail,
      candidateEmail: candidate.candidateEmail,
      candidateName: candidate.candidateName,
      candidatePhone: candidate.candidatePhone,
      skills: candidate.skills,
      skillScore: candidate.skillScore,
      resumeUrl: candidate.resumeUrl,
      appliedAt: new Date().toLocaleDateString('en-GB'),
      status: 'Applied'
    };

    const currentApps = JSON.parse(localStorage.getItem('job_applications')) || [];
    const updatedApps = [...currentApps, newApplication];
    localStorage.setItem('job_applications', JSON.stringify(updatedApps));

    const updatedJobsList = allJobs.map(j => j.id === job.id ? { ...j, applied: true } : j);
    setAllJobs(updatedJobsList);
    setSelectedJob({ ...job, applied: true });

    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('applicationsUpdated'));
    alert(`Successfully applied for ${job.title}! Application sent to ${job.company}.`);
  };

  const filteredJobs = allJobs.filter(j => 
    (j.title && j.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (j.company && j.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (j.skills && j.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6 bg-slate-50/50 min-h-screen text-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Browse Jobs</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Dashboard <span className="mx-1">&gt;</span> <span className="text-slate-600">Browse Jobs</span>
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs, skills, or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {selectedJob ? (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 p-2 flex items-center justify-center border border-slate-200 shrink-0">
                    <Building2 className="text-slate-600" size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedJob.title}</h2>
                    <p className="text-xs font-semibold text-indigo-600 flex items-center gap-1 mt-0.5">
                      {selectedJob.company} <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full">✔</span>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedJob.skills && selectedJob.skills.map((skill, index) => (
                        <span key={index} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500">
                    <Bookmark size={18} />
                  </button>
                  {selectedJob.applied ? (
                    <button disabled className="bg-emerald-600 text-white text-xs font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 cursor-default">
                      <CheckCircle2 size={16} /> Applied
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleApplyNow(selectedJob)}
                      className="bg-indigo-600 text-white text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 shadow-sm"
                    >
                      <Send size={14} /> Apply Now
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <p className="text-slate-400 font-medium">Experience</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedJob.experience}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Location</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedJob.location}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Salary</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedJob.salary}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Job Type</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedJob.type}</p>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-800">About the Role</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {selectedJob.summary}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
              <Briefcase size={40} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No Jobs Available</p>
              <p className="text-xs text-slate-400 mt-1">Jobs posted by companies will appear here in real-time.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800">Available Jobs ({filteredJobs.length})</h3>
          </div>

          <div className="space-y-3">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                    selectedJob?.id === job.id ? 'bg-indigo-50/50 border-indigo-300 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 p-2 flex items-center justify-center border border-slate-200 shrink-0">
                      <Building2 className="text-slate-600" size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{job.title}</h4>
                      <p className="text-[10px] text-slate-400">{job.company} • {job.salary}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} /> {job.location}
                      </p>
                    </div>
                  </div>

                  {job.applied && (
                    <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full shrink-0">
                      Applied
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center text-slate-400 text-xs">
                No active job listings found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}