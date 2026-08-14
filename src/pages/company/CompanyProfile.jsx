import React, { useState } from 'react';
import { 
  Building, Globe, Mail, Phone, Edit2, ExternalLink, ShieldCheck, 
  MapPin, Users, HeartHandshake, Award, Sparkles, Plus, CheckCircle2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CompanyProfile() {
  const { user } = useAuth(); // Register/Auth context data
  const [activeTab, setActiveTab] = useState('about');

  // Dynamic values binding directly from Auth Context
  const companyName = user?.companyName || user?.name || 'Company Name';
  const companyEmail = user?.email || user?.companyEmail || 'N/A';
  const companyPhone = user?.phone || user?.companyPhone || 'N/A';
  const companyWebsite = user?.website || 'N/A';
  
  // Dynamic Address / Location based on registration
  const companyLocation = user?.address || user?.location || 
    (user?.city && user?.state ? `${user.city}, ${user.state}` : user?.city || user?.state || 'Address Not Set');
    
  const industryType = user?.industry || 'Industry Not Specified';
  const tagline = user?.tagline || 'Building talent. Delivering success.';

  // Dynamic Initials Generator
  const getInitials = (name) => {
    if (!name) return 'C';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 space-y-6">
      {/* Top Header Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Company Profile</h1>
          <p className="text-xs text-slate-400">Dashboard &gt; Company Profile</p>
        </div>
        <button className="flex items-center gap-1.5 border border-indigo-200 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 px-4 py-2 rounded-xl text-xs font-bold transition">
          Preview Company Profile <ExternalLink size={14} />
        </button>
      </div>

      {/* Hero Banner & Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Profile Info Card */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-start gap-5">
            <div className="w-24 h-24 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-200 shrink-0 uppercase">
              {getInitials(companyName)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-slate-900">{companyName}</h2>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  <ShieldCheck size={12}/> {user?.isVerified ? 'Verified' : 'Unverified'}
                </span>
              </div>
              <p className="text-xs text-slate-500">{tagline}</p>
              
              <div className="pt-2 space-y-1.5 text-xs text-slate-600 font-medium">
                <p className="flex items-center gap-2"><Building size={14} className="text-slate-400"/> {industryType}</p>
                <p className="flex items-center gap-2"><MapPin size={14} className="text-slate-400"/> {companyLocation}</p>
                <p className="flex items-center gap-2"><Globe size={14} className="text-slate-400"/> {companyWebsite}</p>
                <p className="flex items-center gap-2"><Mail size={14} className="text-slate-400"/> {companyEmail}</p>
                <p className="flex items-center gap-2"><Phone size={14} className="text-slate-400"/> {companyPhone}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button className="flex-1 bg-indigo-600 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-indigo-700 transition">
              Edit Profile
            </button>
            <button className="flex-1 border border-indigo-200 text-indigo-600 font-bold py-2.5 rounded-xl text-xs hover:bg-indigo-50 transition flex items-center justify-center gap-1">
              View Public Profile <ExternalLink size={14}/>
            </button>
          </div>
        </div>

        {/* Right Details Key-Value Table Card */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-sm font-bold text-slate-900">Company Summary</h3>
            <button className="text-indigo-600 text-xs font-bold flex items-center gap-1 hover:underline"><Edit2 size={12}/> Edit</button>
          </div>

          <div className="grid grid-cols-2 gap-y-3 text-xs">
            <span className="text-slate-400 font-semibold">Founded</span>
            <span className="font-bold text-slate-800">{user?.foundedYear || 'N/A'}</span>

            <span className="text-slate-400 font-semibold">Company Size</span>
            <span className="font-bold text-slate-800">{user?.companySize || 'N/A'}</span>

            <span className="text-slate-400 font-semibold">Industry</span>
            <span className="font-bold text-slate-800">{industryType}</span>

            <span className="text-slate-400 font-semibold">Company Type</span>
            <span className="font-bold text-slate-800">{user?.companyType || 'N/A'}</span>

            <span className="text-slate-400 font-semibold">Registration No.</span>
            <span className="font-bold text-slate-800">{user?.regNo || 'N/A'}</span>

            <span className="text-slate-400 font-semibold">GST Number</span>
            <span className="font-bold text-slate-800">{user?.gstNo || 'N/A'}</span>

            <span className="text-slate-400 font-semibold">Headquarters</span>
            <span className="font-bold text-slate-800">{companyLocation}</span>
          </div>
        </div>

      </div>

      {/* Tabs & Dynamic Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side Tab Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex border-b text-xs font-bold gap-6">
              <button onClick={() => setActiveTab('about')} className={`pb-3 ${activeTab === 'about' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-400 hover:text-slate-700'}`}>About Company</button>
              <button onClick={() => setActiveTab('details')} className={`pb-3 ${activeTab === 'details' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-400 hover:text-slate-700'}`}>Company Details</button>
              <button onClick={() => setActiveTab('social')} className={`pb-3 ${activeTab === 'social' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-400 hover:text-slate-700'}`}>Social Links</button>
              <button onClick={() => setActiveTab('team')} className={`pb-3 ${activeTab === 'team' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-400 hover:text-slate-700'}`}>Team</button>
              <button onClick={() => setActiveTab('docs')} className={`pb-3 ${activeTab === 'docs' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-400 hover:text-slate-700'}`}>Documents</button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-600">
              {activeTab === 'about' && (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">About Us</h4>
                    <p>{user?.about || `${companyName} is committed to connecting top talents with leading companies.`}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Our Mission</h4>
                    <p>{user?.mission || 'To empower organizations with innovative HR and talent solutions.'}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Our Vision</h4>
                    <p>{user?.vision || 'To become a trusted global partner for workforce management.'}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3">Our Values</h4>
                    <div className="flex flex-wrap gap-2">
                      {(user?.values && user.values.length > 0 
                        ? user.values 
                        : ['Integrity', 'Excellence', 'Collaboration', 'Innovation']
                      ).map((val, i) => (
                        <span key={i} className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700 font-semibold">
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'details' && (
                <div className="space-y-2">
                  <p><strong>Address:</strong> {companyLocation}</p>
                  <p><strong>Phone:</strong> {companyPhone}</p>
                  <p><strong>Email:</strong> {companyEmail}</p>
                  <p><strong>Website:</strong> {companyWebsite}</p>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-2">
                  <p><strong>LinkedIn:</strong> {user?.linkedin || 'Not Provided'}</p>
                  <p><strong>Twitter/X:</strong> {user?.twitter || 'Not Provided'}</p>
                </div>
              )}

              {activeTab === 'team' && (
                <p className="text-slate-400">Team members dynamic list will render here.</p>
              )}

              {activeTab === 'docs' && (
                <p className="text-slate-400">Uploaded company documents will render here.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Culture & Reasons */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Culture */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Company Culture</h3>
              <button className="text-indigo-600 text-xs font-bold hover:underline">Edit</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-indigo-50/50 rounded-2xl text-center space-y-1">
                <HeartHandshake className="mx-auto text-indigo-600" size={20} />
                <p className="font-bold text-slate-800">Work-life Balance</p>
              </div>
              <div className="p-3 bg-purple-50/50 rounded-2xl text-center space-y-1">
                <Sparkles className="mx-auto text-purple-600" size={20} />
                <p className="font-bold text-slate-800">Learning & Growth</p>
              </div>
            </div>
          </div>

          {/* Why Join Us */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Why Join Us?</h3>
              <button className="text-indigo-600 text-xs font-bold hover:underline">Edit</button>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              {(user?.whyJoinUs && user.whyJoinUs.length > 0 ? user.whyJoinUs : [
                'Opportunity to work with top global clients',
                'Professional growth and career advancement',
                'Competitive salary and employee benefits'
              ]).map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0"/> {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}