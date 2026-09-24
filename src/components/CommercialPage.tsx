import React from 'react';
import { 
  Building2, 
  Utensils, 
  Hotel, 
  Store, 
  ShieldCheck, 
  Clock, 
  Phone, 
  CheckCircle2, 
  ArrowRight,
  FileCheck2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/plumbingData';

interface CommercialPageProps {
  onOpenBooking: () => void;
}

export const CommercialPage: React.FC<CommercialPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-linear-to-b from-blue-950 via-slate-900 to-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-400 font-bold text-xs uppercase tracking-widest bg-blue-900/60 border border-blue-700/50 px-3 py-1 rounded-full">
            Commercial & Industrial Division
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-4xl mx-auto mt-4 leading-tight">
            Commercial Plumbing Contractors <br />
            <span className="text-blue-400">Zero Downtime For Your Business</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Reliable repairs, inspections, replacements, and maintenance for businesses of every size.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm px-5 py-3 rounded-lg shadow-xl shadow-blue-600/30 transition-all"
            >
              Book Commercial Service
            </button>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-5 py-3 rounded-lg border border-slate-700 transition-colors flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2 text-emerald-400" />
              <span>Call Commercial Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Industries Served</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Trusted By Leading US Businesses</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Restaurants & Bars", desc: "Grease traps, floor sinks, high-temp dish lines", icon: <Utensils className="w-5 h-5 text-amber-400" /> },
            { name: "Hotels & Hospitality", desc: "Commercial boilers, multi-story water risers", icon: <Hotel className="w-5 h-5 text-blue-400" /> },
            { name: "Multi-Family & Apartments", desc: "Tenant service tickets, main sewer scopes", icon: <Building2 className="w-5 h-5 text-emerald-400" /> },
            { name: "Retail & Offices", desc: "ADA restrooms, backflow certification", icon: <Store className="w-5 h-5 text-purple-400" /> }
          ].map((ind, idx) => (
            <div key={idx} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-3">
                {ind.icon}
              </div>
              <h3 className="text-base font-bold text-white">{ind.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commercial Capabilities */}
      <section className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                Compliance & Preventative Care
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Prevent Expensive Municipal Violations & Health Closures
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                A single plumbing stoppage during peak dining hours can cost tens of thousands in lost revenue and municipal health citations. Our commercial maintenance agreements keep your fixtures, interceptors, and backflow assemblies running clean.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Annual Backflow Assembly Testing (RPZ & DCVA Certification)",
                  "Quarterly High-Heat Hydro Jetting for Kitchen Mainlines",
                  "Grease Interceptor Pumping Coordination & Camera Scoping",
                  "Dedicated Account Manager & Priority 30-Minute Dispatch",
                  "Comprehensive OSHA & IPC Code Documentation Provided"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenBooking}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-colors shadow-md"
                >
                  Schedule Commercial Site Inspection
                </button>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1000&q=80"
                alt="Commercial plumber servicing a professional plumbing system"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
