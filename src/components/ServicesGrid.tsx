import React, { useState } from 'react';
import { 
  Wrench, 
  Flame, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  DollarSign, 
  Clock, 
  Waves, 
  Disc, 
  SearchCheck, 
  Building2, 
  Droplet 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/plumbingData';
import { ServiceItem, ServiceCategory } from '../types';

interface ServicesGridProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onSelectService,
  onOpenBooking
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : activeCategory === 'emergency'
      ? SERVICES_DATA.filter(s => s.isEmergency)
      : SERVICES_DATA.filter(s => s.category === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'FlameAlert':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-blue-600" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-600" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-indigo-600" />;
      case 'SearchCheck':
        return <SearchCheck className="w-5 h-5 text-sky-600" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-emerald-600" />;
      default:
        return <Wrench className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-100/70 px-3 py-1 rounded-full">
            Complete Plumbing Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Our Professional Plumbing Services
          </h2>
          <p className="text-base text-slate-600 mt-3">
            From midnight emergency pipe bursts to tankless water heaters and trenchless sewer repair, our licensed master plumbers get the job done right the first time.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Plumbing Services' },
              { id: 'emergency', label: '🚨 Emergency 24/7' },
              { id: 'drain-sewer', label: 'Drain & Sewer' },
              { id: 'water-heater', label: 'Water Heaters' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
            >
              {/* Card Image Banner */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                
                {/* Badges on Image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {service.isEmergency && (
                    <span className="bg-red-600 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md flex items-center">
                      <Flame className="w-3 h-3 mr-1 fill-white" />
                      24/7 Emergency
                    </span>
                  )}
                  <span className="bg-slate-900/80 backdrop-blur-sm text-slate-200 text-[11px] font-bold px-2 py-0.5 rounded-full border border-slate-700">
                    Same-Day Available
                  </span>
                </div>

                {/* Price Pill */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-slate-900 font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-sm border border-slate-200">
                  Est: <span className="text-blue-700">{service.priceRange}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Common Symptoms Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Common Signs:
                  </span>
                  <ul className="space-y-1">
                    {service.commonSymptoms.slice(0, 2).map((symptom, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1.5 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="pt-3 grid grid-cols-2 gap-2 border-t border-slate-100">
                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 px-3 rounded-xl transition-colors text-center"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-colors shadow-sm flex items-center justify-center space-x-1"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-slate-900">
              Don't see your exact plumbing problem listed above?
            </h4>
            <p className="text-sm text-slate-600">
              We service all residential, commercial, gas, and sewer plumbing systems in the United States.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-md shadow-blue-600/20 shrink-0"
          >
            Describe Your Problem & Get Instant Quote
          </button>
        </div>

      </div>
    </section>
  );
};
