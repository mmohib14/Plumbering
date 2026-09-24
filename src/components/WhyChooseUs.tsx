import React, { useState } from 'react';
import { 
  Zap, 
  Award, 
  DollarSign, 
  Wrench, 
  Sparkles, 
  Building, 
  Clock, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/plumbingData';

export const WhyChooseUs: React.FC = () => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "Fast 45-Min Emergency Response",
      desc: "Our GPS-tracked fleet is distributed throughout metropolitan hubs to reach your home rapidly before minor leaks cause catastrophic flooding."
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: "Licensed Master Plumbers",
      desc: "Every technician is state-licensed, background-checked, drug-tested, and brings over 10+ years of hands-on mechanical experience."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      title: "100% Upfront Flat-Rate Pricing",
      desc: "You receive a transparent quote in writing before any wrench turns. No hourly guessing, no hidden travel charges, and no overtime surprises."
    },
    {
      icon: <Wrench className="w-6 h-6 text-indigo-600" />,
      title: "Rolling Warehouse Vans",
      desc: "Our heavy-duty vans carry over 1,200 OEM replacement parts, brass fittings, water heaters, and hydro-jetters for 94% same-day job completion."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-sky-500" />,
      title: "Clean Home White-Glove Guarantee",
      desc: "We wear sanitary boot covers, lay durable neoprene floor runners, and leave your bathroom, kitchen, or utility room spotless."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
      title: "1-Year Parts & Labor Warranty",
      desc: "We stand firmly behind our craftsmanship. If anything fails on an installed repair within 365 days, we return and fix it free."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-100/70 px-3 py-1 rounded-full">
            The USA Pro Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Why Homeowners & Businesses Choose Us
          </h2>
          <p className="text-base text-slate-600 mt-3">
            We know finding a trustworthy plumber can be stressful. We built our entire business model on honesty, clean craftsmanship, and guaranteed upfront pricing.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md sm:p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-transform group-hover:scale-105">
                {item.icon}
              </div>
              <h3 className="mb-1.5 text-base font-bold text-slate-900">
                {item.title}
              </h3>
              <p className={`text-xs leading-relaxed text-slate-600 ${expandedFeature === idx ? '' : 'line-clamp-2'}`}>
                {item.desc}
              </p>
              <button
                type="button"
                onClick={() => setExpandedFeature(expandedFeature === idx ? null : idx)}
                className="mt-3 self-start text-xs font-bold text-blue-600 transition-colors hover:text-blue-800"
                aria-expanded={expandedFeature === idx}
              >
                {expandedFeature === idx ? 'Hide details' : 'View details'}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Trust Stat Bar */}
        <div className="mt-14 bg-linear-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">14,800+</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Jobs Fixed Since 2008</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">4.9★</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Average Google Rating</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-sky-400">&lt; 45m</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Average Dispatch Arrival</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">100%</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Upfront Pricing Guarantee</div>
          </div>
        </div>

      </div>
    </section>
  );
};
