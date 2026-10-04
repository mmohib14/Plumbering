import React from 'react';
import { ArrowRight, Check, Clock3, MapPin, Phone, ShieldCheck, Users } from 'lucide-react';
import { COMPANY_INFO, REVIEWS_DATA, SERVICE_AREAS_DATA, SERVICES_DATA } from '../data/plumbingData';
import { ServiceArea, ServiceItem } from '../types';
import { getServiceAreaSlug } from '../services/routes';
import { FeaturedReview } from './FeaturedReview';

interface ServiceAreaDetailPageProps {
  area: ServiceArea;
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: () => void;
}

export const ServiceAreaDetailPage: React.FC<ServiceAreaDetailPageProps> = ({
  area,
  onSelectService,
  onOpenBooking,
}) => {
  const locationTerms = [area.city, area.metroArea].join(' ')
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter(term => term.length > 3 && !['metro', 'greater', 'central'].includes(term));
  const areaReviews = REVIEWS_DATA.filter(review => {
    const reviewLocation = review.location.toLowerCase();
    return review.verified && locationTerms.some(term => reviewLocation.includes(term));
  });
  const featuredReview = areaReviews[0];
  const neighboringPlaces = area.metroArea.split(',').map(place => place.trim()).filter(Boolean);

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-(--color-navy) text-white">
        <div className="pointer-events-none absolute -right-16 -top-20 h-80 w-80 rounded-full border border-white/10 sm:right-12 sm:top-0" />
        <div className="pointer-events-none absolute -right-6 top-2 h-56 w-56 rounded-full border border-amber-300/20 sm:right-24 sm:top-12" />
        <div className="relative mx-auto grid max-w-7xl gap-9 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-300"><MapPin className="h-4 w-4" /> Local service hub · {area.state}</p>
            <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.8rem]">Plumbing service in {area.city}</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">USA Pro serves {area.metroArea}. ZIP coverage varies by address—call to confirm service availability.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={onOpenBooking} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-extrabold text-slate-950 hover:bg-amber-300">Request service <ArrowRight className="h-4 w-4" /></button>
              <a href={`tel:${area.phone.replace(/\D/g, '')}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 px-5 text-sm font-bold text-white hover:bg-white/10"><Phone className="h-4 w-4" /> Call {area.phone}</a>
            </div>
          </div>
          <div className="relative rounded-2xl border border-white/15 bg-white/[0.06] p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-amber-300">Hub at a glance</span>
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200">{area.activeHub ? 'Active hub' : 'Listed area'}</span>
            </div>
            <div className="grid grid-cols-2 gap-5 py-5">
              <div><Clock3 className="h-4 w-4 text-amber-300" /><p className="mt-2 text-2xl font-extrabold">~{area.averageResponseMinutes} min</p><p className="mt-1 text-xs text-slate-300">Average response time</p></div>
              <div><Users className="h-4 w-4 text-amber-300" /><p className="mt-2 text-2xl font-extrabold">{area.techniciansAvailable}</p><p className="mt-1 text-xs text-slate-300">Technicians available</p></div>
            </div>
            <div className="border-t border-white/15 pt-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-300">Local hub address</p>
              <p className="mt-1.5 text-sm leading-6 text-white">{area.hubAddress}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">Neighborhood coverage</p>
            <h2 className="mt-2 text-xl font-extrabold text-(--color-navy)">Communities around {area.city}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Local coverage includes these nearby communities and configured ZIP codes.</p>
          </div>
          <div>
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              {neighboringPlaces.map(place => (
                <li key={place} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-orange-800" />{place}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-slate-200 pt-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">Configured ZIP codes</p>
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`Listed ZIP codes for ${area.city}`}>
                {area.zipCodes.map(zip => <li key={zip} className="rounded bg-(--color-navy) px-2 py-1 font-mono text-[11px] font-bold text-white">{zip}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-11 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-14">
          <div className="self-start lg:sticky lg:top-28">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">Local service menu</p>
            <h2 className="mt-2 text-2xl font-extrabold text-(--color-navy) sm:text-3xl">How can we help?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Explore available plumbing services in {area.city}. Ask dispatch to verify coverage for your address.</p>
            <div className="mt-5 flex items-start gap-3 border-t border-slate-200 pt-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              <p className="text-xs leading-5 text-slate-600">{COMPANY_INFO.license}<br />Licensed, bonded &amp; insured.</p>
            </div>
          </div>
          <div className="grid gap-x-8 lg:col-span-2 lg:grid-cols-2">
            {SERVICES_DATA.map((service, index) => (
              <article key={service.id} className="flex flex-col items-start border-t border-slate-200 py-4 transition-colors hover:bg-slate-50 sm:px-2">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-800">0{index + 1}<span className="mx-1.5 text-slate-300">·</span><span className="text-slate-500">{service.priceRange}</span></p>
                  <h3 className="mt-1 text-sm font-extrabold leading-5 text-(--color-navy)">{service.title}</h3>
                  <p className="mt-1 line-clamp-2 max-w-2xl text-xs leading-5 text-slate-600" title={service.shortDesc}>{service.shortDesc}</p>
                  <p className="mt-2 line-clamp-2 flex items-start gap-1.5 text-[11px] leading-5 text-slate-600" title={service.features[0]}><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" />{service.features[0]}</p>
                </div>
                <button type="button" onClick={() => onSelectService(service)} className="mt-3 inline-flex min-h-9 items-center gap-1 border-b border-amber-400 text-xs font-extrabold text-(--color-navy) transition-colors hover:text-orange-900">Explore service <ArrowRight className="h-3.5 w-3.5" /></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {featuredReview && (
        <FeaturedReview review={featuredReview} title="A local customer's experience" />
      )}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">Talk to the local hub</p><h2 className="mt-2 text-xl font-extrabold text-(--color-navy)">Plumbing help in {area.city}</h2><p className="mt-1 text-sm text-slate-600">Call to check coverage or request an appointment.</p></div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a href={`tel:${area.phone.replace(/\D/g, '')}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-bold text-(--color-navy) hover:border-amber-400 hover:bg-amber-50"><Phone className="h-4 w-4 text-orange-800" />{area.phone}</a>
            <button type="button" onClick={onOpenBooking} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 text-sm font-extrabold text-slate-950 hover:bg-amber-300">Book service <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="mt-7 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-4 sm:gap-8">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Other service hubs</h3>
            <p className="mt-1 text-xs text-slate-500">Explore coverage in other regions.</p>
          </div>
          <div className="grid gap-4 sm:col-span-3 sm:grid-cols-2">
            {[
              { label: 'Texas', areas: SERVICE_AREAS_DATA.filter(item => item.state === 'TX' && item.id !== area.id) },
              { label: 'Other regions', areas: SERVICE_AREAS_DATA.filter(item => item.state !== 'TX' && item.id !== area.id) },
            ].filter(group => group.areas.length > 0).map(group => (
              <div key={group.label}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{group.label}</p>
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
                  {group.areas.map(item => (
                    <li key={item.id}><a href={`/service-areas/${getServiceAreaSlug(item)}`} className="text-xs font-semibold text-(--color-navy) underline decoration-slate-300 underline-offset-4 hover:decoration-amber-500">{item.city}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
