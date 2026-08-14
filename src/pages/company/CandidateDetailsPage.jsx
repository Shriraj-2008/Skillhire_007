import React, { useState, useEffect, useCallback } from 'react';
import SkillTestResult from '../candidate/SkillTestResult';
import { User, Mail, Phone, FileText, CheckCircle2, Award, Calendar, ExternalLink } from 'lucide-react';

export default function CandidateDetailsPage({ candidateEmail: propEmail }) {
  const [candidateData, setCandidateData] = useState(null);
  const [testResult, setTestResult] = useState(null);

  // Dynamic Candidate Data & Assessment Result Fetcher
  const loadDynamicCandidateData = useCallback(() => {
    // 1. Fetch Candidate Profile & Local Data
    const candidateProfile = JSON.parse(localStorage.getItem('candidate_profile')) || {};
    const registeredUser = JSON.parse(localStorage.getItem('user')) || {};
    const quizSummary = JSON.parse(localStorage.getItem('candidate_quiz_results')) || {};
    const latestTestResult = JSON.parse(localStorage.getItem('candidate_latest_skill_test_result')) || null;

    // 2. Fetch Job Applications
    const applications = JSON.parse(localStorage.getItem('job_applications')) || [];
    const targetEmail = propEmail || candidateProfile.email || registeredUser.email || '';

    // Find specific application or default to latest submitted
    const candidateApp = applications.find(app => app.candidateEmail === targetEmail) || applications[applications.length - 1];

    if (!targetEmail && !candidateApp) {
      setCandidateData(null);
      setTestResult(null);
      return;
    }

    // 3. Construct Candidate Details Object
    const constructedCandidate = {
      fullName: candidateApp?.candidateName || candidateProfile.fullName || registeredUser.fullName || 'Candidate',
      email: candidateApp?.candidateEmail || candidateProfile.email || registeredUser.email || 'N/A',
      phone: candidateApp?.candidatePhone || candidateProfile.phone || registeredUser.phone || 'N/A',
      skills: candidateApp?.skills?.length ? candidateApp.skills : (candidateProfile.skills || ['JavaScript', 'React']),
      resumeUrl: candidateApp?.resumeUrl || candidateProfile.resumeUrl || '',
      appliedAt: candidateApp?.appliedAt || new Date().toLocaleDateString('en-GB'),
      jobTitle: candidateApp?.jobTitle || 'Applied Position',
      companyName: candidateApp?.companyName || 'Company'
    };

    setCandidateData(constructedCandidate);

    // 4. Construct Dynamic Skill Assessment Results
    if (latestTestResult) {
      setTestResult(latestTestResult);
    } else if (quizSummary.score !== undefined) {
      const scoreNum = Number(quizSummary.score) || 0;
      setTestResult({
        percentage: scoreNum,
        correctAnswers: Math.round((scoreNum / 100) * 5),
        totalQuestions: 5,
        passed: scoreNum >= 60,
        skillBreakdown: constructedCandidate.skills.map(s => ({
          skill: s,
          correct: Math.round((scoreNum / 100) * 2),
          total: 2,
          percentage: scoreNum
        })),
        detailedAnswers: []
      });
    } else {
      setTestResult(null);
    }
  }, [propEmail]);

  useEffect(() => {
    loadDynamicCandidateData();

    // Listen to real-time events across windows & tabs
    window.addEventListener('storage', loadDynamicCandidateData);
    window.addEventListener('applicationsUpdated', loadDynamicCandidateData);

    return () => {
      window.removeEventListener('storage', loadDynamicCandidateData);
      window.removeEventListener('applicationsUpdated', loadDynamicCandidateData);
    };
  }, [loadDynamicCandidateData]);

  if (!candidateData) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center max-w-xl mx-auto my-12 text-slate-500">
        <User size={48} className="mx-auto text-slate-300 mb-3" />
        <h3 className="text-base font-bold text-slate-800">No Candidate Application Found</h3>
        <p className="text-xs text-slate-400 mt-1">
          When a candidate applies for a job, their profile and assessment results will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-800 p-6">
      {/* Candidate Profile Header Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl shrink-0">
              {candidateData.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {candidateData.fullName}
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Applied
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Applied for <strong className="text-slate-700">{candidateData.jobTitle}</strong> at <strong className="text-slate-700">{candidateData.companyName}</strong>
              </p>
            </div>
          </div>

          {candidateData.resumeUrl && (
            <a
              href={candidateData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 shadow-xs"
            >
              <FileText size={14} /> View Resume <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <Mail size={18} className="text-indigo-600 shrink-0" />
            <div className="truncate">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Email</p>
              <p className="font-semibold text-slate-800 truncate">{candidateData.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <Phone size={18} className="text-indigo-600 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Phone</p>
              <p className="font-semibold text-slate-800">{candidateData.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <Calendar size={18} className="text-indigo-600 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Applied Date</p>
              <p className="font-semibold text-slate-800">{candidateData.appliedAt}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Skills Badge List */}
        <div className="space-y-2 pt-1">
          <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Award size={16} className="text-indigo-600" /> Extracted Candidate Skills:
          </p>
          <div className="flex flex-wrap gap-2">
            {candidateData.skills.map((skill, index) => (
              <span key={index} className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1 rounded-xl">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Skill Test Results Breakdown */}
      <SkillTestResult testResult={testResult} />
    </div>
  );
}