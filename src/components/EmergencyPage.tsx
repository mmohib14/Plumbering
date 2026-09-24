import React from 'react';
import { 
  Flame, 
  Phone, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Wrench, 
  Waves,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/plumbingData';

interface EmergencyPageProps {
  onOpenBooking: () => void;
}

export const EmergencyPage: React.FC<EmergencyPageProps> = ({ onOpenBooking }) => {
  const emergencyServices = SERVICES_DATA.filter(s => s.isEmergency);

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Emergency Hero Banner */}
      <section className="relative py-16 sm:py-24 bg-linear-to-b from-red-950 via-slate-900 to-slate-900 overflow-hidden border-b border-red-900/50">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ef4444_1px,transparent_1px)] bg-size-[20px_20px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white emergency-glow mb-6">
            <Flame className="w-4 h-4 fill-white" />
            <span>24/7 Live Emergency Dispatch Active</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Urgent Plumbing Emergency? <br />
            <span className="text-red-500">We Arrive in Under 45 Minutes</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Burst pipes, sewage backups, leaks, and overflows. A licensed plumber is ready 24/7.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-sm px-5 py-3 rounded-lg shadow-2xl shadow-red-600/40 transition-transform active:scale-95 emergency-glow"
            >
              <Phone className="w-4 h-4 mr-2 animate-pulse" />
              <span>Call Now</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-5 py-3 rounded-lg border border-slate-700 transition-colors"
            >
              Book Emergency Service
            </button>
          </div>

          {/* Quick 3-Step Emergency Guide */}
          <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-red-500/30">
              <span className="text-xs font-black text-red-400 uppercase">Emergency Protocol 1</span>
              <h3 className="text-base font-bold text-white mt-1">Shut Off Water Main</h3>
              <p className="text-xs text-slate-400 mt-1">
                Turn your home's main water meter or street gate valve clockwise until it stops to prevent further flooding.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-red-500/30">
              <span className="text-xs font-black text-amber-400 uppercase">Emergency Protocol 2</span>
              <h3 className="text-base font-bold text-white mt-1">Avoid Standing Water</h3>
              <p className="text-xs text-slate-400 mt-1">
                If standing water reaches electrical baseboard heaters, outlets, or appliances, shut off power at the main electrical breaker panel.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-red-500/30">
              <span className="text-xs font-black text-emerald-400 uppercase">Emergency Protocol 3</span>
              <h3 className="text-base font-bold text-white mt-1">Stay On The Line</h3>
              <p className="text-xs text-slate-400 mt-1">
                Call our dispatch desk immediately. Our coordinator will provide safety instructions while your assigned plumber drives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Emergencies Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-red-400 font-bold text-xs uppercase tracking-widest">
            24/7 Rapid Response Services
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-2">
            Plumbing Disasters We Fix Same-Day
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Burst & Split Frozen Pipes",
              desc: "Immediate line freeze or mechanical crimp repairs to isolate damaged piping and restore household supply safely.",
              tag: "Under 45-Min Arrival"
            },
            {
              title: "Raw Sewage Main Backups",
              desc: "Heavy-duty 4,000 PSI hydro jetters and mechanical root cutters clear main drain obstructions fast.",
              tag: "Priority Sanitization"
            },
            {
              title: "Ruptured Water Heater Tanks",
              desc: "Leaking 50-gallon tanks can dump hundreds of gallons of water. We pump out tanks and install code-compliant replacements.",
              tag: "Same-Day Replacement"
            },
            {
              title: "Active Hidden Slab Leaks",
              desc: "Ultrasonic acoustic locating pinpoints copper pipe pinholes under foundation concrete without tearing up floors.",
              tag: "Electronic Detection"
            },
            {
              title: "Overflowing Toilets & Cleanouts",
              desc: "When shutoff angle stops fail or sewage bubbles up through bathtubs, our techs restore drainage immediately.",
              tag: "24/7 Dispatch"
            },
            {
              title: "Commercial Restaurant Stoppages",
              desc: "Grease trap overflows and restaurant kitchen drain blockages cleared quickly to prevent forced health code closures.",
              tag: "Commercial Priority"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider bg-red-950/80 px-2 py-0.5 rounded border border-red-800/40">
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-white mt-3">{item.title}</h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center"
                >
                  <Phone className="w-3.5 h-3.5 mr-1" />
                  Call (800) 555-PIPE
                </a>
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Dispatch Van →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
