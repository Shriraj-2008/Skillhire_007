import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { FolderGit2, Plus, Trash2, ExternalLink, FolderPlus } from 'lucide-react';

export default function Projects() {
  const context = useJobs() || {};
  const { 
    projects = [], 
    addProject = () => {}, 
    deleteProject = () => {} 
  } = context;

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Full Stack');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('React.js, Node.js');

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addProject({
      id: Date.now(),
      title,
      type,
      description,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      status: 'Completed',
      teamSize: 'Personal',
      date: 'Aug 2026'
    });

    setTitle('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50/50 min-h-screen text-slate-800">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FolderGit2 className="text-indigo-600" size={24} /> Projects
          </h1>
          <p className="text-xs text-slate-400">Showcase your practical experience and portfolio items.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition shadow-sm"
        >
          <Plus size={16} /> Add New Project
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Section: Projects Grid or Empty State */}
        <div className="col-span-12 lg:col-span-8">
          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <div key={project.id || idx} className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md transition">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
                        {project.type || 'General'}
                      </span>
                      <button 
                        onClick={() => deleteProject(project.id)} 
                        className="text-slate-300 hover:text-rose-600 p-1 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm">{project.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{project.description || 'No description provided.'}</p>
                    
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags && project.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                    <span>{project.date || 'Recent'} • {project.teamSize || 'Personal'}</span>
                    <button className="flex items-center gap-1 font-bold text-indigo-600 hover:underline">
                      View <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State: Jab candidate ke paas koi project na ho */
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <FolderPlus size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-800">No Projects Added Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Add your practical projects and portfolio work to show your experience to recruiters.
                </p>
              </div>
              <button 
                onClick={() => setShowModal(true)} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 transition"
              >
                <Plus size={16} /> Add Your First Project
              </button>
            </div>
          )}
        </div>

        {/* Right Section: Overview Widget */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm">Projects Overview</h3>
            <div className="flex justify-between text-xs text-slate-500 py-2 border-b border-slate-100">
              <span>Total Projects</span>
              <span className="font-bold text-slate-800">{projects.length}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 py-1">
              <span>Completed</span>
              <span className="font-bold text-emerald-600">{projects.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup for Add Project */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-3xl w-full max-w-md space-y-4 shadow-xl border border-slate-100">
            <h3 className="font-bold text-slate-800 text-base">Add New Project</h3>
            <form onSubmit={handleAddProject} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Project Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. E-Commerce Dashboard" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500" 
                  required 
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Type</label>
                <input 
                  type="text" 
                  placeholder="e.g., Full Stack, Machine Learning, UI/UX" 
                  value={type} 
                  onChange={(e) => setType(e.target.value)} 
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500" 
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Description</label>
                <textarea 
                  placeholder="Brief summary of what you built..." 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500" 
                  rows={3}
                ></textarea>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Technologies (comma separated)</label>
                <input 
                  type="text" 
                  placeholder="React.js, Node.js, Tailwind CSS" 
                  value={tags} 
                  onChange={(e) => setTags(e.target.value)} 
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500" 
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="text-xs px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="text-xs px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}