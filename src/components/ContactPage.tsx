import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/plumbingData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-100/70 px-3 py-1 rounded-full">
            24/7 National Dispatch Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Contact USA Pro Plumbing & Rooter
          </h1>
          <p className="text-base text-slate-600 mt-2">
            Reach our live dispatch operators 24 hours a day, 7 days a week, or submit an electronic inquiry below.
          </p>
        </div>

        {/* 2-Column Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Phone Card */}
            <div className="bg-red-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-red-600/20 emergency-glow">
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                24/7 Urgent Dispatch Hotline
              </span>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="text-3xl sm:text-4xl font-black block mt-2 text-white hover:text-amber-200 transition-colors"
              >
                {COMPANY_INFO.phone}
              </a>
              <p className="text-xs text-red-100 mt-2">
                Live dispatcher answers 24/7. Average arrival under 45 minutes for emergencies.
              </p>
            </div>

            {/* Hub Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">National Headquarters</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{COMPANY_INFO.hqAddress}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-3 border-t border-slate-100">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Electronic Mail</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{COMPANY_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-3 border-t border-slate-100">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Operating Hours</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Open 24 Hours / 7 Days a Week <br />
                    Weekends, Nights & Holidays Included
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-3 border-t border-slate-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Licensing & Credentials</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {COMPANY_INFO.license} <br />
                    {COMPANY_INFO.insurance}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Send an Electronic Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              For non-emergency estimates, commercial bid requests, or general plumbing questions.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200 animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900">Message Received!</h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you for contacting USA Pro Plumbing. One of our dispatch coordinators will respond via phone or email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Adams"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (800) 555-7473"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    How Can We Help? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your plumbing project, symptoms, or requested estimate..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-colors shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Dispatch</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
