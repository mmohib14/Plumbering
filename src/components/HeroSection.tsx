import React, { useState } from 'react';
import { 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Star, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Calculator,
  Search,
  MapPin,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/plumbingData';

interface HeroSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onSelectTab }) => {
  const [quickZip, setQuickZip] = useState('');
  const [quickZipStatus, setQuickZipStatus] = useState<string | null>(null);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickZip || quickZip.length < 5) {
      setQuickZipStatus('Please enter a 5-digit US ZIP code.');
      return;
    }
    setQuickZipStatus(`✅ Technicians active in area (${quickZip}). Average arrival: ~35-45 mins!`);
  };

  return (
    <section className="relative bg-linear-to-b from-slate-900 via-slate-900 to-blue-950 text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      {/* Background Decorative Mesh & Patterns */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-sky-500 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] bg-size-[24px_24px] opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Emergency & Trust Badge */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-600/90 text-white tracking-wide border border-red-500/40 emergency-glow">
                <Flame className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
                24/7 Emergency Plumbing Available
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-blue-300 border border-slate-700">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                45-Min Emergency Dispatch
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-extrabold tracking-tight text-white leading-tight">
              <span className="text-2xl sm:text-3xl lg:text-4xl">
                Professional Plumbing Services
              </span>
              <br className="hidden sm:inline" />
              <span className="text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-blue-300 to-amber-300">
                You Can Count On
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Fast plumbing service for homes and businesses, with emergency response and upfront pricing.
            </p>

            {/* High-Converting CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm px-5 py-3 rounded-lg shadow-xl shadow-red-600/30 transition-all transform hover:-translate-y-0.5 emergency-glow"
              >
                <Phone className="w-4 h-4 mr-2 animate-pulse" />
                <span>Call Now</span>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-lg shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5 border border-blue-400/30"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Book Service</span>
              </button>

              <button
                onClick={() => onSelectTab('calculator')}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-4 py-3 rounded-lg border border-slate-700 transition-colors"
              >
                <Calculator className="w-3.5 h-3.5 mr-2 text-amber-400" />
                <span>Cost Estimator</span>
              </button>
            </div>

            {/* Fast ZIP Code Availability Check */}
            <div className="pt-2 max-w-md mx-auto lg:mx-0">
              <form onSubmit={handleZipCheck} className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/80">
                <MapPin className="w-4 h-4 ml-2.5 text-blue-400 shrink-0" />
                <input
                  type="text"
                  maxLength={5}
                  value={quickZip}
                  onChange={(e) => setQuickZip(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter your 5-digit ZIP code..."
                  className="bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none w-full px-2"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 transition-colors"
                >
                  Check Plumber
                </button>
              </form>
              {quickZipStatus && (
                <p className="text-xs mt-2 text-emerald-400 font-medium text-left">
                  {quickZipStatus}
                </p>
              )}
            </div>

            {/* Key Trust Signals */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-300">Licensed Master Plumbers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-300">Upfront Flat-Rate Pricing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-300">$2M Bonded & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-300">1-Year Warranty Guarantee</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual & Live Dispatcher Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Master Plumber Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/60 shadow-2xl shadow-blue-950/80 bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80"
                  alt="Professional American plumber repairing modern home plumbing system"
                  className="w-full h-80 sm:h-96 lg:h-107.5 object-cover object-top hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Floating Bottom Card: Rating & Verified Jobs */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="font-extrabold text-white text-base">4.9 / 5.0</span>
                          <span className="text-xs text-amber-400 font-bold">★★★★★</span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {COMPANY_INFO.totalReviewsCount} Verified Google Reviews
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs uppercase font-bold text-slate-400">Jobs Fixed</div>
                      <div className="text-base font-black text-sky-400">{COMPANY_INFO.jobsCompleted}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Live Dispatch Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-slate-900 border border-emerald-500/40 rounded-2xl px-4 py-2.5 shadow-2xl flex items-center space-x-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                    Technicians On Call
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold">
                    {COMPANY_INFO.activeTechnicians} Vans Available for Dispatch
                  </div>
                </div>
              </div>

              {/* Floating Shield Guarantee Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -right-4 bg-blue-600 text-white rounded-2xl px-4 py-2.5 shadow-xl border border-blue-400/40 items-center space-x-2.5">
                <ShieldCheck className="w-6 h-6 text-white" />
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-wide">100% Guaranteed</div>
                  <div className="text-[11px] text-blue-100 font-medium">Parts & Workmanship</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
