import React, { useState } from 'react';

export default function Step3Requirements({ formData, updateFormData, onNext, onBack }) {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        updateFormData({ skills: [...formData.skills, skillInput.trim()] });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    updateFormData({
      skills: formData.skills.filter((s) => s !== skillToRemove)
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
      <h2 className="text-lg font-bold text-slate-800">Requirements</h2>

      {/* Dynamic Skills Tag Input */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Skills *</label>
        <input
          type="text"
          placeholder="Add a skill and press Enter"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleAddSkill}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600 mb-3"
        />

        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-2"
            >
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:text-red-500 font-bold">
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="border border-slate-200 text-slate-600 font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-slate-50 transition"
        >
          &larr; Back
        </button>
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