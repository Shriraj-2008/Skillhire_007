import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Video, CalendarX2, User, Building } from 'lucide-react';

export default function InterviewSchedule() {
  const [interviews, setInterviews] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Load live scheduled interviews from localStorage
  const loadInterviews = () => {
    try {
      const data = JSON.parse(localStorage.getItem('app_interviews')) || [];
      setInterviews(data);
      if (data.length > 0 && !selectedId) {
        setSelectedId(data[0].id);
      }
    } catch (e) {
      setInterviews([]);
    }
  };

  useEffect(() => {
    loadInterviews();
    // Listen to real-time interview updates triggered by Company Panel
    window.addEventListener('interviewsUpdated', loadInterviews);
    return () => window.removeEventListener('interviewsUpdated', loadInterviews);
  }, []);

  const activeInterview = interviews.find(i => i.id === selectedId) || interviews[0];

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6 bg-slate-50/50 min-h-screen text-slate-800">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarIcon className="text-indigo-600" size={24} /> Interview Schedule
          </h1>
          <p className="text-xs text-slate-400">Dashboard &gt; Interview Schedule</p>
        </div>
      </div>

      {interviews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interview Cards List */}
          <div className="lg:col-span-5 space-y-3">
            {interviews.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedId(item.id)}
                className={`p-4 rounded-2xl border transition bg-white space-y-2 cursor-pointer ${
                  item.id === activeInterview?.id ? 'border-indigo-600 ring-2 ring-indigo-50 shadow-sm' : 'border-slate-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">{item.jobTitle || item.role || 'Interview Round'}</h3>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <User size={10} /> {item.interviewer || 'Recruiter'}
                    </p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' :
                    item.status === 'In Progress' ? 'bg-amber-50 text-amber-600' :
                    item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {item.status || 'Upcoming'}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 flex items-center gap-3 pt-1">
                  <span className="flex items-center gap-1"><CalendarIcon size={10} /> {item.date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {item.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Interview Panel Details */}
          {activeInterview && (
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-800">
                    {activeInterview.jobTitle || activeInterview.role || 'Job Position'}
                  </h2>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <User size={12} className="text-slate-400" /> Interviewer: <span className="font-semibold text-slate-700">{activeInterview.interviewer || 'N/A'}</span>
                  </p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  activeInterview.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' :
                  activeInterview.status === 'In Progress' ? 'bg-amber-50 text-amber-600' :
                  activeInterview.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {activeInterview.status || 'Upcoming'}
                </span>
              </div>

              {/* Timing Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Scheduled Date</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{activeInterview.date || 'N/A'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Scheduled Time</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{activeInterview.time || 'N/A'}</p>
                </div>
              </div>

              {/* Meeting Link Box */}
              <div className="p-4 bg-indigo-50/50 rounded-xl space-y-3 border border-indigo-100 text-xs">
                <div>
                  <h4 className="font-bold text-indigo-950 flex items-center gap-1.5 mb-1">
                    <Video size={14} className="text-indigo-600" /> Virtual Interview Link
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Click below to join your scheduled video call meeting.
                  </p>
                </div>

                {activeInterview.meetingLink || activeInterview.link ? (
                  <a 
                    href={activeInterview.meetingLink || activeInterview.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-indigo-700 transition"
                  >
                    <Video size={14} /> Join Interview
                  </a>
                ) : (
                  <p className="text-xs font-medium text-slate-400 italic">Meeting link will be provided prior to the round.</p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <CalendarX2 size={40} className="mx-auto text-slate-300" />
          <h3 className="text-sm font-bold text-slate-700">No Scheduled Interviews</h3>
          <p className="text-xs text-slate-400">When recruiters schedule an interview with you, it will appear here in real-time.</p>
        </div>
      )}
    </div>
  );
}