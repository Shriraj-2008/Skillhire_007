import React, { useState } from 'react';
import { useSkillAssessment } from '../../context/SkillAssessmentContext';
import { 
  Download, Filter, Award, CheckCircle2, ShieldCheck, 
  ChevronDown, MoreVertical, Trophy, ArrowRight 
} from 'lucide-react';

export default function Certificates() {
  const context = useSkillAssessment() || {};
  const { testResult = null } = context;
  
  const [activeTab, setActiveTab] = useState('all');

  // Starting empty list
  let certificatesList = [];

  // Live Test ka Result agar candidate ne clear kiya ho, tabhi add hoga
  if (testResult && testResult.passed) {
    const liveSkillName = testResult.skillsEvaluated && testResult.skillsEvaluated.length > 0 
      ? testResult.skillsEvaluated.join(' & ') 
      : 'Skill Assessment';

    certificatesList.push({
      id: Date.now(),
      title: `${liveSkillName} Test`,
      type: 'skill',
      date: 'Today',
      score: `${testResult.percentage || 0}%`,
      badgeColor: 'border-indigo-200 bg-indigo-50/30',
      iconBg: 'bg-indigo-100 text-indigo-600',
      tag: '★'
    });
  }

  // Filter functionality
  const filteredCertificates = certificatesList.filter((cert) => {
    if (activeTab === 'skill') return cert.type === 'skill';
    if (activeTab === 'course') return cert.type === 'course';
    if (activeTab === 'participation') return cert.type === 'participation';
    return true;
  });

  const skillCount = certificatesList.filter(c => c.type === 'skill').length;
  const courseCount = certificatesList.filter(c => c.type === 'course').length;
  const participationCount = certificatesList.filter(c => c.type === 'participation').length;

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6 bg-slate-50/50 min-h-screen text-slate-800">
      
      {/* Top Title & Action */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Certificates</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Dashboard <span className="mx-1">&gt;</span> <span className="text-slate-600">Certificates</span>
          </p>
        </div>
        <button className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 shadow-sm">
          <Download size={14} /> Download Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Section: Tabs & Grid */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tabs & Sort */}
          <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 pb-2">
            <div className="flex gap-2 text-xs font-semibold">
              <button 
                onClick={() => setActiveTab('all')}
                className={`pb-2 px-1 border-b-2 transition ${activeTab === 'all' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                All Certificates ({certificatesList.length})
              </button>
              <button 
                onClick={() => setActiveTab('skill')}
                className={`pb-2 px-1 border-b-2 transition ${activeTab === 'skill' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Skill Test Certificates ({skillCount})
              </button>
              <button 
                onClick={() => setActiveTab('course')}
                className={`pb-2 px-1 border-b-2 transition ${activeTab === 'course' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Course Certificates ({courseCount})
              </button>
              <button 
                onClick={() => setActiveTab('participation')}
                className={`pb-2 px-1 border-b-2 transition ${activeTab === 'participation' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Participation Certificates ({participationCount})
              </button>
            </div>

            <button className="flex items-center gap-1.5 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50">
              <Filter size={12} /> Latest First <ChevronDown size={12} />
            </button>
          </div>

          {/* Certificate Cards Grid or Empty State */}
          {filteredCertificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredCertificates.map((cert) => (
                <div key={cert.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm hover:shadow-md transition">
                  <div className={`border-2 ${cert.badgeColor} rounded-xl p-4 text-center space-y-2 relative`}>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                      <span className="flex items-center gap-1"><Award size={12} className="text-indigo-600"/> SkillHire</span>
                    </div>
                    <div className={`w-10 h-10 mx-auto rounded-full ${cert.iconBg} flex items-center justify-center font-bold text-sm shadow-inner`}>
                      {cert.tag}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-tight">{cert.title}</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">This is to certify that</p>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">Candidate</p>
                      <p className="text-[8px] text-slate-400 mt-0.5">has successfully cleared the test</p>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-slate-500 pt-2 border-t border-slate-200/60">
                      <span>{cert.date}</span>
                      <span className="font-bold text-slate-800">Score: {cert.score}</span>
                      <span className="italic text-[8px]">Authorized</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">{cert.title}</h3>
                      <p className="text-[10px] text-slate-400">Issued on {cert.date}</p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <button className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition">
                        <Download size={12} /> Download
                      </button>
                      <button className="text-slate-400 hover:text-slate-600 p-1">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Award size={48} className="text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No Certificates Earned Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Complete and pass skill tests or courses to view your certificates here.
              </p>
            </div>
          )}
        </div>

        {/* Right Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Summary Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800">Certificate Summary</h3>
            <div className="flex items-center justify-between">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-lg font-extrabold text-slate-800">{certificatesList.length}</span>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase">Total</p>
                </div>
              </div>

              <div className="space-y-2 text-[11px] font-medium">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span> Skill Test Certificates
                  </span>
                  <span className="font-bold text-slate-800">{skillCount}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Course Certificates
                  </span>
                  <span className="font-bold text-slate-800">{courseCount}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span> Participation Certificates
                  </span>
                  <span className="font-bold text-slate-800">{participationCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Your Achievements */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800">Your Achievements</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="flex items-center gap-2 text-slate-600">
                  <Award size={14} className="text-amber-500" /> Certificates Earned
                </span>
                <span className="font-bold text-slate-800">{certificatesList.length}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 size={14} className="text-indigo-500" /> Tests Completed
                </span>
                <span className="font-bold text-slate-800">{certificatesList.length > 0 ? 1 : 0}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="flex items-center gap-2 text-slate-600">
                  <Trophy size={14} className="text-emerald-500" /> Highest Score
                </span>
                <span className="font-bold text-slate-800">{certificatesList.length > 0 ? certificatesList[0].score : '0%'}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="flex items-center gap-2 text-slate-600">
                  <ShieldCheck size={14} className="text-purple-500" /> Average Score
                </span>
                <span className="font-bold text-slate-800">{certificatesList.length > 0 ? certificatesList[0].score : '0%'}</span>
              </div>
            </div>
          </div>

          {/* Certificate Guidelines */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800">Certificate Guidelines</h3>
            <div className="space-y-3 text-[11px] text-slate-500">
              <div className="flex gap-2">
                <CheckCircle2 size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                <p>All certificates are generated automatically after clearing the tests.</p>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                <p>You can download or share your certificates with others.</p>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                <p>These certificates can be added to your resume and LinkedIn profile.</p>
              </div>
            </div>
          </div>

          {/* Earn More Banner */}
          <div className="bg-indigo-50/60 border border-indigo-100 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-indigo-600" />
              <h4 className="text-xs font-bold text-slate-800">Want to earn more certificates?</h4>
            </div>
            <p className="text-[11px] text-slate-500">
              Take more skill tests and improve your skills to earn more certificates.
            </p>
            <button className="w-full bg-indigo-600 text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-1">
              Browse Skill Tests <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}