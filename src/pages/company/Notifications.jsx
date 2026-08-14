import React, { useState, useEffect } from 'react';
import { 
  Bell, Mail, Calendar, BarChart2, User, Users, FileText, CheckCircle2, 
  ChevronRight, ArrowRight, Filter, CheckCheck, FileSpreadsheet, UserPlus, 
  Clock, AlertCircle, Settings
} from 'lucide-react';

export default  function CompanyNotifications() {
  // Dynamic state loaded from localStorage or system events
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'unread', 'read'
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Load notifications dynamically from localStorage
  const loadNotifications = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('app_notifications')) || [];
      setNotifications(stored);
    } catch (e) {
      setNotifications([]);
    }
  };

  useEffect(() => {
    loadNotifications();
    window.addEventListener('notificationsUpdated', loadNotifications);
    return () => window.removeEventListener('notificationsUpdated', loadNotifications);
  }, []);

  // Mark all as read dynamically
  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updated);
    localStorage.setItem('app_notifications', JSON.stringify(updated));
    window.dispatchEvent(new Event('notificationsUpdated'));
  };

  // Mark single item as read
  const toggleReadStatus = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n);
    setNotifications(updated);
    localStorage.setItem('app_notifications', JSON.stringify(updated));
    window.dispatchEvent(new Event('notificationsUpdated'));
  };

  // Dynamic filter logic
  const filteredNotifications = notifications.filter(item => {
    if (activeTab === 'unread') return !item.isRead;
    if (activeTab === 'read') return item.isRead;
    return true;
  }).filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  // Dynamic Summary Metrics
  const totalCount = notifications.length;
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const todayCount = notifications.filter(n => n.isToday).length;
  const thisWeekCount = notifications.filter(n => n.isThisWeek).length;

  // Icon mapping according to notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application':
        return { icon: User, bg: 'bg-indigo-50 text-indigo-600' };
      case 'shortlist':
        return { icon: Users, bg: 'bg-emerald-50 text-emerald-600' };
      case 'interview':
        return { icon: Calendar, bg: 'bg-amber-50 text-amber-600' };
      case 'message':
        return { icon: Mail, bg: 'bg-blue-50 text-blue-600' };
      case 'status':
        return { icon: FileText, bg: 'bg-rose-50 text-rose-600' };
      case 'candidate_registered':
        return { icon: UserPlus, bg: 'bg-purple-50 text-purple-600' };
      case 'job_expired':
        return { icon: Clock, bg: 'bg-amber-50 text-amber-600' };
      case 'report':
        return { icon: BarChart2, bg: 'bg-teal-50 text-teal-600' };
      default:
        return { icon: Bell, bg: 'bg-slate-100 text-slate-600' };
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 text-xs font-sans text-slate-800">
      
      {/* Page Header */}
      <div className="mb-6 space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Bell className="text-indigo-600" size={22} /> Notifications
        </h1>
        <p className="text-slate-400 text-[11px]">Stay updated with important activities</p>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* LEFT / CENTER PANEL: Notifications Feed */}
        <div className="col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 space-y-4">
            
            {/* Filter & Action Controls */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              {/* Dynamic Tabs */}
              <div className="flex items-center gap-6 text-[11px] font-bold text-slate-500">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`pb-1.5 flex items-center gap-1.5 border-b-2 transition ${
                    activeTab === 'all' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-800'
                  }`}
                >
                  All {totalCount > 0 && <span className="bg-indigo-600 text-white text-[9px] px-1.5 py-0.2 rounded-full">{totalCount}</span>}
                </button>

                <button 
                  onClick={() => setActiveTab('unread')}
                  className={`pb-1.5 flex items-center gap-1.5 border-b-2 transition ${
                    activeTab === 'unread' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-800'
                  }`}
                >
                  Unread {unreadCount > 0 && <span className="bg-indigo-600 text-white text-[9px] px-1.5 py-0.2 rounded-full">{unreadCount}</span>}
                </button>

                <button 
                  onClick={() => setActiveTab('read')}
                  className={`pb-1.5 border-b-2 transition ${
                    activeTab === 'read' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-800'
                  }`}
                >
                  Marked as Read
                </button>
              </div>

              {/* Right Filter Controls */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-1.5 pr-7 text-[11px] font-semibold focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">All Types</option>
                    <option value="application">Applications</option>
                    <option value="interview">Interviews</option>
                    <option value="message">Messages</option>
                  </select>
                  <Filter size={12} className="absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
                </div>

                <button 
                  onClick={markAllAsRead}
                  className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-bold text-[11px] bg-indigo-50/60 hover:bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-xl transition"
                >
                  <CheckCheck size={14} /> Mark all as read
                </button>
              </div>
            </div>

            {/* Dynamic Notification Items List */}
            <div className="divide-y divide-slate-100">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((item) => {
                  const { icon: IconComponent, bg } = getNotificationIcon(item.type);
                  return (
                    <div 
                      key={item.id}
                      onClick={() => toggleReadStatus(item.id)}
                      className={`py-3.5 px-2 flex items-start gap-4 rounded-xl transition cursor-pointer hover:bg-slate-50/80 ${
                        !item.isRead ? 'bg-indigo-50/20' : ''
                      }`}
                    >
                      {/* Unread Blue Indicator Dot */}
                      <div className="pt-2.5">
                        <span className={`w-2 h-2 rounded-full block ${!item.isRead ? 'bg-indigo-600' : 'bg-transparent'}`}></span>
                      </div>

                      {/* Icon Container */}
                      <div className={`p-2.5 rounded-2xl shrink-0 ${bg}`}>
                        <IconComponent size={18} />
                      </div>

                      {/* Main Message Block */}
                      <div className="flex-1 space-y-0.5">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                          <span className="text-[10px] font-semibold text-slate-400">{item.time}</span>
                        </div>

                        <p className="text-slate-600 text-[11px]">
                          {item.description}{' '}
                          {item.highlight && <span className="font-bold text-indigo-600">{item.highlight}</span>}
                        </p>

                        {item.jobId && (
                          <p className="text-[10px] text-slate-400 font-medium">
                            Job ID: {item.jobId}
                          </p>
                        )}
                      </div>

                      {/* Secondary Dot */}
                      {!item.isRead && (
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full self-center shrink-0"></span>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Bell size={32} className="mx-auto text-slate-300" />
                  <p className="font-bold text-xs text-slate-600">No Notifications Found</p>
                  <p className="text-[10px]">When new actions or events occur, notifications will display here dynamically.</p>
                </div>
              )}
            </div>

            {/* Pagination Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
              <span>Showing 1 to {filteredNotifications.length} of {totalCount} notifications</span>
              <div className="flex items-center gap-1.5">
                <button className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center">1</button>
                <button className="w-6 h-6 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center">2</button>
                <button className="w-6 h-6 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center">
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL: Dynamic Summary & Quick Controls */}
        <div className="col-span-4 space-y-4">
          
          {/* Notification Summary */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-xs border-b pb-2">Notification Summary</h3>
            
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2 rounded-xl bg-indigo-50/40">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Bell size={14} />
                  </div>
                  <span className="font-semibold text-slate-700">Total Notifications</span>
                </div>
                <span className="font-bold text-slate-900">{totalCount}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50/40">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-rose-100 text-rose-600 rounded-lg">
                    <Mail size={14} />
                  </div>
                  <span className="font-semibold text-slate-700">Unread Notifications</span>
                </div>
                <span className="font-bold text-slate-900">{unreadCount}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/40">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Calendar size={14} />
                  </div>
                  <span className="font-semibold text-slate-700">Today</span>
                </div>
                <span className="font-bold text-slate-900">{todayCount}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/40">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                    <BarChart2 size={14} />
                  </div>
                  <span className="font-semibold text-slate-700">This Week</span>
                </div>
                <span className="font-bold text-slate-900">{thisWeekCount}</span>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-xs border-b pb-2">Notification Preferences</h3>
            
            <div className="space-y-2 text-[11px]">
              {[
                { title: 'Application Updates', icon: FileText, color: 'text-emerald-600' },
                { title: 'Interview Updates', icon: Calendar, color: 'text-amber-600' },
                { title: 'Messages', icon: Mail, color: 'text-blue-600' },
                { title: 'Job Alerts', icon: Bell, color: 'text-indigo-600' },
                { title: 'System Updates', icon: Settings, color: 'text-teal-600' },
              ].map((pref, i) => (
                <div key={i} className="flex justify-between items-center py-1 hover:bg-slate-50 rounded-lg px-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <pref.icon size={13} className={pref.color} />
                    <span className="font-semibold text-slate-700">{pref.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-emerald-600 text-[10px]">On</span>
                    <ChevronRight size={12} className="text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-2.5">
            <h3 className="font-bold text-slate-900 text-xs border-b pb-2">Quick Actions</h3>
            
            <div className="space-y-1 text-indigo-600 font-bold text-[11px]">
              <button className="w-full flex justify-between items-center p-1.5 rounded-lg hover:bg-indigo-50/50">
                <span>View all applications</span>
                <ArrowRight size={12} />
              </button>
              <button className="w-full flex justify-between items-center p-1.5 rounded-lg hover:bg-indigo-50/50">
                <span>View all interviews</span>
                <ArrowRight size={12} />
              </button>
              <button className="w-full flex justify-between items-center p-1.5 rounded-lg hover:bg-indigo-50/50">
                <span>Go to messages</span>
                <ArrowRight size={12} />
              </button>
              <button className="w-full flex justify-between items-center p-1.5 rounded-lg hover:bg-indigo-50/50">
                <span>Manage notification settings</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}