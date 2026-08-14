import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { MessageSquare, Send, Paperclip, MessageSquareX } from 'lucide-react';

export default function Messages() {
  const { conversations = [], sendMessage } = useJobs() || {};
  const [activeChatId, setActiveChatId] = useState(conversations[0]?.id || null);
  const [input, setInput] = useState('');

  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !activeChatId) return;
    sendMessage(activeChatId, input);
    setInput('');
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6 bg-slate-50/50 min-h-screen text-slate-800">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="text-indigo-600" size={24} /> Messages
        </h1>
        <p className="text-xs text-slate-400">Dashboard &gt; Messages</p>
      </div>

      {conversations.length > 0 ? (
        <div className="grid grid-cols-12 gap-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[600px]">
          {/* Dynamic Conversations List */}
          <div className="col-span-4 border-r border-slate-200 overflow-y-auto divide-y divide-slate-100">
            {conversations.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChatId(chat.id)}
                className={`p-4 flex gap-3 cursor-pointer hover:bg-slate-50 transition ${chat.id === activeChat?.id ? 'bg-indigo-50/40' : ''}`}
              >
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                  {chat.recruiterName ? chat.recruiterName[0] : 'C'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{chat.companyName}</h4>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Message Feed */}
          <div className="col-span-8 flex flex-col justify-between">
            {activeChat ? (
              <>
                <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-800">
                  {activeChat.companyName} ({activeChat.recruiterName})
                </div>

                <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-slate-50/30">
                  {activeChat.messages?.map((msg, index) => (
                    <div key={index} className={`flex flex-col ${msg.sender === 'candidate' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[70%] text-xs p-3 rounded-2xl ${
                        msg.sender === 'candidate' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-800'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSend} className="p-3 border-t border-slate-100 flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Type your reply..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 text-xs p-2.5 bg-slate-50 border rounded-xl outline-none"
                  />
                  <button type="submit" className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700">
                    <Send size={14} />
                  </button>
                </form>
              </>
            ) : null}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <MessageSquareX size={40} className="mx-auto text-slate-300" />
          <h3 className="text-sm font-bold text-slate-700">No Messages Yet</h3>
          <p className="text-xs text-slate-400">Direct messages from recruiters will appear here.</p>
        </div>
      )}
    </div>
  );
}