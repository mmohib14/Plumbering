import React from 'react';
import { PhoneCall, Truck, ClipboardCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onOpenBooking: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      step: "01",
      icon: <PhoneCall className="w-6 h-6 text-(--color-orange-dark)" />,
      title: "Contact or Book Online",
      desc: "Share the issue and preferred time; dispatch confirms service availability."
    },
    {
      step: "02",
      icon: <Truck className="w-6 h-6 text-amber-500" />,
      title: "Swift GPS Dispatch",
      desc: "We check your ZIP and confirm the available appointment window by phone."
    },
    {
      step: "03",
      icon: <ClipboardCheck className="w-6 h-6 text-emerald-600" />,
      title: "Upfront Fixed Quote",
      desc: "Get an on-site flat-rate quote before any work begins."
    },
    {
      step: "04",
      icon: <CheckCircle2 className="w-6 h-6 text-(--color-orange-dark)" />,
      title: "Done Right & Guaranteed",
      desc: "We test the repair, tidy the workspace, and include a 1-year warranty."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-950 font-bold text-xs uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            How Our Plumbing Service Works
          </h2>
          <p className="text-base text-slate-600 mt-3">
            From your first phone call to complete cleanup and testing, we keep the entire repair process straightforward and stress-free.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((st, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm relative flex flex-col justify-between group hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {st.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-blue-200 transition-colors">
                    {st.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {st.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-orange-900 flex items-center">
                <span>Step {idx + 1} of 4</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center bg-(--color-orange) hover:bg-orange-500 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-orange-600/20 transition-all text-sm group"
          >
            <span>Schedule Your Service Call Now</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
