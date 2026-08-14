import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Briefcase, Target, Building, BarChart2, Bell, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // 1. AuthContext import add kiya

export default function Features() {
  const navigate = useNavigate();
  const { user } = useAuth(); // 2. Auth context se user details li

  // 3. Dynamic values (fallback to 0)
  const testsCompleted = user?.completedTests?.length || 0;
  const skillsVerified = user?.verifiedSkills?.length || 0;
  const applicationsCount = user?.applications?.length || 0;
  const profileStrength = user?.profileStrength || 0;

  // Recent Assessment Data (if available)
  const latestAssessment = user?.latestAssessment || null;

  return (
    <div className="max-w-7xl mx-auto py-12 px-8 space-y-16">
      {/* Hero Header */}
      <section className="grid grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles size={14} /> Powerful Features
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Powerful Features to Verify Skills and <span className="text-indigo-600">Build Careers</span>
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            SkillHire is packed with smart tools and innovative features designed for students, professionals, and companies. Everything you need to find, verify, and hire the right talent.
          </p>
        </div>

        {/* Dynamic Dashboard Overview Graphic Box */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <h4 className="text-xs font-bold text-slate-700">Dashboard Overview</h4>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400">Tests Completed</p>
              <p className="font-bold text-slate-800 text-sm">{testsCompleted}</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400">Skills Verified</p>
              <p className="font-bold text-slate-800 text-sm">{skillsVerified}</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400">Applications</p>
              <p className="font-bold text-slate-800 text-sm">{applicationsCount}</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400">Strength</p>
              <p className="font-bold text-indigo-600 text-sm">{profileStrength}%</p>
            </div>
          </div>

          {/* Dynamic Recent Assessment Status */}
          <div className="bg-indigo-50 p-3 rounded-xl flex justify-between items-center text-xs">
            <span className="font-semibold text-indigo-900">
              {latestAssessment ? latestAssessment.title : 'No Assessment Taken Yet'}
            </span>
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-bold">
              {latestAssessment ? `${latestAssessment.score}% Verified` : '0% Verified'}
            </span>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Everything You Need, <span className="text-indigo-600">All in One Place</span></h2>
          <p className="text-xs text-slate-500">Explore the features that make SkillHire the smart choice for skill verification and hiring.</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <FeatureCard icon={<Award className="text-indigo-600" />} title="Verified Skill Tests" desc="Industry-relevant tests to verify real-world skills and knowledge." />
          <FeatureCard icon={<Briefcase className="text-blue-600" />} title="Top Job Opportunities" desc="Browse and apply to top jobs from verified companies." />
          <FeatureCard icon={<Target className="text-emerald-600" />} title="Smart Matching" desc="Our AI matches you with the best jobs based on your verified skills." />
          <FeatureCard icon={<Building className="text-amber-600" />} title="Trusted Companies" desc="Connect with 500+ verified companies looking for top talent." />
          <FeatureCard icon={<BarChart2 className="text-purple-600" />} title="Profile Analytics" desc="Track your progress, improve skills and boost your profile strength." />
          <FeatureCard icon={<Bell className="text-teal-600" />} title="Real-time Alerts" desc="Get instant updates on jobs, test results, and opportunities." />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition space-y-3">
      <div className="p-3 bg-slate-50 rounded-xl w-fit">{icon}</div>
      <h3 className="font-bold text-sm text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    
    </div>
  );
}