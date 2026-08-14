import React from 'react';
import { Search, Bell, ChevronDown, Menu, Maximize2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Dynamic auth context import

export default function CompanyNavbar() {
  const { user } = useAuth(); // Logged-in company profile fetch ki gayi hai

  // Dynamic values with fallbacks
  const companyName = user?.companyName || user?.name || 'Company Admin';
  const userRole = user?.role || user?.designation || 'HR Manager';

  // Helper function to extract initials dynamically
  const getInitials = (name) => {
    if (!name) return 'CA';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-slate-200/80 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button className="text-slate-500 hover:text-slate-700 lg:hidden">
          <Menu size={20} />
        </button>
        <div className="relative w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates, skills, jobs..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-600 transition-all placeholder:text-slate-400 text-slate-700"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border-2 border-white">
            6
          </span>
        </button>

        {/* Fullscreen Toggle */}
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all hidden sm:block">
          <Maximize2 size={16} />
        </button>

        <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>

        {/* Dynamic User Profile Dropdown */}
        <div className="flex items-center gap-2.5 cursor-pointer p-1 hover:bg-slate-50 rounded-xl transition-all">
          <div className="w-8 h-8 bg-indigo-600 text-white font-black text-xs rounded-full flex items-center justify-center uppercase">
            {getInitials(companyName)}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-none truncate max-w-[140px]" title={companyName}>
              {companyName}
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5 truncate max-w-[140px]">
              {userRole}
            </p>
          </div>
          <ChevronDown size={14} className="text-slate-400 ml-1" />
        </div>
      </div>
    </header>
  );
}