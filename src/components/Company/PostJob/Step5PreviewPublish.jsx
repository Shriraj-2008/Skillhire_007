import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Step5PreviewPublish({ formData, onBack, setCurrentStep }) {
  const navigate = useNavigate();

  const handlePublish = () => {
    const existingJobs = JSON.parse(localStorage.getItem('publishedJobs')) || [];

    const newJob = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'Active'
    };

    const updatedJobs = [newJob, ...existingJobs];
    localStorage.setItem('publishedJobs', JSON.stringify(updatedJobs));
    
    // Notify other components listening on the same window tab
    window.dispatchEvent(new Event('publishedJobsUpdated'));
    navigate('/company/dashboard');
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Preview & Publish</h2>
        <p className="text-xs text-slate-400 mt-1">
          Review the job details below before publishing. You can go back and edit any section if needed.
        </p>
      </div>

      {/* Job Overview Box */}
      <div className="p-5 border border-slate-200 rounded-2xl relative space-y-3 bg-slate-50/50">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-800">Job Overview</h3>
          <button onClick={() => setCurrentStep(1)} className="text-xs text-indigo-600 font-bold hover:underline">
            ✎ Edit
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Job Title</span>
            <span className="font-bold text-slate-800">{formData.jobTitle || 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Work Mode</span>
            <span className="font-bold text-slate-800">{formData.workMode || 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Employment Type</span>
            <span className="font-bold text-slate-800">{formData.employmentType || 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Job Location</span>
            <span className="font-bold text-slate-800">{formData.companyLocation || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Description Summary Box */}
      <div className="p-5 border border-slate-200 rounded-2xl relative space-y-2 bg-slate-50/50">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-800">Job Description</h3>
          <button onClick={() => setCurrentStep(2)} className="text-xs text-indigo-600 font-bold hover:underline">
            ✎ Edit
          </button>
        </div>
        <p className="text-xs text-slate-600">
          {formData.jobSummary || 'No summary provided.'}
        </p>
      </div>

      {/* Requirements Box */}
      <div className="p-5 border border-slate-200 rounded-2xl relative space-y-3 bg-slate-50/50">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-800">Requirements & Skills</h3>
          <button onClick={() => setCurrentStep(3)} className="text-xs text-indigo-600 font-bold hover:underline">
            ✎ Edit
          </button>
        </div>
        <div>
          <span className="text-xs text-slate-400 block mb-1">Skills Required:</span>
          <div className="flex flex-wrap gap-2">
            {formData.skills?.map((skill) => (
              <span key={skill} className="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-1 rounded-md font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Compensation Box */}
      <div className="p-5 border border-slate-200 rounded-2xl relative space-y-2 bg-slate-50/50">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-800">Compensation & Benefits</h3>
          <button onClick={() => setCurrentStep(4)} className="text-xs text-indigo-600 font-bold hover:underline">
            ✎ Edit
          </button>
        </div>
        <div className="text-xs text-slate-700">
          <span className="font-bold text-slate-800">
            ₹{formData.minSalary || '0'} - ₹{formData.maxSalary || '0'}
          </span>{' '}
          ({formData.salaryType || 'Per Year'})
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {formData.benefits?.map((b) => (
            <span key={b} className="bg-emerald-50 text-emerald-600 text-xs px-2.5 py-1 rounded-md font-medium">
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={onBack}
          className="border border-slate-200 text-slate-600 font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-slate-50 transition"
        >
          &larr; Back
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            className="border border-slate-200 text-slate-600 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-slate-50 transition"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handlePublish} 
            className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-indigo-700 transition"
          >
            Publish Job 🚀
          </button>
        </div>
      </div>
    </div>
  );
}