import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AuthHeader({ rightAction = 'login' }) {
  const navigate = useNavigate();

  return (
    <header className="px-10 py-5 flex items-center justify-between bg-transparent">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => navigate('/')}
      >
        <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-200">
          S
        </div>
        <span className="text-xl font-extrabold tracking-tight text-slate-900">SkillHire</span>
      </div>

      <div className="flex items-center gap-4 text-xs">
        {rightAction === 'login' ? (
          <>
            <span className="text-slate-500">Already have an account?</span>
            <button 
              onClick={() => navigate('/login')}
              className="px-4 py-1.5 font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <span className="text-slate-500">New to SkillHire?</span>
            <button 
              onClick={() => navigate('/register')}
              className="px-4 py-1.5 font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition"
            >
              Create Account
            </button>
          </>
        )}
        <span className="text-slate-300">|</span>
        <button 
          onClick={() => navigate('/')} 
          className="font-semibold text-indigo-600 hover:underline"
        >
          Explore as Guest
        </button>
      </div>
    </header>
  );
}