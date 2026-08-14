import React from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, User, Edit3, Award, FileCheck, ShieldCheck, 
  FolderGit2, Search, Briefcase, Bookmark, Bell, Mail, Eye, 
  Calendar, Settings, LogOut, Sun 
} from 'lucide-react';

export default function CandidateLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth(); // AuthContext se dynamic user profile & logout

  const navItems = [
    { label: 'Dashboard', path: '/candidate/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/candidate/profile', icon: User },
    { label: 'Edit Profile', path: '/candidate/edit-profile', icon: Edit3 },
    { label: 'My Skills', path: '/candidate/skills', icon: Award },
    { label: 'Skill Test', path: '/candidate/tests', icon: FileCheck },
    { label: 'Skill Test Result', path: '/candidate/test-result', icon: ShieldCheck },
    { label: 'Certificates', path: '/candidate/certificates', icon: Award },
    { label: 'Projects', path: '/candidate/projects', icon: FolderGit2 },
    { type: 'divider' },
    { label: 'Browse Jobs', path: '/candidate/browsejobs', icon: Search },
    { label: 'Applied Jobs', path: '/candidate/appliedjobs', icon: Briefcase },
    { label: 'Saved Jobs', path: '/candidate/saved-jobs', icon: Bookmark },
    { type: 'divider' },
    { label: 'Notifications', path: '/candidate/notifications', icon: Bell, badge: 3 },
    { label: 'Messages', path: '/candidate/messages', icon: Mail, badge: 2 },
    { label: 'Resume Preview', path: '/candidate/resumepreview', icon: Eye },
    { label: 'Interview Schedule', path: '/candidate/interviewshedule', icon: Calendar },
    { type: 'divider' },
    { label: 'Settings', path: '/candidate/settings', icon: Settings },
  ];

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  return (
    <div className="h-screen bg-slate-50 flex font-sans overflow-hidden">
      {/* Sidebar (Fixed Left) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-full">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className="p-5 border-b border-slate-100 flex items-center gap-2 cursor-pointer shrink-0" onClick={() => navigate('/candidate/dashboard')}>
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-indigo-100">
              S
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">SkillHire</span>
          </div>

          {/* Navigation Menu (Scrollable) */}
          <nav className="p-4 space-y-1 text-xs font-medium text-slate-600 overflow-y-auto flex-1">
            {navItems.map((item, idx) => {
              if (item.type === 'divider') return <div key={idx} className="my-3 border-t border-slate-100" />;
              
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
                    isActive 
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-100' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                      isActive ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-100 shrink-0">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 sticky top-0 z-10">
          <div className="relative w-96">
            <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for jobs, skills, companies..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition">
              <Sun size={18} />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl relative transition">
              <Bell size={18} />
              <span className="w-4 h-4 bg-indigo-600 text-white text-[10px] rounded-full absolute top-1 right-1 flex items-center justify-center font-bold">3</span>
            </button>
            <div className="h-8 border-r border-slate-200"></div>
            
            {/* Dynamic User Profile Badge */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/candidate/profile')}>
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                alt={user?.name || "User"} 
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div className="text-left text-xs">
                <p className="font-bold text-slate-800 leading-none">{user?.name || 'Raza Khan'}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{user?.role || 'Candidate'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Render (Renders either Outlet or Children) */}
        <main className="flex-1 overflow-y-auto">
          {children ? children : <Outlet />}
        </main>
      </div>
    </div>
  );
}