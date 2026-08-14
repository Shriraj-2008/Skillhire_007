import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Building2, Bell, 
  Mail, Save, Sun, Moon, Check, Globe, MapPin, Phone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function CompanySettings() {
  const { user, updateUser } = useAuth() || {};

  // Simple Cleaned Settings State
  const [settings, setSettings] = useState({
    // Company Information
    companyName: '',
    industry: '',
    website: '',
    phone: '',
    email: '',
    location: '',

    // Notifications
    emailNotifications: true,
    jobAlerts: true,
    interviewUpdates: true,

    // Regional & UI
    theme: 'light',
    language: 'English',
  });

  const [activeTab, setActiveTab] = useState('company-profile');
  const [isSaved, setIsSaved] = useState(false);

  // Load saved settings
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('app_settings'));
    
    setSettings((prev) => ({
      ...prev,
      companyName: user?.companyName || user?.name || savedSettings?.companyName || '',
      industry: user?.industry || savedSettings?.industry || 'IT Services',
      website: user?.website || savedSettings?.website || '',
      phone: user?.phone || savedSettings?.phone || '',
      email: user?.email || savedSettings?.email || '',
      location: user?.location || savedSettings?.location || '',
      ...savedSettings,
    }));
  }, [user]);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSetting = (field) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('app_settings', JSON.stringify(settings));
    if (updateUser) {
      updateUser({ ...user, ...settings });
    }
    window.dispatchEvent(new Event('settingsUpdated'));
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Simplified Tabs Config
  const sidebarItems = [
    { id: 'company-profile', label: 'Company Profile', sub: 'Basic business details', icon: Building2 },
    { id: 'notifications', label: 'Notifications', sub: 'Alerts & updates preferences', icon: Bell },
    { id: 'preferences', label: 'App Preferences', sub: 'Theme and language', icon: SettingsIcon },
  ];

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 text-xs font-sans text-slate-800">
      
      {/* Top Header */}
      <div className="mb-6 space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <SettingsIcon className="text-indigo-600" size={22} /> Settings
        </h1>
        <p className="text-slate-400 text-[11px]">Manage your essential company and system settings</p>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="grid grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Clean Sidebar Tabs */}
        <div className="col-span-12 md:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-2 h-fit space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition text-left ${
                  isActive 
                    ? 'bg-indigo-50/70 border border-indigo-100 text-indigo-950 font-semibold' 
                    : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Icon size={18} className={`shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-bold ${isActive ? 'text-indigo-950' : 'text-slate-800'}`}>
                    {item.label}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{item.sub}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Tab Contents */}
        <div className="col-span-12 md:col-span-8 space-y-5">
          
          {/* TAB 1: Company Profile */}
          {activeTab === 'company-profile' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
              <h2 className="font-bold text-slate-900 text-xs border-b pb-3">Company Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Industry</label>
                  <input
                    type="text"
                    value={settings.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    placeholder="e.g. IT Services / Software"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Company Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="contact@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Website URL</label>
                  <input
                    type="text"
                    value={settings.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    placeholder="https://company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location / Address</label>
                  <input
                    type="text"
                    value={settings.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="City, Country"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Notifications */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
              <h2 className="font-bold text-slate-900 text-xs border-b pb-3">Notification Preferences</h2>

              <div className="space-y-3">
                {[
                  { id: 'emailNotifications', icon: Mail, label: 'Email Notifications', desc: 'Receive application updates on your registered email', color: 'bg-indigo-50 text-indigo-600' },
                  { id: 'jobAlerts', icon: Bell, label: 'New Job Applications', desc: 'Get notified immediately when a candidate applies', color: 'bg-emerald-50 text-emerald-600' },
                  { id: 'interviewUpdates', icon: SettingsIcon, label: 'Interview Reminders', desc: 'Get alerts for scheduled candidate interviews', color: 'bg-amber-50 text-amber-600' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isChecked = settings[item.id];
                  return (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${item.color}`}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{item.label}</p>
                          <p className="text-[10px] text-slate-400">{item.desc}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSetting(item.id)}
                        className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                          isChecked ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'
                        }`}
                      >
                        <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Preferences */}
          {activeTab === 'preferences' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
              <h2 className="font-bold text-slate-900 text-xs border-b pb-3">System Preferences</h2>

              {/* Theme Selector */}
              <div>
                <label className="block font-bold text-slate-900 text-[11px] mb-2">Interface Theme</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleChange('theme', 'light')}
                    className={`flex items-center justify-between p-3 rounded-xl border transition ${
                      settings.theme === 'light' ? 'border-indigo-600 bg-indigo-50/30 font-bold text-indigo-950' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-xs">
                      <Sun size={15} className="text-amber-500" /> Light Mode
                    </span>
                    {settings.theme === 'light' && <Check size={14} className="text-indigo-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChange('theme', 'dark')}
                    className={`flex items-center justify-between p-3 rounded-xl border transition ${
                      settings.theme === 'dark' ? 'border-indigo-600 bg-indigo-50/30 font-bold text-indigo-950' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-xs">
                      <Moon size={15} className="text-indigo-500" /> Dark Mode
                    </span>
                    {settings.theme === 'dark' && <Check size={14} className="text-indigo-600" />}
                  </button>
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block font-bold text-slate-900 text-[11px] mb-1">Language</label>
                <select 
                  value={settings.language} 
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex justify-end items-center pt-2">
            <button 
              type="submit" 
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl transition text-xs shadow-md shadow-indigo-200"
            >
              {isSaved ? <Check size={15} /> : <Save size={15} />} 
              {isSaved ? 'Saved Successfully!' : 'Save Settings'}
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}

export default CompanySettings;