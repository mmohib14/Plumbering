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
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative border-b border-slate-200 bg-[#f6f9f9] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-orange-950 font-bold text-xs uppercase tracking-widest bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
            Commercial & Industrial Division
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto mt-4 leading-tight">
            Commercial Plumbing Contractors <br />
            <span className="text-(--color-orange-dark)">Zero Downtime For Your Business</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
            Reliable repairs, inspections, replacements, and maintenance for businesses of every size.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-(--color-orange) hover:bg-orange-500 active:bg-orange-500 text-slate-950 font-bold text-sm px-5 py-3 rounded-lg shadow-lg shadow-orange-600/20 transition-all"
            >
              Book Commercial Service
            </button>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm px-5 py-3 rounded-lg border border-slate-300 transition-colors flex items-center justify-center"
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
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Industries Served</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Trusted By Leading US Businesses</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { name: "Restaurants & Bars", desc: "Grease traps, floor sinks, high-temp dish lines", icon: <Utensils className="w-5 h-5 text-amber-400" /> },
            { name: "Hotels & Hospitality", desc: "Commercial boilers, multi-story water risers", icon: <Hotel className="w-5 h-5 text-blue-400" /> },
            { name: "Multi-Family & Apartments", desc: "Tenant service tickets, main sewer scopes", icon: <Building2 className="w-5 h-5 text-emerald-400" /> },
            { name: "Retail & Offices", desc: "ADA restrooms, backflow certification", icon: <Store className="w-5 h-5 text-purple-400" /> }
          ].map((ind, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-3">
                {ind.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">{ind.name}</h3>
              <p className="text-xs text-slate-600 mt-1">{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commercial Capabilities */}
      <section className="border-t border-slate-200 bg-[#f6f9f9] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-(--color-orange-dark) uppercase tracking-widest">
                Compliance & Preventative Care
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Prevent Expensive Municipal Violations & Health Closures
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
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
                  <div key={idx} className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenBooking}
                  className="bg-(--color-orange) hover:bg-orange-500 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-sm transition-colors shadow-md"
                >
                  Schedule Commercial Site Inspection
                </button>
              </div>
            </div>

            <div className="relative flex h-96 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-100 via-white to-orange-100 text-(--color-navy) shadow-xl" aria-hidden="true">
              <Building2 className="h-28 w-28" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
