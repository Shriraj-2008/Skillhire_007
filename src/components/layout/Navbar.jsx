import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1' : 'text-slate-600 hover:text-indigo-600'
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-200">
          S
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">SkillHire</span>
      </div>

      <nav className="flex items-center gap-8">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/features" className={linkClass}>Features</NavLink>
        <NavLink to="/how-it-works" className={linkClass}>How It Works</NavLink>
        <NavLink to="/companies" className={linkClass}>Companies</NavLink>
        <NavLink to="/about" className={linkClass}>About Us</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        <NavLink to="/faq" className={linkClass}>FAQ</NavLink>
      </nav>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/login')}
          className="px-5 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
        >
          Login
        </button>
        <button 
          onClick={() => navigate('/register')}
          className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 transition flex items-center gap-1.5"
        >
          Register
        </button>
      </div>
    </header>
  );
}