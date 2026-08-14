import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Globe, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
          <p className="text-xs text-slate-400">Manage your personal information and preferences</p>
        </div>
        <button 
          onClick={() => navigate('/candidate/edit-profile')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
        >
          <Edit3 size={14} /> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Profile Card */}
        <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-4">
          <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto flex items-center justify-center text-indigo-600 font-extrabold text-3xl">
            {user.name ? user.name.charAt(0) : 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-xs font-semibold text-indigo-600 mt-0.5">{user.headline || user.role}</p>
          </div>
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500 text-left">
            <p className="flex items-center gap-2"><MapPin size={14} /> {user.location}</p>
            <p className="flex items-center gap-2"><Mail size={14} /> {user.email}</p>
            <p className="flex items-center gap-2"><Phone size={14} /> {user.phone}</p>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-400">Full Name</p>
              <p className="font-bold text-slate-800 mt-1">{user.name}</p>
            </div>
            <div>
              <p className="text-slate-400">Email Address</p>
              <p className="font-bold text-slate-800 mt-1">{user.email}</p>
            </div>
            <div>
              <p className="text-slate-400">Phone Number</p>
              <p className="font-bold text-slate-800 mt-1">{user.phone}</p>
            </div>
            <div>
              <p className="text-slate-400">Date of Birth</p>
              <p className="font-bold text-slate-800 mt-1">{user.dob}</p>
            </div>
          </div>

          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3 pt-2">About Me</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{user.about}</p>
        </div>
      </div>
    </div>
  );
}