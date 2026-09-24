import React from 'react';
import { Flame, Phone, AlertOctagon, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/plumbingData';

interface EmergencyAlertBannerProps {
  onOpenBooking: () => void;
}

export const EmergencyAlertBanner: React.FC<EmergencyAlertBannerProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-red-700 text-white py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-inner">
      {/* Background Warning Stripe accents */}
      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#fff,#fff_10px,transparent_10px,transparent_20px)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Urgent Headline */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-red-900/60 border border-red-400/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-300">
              <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>Priority Rapid Emergency Dispatch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Plumbing Emergency? Burst Pipe or Raw Sewage Backup?
            </h2>

            <p className="text-red-100 text-base leading-relaxed">
              Don't wait while water ruins your flooring, ceilings, and drywall. Our emergency plumbing units are dispatched immediately with high-capacity pumps, leak locators, and pipe repair gear.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-red-800/60 p-3 rounded-xl border border-red-500/30">
                <div className="text-xs font-bold text-amber-300 uppercase">Step 1</div>
                <div className="text-sm font-semibold text-white">Shut Off Main Valve</div>
                <div className="text-xs text-red-200">Stop water flow immediately</div>
              </div>
              <div className="bg-red-800/60 p-3 rounded-xl border border-red-500/30">
                <div className="text-xs font-bold text-amber-300 uppercase">Step 2</div>
                <div className="text-sm font-semibold text-white">Call (800) 555-7473</div>
                <div className="text-xs text-red-200">Live dispatcher picks up in 3 rings</div>
              </div>
              <div className="bg-red-800/60 p-3 rounded-xl border border-red-500/30">
                <div className="text-xs font-bold text-amber-300 uppercase">Step 3</div>
                <div className="text-sm font-semibold text-white">45-Min Arrival</div>
                <div className="text-xs text-red-200">On-site master plumber fixes it</div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Emergency Call Buttons */}
          <div className="lg:col-span-5 bg-red-900/80 p-6 sm:p-8 rounded-3xl border border-red-500/50 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-red-600 mx-auto flex items-center justify-center shadow-lg">
              <Phone className="w-8 h-8 animate-pulse" />
            </div>

            <div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
                Direct Emergency Dispatch Line
              </div>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="text-3xl sm:text-4xl font-black text-white hover:text-amber-200 transition-colors block mt-1 tracking-tight"
              >
                {COMPANY_INFO.phone}
              </a>
              <div className="text-xs text-red-200 mt-1">
                Zero Overtime Surprise Fees • Flat-Rate Pricing
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex-1 bg-white hover:bg-slate-100 active:bg-slate-200 text-red-700 font-black py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-95 text-center flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-red-600" />
                <span>Call Now (24/7)</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="flex-1 bg-red-800 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl border border-red-400/40 transition-colors text-center text-sm"
              >
                Request Dispatch Online
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
