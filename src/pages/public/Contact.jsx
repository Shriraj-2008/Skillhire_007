import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Query', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactMessage(formData);
      setStatus('Success! Your message has been sent.');
      setFormData({ name: '', email: '', subject: 'General Query', message: '' });
    } catch (err) {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-8 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900">We'd Love to <span className="text-indigo-600">Hear From You!</span></h1>
        <p className="text-xs text-slate-500">Have questions or need help? Our team is here to assist you.</p>
      </div>

      <div className="grid grid-cols-3 gap-8 items-start">
        <div className="space-y-4">
          <ContactCard icon={<MapPin className="text-indigo-600" />} title="Our Location" line1="358, jalamb road," line2="khamgaon , buldhana, maharastrha,India" />
          <ContactCard icon={<Mail className="text-indigo-600" />} title="Email Us" line1="support@skillhire.com" line2="info@skillhire.com" />
          <ContactCard icon={<Phone className="text-indigo-600" />} title="Call Us" line1="+91 98765 43210" line2="+91 120 456 7890" />
          <ContactCard icon={<Clock className="text-indigo-600" />} title="Office Hours" line1="Mon - Sat: 9:00 AM - 6:00 PM" line2="Sunday: Closed" />
        </div>

        <form onSubmit={handleSubmit} className="col-span-2 bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800">Send Us a Message</h3>
          {status && <p className="text-xs font-semibold text-indigo-600 bg-indigo-50 p-2 rounded-lg">{status}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700">Full Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Enter full name" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Email Address</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Enter email" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">Message</label>
            <textarea rows="4" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Type your message here..."></textarea>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition text-xs flex items-center justify-center gap-2">
            <Send size={14} /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, line1, line2 }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
      <div className="p-3 bg-indigo-50 rounded-xl">{icon}</div>
      <div>
        <h4 className="font-bold text-xs text-slate-800">{title}</h4>
        <p className="text-[11px] text-slate-500">{line1}</p>
        <p className="text-[11px] text-slate-400">{line2}</p>
      </div>
    </div>
  );
}