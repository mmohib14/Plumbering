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
    <div className="min-h-screen bg-white text-slate-900">
      {/* Emergency Hero Banner */}
      <section className="relative overflow-hidden border-b border-orange-200 bg-[#fff7f2] py-16 sm:py-24">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fb923c_0.7px,transparent_0.7px)] bg-size-[20px_20px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-(--color-orange) px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-slate-950 mb-6">
            <Flame className="w-4 h-4 fill-slate-950" />
            <span>24/7 Live Emergency Dispatch Active</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Urgent Plumbing Emergency? <br />
            <span className="text-(--color-orange-dark)">We Arrive in Under 45 Minutes</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
            Burst pipes, sewage backups, leaks, and overflows. A licensed plumber is ready 24/7.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-(--color-orange) hover:bg-(--color-orange-dark) active:bg-orange-800 text-slate-950 font-black text-sm px-5 py-3 rounded-lg shadow-lg shadow-orange-600/20 transition-transform active:scale-95"
            >
              <Phone className="w-4 h-4 mr-2 animate-pulse" />
              <span>Call Now</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-orange-50 text-slate-800 font-bold text-sm px-5 py-3 rounded-lg border border-slate-300 transition-colors"
            >
              Book Emergency Service
            </button>
          </div>

          {/* Quick 3-Step Emergency Guide */}
          <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="bg-white p-5 rounded-2xl border border-orange-200 shadow-sm">
              <span className="text-xs font-black text-(--color-orange-dark) uppercase">Emergency Protocol 1</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">Shut Off Water Main</h3>
              <p className="text-xs text-slate-600 mt-1">
                Turn your home's main water meter or street gate valve clockwise until it stops to prevent further flooding.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-orange-200 shadow-sm">
              <span className="text-xs font-black text-(--color-orange-dark) uppercase">Emergency Protocol 2</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">Avoid Standing Water</h3>
              <p className="text-xs text-slate-600 mt-1">
                If standing water reaches electrical baseboard heaters, outlets, or appliances, shut off power at the main electrical breaker panel.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-orange-200 shadow-sm">
              <span className="text-xs font-black text-(--color-orange-dark) uppercase">Emergency Protocol 3</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">Stay On The Line</h3>
              <p className="text-xs text-slate-600 mt-1">
                Call our dispatch desk immediately. Our coordinator will provide safety instructions while your assigned plumber drives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Emergencies Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-(--color-orange-dark) font-bold text-xs uppercase tracking-widest">
            24/7 Rapid Response Services
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
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
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-orange-950 uppercase tracking-wider bg-orange-100 px-2 py-0.5 rounded border border-orange-200">
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-3">{item.title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between">
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="text-xs font-bold text-orange-900 hover:text-orange-700 flex items-center"
                >
                  <Phone className="w-3.5 h-3.5 mr-1" />
                  Call {COMPANY_INFO.phone}
                </a>
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-950"
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
