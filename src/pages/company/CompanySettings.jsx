import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Building2, User, Users, Briefcase, Bell, 
  Mail, Link2, ShieldCheck, CreditCard, ShieldAlert, Camera, Edit3, 
  RotateCcw, Save, Sun, Moon, Trash2, Check 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function CompanySettings() {
  const { user, updateUser } = useAuth() || {};

  // Dynamic Settings State Management
  const [settings, setSettings] = useState({
    // Company Profile
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    foundedYear: '',
    phone: '',
    email: '',
    location: '',
    logoUrl: '',

    // Account Settings
    fullName: '',
    accountEmail: '',
    accountPhone: '',
    twoFactor: true,
    sessionTimeout: '30 minutes',

    // Notification Preferences
    emailNotifications: true,
    inAppNotifications: true,
    jobAlerts: true,
    interviewUpdates: true,
    weeklySummary: false,

    // Regional & UI Settings
    theme: 'light',
    language: 'English',
    timezone: '(GMT+05:30) Asia/Kolkata',
    dateFormat: 'DD MMM YYYY (20 May 2026)',
  });

  const [activeTab, setActiveTab] = useState('company-profile');
  const [isSaved, setIsSaved] = useState(false);

  // Load dynamic data from Auth Context or LocalStorage
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('app_settings'));
    
    setSettings((prev) => ({
      ...prev,
      companyName: user?.companyName || user?.name || savedSettings?.companyName || '',
      industry: user?.industry || savedSettings?.industry || '',
      companySize: user?.companySize || savedSettings?.companySize || '',
      website: user?.website || savedSettings?.website || '',
      foundedYear: user?.foundedYear || savedSettings?.foundedYear || '',
      phone: user?.phone || savedSettings?.phone || '',
      email: user?.email || savedSettings?.email || '',
      location: user?.location || savedSettings?.location || '',
      fullName: user?.fullName || user?.name || savedSettings?.fullName || '',
      accountEmail: user?.email || savedSettings?.accountEmail || '',
      accountPhone: user?.phone || savedSettings?.accountPhone || '',
      ...savedSettings,
    }));
  }, [user]);

  // Handle Input Dynamic Changes
  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  // Toggle Switch Handler
  const toggleSetting = (field) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Save Settings Handler
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('app_settings', JSON.stringify(settings));
    if (updateUser) {
      updateUser({ ...user, ...settings });
    }
    window.dispatchEvent(new Event('settingsUpdated'));
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Reset to Defaults
  const handleReset = () => {
    localStorage.removeItem('app_settings');
    window.location.reload();
  };

  // Sidebar Menu Config
  const sidebarItems = [
    { id: 'company-profile', label: 'Company Profile', sub: 'Manage your company information', icon: Building2 },
    { id: 'account-settings', label: 'Account Settings', sub: 'Manage your personal information', icon: User },
    { id: 'user-management', label: 'User Management', sub: 'Manage team members and roles', icon: Users },
    { id: 'job-preferences', label: 'Job Preferences', sub: 'Set default job and application preferences', icon: Briefcase },
    { id: 'notification-settings', label: 'Notification Settings', sub: 'Manage email and in-app notifications', icon: Bell },
    { id: 'email-templates', label: 'Email Templates', sub: 'Customize email templates', icon: Mail },
    { id: 'integrations', label: 'Integrations', sub: 'Manage third-party integrations', icon: Link2 },
    { id: 'security', label: 'Security', sub: 'Manage password and security', icon: ShieldCheck },
    { id: 'billing', label: 'Billing & Subscription', sub: 'Manage subscription and billing', icon: CreditCard },
    { id: 'data-privacy', label: 'Data & Privacy', sub: 'Manage data and privacy settings', icon: ShieldAlert },
  ];

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 text-xs font-sans text-slate-800">
      
      {/* Top Header */}
      <div className="mb-6 space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <SettingsIcon className="text-indigo-600" size={22} /> Settings
        </h1>
        <p className="text-slate-400 text-[11px]">Manage your account, preferences and system settings</p>
      </div>

      {/* Main Settings Grid */}
      <form onSubmit={handleSave} className="grid grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Navigation Tabs */}
        <div className="col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-2 h-fit space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl transition text-left ${
                  isActive 
                    ? 'bg-indigo-50/70 border border-indigo-100 text-indigo-950 font-semibold' 
                    : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Icon size={16} className={`mt-0.5 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
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

        {/* MIDDLE COLUMN: Core Settings Sections */}
        <div className="col-span-5 space-y-5">
          
          {/* SECTION 1: Company Profile */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="font-bold text-slate-900 text-xs">Company Profile</h2>
              <button type="button" className="flex items-center gap-1.5 border border-indigo-200 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 px-3 py-1 rounded-xl font-bold text-[11px] transition">
                <Edit3 size={12} /> Edit Profile
              </button>
            </div>

            <div className="flex items-start gap-4 pt-1">
              {/* Logo / Avatar Frame */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl text-white font-black text-2xl flex items-center justify-center uppercase shadow-md shadow-indigo-200">
                  {settings.companyName ? settings.companyName.charAt(0) : 'C'}
                </div>
                <button type="button" className="absolute -bottom-1 -right-1 p-1 bg-slate-900 text-white rounded-lg border-2 border-white shadow hover:bg-slate-800">
                  <Camera size={10} />
                </button>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 flex-1 text-[11px]">
                <div>
                  <p className="text-slate-400 font-medium">Company Name</p>
                  <p className="font-bold text-slate-900 mt-0.5">{settings.companyName || 'Not Provided'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Founded Year</p>
                  <p className="font-bold text-slate-900 mt-0.5">{settings.foundedYear || '2020'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Industry</p>
                  <p className="font-bold text-slate-900 mt-0.5">{settings.industry || 'IT Services'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Phone</p>
                  <p className="font-bold text-slate-900 mt-0.5">{settings.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Company Size</p>
                  <p className="font-bold text-slate-900 mt-0.5">{settings.companySize || '51 - 200 employees'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Email</p>
                  <p className="font-bold text-slate-900 mt-0.5 truncate">{settings.email || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400 font-medium">Website</p>
                  <p className="font-bold text-indigo-600 mt-0.5">{settings.website || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400 font-medium">Location</p>
                  <p className="font-bold text-slate-900 mt-0.5">{settings.location || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Account Settings */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-900 text-xs border-b pb-3">Account Settings</h2>

            <div className="grid grid-cols-2 gap-4 text-[11px]">
              <div>
                <p className="text-slate-400 font-medium">Full Name</p>
                <p className="font-bold text-slate-900 mt-0.5">{settings.fullName || 'HR Manager'}</p>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <p className="text-slate-400 font-medium">Password</p>
                  <button type="button" className="border border-slate-200 text-slate-700 hover:bg-slate-50 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                    Change Password
                  </button>
                </div>
                <p className="font-bold text-slate-900 mt-0.5">************</p>
              </div>

              <div>
                <p className="text-slate-400 font-medium">Email Address</p>
                <p className="font-bold text-slate-900 mt-0.5 truncate">{settings.accountEmail || 'hr@company.com'}</p>
              </div>

              <div>
                <p className="text-slate-400 font-medium">Two-Factor Authentication</p>
                <span className="inline-block mt-1 bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold px-2 py-0.5 rounded-md text-[10px]">
                  Enabled
                </span>
              </div>

              <div>
                <p className="text-slate-400 font-medium">Phone Number</p>
                <p className="font-bold text-slate-900 mt-0.5">{settings.accountPhone || 'N/A'}</p>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <p className="text-slate-400 font-medium">Session Timeout</p>
                  <button type="button" className="border border-slate-200 text-slate-700 hover:bg-slate-50 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                    Edit
                  </button>
                </div>
                <p className="font-bold text-slate-900 mt-0.5">{settings.sessionTimeout}</p>
              </div>
            </div>
          </div>

          {/* SECTION 3: Notification Preferences Toggles */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-900 text-xs border-b pb-3">Notification Preferences</h2>

            <div className="space-y-3">
              {[
                { id: 'emailNotifications', icon: Mail, label: 'Email Notifications', desc: 'Receive notifications via email', color: 'bg-indigo-50 text-indigo-600' },
                { id: 'inAppNotifications', icon: Bell, label: 'In-App Notifications', desc: 'Receive notifications in the application', color: 'bg-emerald-50 text-emerald-600' },
                { id: 'jobAlerts', icon: Briefcase, label: 'Job Alerts', desc: 'Get notified when new applications are received', color: 'bg-amber-50 text-amber-600' },
                { id: 'interviewUpdates', icon: Users, label: 'Interview Updates', desc: 'Get notified about interview schedules and updates', color: 'bg-blue-50 text-blue-600' },
                { id: 'weeklySummary', icon: Building2, label: 'Weekly Summary', desc: 'Receive weekly performance summary', color: 'bg-rose-50 text-rose-600' },
              ].map((item) => {
                const Icon = item.icon;
                const isChecked = settings[item.id];
                return (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${item.color}`}>
                        <Icon size={14} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-[11px]">{item.label}</p>
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

        </div>

        {/* RIGHT COLUMN: Regional & Theme Settings */}
        <div className="col-span-3 space-y-5">
          
          {/* Theme Settings */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-xs">Theme Settings</h3>
            <p className="text-[10px] text-slate-400">Customize the appearance of your dashboard</p>

            <div className="space-y-2 border rounded-xl p-3 bg-slate-50/50">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2 font-semibold text-slate-700 text-[11px]">
                  <Sun size={14} className="text-amber-500" /> Light Mode
                </span>
                <input 
                  type="radio" 
                  name="theme" 
                  checked={settings.theme === 'light'} 
                  onChange={() => handleChange('theme', 'light')}
                  className="accent-indigo-600"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2 font-semibold text-slate-700 text-[11px]">
                  <Moon size={14} className="text-indigo-400" /> Dark Mode
                </span>
                <input 
                  type="radio" 
                  name="theme" 
                  checked={settings.theme === 'dark'} 
                  onChange={() => handleChange('theme', 'dark')}
                  className="accent-indigo-600"
                />
              </label>
            </div>
          </div>

          {/* Regional Settings */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <div>
              <label className="block font-bold text-slate-900 text-[11px] mb-1">Language</label>
              <p className="text-[10px] text-slate-400 mb-2">Choose your preferred language</p>
              <select 
                value={settings.language} 
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-900 text-[11px] mb-1">Timezone</label>
              <p className="text-[10px] text-slate-400 mb-2">Select your timezone</p>
              <select 
                value={settings.timezone} 
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="(GMT+05:30) Asia/Kolkata">(GMT+05:30) Asia/Kolkata</option>
                <option value="(GMT-05:00) EST">(GMT-05:00) EST</option>
                <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-900 text-[11px] mb-1">Date Format</label>
              <p className="text-[10px] text-slate-400 mb-2">Select your preferred date format</p>
              <select 
                value={settings.dateFormat} 
                onChange={(e) => handleChange('dateFormat', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="DD MMM YYYY (20 May 2026)">DD MMM YYYY (20 May 2026)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-rose-600 text-xs">Danger Zone</h3>
            <p className="text-[10px] text-slate-400">Permanently delete your account and all associated data.</p>
            <button 
              type="button" 
              className="w-full flex items-center justify-center gap-2 border border-rose-200 text-rose-600 bg-rose-50/50 hover:bg-rose-100/60 font-bold py-2 rounded-xl transition text-[11px]"
            >
              <Trash2 size={13} /> Delete Account
            </button>
          </div>

        </div>

        {/* BOTTOM FIXED BAR FOR ACTIONS */}
        <div className="col-span-12 flex justify-between items-center pt-2 border-t border-slate-200">
          <button 
            type="button" 
            onClick={handleReset}
            className="flex items-center gap-1.5 border border-slate-200 text-slate-700 hover:bg-slate-100 bg-white px-4 py-2 rounded-xl font-bold transition text-xs shadow-xs"
          >
            <RotateCcw size={14} /> Reset to Default
          </button>

          <button 
            type="submit" 
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-xl transition text-xs shadow-md shadow-indigo-200"
          >
            {isSaved ? <Check size={14} /> : <Save size={14} />} 
            {isSaved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

      </form>
    </div>
  );
}

// Default export included to prevent React default import syntax errors
export default CompanySettings;