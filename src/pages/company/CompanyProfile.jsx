import React, { useState } from 'react';
import { 
  Building, Globe, Mail, Phone, Edit2, ExternalLink, ShieldCheck, 
  MapPin, Users, HeartHandshake, Award, Sparkles, Plus, CheckCircle2, X 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CompanyProfile() {
  const { user } = useAuth(); // Register/Auth context data
  const [activeTab, setActiveTab] = useState('about');
  
  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Dynamic state populated initially from user context
  const [profileData, setProfileData] = useState({
    companyName: user?.companyName || user?.name || 'Company Name',
    companyEmail: user?.email || user?.companyEmail || 'company@example.com',
    companyPhone: user?.phone || user?.companyPhone || '+91 9876543210',
    companyWebsite: user?.website || 'https://example.com',
    companyLocation: user?.address || user?.location || 
      (user?.city && user?.state ? `${user.city}, ${user.state}` : 'Mumbai, India'),
    industryType: user?.industry || 'Information Technology',
    tagline: user?.tagline || 'Building talent. Delivering success.',
    foundedYear: user?.foundedYear || '2020',
    companySize: user?.companySize || '50-200 Employees',
    companyType: user?.companyType || 'Private Limited',
    regNo: user?.regNo || 'REG123456789',
    gstNo: user?.gstNo || '27AAAAA0000A1Z5',
    about: user?.about || 'We are committed to connecting top talents with leading companies globally.',
    mission: user?.mission || 'To empower organizations with innovative HR and talent solutions.',
    vision: user?.vision || 'To become a trusted global partner for workforce management.',
    values: user?.values?.length > 0 ? user.values.join(', ') : 'Integrity, Excellence, Collaboration, Innovation',
    whyJoinUs: user?.whyJoinUs?.length > 0 ? user.whyJoinUs.join('\n') : "Opportunity to work with top global clients\nProfessional growth and career advancement\nCompetitive salary and employee benefits"
  });

  // Temporary Form State for editing inside modal
  const [formData, setFormData] = useState({ ...profileData });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open Edit Modal
  const handleOpenModal = () => {
    setFormData({ ...profileData });
    setIsEditModalOpen(true);
  };

  // Save Modal Form Changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData({ ...formData });
    setIsEditModalOpen(false);
  };

  // Dynamic Initials Generator
  const getInitials = (name) => {
    if (!name) return 'C';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Process Values Array
  const getValuesArray = () => {
    if (typeof profileData.values === 'string') {
      return profileData.values.split(',').map(v => v.trim()).filter(Boolean);
    }
    return Array.isArray(profileData.values) ? profileData.values : [];
  };

  // Process Why Join Us Array
  const getWhyJoinUsArray = () => {
    if (typeof profileData.whyJoinUs === 'string') {
      return profileData.whyJoinUs.split('\n').map(v => v.trim()).filter(Boolean);
    }
    return Array.isArray(profileData.whyJoinUs) ? profileData.whyJoinUs : [];
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
              {getInitials(profileData.companyName)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-slate-900">{profileData.companyName}</h2>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  <ShieldCheck size={12}/> {user?.isVerified ? 'Verified' : 'Verified'}
                </span>
              </div>
              <p className="text-xs text-slate-500">{profileData.tagline}</p>
              
              <div className="pt-2 space-y-1.5 text-xs text-slate-600 font-medium">
                <p className="flex items-center gap-2"><Building size={14} className="text-slate-400"/> {profileData.industryType}</p>
                <p className="flex items-center gap-2"><MapPin size={14} className="text-slate-400"/> {profileData.companyLocation}</p>
                <p className="flex items-center gap-2"><Globe size={14} className="text-slate-400"/> {profileData.companyWebsite}</p>
                <p className="flex items-center gap-2"><Mail size={14} className="text-slate-400"/> {profileData.companyEmail}</p>
                <p className="flex items-center gap-2"><Phone size={14} className="text-slate-400"/> {profileData.companyPhone}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button 
              onClick={handleOpenModal} 
              className="flex-1 bg-indigo-600 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-indigo-700 transition"
            >
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
            <button onClick={handleOpenModal} className="text-indigo-600 text-xs font-bold flex items-center gap-1 hover:underline"><Edit2 size={12}/> Edit</button>
          </div>

          <div className="grid grid-cols-2 gap-y-3 text-xs">
            <span className="text-slate-400 font-semibold">Founded</span>
            <span className="font-bold text-slate-800">{profileData.foundedYear}</span>

            <span className="text-slate-400 font-semibold">Company Size</span>
            <span className="font-bold text-slate-800">{profileData.companySize}</span>

            <span className="text-slate-400 font-semibold">Industry</span>
            <span className="font-bold text-slate-800">{profileData.industryType}</span>

            <span className="text-slate-400 font-semibold">Company Type</span>
            <span className="font-bold text-slate-800">{profileData.companyType}</span>

            <span className="text-slate-400 font-semibold">Registration No.</span>
            <span className="font-bold text-slate-800">{profileData.regNo}</span>

            <span className="text-slate-400 font-semibold">GST Number</span>
            <span className="font-bold text-slate-800">{profileData.gstNo}</span>

            <span className="text-slate-400 font-semibold">Headquarters</span>
            <span className="font-bold text-slate-800">{profileData.companyLocation}</span>
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
                    <p>{profileData.about}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Our Mission</h4>
                    <p>{profileData.mission}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Our Vision</h4>
                    <p>{profileData.vision}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3">Our Values</h4>
                    <div className="flex flex-wrap gap-2">
                      {getValuesArray().map((val, i) => (
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
                  <p><strong>Address:</strong> {profileData.companyLocation}</p>
                  <p><strong>Phone:</strong> {profileData.companyPhone}</p>
                  <p><strong>Email:</strong> {profileData.companyEmail}</p>
                  <p><strong>Website:</strong> {profileData.companyWebsite}</p>
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
              <button onClick={handleOpenModal} className="text-indigo-600 text-xs font-bold hover:underline">Edit</button>
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
              <button onClick={handleOpenModal} className="text-indigo-600 text-xs font-bold hover:underline">Edit</button>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              {getWhyJoinUsArray().map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0"/> {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6">
            
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-black text-slate-900">Edit Company Profile</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                className="text-slate-400 hover:text-slate-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Company Name</label>
                  <input 
                    type="text" 
                    name="companyName" 
                    value={formData.companyName} 
                    onChange={handleChange} 
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Tagline</label>
                  <input 
                    type="text" 
                    name="tagline" 
                    value={formData.tagline} 
                    onChange={handleChange} 
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Industry</label>
                  <input 
                    type="text" 
                    name="industryType" 
                    value={formData.industryType} 
                    onChange={handleChange} 
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Location / Address</label>
                  <input 
                    type="text" 
                    name="companyLocation" 
                    value={formData.companyLocation} 
                    onChange={handleChange} 
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Email</label>
                  <input 
                    type="email" 
                    name="companyEmail" 
                    value={formData.companyEmail} 
                    onChange={handleChange} 
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Phone</label>
                  <input 
                    type="text" 
                    name="companyPhone" 
                    value={formData.companyPhone} 
                    onChange={handleChange} 
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Website</label>
                  <input 
                    type="text" 
                    name="companyWebsite" 
                    value={formData.companyWebsite} 
                    onChange={handleChange} 
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Founded Year</label>
                  <input 
                    type="text" 
                    name="foundedYear" 
                    value={formData.foundedYear} 
                    onChange={handleChange} 
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Company Size</label>
                  <input 
                    type="text" 
                    name="companySize" 
                    value={formData.companySize} 
                    onChange={handleChange} 
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Company Type</label>
                  <input 
                    type="text" 
                    name="companyType" 
                    value={formData.companyType} 
                    onChange={handleChange} 
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">Registration No.</label>
                  <input 
                    type="text" 
                    name="regNo" 
                    value={formData.regNo} 
                    onChange={handleChange} 
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 mb-1 block">GST Number</label>
                  <input 
                    type="text" 
                    name="gstNo" 
                    value={formData.gstNo} 
                    onChange={handleChange} 
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">About Us</label>
                <textarea 
                  name="about" 
                  rows={2} 
                  value={formData.about} 
                  onChange={handleChange} 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">Our Mission</label>
                <textarea 
                  name="mission" 
                  rows={2} 
                  value={formData.mission} 
                  onChange={handleChange} 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">Our Vision</label>
                <textarea 
                  name="vision" 
                  rows={2} 
                  value={formData.vision} 
                  onChange={handleChange} 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">Our Values (Comma separated)</label>
                <input 
                  type="text" 
                  name="values" 
                  value={formData.values} 
                  onChange={handleChange} 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">Why Join Us? (One point per line)</label>
                <textarea 
                  name="whyJoinUs" 
                  rows={3} 
                  value={formData.whyJoinUs} 
                  onChange={handleChange} 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)} 
                  className="px-5 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition"
                >
                  Save Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}