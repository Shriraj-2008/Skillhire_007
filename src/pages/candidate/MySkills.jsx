import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Plus, Trash2, Edit2, GripVertical, Code, 
  Lightbulb, Sparkles, TrendingUp 
} from 'lucide-react';

export default function MySkills() {
  const { user, addSkill, deleteSkill, updateUserProfile } = useAuth();

  // Local state for tabs and forms
  const [activeTab, setActiveTab] = useState('All');
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Technical');
  const [level, setLevel] = useState('Intermediate');
  const [score, setScore] = useState(75);

  const skillsList = user?.skills || [];

  // Categorized Skills Filtering
  const filteredSkills = skillsList.filter((skill) => {
    if (activeTab === 'Technical') return skill.category === 'Technical';
    if (activeTab === 'Soft Skills') return skill.category === 'Soft Skill' || skill.category === 'Soft Skills';
    return true;
  });

  // Calculate dynamic stats from user's skills
  const technicalCount = skillsList.filter(s => s.category === 'Technical').length;
  const softCount = skillsList.filter(s => s.category === 'Soft Skill' || s.category === 'Soft Skills').length;
  const avgProficiency = skillsList.length 
    ? Math.round(skillsList.reduce((acc, curr) => acc + (Number(curr.score) || 0), 0) / skillsList.length) 
    : 0;

  // Top 5 Skills sorted by score
  const topSkills = [...skillsList].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 5);

  // Suggested skills list
  const suggestedSkills = [
    { name: 'TypeScript', category: 'Technical', level: 'Advanced', score: 80 },
    { name: 'Next.js', category: 'Technical', level: 'Intermediate', score: 75 },
    { name: 'MongoDB', category: 'Technical', level: 'Intermediate', score: 70 },
    { name: 'AWS', category: 'Technical', level: 'Beginner', score: 60 },
  ];

  // Form submit handler
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    // Score Auto-assignment based on proficiency level if not set
    let skillScore = score;
    if (level === 'Beginner') skillScore = 50;
    if (level === 'Intermediate') skillScore = 70;
    if (level === 'Advanced') skillScore = 85;
    if (level === 'Expert') skillScore = 95;

    addSkill({
      name: skillName,
      category,
      level,
      score: skillScore
    });

    // Reset inputs
    setSkillName('');
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Skills</h1>
          <p className="text-xs text-slate-400">Add, manage and showcase your skills to increase your profile visibility to recruiters.</p>
        </div>
        <a href="#add-skill-form" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-sm">
          <Plus size={16} /> Add New Skill
        </a>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Main Skills List */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Tabs Filter */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex gap-6 text-xs font-semibold">
              <button 
                onClick={() => setActiveTab('All')}
                className={`pb-3 relative ${activeTab === 'All' ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold' : 'text-slate-500'}`}
              >
                All Skills ({skillsList.length})
              </button>
              <button 
                onClick={() => setActiveTab('Technical')}
                className={`pb-3 relative ${activeTab === 'Technical' ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold' : 'text-slate-500'}`}
              >
                Technical ({technicalCount})
              </button>
              <button 
                onClick={() => setActiveTab('Soft Skills')}
                className={`pb-3 relative ${activeTab === 'Soft Skills' ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold' : 'text-slate-500'}`}
              >
                Soft Skills ({softCount})
              </button>
            </div>
          </div>

          {/* Dynamic Skill Item Cards */}
          <div className="space-y-3">
            {filteredSkills.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
                <Code className="mx-auto text-slate-300" size={32} />
                <p className="text-sm font-semibold text-slate-600">No skills added yet</p>
                <p className="text-xs text-slate-400">Add your skills using the form below to show your expertise.</p>
              </div>
            ) : (
              filteredSkills.map((skill) => (
                <div key={skill.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm hover:border-indigo-100 transition">
                  <div className="flex items-center gap-4 w-2/5">
                    <GripVertical size={16} className="text-slate-300 cursor-grab" />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{skill.name}</h4>
                      <span className="text-[10px] text-slate-400 uppercase font-medium">{skill.category}</span>
                    </div>
                  </div>

                  {/* Level Badge */}
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    skill.level === 'Expert' ? 'bg-emerald-50 text-emerald-600' :
                    skill.level === 'Advanced' ? 'bg-indigo-50 text-indigo-600' :
                    skill.level === 'Intermediate' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {skill.level}
                  </span>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-3 w-1/3">
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${skill.score || 70}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-slate-700 w-8">{skill.score || 70}%</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => deleteSkill(skill.id)} className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add New Skill Form Box */}
          <div id="add-skill-form" className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Plus size={16} className="text-indigo-600" /> Add New Skill
            </h3>
            
            <form onSubmit={handleAddSkill} className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4 space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">Skill Name *</label>
                <input 
                  type="text" 
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="e.g. React.js, Communication" 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div className="col-span-12 md:col-span-4 space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">Category *</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                >
                  <option value="Technical">Technical</option>
                  <option value="Soft Skill">Soft Skill</option>
                </select>
              </div>

              <div className="col-span-12 md:col-span-4 space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">Proficiency Level *</label>
                <select 
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="col-span-12 flex justify-end">
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition">
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Overview Stats & Suggestions */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Skills Summary Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">Skills Summary</h3>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
              <span className="text-slate-500">Technical Skills</span>
              <span className="font-bold text-slate-800">{technicalCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
              <span className="text-slate-500">Soft Skills</span>
              <span className="font-bold text-slate-800">{softCount}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2 text-center">
              <div className="bg-slate-50 p-3 rounded-2xl">
                <p className="text-[10px] text-slate-400">Total Skills</p>
                <p className="text-base font-extrabold text-slate-800">{skillsList.length}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl">
                <p className="text-[10px] text-slate-400">Avg Proficiency</p>
                <p className="text-base font-extrabold text-indigo-600">{avgProficiency}%</p>
              </div>
            </div>
          </div>

          {/* Top Skills Ranking Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <TrendingUp size={16} className="text-indigo-600" /> Top Skills
            </h3>
            <div className="space-y-3">
              {topSkills.map((sk, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">{idx + 1}. {sk.name}</span>
                  <span className="font-bold text-indigo-600">{sk.score || 80}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Skills Widget */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <Sparkles size={16} className="text-amber-500" /> Suggested Skills
            </h3>
            <div className="space-y-3">
              {suggestedSkills.map((sug, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{sug.name}</p>
                    <p className="text-[10px] text-slate-400">{sug.category}</p>
                  </div>
                  <button 
                    onClick={() => addSkill(sug)} 
                    className="text-[11px] bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-600 hover:text-white px-3 py-1 rounded-lg font-bold transition flex items-center gap-1"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}