import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Check, X, Upload, Save, ArrowLeft } from 'lucide-react';

export default function EditProfile() {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  // Local state initialized with current logged-in user data
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    headline: user.headline || '',
    phone: user.phone || '',
    location: user.location || '',
    gender: user.gender || 'Male',
    dob: user.dob || '',
    languages: Array.isArray(user.languages) ? user.languages.join(', ') : '',
    role: user.role || '',
    experienceLevel: user.experienceLevel || 'Mid Level',
    totalExperience: user.totalExperience || '2 Years',
    company: user.company || '',
    noticePeriod: user.noticePeriod || '30 Days',
    availability: user.availability || 'Full Time',
    about: user.about || '',
    qualification: user.qualification || '',
    university: user.university || '',
    passYear: user.passYear || '',
    cgpa: user.cgpa || ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format languages string back into array
    const langArray = formData.languages
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    // Save updated data to Context + LocalStorage
    updateUserProfile({
      ...formData,
      languages: langArray
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      navigate('/candidate/my-profile');
    }, 1000);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-6">
      {/* Top Action Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/candidate/my-profile')}
            className="p-2 bg-white rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
            <p className="text-xs text-slate-400">Dashboard &gt; My Profile &gt; Edit Profile</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            type="button" 
            onClick={() => navigate('/candidate/my-profile')}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-sm"
          >
            <Save size={14} /> Save Changes
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-4 py-3 rounded-xl flex items-center gap-2 font-medium">
          <Check size={16} /> Profile updated successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
        {/* Main Personal & Professional Form Inputs */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Section 1: Personal Information */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
              <User size={16} className="text-indigo-600" /> Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Headline *</label>
                <input 
                  type="text" 
                  value={formData.headline}
                  placeholder="e.g. Frontend Developer | React Specialist"
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number *</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Date of Birth</label>
                <input 
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Gender</label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Location *</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Languages (Comma separated)</label>
                <input 
                  type="text" 
                  value={formData.languages}
                  placeholder="English, Hindi, Marathi"
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Professional Information */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">Professional Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Current Role *</label>
                <input 
                  type="text" 
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Experience Level *</label>
                <select 
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="Fresher">Fresher</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Total Experience *</label>
                <input 
                  type="text" 
                  placeholder="e.g. 2 Years"
                  value={formData.totalExperience}
                  onChange={(e) => setFormData({ ...formData, totalExperience: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">About Me</label>
              <textarea 
                rows="4" 
                value={formData.about}
                placeholder="Write a short summary about your skills, passion, and experience..."
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>
            </div>
          </div>

          {/* Section 3: Education Information */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">Education Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Highest Qualification *</label>
                <input 
                  type="text" 
                  placeholder="e.g. B.Tech Computer Science"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">University / College *</label>
                <input 
                  type="text" 
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Passing Year</label>
                <input 
                  type="text" 
                  placeholder="2024"
                  value={formData.passYear}
                  onChange={(e) => setFormData({ ...formData, passYear: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Percentage / CGPA</label>
                <input 
                  type="text" 
                  placeholder="8.5 CGPA"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Live Profile Preview Card */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">Profile Summary Preview</h3>
            
            <div className="space-y-3 text-xs text-slate-600">
              <p><span className="font-semibold text-slate-900 block">Name:</span> {formData.name || 'Not filled'}</p>
              <p><span className="font-semibold text-slate-900 block">Headline:</span> {formData.headline || 'Not filled'}</p>
              <p><span className="font-semibold text-slate-900 block">Location:</span> {formData.location || 'Not filled'}</p>
              <p><span className="font-semibold text-slate-900 block">Email:</span> {formData.email || 'Not filled'}</p>
              <p><span className="font-semibold text-slate-900 block">Role:</span> {formData.role || 'Not filled'}</p>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-indigo-100 mt-2"
            >
              Save Profile Details
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}