import React from 'react';
import { ArrowUpRight, Wrench } from 'lucide-react';
import { SERVICES_DATA } from '../data/plumbingData';
import { ServiceItem } from '../types';

interface ServiceHighlightsProps {
  onSelectService: (service: ServiceItem) => void;
  onSelectTab: (tab: string) => void;
}

export const ServiceHighlights: React.FC<ServiceHighlightsProps> = ({
  onSelectService,
  onSelectTab
}) => {
  const featuredServices = SERVICES_DATA.slice(0, 3);

  return (
    <section className="border-b border-slate-200 bg-(--color-ice) py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-(--color-orange)">
              Popular solutions
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-(--color-navy) sm:text-4xl">
              Plumbing help for every kind of job
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              From urgent repairs to planned upgrades, our licensed team brings the right tools and a clear quote to every appointment.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('services')}
            className="inline-flex items-center gap-1 self-start text-sm font-black text-(--color-navy) transition-colors hover:text-(--color-orange) sm:self-auto"
          >
            View all services
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredServices.map((service) => (
            <button
              key={service.id}
              onClick={() => onSelectService(service)}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-(--color-orange) hover:shadow-xl"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-200">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-(--color-navy)/85 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-(--color-orange) px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-(--color-charcoal)">
                  <Wrench className="h-3 w-3" />
                  {service.isEmergency ? '24/7 response' : service.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-black leading-snug text-(--color-navy)">
                  {service.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                  {service.shortDesc}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-black text-(--color-orange)">
                  Explore service
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
