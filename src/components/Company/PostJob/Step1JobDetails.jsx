import React from 'react';

export default function Step1JobDetails({ formData, updateFormData, onNext }) {
  const empTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Other'];
  const workModes = ['On-site', 'Remote', 'Hybrid'];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
      <h2 className="text-lg font-bold text-slate-800">Basic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title *</label>
          <input
            type="text"
            placeholder="Enter job title (e.g. Frontend Developer)"
            value={formData.jobTitle}
            onChange={(e) => updateFormData({ jobTitle: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600"
          />
        </div>

        {/* Company Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Company Location *</label>
          <input
            type="text"
            placeholder="Enter city or location"
            value={formData.companyLocation}
            onChange={(e) => updateFormData({ companyLocation: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600"
          />
        </div>

        {/* Job Role */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Job Role / Position</label>
          <input
            type="text"
            placeholder="Enter job role or position"
            value={formData.jobRole}
            onChange={(e) => updateFormData({ jobRole: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Industry *</label>
          <select
            value={formData.industry}
            onChange={(e) => updateFormData({ industry: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600 text-slate-600"
          >
            <option value="">Select industry</option>
            <option value="IT & Software">IT & Software</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>

      {/* Employment Type Buttons */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">Employment Type *</label>
        <div className="flex flex-wrap gap-3">
          {empTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => updateFormData({ employmentType: type })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                formData.employmentType === type
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Work Mode */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">Work Mode *</label>
        <div className="flex gap-4">
          {workModes.map((mode) => (
            <label key={mode} className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="radio"
                name="workMode"
                checked={formData.workMode === mode}
                onChange={() => updateFormData({ workMode: mode })}
                className="accent-indigo-600"
              />
              {mode}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-indigo-700 transition"
        >
          Save & Continue &rarr;
        </button>
      </div>
    </div>
  );
}