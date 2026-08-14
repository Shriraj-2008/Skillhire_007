import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Building, PlusCircle, Briefcase, Search, User, 
  FileText, CheckSquare, Calendar, BarChart2, MessageSquare, Bell, Settings, LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CompanySidebar() {
  const { user, logout } = useAuth() || {};
  const navigate = useNavigate();

  const companyName = user?.companyName || user?.name || 'Company Name';
  const userRole = user?.role || user?.designation || 'HR Manager';

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'C';
  };
  
  const handleLogout = () => {
    // 1. Session and stored data complete clear karein
    localStorage.removeItem('app_settings');
    localStorage.removeItem('app_notifications');
    localStorage.removeItem('app_messages');
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // 2. Auth context ka logout call karein (agar available ho)
    if (logout) {
      logout();
    }

    // 3. Login page par navigate karein
    navigate('/login', { replace: true });
  };

  const mainNavs = [
    { name: 'Dashboard', path: '/company/dashboard', icon: LayoutDashboard },
    { name: 'Company Profile', path: '/company/profile', icon: Building },
    { name: 'Post a Job', path: '/company/post-job', icon: PlusCircle },
    { name: 'Manage Jobs', path: 'managejobs', icon: Briefcase },
    { name: 'Candidate Search', path: 'candidatesearchdashboard', icon: Search },
    { name: 'Candidate Details', path: 'candidatedetailspage', icon: User },
    { name: 'Applications', path: 'applications', icon: FileText },
    { name: 'Shortlisted', path: 'shortlisted', icon: CheckSquare },
    { name: 'Interviews', path: 'interviews', icon: Calendar },
    { name: 'Reports & Analytics', path: 'reportsanalytics', icon: BarChart2 },
  ];

  return (
    <aside className="w-64 bg-[#0a0f1d] text-slate-400 flex flex-col justify-between p-4 shrink-0 h-screen sticky top-0 overflow-y-auto">
      <div className="space-y-5">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-lg">
            S
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Skill<span className="text-indigo-500">Hire</span>
          </span>
        </div>

        {/* Dynamic Company Card */}
        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-4 text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl text-white flex items-center justify-center font-black text-xl mx-auto shadow-md shadow-indigo-600/30 uppercase">
            {getInitial(companyName)}
          </div>
          <div>
            <p className="text-xs font-bold text-white truncate max-w-[180px] mx-auto" title={companyName}>
              {companyName}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate max-w-[180px] mx-auto">
              {userRole}
            </p>
          </div>
        </div>

        {/* Main Nav Links */}
        <nav className="space-y-1 text-xs font-medium">
          {mainNavs.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/20' 
                      : 'hover:bg-slate-900/80 hover:text-slate-200'
                  }`
                }
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Nav Links */}
      <div className="space-y-1 border-t border-slate-800/80 pt-3 text-xs font-medium">
        <NavLink
          to="messages"
          className={({ isActive }) =>
            `flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
              isActive ? 'bg-indigo-600 text-white font-semibold' : 'hover:bg-slate-900/80 hover:text-slate-200'
            }`
          }
        >
          <span className="flex items-center gap-3"><MessageSquare size={16} /> Messages</span>
          <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
        </NavLink>

        <NavLink
          to="notifications"
          className={({ isActive }) =>
            `flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
              isActive ? 'bg-indigo-600 text-white font-semibold' : 'hover:bg-slate-900/80 hover:text-slate-200'
            }`
          }
        >
          <span className="flex items-center gap-3"><Bell size={16} /> Notifications</span>
          <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">6</span>
        </NavLink>

        <NavLink
          to="companysettings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              isActive ? 'bg-indigo-600 text-white font-semibold' : 'hover:bg-slate-900/80 hover:text-slate-200'
            }`
          }
        >
          <Settings size={16} />
          <span>Settings</span>
        </NavLink>

        <button 
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-slate-900/80 transition-all font-medium text-left cursor-pointer"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}