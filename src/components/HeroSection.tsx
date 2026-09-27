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
import { COMPANY_INFO, SERVICE_AREAS_DATA, SERVICES_DATA } from '../data/plumbingData';
import { useZipCodeLookup } from '../services/useZipCodeLookup';

interface HeroSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onSelectTab }) => {
  const [quickZip, setQuickZip] = useState('');
  const [quickZipStatus, setQuickZipStatus] = useState<string | null>(null);
  const { location: zipLocation, isLoading: isLookingUpZip, lookupUnavailable } = useZipCodeLookup(quickZip);
  const matchingZipLocation = zipLocation?.zip === quickZip ? zipLocation : null;

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickZip || quickZip.length < 5) {
      setQuickZipStatus('Please enter a 5-digit US ZIP code.');
      return;
    }
    const matchingArea = SERVICE_AREAS_DATA.find(area => area.zipCodes.includes(quickZip));
    setQuickZipStatus(matchingArea
      ? `Coverage listed near ${matchingArea.city}. Typical area response is about ${matchingArea.averageResponseMinutes} minutes.`
      : `We can't confirm coverage for ${quickZip} online. Call dispatch to verify service before booking.`);
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#f6f9f9] pt-8 pb-16 text-slate-900 lg:pt-14 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#94a3b8_0.7px,transparent_0.7px)] bg-size-[22px_22px] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Emergency & Trust Badge */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-950 tracking-wide border border-orange-200">
                <Flame className="w-3.5 h-3.5 mr-1.5 text-(--color-orange-dark)" />
                24/7 Emergency Plumbing Available
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                45-Min Emergency Dispatch
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-extrabold tracking-tight text-white leading-tight">
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-slate-900">
                Professional Plumbing Services
              </span>
              <br className="hidden sm:inline" />
              <span className="block text-3xl font-black text-(--color-orange-dark) sm:text-5xl lg:text-6xl">
                You Can Count On
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Fast plumbing service for homes and businesses, with emergency response and upfront pricing.
            </p>

            {/* High-Converting CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-(--color-orange) hover:bg-(--color-orange-dark) active:bg-orange-800 text-slate-950 font-extrabold text-sm px-5 py-3 rounded-lg shadow-lg shadow-orange-600/20 transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 mr-2 animate-pulse" />
                <span>Call Now</span>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-orange-50 text-slate-900 font-bold text-sm px-5 py-3 rounded-lg border border-slate-300 transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Book Service</span>
              </button>

              <button
                onClick={() => onSelectTab('calculator')}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs px-4 py-3 rounded-lg border border-slate-200 transition-colors"
              >
                <Calculator className="w-3.5 h-3.5 mr-2 text-amber-400" />
                <span>Cost Estimator</span>
              </button>
            </div>

            {/* Fast ZIP Code Availability Check */}
            <div className="pt-2 max-w-md mx-auto lg:mx-0">
              <form onSubmit={handleZipCheck} className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-300 shadow-sm">
                <MapPin className="w-4 h-4 ml-2.5 text-(--color-orange-dark) shrink-0" />
                <input
                  type="text"
                  maxLength={5}
                  value={quickZip}
                  onChange={(e) => {
                    setQuickZip(e.target.value.replace(/\D/g, '').slice(0, 5));
                    setQuickZipStatus(null);
                  }}
                  placeholder="Enter your 5-digit ZIP code..."
                  className="bg-transparent text-sm text-slate-900 placeholder-slate-500 focus:outline-none w-full px-2"
                  aria-label="Enter your five-digit ZIP code"
                />
                <button
                  type="submit"
                  className="bg-(--color-orange) hover:bg-(--color-orange-dark) text-slate-950 text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 transition-colors"
                >
                  Check Plumber
                </button>
              </form>
              {(matchingZipLocation || isLookingUpZip || lookupUnavailable) && (
                <div className="mt-2 flex min-h-12 items-center gap-3 rounded-xl border border-orange-200 bg-white px-3 py-2 text-left shadow-sm" role="status" aria-live="polite">
                  <MapPin className="h-4 w-4 shrink-0 text-(--color-orange-dark)" />
                  {matchingZipLocation ? (
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-900">{matchingZipLocation.city}, {matchingZipLocation.state}</p>
                      <p className="text-[11px] text-slate-600">ZIP {matchingZipLocation.zip}</p>
                    </div>
                  ) : isLookingUpZip ? (
                    <p className="text-xs font-medium text-slate-600">Finding your city...</p>
                  ) : (
                    <p className="text-xs font-medium text-slate-600">We couldn't find that ZIP right now. Check the number and try again.</p>
                  )}
                  {matchingZipLocation && <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-950">Location found</span>}
                </div>
              )}
              {quickZipStatus && (
                <p className="text-xs mt-2 text-slate-700 font-medium text-left" role="status" aria-live="polite">
                  {quickZipStatus}
                </p>
              )}
            </div>

            {/* Key Trust Signals */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-700">Licensed Master Plumbers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-700">Upfront Flat-Rate Pricing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-700">$2M Bonded & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-700">1-Year Warranty Guarantee</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual & Live Dispatcher Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Master Plumber Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-white shadow-xl shadow-slate-900/10 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80"
                  alt="Professional American plumber repairing modern home plumbing system"
                  className="w-full h-80 sm:h-96 lg:h-107.5 object-cover object-top hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-transparent via-transparent to-transparent"></div>

                {/* Floating Bottom Card: Rating & Verified Jobs */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="font-extrabold text-slate-900 text-base">4.9 / 5.0</span>
                          <span className="text-xs text-amber-400 font-bold">★★★★★</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {COMPANY_INFO.totalReviewsCount} Verified Google Reviews
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs uppercase font-bold text-slate-500">Jobs Fixed</div>
                      <div className="text-base font-black text-(--color-orange-dark)">{COMPANY_INFO.jobsCompleted}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Live Dispatch Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-xl flex items-center space-x-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div>
                  <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                    Technicians On Call
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold">
                    {COMPANY_INFO.activeTechnicians} Vans Available for Dispatch
                  </div>
                </div>
              </div>

              {/* Floating Shield Guarantee Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -right-4 bg-(--color-orange) text-slate-950 rounded-2xl px-4 py-2.5 shadow-xl border border-orange-200 items-center space-x-2.5">
                <ShieldCheck className="w-6 h-6 text-slate-950" />
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-wide">100% Guaranteed</div>
                  <div className="text-[11px] text-orange-950 font-medium">Parts & Workmanship</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
