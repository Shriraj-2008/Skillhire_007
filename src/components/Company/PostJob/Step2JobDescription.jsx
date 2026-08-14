import React from 'react';

export default function Step2JobDescription({ formData, updateFormData, onNext, onBack }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Job Description</h2>
        <p className="text-xs text-slate-400 mt-1">Provide a clear and detailed description of the role and responsibilities.</p>
      </div>

      {/* Job Summary */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Job Summary *</label>
        <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-600">
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex gap-3 text-xs font-semibold text-slate-600">
            <button type="button" className="hover:text-indigo-600">B</button>
            <button type="button" className="italic hover:text-indigo-600">I</button>
            <button type="button" className="underline hover:text-indigo-600">U</button>
            <span>|</span>
            <button type="button" className="hover:text-indigo-600">• List</button>
          </div>
          <textarea
            rows={3}
            placeholder="Write a brief summary about the role..."
            value={formData.jobSummary}
            onChange={(e) => updateFormData({ jobSummary: e.target.value })}
            maxLength={500}
            className="w-full p-3 text-sm focus:outline-none resize-none"
          />
        </div>
        <div className="text-[10px] text-slate-400 text-right mt-1">
          {formData.jobSummary.length}/500
        </div>
      </div>

      {/* Key Responsibilities & What You'll Do */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Key Responsibilities *</label>
          <textarea
            rows={4}
            placeholder="Write key responsibilities..."
            value={formData.keyResponsibilities}
            onChange={(e) => updateFormData({ keyResponsibilities: e.target.value })}
            maxLength={1000}
            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600 resize-none"
          />
          <div className="text-[10px] text-slate-400 text-right mt-1">
            {formData.keyResponsibilities.length}/1000
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">What You'll Do (Day to Day) *</label>
          <textarea
            rows={4}
            placeholder="Write day to day tasks..."
            value={formData.dayToDayTasks}
            onChange={(e) => updateFormData({ dayToDayTasks: e.target.value })}
            maxLength={1000}
            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600 resize-none"
          />
          <div className="text-[10px] text-slate-400 text-right mt-1">
            {formData.dayToDayTasks.length}/1000
          </div>
        </div>
      </div>

      {/* Detailed Description */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Job Description (Detailed) *</label>
        <textarea
          rows={5}
          placeholder="Write the detailed job description..."
          value={formData.detailedDescription}
          onChange={(e) => updateFormData({ detailedDescription: e.target.value })}
          maxLength={3000}
          className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600 resize-none"
        />
        <div className="text-[10px] text-slate-400 text-right mt-1">
          {formData.detailedDescription.length}/3000
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
            onClick={onNext}
            className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-indigo-700 transition"
          >
            Save & Continue &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}