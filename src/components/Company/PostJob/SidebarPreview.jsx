import React from 'react';
import CompanySidebar from '../CompanySidebar';
import CompanyNavbar from '../CompanyNavbar';

export default function SidebarPreview({ formData }) {
        <CompanySidebar />

  return (
    
    <div className="space-y-6 sticky top-6">
      {/* Tips Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
        <h3 className="font-bold text-sm text-slate-800">Tips for a Great Job Post</h3>
        <ul className="text-xs text-slate-500 space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Use a clear and specific job title
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Write a detailed job description
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Set a competitive salary
          </li>
        </ul>
      </div>

      {/* Dynamic Job Preview Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
          <span>👁</span> Job Post Preview
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center space-y-3">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto">
            💼
          </div>
          <h4 className="font-extrabold text-slate-800 text-base">{formData.jobTitle || 'Job Title'}</h4>
          <p className="text-xs text-indigo-600 font-semibold">Aarav Recruitment ✔</p>

          <div className="text-xs text-slate-400 flex flex-wrap justify-center gap-3">
            <span>📍 {formData.companyLocation || 'Location'}</span>
            <span>💼 {formData.employmentType}</span>
            <span>⏱ {formData.workMode}</span>
          </div>

          {/* Dynamic Salary Preview */}
          {formData.minSalary && (
            <div className="text-xs font-bold text-slate-700 pt-2">
              ₹ {formData.minSalary} - ₹ {formData.maxSalary} ({formData.payPeriod})
            </div>
          )}

          {/* Dynamic Skills Pills */}
          <div className="flex flex-wrap gap-1.5 justify-center pt-2">
            {formData.skills.slice(0, 3).map((s) => (
              <span key={s} className="bg-indigo-50 text-indigo-600 text-[10px] font-semibold px-2 py-0.5 rounded">
                {s}
              </span>
            ))}
            {formData.skills.length > 3 && (
              <span className="bg-slate-100 text-slate-500 text-[10px] font-semibold px-2 py-0.5 rounded">
                +{formData.skills.length - 3} More
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}