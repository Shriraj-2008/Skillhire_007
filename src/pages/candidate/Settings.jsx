import React, { useState, useEffect } from 'react';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext'; // Registered user data fetch karne ke liye
import { 
  User, Lock, Bell, Shield, Mail, Key, Globe, FileText, Trash2, 
  Edit3, Check, X, Save 
} from 'lucide-react';

export default function Settings() {
  const { userProfile, updateUserProfile } = useJobs() || {};
  const { user: authUser } = useAuth() || {}; // Auth Context se user details
  const [activeTab, setActiveTab] = useState('account');

  // Dynamic Form State - Initially empty to avoid fake data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    location: '',
    role: '',
    experience: ''
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Sync data strictly from Registered User Context or LocalStorage
  useEffect(() => {
    // 1. Registered LocalStorage data fetch karein
    const savedProfile = JSON.parse(localStorage.getItem('candidate_profile'));
    const registeredUser = JSON.parse(localStorage.getItem('user'));

    // 2. AuthContext, JobContext ya LocalStorage se priority ke mutabiq details set karein
    const currentUser = userProfile || savedProfile || authUser || registeredUser || {};

    setFormData({
      fullName: currentUser.fullName || currentUser.name || currentUser.username || '',
      email: currentUser.email || '',
      phone: currentUser.phone || currentUser.phoneNumber || '',
      dob: currentUser.dob || currentUser.dateOfBirth || '',
      gender: currentUser.gender || '',
      location: currentUser.location || currentUser.city || '',
      role: currentUser.role || currentUser.designation || '',
      experience: currentUser.experience || ''
    });
  }, [userProfile, authUser]);

  // Handle Edit Click
  const handleEdit = (key, value) => {
    setEditingField(key);
    setTempValue(value || '');
  };

  // Handle Cancel Edit
  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  // Save Field Dynamically
  const handleSaveField = (key) => {
    const updated = { ...formData, [key]: tempValue };
    setFormData(updated);
    
    // Save to Context & LocalStorage
    if (updateUserProfile) {
      updateUserProfile(updated);
    }
    
    // Merge and save to LocalStorage to retain original registration keys too
    const existing = JSON.parse(localStorage.getItem('candidate_profile')) || {};
    localStorage.setItem('candidate_profile', JSON.stringify({ ...existing, ...updated }));

    setEditingField(null);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const menuItems = [
    { id: 'account', label: 'Account Settings', icon: User },
    { id: 'privacy', label: 'Privacy Settings', icon: Lock },
    { id: 'notifications', label: 'Notification Settings', icon: Bell },
    { id: 'security', label: 'Password & Security', icon: Shield },
    { id: 'email', label: 'Email Preferences', icon: Mail },
    { id: '2fa', label: 'Two-Factor Authentication', icon: Key },
    { id: 'connected', label: 'Connected Accounts', icon: Globe },
    { id: 'resume', label: 'Resume & Profile', icon: FileText },
    { id: 'delete', label: 'Delete Account', icon: Trash2, danger: true }
  ];

  const profileFields = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'dob', label: 'Date of Birth' },
    { key: 'gender', label: 'Gender' },
    { key: 'location', label: 'Location' },
    { key: 'role', label: 'Current Role' },
    { key: 'experience', label: 'Experience' }
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6 bg-slate-50/50 min-h-screen text-slate-800">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <User className="text-indigo-600" size={24} /> Settings
        </h1>
        <p className="text-xs text-slate-400 font-medium">Dashboard &gt; Settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm h-fit">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : item.danger ? 'text-rose-600 hover:bg-rose-50' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic User Details Section */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-800">Account Settings</h2>
                <p className="text-xs text-slate-400">Manage your personal profile details.</p>
              </div>
              {isSaved && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center gap-1">
                  <Check size={14} /> Saved Successfully
                </span>
              )}
            </div>

            <div className="space-y-4 text-xs">
              {profileFields.map((item) => {
                const isEditing = editingField === item.key;
                const value = formData[item.key];

                return (
                  <div key={item.key} className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0">
                    <span className="font-medium text-slate-500 w-1/3">{item.label}</span>
                    
                    <div className="flex items-center justify-end gap-3 w-2/3">
                      {isEditing ? (
                        <div className="flex items-center gap-2 w-full justify-end">
                          <input
                            type={item.key === 'dob' ? 'date' : 'text'}
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            placeholder={`Enter ${item.label}`}
                            className="bg-slate-50 border border-indigo-300 rounded-lg px-3 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 max-w-[220px] w-full"
                            autoFocus
                          />
                          <button 
                            onClick={() => handleSaveField(item.key)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded-lg transition"
                            title="Save"
                          >
                            <Save size={13} />
                          </button>
                          <button 
                            onClick={handleCancel}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-1.5 rounded-lg transition"
                            title="Cancel"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="font-semibold text-slate-800">
                            {value ? value : <span className="text-slate-300 italic">Not Added</span>}
                          </span>
                          <button 
                            onClick={() => handleEdit(item.key, value)}
                            className="text-indigo-600 border border-indigo-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold hover:bg-indigo-50 flex items-center gap-1 transition"
                          >
                            <Edit3 size={12} /> Edit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}