import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { 
  Bell, BellOff, CheckCircle2, Briefcase, Trash2 
} from 'lucide-react';

export default function Notifications() {
  // Context safe access
  const jobContext = useJobs();
  
  // Array fallback protection
  const rawNotifications = jobContext?.notifications;
  const notifications = Array.isArray(rawNotifications) ? rawNotifications : [];
  
  const markAllNotificationsAsRead = jobContext?.markAllNotificationsAsRead || (() => {});
  const clearNotifications = jobContext?.clearNotifications || (() => {});

  const [filter, setFilter] = useState('all');

  // Safe Filtering logic
  const filteredNotifications = notifications.filter(item => {
    if (!item) return false;
    if (filter === 'unread') return !item.read;
    if (filter === 'jobs') return item.type === 'job';
    if (filter === 'applications') return item.type === 'application';
    return true;
  });

  const unreadCount = notifications.filter(n => n && !n.read).length;

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6 bg-slate-50/50 min-h-screen text-slate-800">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="text-indigo-600" size={24} /> Notifications
          </h1>
          <p className="text-xs text-slate-400">Dashboard &gt; Notifications</p>
        </div>

        {/* Actions - Tabhi dikhenge jab data hoga */}
        {notifications.length > 0 && (
          <div className="flex gap-4 text-xs font-semibold">
            <button 
              onClick={markAllNotificationsAsRead} 
              className="text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 size={14} /> Mark all as read
            </button>
            <button 
              onClick={clearNotifications} 
              className="text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 size={14} /> Clear all
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Section */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Dynamic Tabs Section */}
          <div className="flex gap-2 border-b border-slate-200 pb-2 text-xs font-semibold overflow-x-auto">
            {[
              { id: 'all', label: `All (${notifications.length})` },
              { id: 'unread', label: `Unread (${unreadCount})` },
              { id: 'jobs', label: 'Jobs' },
              { id: 'applications', label: 'Applications' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setFilter(tab.id)} 
                className={`pb-2 px-3 py-1 rounded-t-lg transition cursor-pointer ${
                  filter === tab.id 
                    ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50 font-bold' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List Component OR Explicit Empty State UI */}
          {filteredNotifications.length > 0 ? (
            <div className="space-y-3">
              {filteredNotifications.map((item, idx) => (
                <div 
                  key={item?.id || idx} 
                  className={`p-4 rounded-2xl border transition flex items-start gap-4 bg-white ${
                    !item?.read ? 'border-indigo-200 bg-indigo-50/20 shadow-sm' : 'border-slate-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    item?.type === 'job' ? 'bg-amber-50 text-amber-600' :
                    item?.type === 'application' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item?.type === 'job' ? <Briefcase size={18} /> : <Bell size={18} />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-800">{item?.title || 'Notification'}</h4>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-2">{item?.time || 'Just now'}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item?.message || item?.description || 'No description provided.'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Dedicated UI Card for No Notifications */
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3 shadow-sm my-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <BellOff size={30} />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No Notifications Yet</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                There are no notifications to display in this category.
              </p>
            </div>
          )}
        </div>

        {/* Right Overview Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800">Notification Overview</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span>Total Received</span>
                <span className="font-bold text-slate-800">{notifications.length}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span>Unread Alerts</span>
                <span className="font-bold text-indigo-600">{unreadCount}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}