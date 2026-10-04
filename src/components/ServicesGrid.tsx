import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Flame, Phone } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/plumbingData';
import { ServiceItem } from '../types';

interface ServicesGridProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: (serviceId?: string) => void;
}

const FILTERS = [
  { id: 'all', label: 'All services' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'drain-sewer', label: 'Drain & sewer' },
  { id: 'water-heater', label: 'Water heaters' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
];

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService, onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const featured = SERVICES_DATA.find(service => service.id === 'emergency-plumbing');
  const filteredServices = useMemo(() => SERVICES_DATA.filter(service =>
    activeCategory === 'all' ||
    (activeCategory === 'emergency' ? service.isEmergency : service.category === activeCategory)
  ), [activeCategory]);
  const selectedFilter = FILTERS.find(filter => filter.id === activeCategory)?.label ?? 'All services';

  return (
    <div className="bg-white text-slate-900">
      {featured && activeCategory === 'all' && (
        <section className="bg-(--color-navy) text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-16">
            <div>
              <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-300"><Flame className="h-4 w-4" /> Plumbing services</p>
              <h1 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.8rem]">The right help for the plumbing job at hand.</h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-slate-200">From emergency repairs to planned upgrades, explore our services and see what each includes.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => onOpenBooking()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300">Request service <ArrowRight className="h-4 w-4" /></button>
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 px-5 text-sm font-bold text-white hover:bg-white/10"><Phone className="h-4 w-4" />Call {COMPANY_INFO.phone}</a>
              </div>
            </div>
            <button type="button" onClick={() => onSelectService(featured)} className="group relative aspect-[16/10] overflow-hidden rounded-2xl text-left lg:aspect-auto lg:h-80">
              <img src={featured.imageUrl} alt={featured.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" fetchPriority="high" />
              <span className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
              <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                <span><span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-950"><Flame className="h-3 w-3" /> 24/7 emergency</span><span className="mt-2 block text-xl font-extrabold text-white sm:text-2xl">{featured.title}</span><span className="mt-1 block text-xs text-slate-200">{featured.priceRange} · {featured.unit}</span></span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-(--color-navy)"><ArrowRight className="h-5 w-5" /></span>
              </span>
            </button>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">Explore our capabilities</p>
            <h2 className="mt-2 text-2xl font-extrabold text-(--color-navy) sm:text-3xl">
              {activeCategory === 'all' ? 'Find the service you need' : `${selectedFilter} services`}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Compare service details, typical price ranges, and common signs. Final pricing is confirmed before work begins.</p>
          </div>
          <div className="relative sm:hidden">
            <button type="button" aria-expanded={showFilters} onClick={() => setShowFilters(open => !open)} className="flex min-h-11 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold text-(--color-navy)">
              {selectedFilter}<ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            {showFilters && <div className="absolute left-0 right-0 z-20 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">{FILTERS.map(filter => <button key={filter.id} type="button" onClick={() => { setActiveCategory(filter.id); setShowFilters(false); }} className={`block min-h-11 w-full px-4 text-left text-sm ${activeCategory === filter.id ? 'bg-amber-50 font-bold text-orange-900' : 'text-slate-700 hover:bg-slate-50'}`}>{filter.label}</button>)}</div>}
          </div>
          <div className="hidden flex-wrap gap-2 sm:flex">
            {FILTERS.map(filter => (
              <button key={filter.id} type="button" aria-pressed={activeCategory === filter.id} onClick={() => setActiveCategory(filter.id)} className={`min-h-10 rounded-full px-4 text-xs font-bold transition-colors ${activeCategory === filter.id ? 'bg-(--color-navy) text-white' : 'border border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-amber-50'}`}>{filter.label}</button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {filteredServices.map((service, index) => (
            <article key={service.id} className="grid items-center gap-5 py-7 sm:py-9 md:grid-cols-2 md:gap-9 lg:gap-14">
              <button type="button" onClick={() => onSelectService(service)} className={`group relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${index % 2 ? 'md:order-2' : ''}`}>
                <img src={service.imageUrl} alt={service.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                {service.isEmergency && <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-slate-950"><Flame className="h-3 w-3" /> Emergency available</span>}
              </button>
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-500">
                  <span>0{index + 1}</span><span className="h-1 w-1 rounded-full bg-amber-500" /><span>{service.category.replace('-', ' ')}</span>
                </div>
                <h3 className="mt-2 text-xl font-extrabold leading-snug text-(--color-navy) sm:text-2xl">{service.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{service.shortDesc}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {service.commonSymptoms.slice(0, 2).map(symptom => <p key={symptom} className="flex items-start gap-2 text-xs leading-5 text-slate-700"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" />{symptom}</p>)}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-200 pt-4">
                  <span><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Typical range</span><span className="text-sm font-extrabold text-(--color-navy)">{service.priceRange}</span></span>
                  <span className="text-xs text-slate-600">{service.unit}</span>
                  <span className="ml-auto flex w-full gap-2 sm:w-auto">
                    <button type="button" onClick={() => onSelectService(service)} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1 text-xs font-bold text-(--color-navy) hover:text-orange-900 sm:flex-initial">Service details <ArrowRight className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => onOpenBooking(service.id)} className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg bg-amber-400 px-4 text-xs font-extrabold text-slate-950 hover:bg-amber-300 sm:flex-initial">Book service</button>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredServices.length === 0 && <p className="py-12 text-center text-sm text-slate-600">No services match this category.</p>}
        <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">Price ranges are typical guides; a plumber confirms the final quote on site before work begins. Service availability varies by ZIP code.</p>
      </section>
    </div>
  );
};
