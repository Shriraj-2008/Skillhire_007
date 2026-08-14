import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Star, MoreHorizontal, Paperclip, Smile, Send, 
  MessageSquare, Plus, Mail, Phone, MapPin, ExternalLink, Calendar, 
  Share2, ArrowRightLeft, Trash2, FileText, Download, CheckCheck 
} from 'lucide-react';

export default function MessagesDashboard() {
  // Dynamic conversations state initialized from LocalStorage or Empty List
  const [conversations, setConversations] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'unread', 'starred'
  const [newMessageText, setNewMessageText] = useState('');

  // Load conversation data dynamically from localStorage or context
  const loadConversations = () => {
    try {
      const storedData = JSON.parse(localStorage.getItem('app_messages')) || [];
      setConversations(storedData);
      if (storedData.length > 0 && !selectedCandidateId) {
        setSelectedCandidateId(storedData[0].id);
      }
    } catch (e) {
      setConversations([]);
    }
  };

  useEffect(() => {
    loadConversations();
    window.addEventListener('messagesUpdated', loadConversations);
    return () => window.removeEventListener('messagesUpdated', loadConversations);
  }, []);

  // Currently active candidate profile details
  const activeCandidate = conversations.find(c => c.id === selectedCandidateId) || conversations[0];

  // Dynamic status badges / unread counts
  const totalUnreadCount = conversations.reduce((acc, item) => acc + (item.unreadCount || 0), 0);

  // Dynamic filter logic
  const filteredConversations = conversations.filter(candidate => {
    const matchesSearch = candidate.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          candidate.role?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'unread') return matchesSearch && candidate.unreadCount > 0;
    if (activeTab === 'starred') return matchesSearch && candidate.isStarred;
    return matchesSearch;
  });

  // Toggle dynamic Starred status
  const toggleStar = (id) => {
    const updated = conversations.map(c => c.id === id ? { ...c, isStarred: !c.isStarred } : c);
    setConversations(updated);
    localStorage.setItem('app_messages', JSON.stringify(updated));
  };

  // Dynamic Message Send Handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeCandidate) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'company',
      text: newMessageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    const updatedConversations = conversations.map(c => {
      if (c.id === activeCandidate.id) {
        return {
          ...c,
          lastMessage: newMessageText,
          lastTime: 'Just now',
          messages: [...(c.messages || []), newMsg]
        };
      }
      return c;
    });

    setConversations(updatedConversations);
    localStorage.setItem('app_messages', JSON.stringify(updatedConversations));
    window.dispatchEvent(new Event('messagesUpdated'));
    setNewMessageText('');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 text-xs">
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Section Banner */}
        <div className="p-6 pb-2 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="text-indigo-600" size={22} /> Messages
            </h1>
            <p className="text-slate-400 text-[11px] mt-0.5">Communicate with candidates directly</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 border border-indigo-200 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 px-3.5 py-2 rounded-xl text-xs font-bold transition">
              <MessageSquare size={14} /> Message Templates
            </button>
            <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm shadow-indigo-200">
              <Plus size={14} /> New Message
            </button>
          </div>
        </div>

        {/* Main 3-Column Messaging Workspace */}
        <div className="flex-1 grid grid-cols-12 gap-4 p-6 pt-2 overflow-hidden">
          
          {/* COLUMN 1: Conversation List */}
          <div className="col-span-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col overflow-hidden">
            
            {/* Search & Filter Bar */}
            <div className="p-3 border-b border-slate-100 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search messages..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>
                <button className="p-2 text-indigo-600 border border-indigo-200 bg-indigo-50/50 rounded-xl hover:bg-indigo-50 shrink-0">
                  <Filter size={14} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center justify-between border-b border-slate-100 text-[11px] font-bold text-slate-500 px-1 pt-1">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`pb-2 border-b-2 ${activeTab === 'all' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-700'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setActiveTab('unread')}
                  className={`pb-2 border-b-2 flex items-center gap-1 ${activeTab === 'unread' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-700'}`}
                >
                  Unread {totalUnreadCount > 0 && <span className="bg-indigo-600 text-white text-[9px] px-1.5 py-0.2 rounded-full">{totalUnreadCount}</span>}
                </button>
                <button 
                  onClick={() => setActiveTab('starred')}
                  className={`pb-2 border-b-2 ${activeTab === 'starred' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-700'}`}
                >
                  Starred
                </button>
              </div>
            </div>

            {/* Dynamic Candidates Stream */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((candidate) => (
                  <div 
                    key={candidate.id}
                    onClick={() => setSelectedCandidateId(candidate.id)}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition ${
                      candidate.id === activeCandidate?.id ? 'bg-indigo-50/40 border-l-4 border-indigo-600' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img 
                        src={candidate.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"} 
                        alt={candidate.name} 
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      {candidate.isActive && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="font-bold text-slate-900 truncate">{candidate.name}</h4>
                        <span className="text-[10px] text-slate-400 shrink-0">{candidate.lastTime}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-500 truncate mb-1">{candidate.role}</p>
                      <p className="text-[11px] text-slate-400 truncate">{candidate.lastMessage}</p>
                    </div>

                    {candidate.unreadCount > 0 && (
                      <span className="bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0 self-center">
                        {candidate.unreadCount}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 space-y-1">
                  <p className="font-semibold text-xs">No Messages Found</p>
                  <p className="text-[10px]">When candidates reply, chat will appear here dynamically.</p>
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 2: Chat Conversation Panel */}
          {activeCandidate ? (
            <div className="col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col overflow-hidden">
              
              {/* Active Chat Header */}
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{activeCandidate.name}</h3>
                    {activeCandidate.isActive && (
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active now
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {activeCandidate.role} &bull; Applied on {activeCandidate.appliedDate || 'N/A'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleStar(activeCandidate.id)}
                    className={`p-1.5 rounded-lg border transition ${activeCandidate.isStarred ? 'bg-amber-50 text-amber-500 border-amber-200' : 'text-slate-400 border-slate-200 hover:text-slate-600'}`}
                  >
                    <Star size={14} fill={activeCandidate.isStarred ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-1.5 text-slate-400 border border-slate-200 rounded-lg hover:text-slate-600">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>

              {/* Chat Body Streams */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30">
                <div className="flex justify-center my-2">
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Today
                  </span>
                </div>

                {(activeCandidate.messages || []).map((msg) => (
                  <div key={msg.id} className={`flex items-start gap-2.5 ${msg.sender === 'company' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender !== 'company' && (
                      <img 
                        src={activeCandidate.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"} 
                        alt="avatar" 
                        className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" 
                      />
                    )}

                    <div className={`max-w-[70%] space-y-1 ${msg.sender === 'company' ? 'items-end' : 'items-start'}`}>
                      <div className={`p-3 rounded-2xl text-xs font-medium leading-relaxed shadow-2xs ${
                        msg.sender === 'company' 
                          ? 'bg-indigo-50 text-slate-800 rounded-tr-none border border-indigo-100/80' 
                          : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                      }`}>
                        {msg.text}
                      </div>

                      <div className={`flex items-center gap-1 text-[9px] text-slate-400 ${msg.sender === 'company' ? 'justify-end' : 'justify-start'}`}>
                        <span>{msg.time}</span>
                        {msg.sender === 'company' && <CheckCheck size={12} className="text-indigo-600" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Composer Footer */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white">
                <div className="flex items-center gap-2 border border-slate-200 rounded-2xl p-1.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/10">
                  <button type="button" className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl">
                    <Paperclip size={16} />
                  </button>
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    className="flex-1 bg-transparent border-none text-xs focus:outline-none placeholder-slate-400"
                  />
                  <button type="button" className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl">
                    <Smile size={16} />
                  </button>
                  <button 
                    type="submit" 
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition shrink-0"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="col-span-6 bg-white rounded-2xl border border-slate-200/80 p-8 flex items-center justify-center text-slate-400">
              Select a candidate conversation to view details.
            </div>
          )}

          {/* COLUMN 3: Right Sidebar Candidate & Job Details Panel */}
          {activeCandidate ? (
            <div className="col-span-3 space-y-4 overflow-y-auto">
              
              {/* Candidate Quick Profile */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-3">
                <h3 className="text-xs font-bold text-slate-900 text-left border-b pb-2">Candidate Details</h3>
                <img 
                  src={activeCandidate.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"} 
                  alt={activeCandidate.name} 
                  className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-indigo-100"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm flex items-center justify-center gap-1.5">
                    {activeCandidate.name}
                    {activeCandidate.isActive && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                  </h4>
                  <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                    <Mail size={10} /> {activeCandidate.email || 'N/A'}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                    <Phone size={10} /> {activeCandidate.phone || 'N/A'}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                    <MapPin size={10} /> {activeCandidate.location || 'N/A'}
                  </p>
                </div>

                <button className="w-full border border-indigo-200 text-indigo-600 bg-indigo-50/40 hover:bg-indigo-50 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1">
                  View Candidate Profile
                </button>
              </div>

              {/* Application Details */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-900 border-b pb-2">Application Details</h3>
                
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Job Title</span>
                    <span className="font-bold text-slate-800">{activeCandidate.role || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Job ID</span>
                    <span className="font-bold text-slate-800">{activeCandidate.jobId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Applied On</span>
                    <span className="font-bold text-slate-800">{activeCandidate.appliedDate || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Current Status</span>
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold px-2 py-0.5 rounded-full text-[10px]">
                      {activeCandidate.status || 'Shortlisted'}
                    </span>
                  </div>
                </div>

                <button className="w-full border border-slate-200 text-slate-700 hover:bg-slate-50 py-1.5 rounded-xl text-xs font-semibold transition">
                  View Application
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-2.5">
                <h3 className="text-xs font-bold text-slate-900 border-b pb-2">Quick Actions</h3>
                <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                  <button className="w-full flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 text-indigo-600">
                    <Calendar size={14} /> Schedule Interview
                  </button>
                  <button className="w-full flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50">
                    <Mail size={14} className="text-slate-400" /> Send Email
                  </button>
                  <button className="w-full flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50">
                    <Share2 size={14} className="text-slate-400" /> Share Feedback
                  </button>
                  <button className="w-full flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50">
                    <ArrowRightLeft size={14} className="text-slate-400" /> Move to Another Stage
                  </button>
                  <button className="w-full flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 font-semibold">
                    <Trash2 size={14} /> Remove from Process
                  </button>
                </div>
              </div>

              {/* Shared Documents */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-900 border-b pb-2">Shared Documents</h3>
                
                <div className="space-y-2">
                  {(activeCandidate.documents || [
                    { name: 'Resume_Candidate.pdf' },
                    { name: 'Cover_Letter.pdf' }
                  ]).map((doc, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 border border-slate-200/60 rounded-xl">
                      <div className="flex items-center gap-2 truncate">
                        <FileText size={14} className="text-rose-500 shrink-0" />
                        <span className="text-[11px] font-semibold text-slate-700 truncate">{doc.name}</span>
                      </div>
                      <button className="text-slate-400 hover:text-indigo-600 shrink-0">
                        <Download size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                <button className="text-[11px] text-indigo-600 font-bold hover:underline block">
                  View all documents
                </button>
              </div>

            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
}