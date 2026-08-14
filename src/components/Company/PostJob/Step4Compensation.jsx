import React, { useState } from 'react';

export default function Step4Compensation({ formData, updateFormData, onNext, onBack }) {
  const [customBenefitInput, setCustomBenefitInput] = useState('');

  const defaultBenefits = [
    'Health Insurance',
    'Provident Fund (PF)',
    'Flexible Working',
    'Performance Bonus',
    'Paid Time Off',
    'Life Insurance',
    'Gratuity',
    'Stock Options'
  ];

  // Toggle Benefits Select/Deselect
  const toggleBenefit = (benefit) => {
    if (formData.benefits.includes(benefit)) {
      updateFormData({ benefits: formData.benefits.filter((b) => b !== benefit) });
    } else {
      updateFormData({ benefits: [...formData.benefits, benefit] });
    }
  };

  // Add Custom Benefit on Enter
  const handleAddCustomBenefit = (e) => {
    if (e.key === 'Enter' && customBenefitInput.trim()) {
      e.preventDefault();
      if (!formData.benefits.includes(customBenefitInput.trim())) {
        updateFormData({ benefits: [...formData.benefits, customBenefitInput.trim()] });
      }
      setCustomBenefitInput('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Compensation</h2>
        <p className="text-xs text-slate-400 mt-1">Define the compensation and benefits for this role.</p>
      </div>

      {/* Salary Range */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Salary Range *</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Minimum Salary"
              value={formData.minSalary}
              onChange={(e) => updateFormData({ minSalary: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600"
            />
            <span className="text-xs font-semibold text-slate-400">to</span>
            <input
              type="text"
              placeholder="Maximum Salary"
              value={formData.maxSalary}
              onChange={(e) => updateFormData({ maxSalary: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Salary Type *</label>
          <select
            value={formData.salaryType}
            onChange={(e) => updateFormData({ salaryType: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600 text-slate-700"
          >
            <option value="Annual CTC">Annual CTC</option>
            <option value="Monthly Salary">Monthly Salary</option>
            <option value="Hourly Rate">Hourly Rate</option>
          </select>
        </div>
      </div>

      {/* Benefits Selection Chips */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">Benefits & Perks</label>
        <div className="flex flex-wrap gap-3">
          {defaultBenefits.map((benefit) => {
            const isSelected = formData.benefits.includes(benefit);
            return (
              <button
                key={benefit}
                type="button"
                onClick={() => toggleBenefit(benefit)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{isSelected ? '✓' : '○'}</span> {benefit}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Custom Benefit Input */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Custom Benefit (Optional)</label>
        <input
          type="text"
          placeholder="Add a custom benefit and press Enter"
          value={customBenefitInput}
          onChange={(e) => setCustomBenefitInput(e.target.value)}
          onKeyDown={handleAddCustomBenefit}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600"
        />
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