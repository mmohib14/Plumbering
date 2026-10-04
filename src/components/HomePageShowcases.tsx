import React from 'react';
import { ArrowRight, BadgeCheck, Clock3, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS_DATA, SERVICES_DATA } from '../data/plumbingData';
import { ServiceArea, ServiceItem } from '../types';
import { ContactInquiryForm } from './ContactInquiryForm';
import { getShortAreaName, getShortServiceName } from '../services/displayLabels';

interface HomePageShowcasesProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectTab: (tab: string) => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectServiceArea: (area: ServiceArea) => void;
  onSubmitInquiry: (inquiry: { name: string; phone: string; email: string; message: string }) => void;
}

const otherPages = [
  {
    label: 'Emergency',
    title: <>Urgent Plumbing Emergency? <span className="text-orange-800">We Arrive in Under 45 Minutes</span></>,
    description: 'Burst pipes, sewage backups, leaks, and overflows. 24/7 emergency plumbing.',
    tab: 'emergency',
    action: 'Explore emergency service',
    serviceId: 'emergency-plumbing',
    callAction: 'Call Now',
  },
  {
    label: 'Commercial',
    title: <>Commercial Plumbing Contractors <span className="text-orange-800">Zero Downtime For Your Business</span></>,
    description: 'Repairs, inspections, replacements, and maintenance for businesses.',
    tab: 'commercial',
    action: 'Explore commercial plumbing',
    serviceId: 'commercial-plumbing',
    callAction: 'Call Commercial Desk',
  },
  {
    label: 'Pricing',
    title: 'Instant Plumbing Cost Estimator',
    description: 'Estimate common repairs using national labor averages and OEM parts. No email required.',
    tab: 'calculator',
    action: 'Open cost estimator',
  },
  {
    label: 'Customer feedback',
    title: 'What Our Customers Say',
    description: 'Reviews from homeowners and business managers who trust USA Pro Plumbing.',
    tab: 'reviews',
    action: 'Read customer reviews',
  },
  {
    label: 'Knowledge center',
    title: 'Plumbing Advice & Educational Guides',
    description: 'Master plumber guides for water damage prevention, hot water systems, and emergency shutoffs.',
    tab: 'blog',
    action: 'Browse plumbing guides',
  },
  {
    label: 'Contact',
    title: 'Contact USA Pro Plumbing & Rooter',
    description: 'Call our 24/7 dispatch team or submit an inquiry.',
    tab: 'contact',
    action: 'Contact our team',
  },
] as const;

export const HomePageShowcases: React.FC<HomePageShowcasesProps> = ({
  onOpenBooking,
  onSelectTab,
  onSelectService,
  onSelectServiceArea,
  onSubmitInquiry,
}) => (
  <div className="border-t border-slate-200 bg-slate-50">
    <section id="home-services" className="scroll-mt-24 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">Plumbing services</p>
            <h2 className="mt-2 text-2xl font-extrabold text-(--color-navy) sm:text-3xl">The right help for the plumbing job at hand.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">From emergency repairs to planned upgrades, explore our services and see what each includes.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => onOpenBooking()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300">Request service <ArrowRight className="h-4 w-4" /></button>
            <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-bold text-(--color-navy) hover:border-amber-400 hover:bg-amber-50"><Phone className="h-4 w-4 text-orange-800" />Call {COMPANY_INFO.phone}</a>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES_DATA.map(service => (
            <article key={service.id} className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
              <button type="button" onClick={() => onSelectService(service)} className="group relative block aspect-[16/10] overflow-hidden bg-slate-100 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-orange-500">
                <img src={service.imageUrl} alt={service.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                <span className="absolute bottom-2 left-2 rounded-md bg-white/95 px-2.5 py-1 text-xs font-extrabold text-(--color-navy)">{service.priceRange} <span className="font-medium text-slate-600">· {service.unit}</span></span>
              </button>
              <div className="flex flex-1 flex-col p-3.5">
                <h3 className="text-sm font-extrabold leading-5 text-(--color-navy)">{getShortServiceName(service)}</h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-5 text-slate-600">{service.shortDesc}</p>
                <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1 border-t border-slate-100 pt-2 text-[9px] font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-700" />Licensed &amp; insured</span>
                  <span className="inline-flex items-center gap-1"><BadgeCheck className="h-3 w-3 text-orange-800" />Upfront pricing</span>
                  {service.isEmergency && <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3 text-orange-800" />24/7 availability</span>}
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <button type="button" onClick={() => onSelectService(service)} className="inline-flex min-h-9 items-center gap-1 text-xs font-bold text-(--color-navy) underline decoration-slate-300 underline-offset-4 hover:decoration-amber-500">Service details <ArrowRight className="h-3.5 w-3.5" /></button>
                  <button type="button" onClick={() => onOpenBooking(service.id)} className="inline-flex min-h-9 items-center justify-center rounded-md bg-amber-400 px-3 text-xs font-extrabold text-slate-950 hover:bg-amber-300">Book this service</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <button type="button" onClick={() => onSelectTab('services')} className="mt-5 inline-flex min-h-10 items-center gap-1 text-sm font-bold text-(--color-navy) hover:text-orange-900">Explore all services <ArrowRight className="h-4 w-4" /></button>
      </div>
    </section>

    <section id="home-service-areas" className="scroll-mt-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-6 border-b border-slate-200 pb-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">Service coverage</p>
            <h2 className="mt-2 text-2xl font-extrabold text-(--color-navy) sm:text-3xl">Find your local USA Pro service hub.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Explore our listed metro areas and ZIP codes. Call dispatch to confirm availability for your address.</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">
            <span><strong className="text-lg text-(--color-navy)">{SERVICE_AREAS_DATA.length}</strong><br />Listed metro hubs</span>
            <span><strong className="text-lg text-(--color-navy)">{SERVICE_AREAS_DATA.reduce((count, area) => count + area.zipCodes.length, 0)}</strong><br />Configured ZIP codes</span>
            <span><strong className="text-lg text-(--color-navy)">24/7</strong><br />Emergency dispatch</span>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICE_AREAS_DATA.map(area => (
            <article key={area.id} className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-800">Local service hub · {area.state}</p>
              <h3 className="mt-2 text-base font-extrabold leading-5 text-(--color-navy)">{getShortAreaName(area)}, {area.state}</h3>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">Serving {area.metroArea}.</p>
              <span className="mt-2 self-start rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">{area.activeHub ? 'Active hub' : 'Listed area'}</span>
              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-xs">
                <div><p className="font-extrabold text-(--color-navy)">~{area.averageResponseMinutes} min</p><p className="mt-0.5 text-slate-500">Average response time</p></div>
                <div><p className="font-extrabold text-(--color-navy)">{area.techniciansAvailable}</p><p className="mt-0.5 text-slate-500">Technicians available</p></div>
              </div>
              <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-4 text-slate-600"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-800" />{area.hubAddress}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                <button type="button" onClick={() => onSelectServiceArea(area)} className="inline-flex min-h-9 items-center gap-1 text-xs font-bold text-(--color-navy) underline decoration-slate-300 underline-offset-4 hover:decoration-amber-500">Hub details <ArrowRight className="h-3.5 w-3.5" /></button>
                <a href={`tel:${area.phone.replace(/\D/g, '')}`} className="inline-flex min-h-9 items-center gap-1.5 rounded-md bg-amber-100 px-2.5 text-xs font-bold text-(--color-navy) hover:bg-amber-200"><Phone className="h-3.5 w-3.5" />Call {area.phone}</a>
              </div>
              <button type="button" onClick={() => onOpenBooking()} className="mt-2 inline-flex min-h-9 items-center justify-center rounded-md bg-amber-400 px-3 text-xs font-extrabold text-slate-950 hover:bg-amber-300">Request service</button>
            </article>
          ))}
        </div>
        <button type="button" onClick={() => onSelectTab('service-areas')} className="mt-5 inline-flex min-h-10 items-center gap-1 text-sm font-bold text-(--color-navy) hover:text-orange-900">Browse all service hubs <ArrowRight className="h-4 w-4" /></button>
      </div>
    </section>

    <section id="home-more-pages" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">More from USA Pro</p>
          <h2 className="mt-2 text-2xl font-extrabold text-(--color-navy) sm:text-3xl">Explore more ways we can help.</h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otherPages.map(page => (
            <article key={page.tab} className="flex min-w-0 flex-col border-t border-slate-200 py-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-800">{page.label}</p>
              <h3 className="mt-1.5 text-sm font-extrabold leading-5 text-(--color-navy)">{page.title}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-5 text-slate-600">{page.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {'serviceId' in page && (
                  <>
                    <button type="button" onClick={() => onOpenBooking(page.serviceId)} className="inline-flex min-h-9 items-center justify-center rounded-md bg-amber-400 px-3 text-xs font-extrabold text-slate-950 hover:bg-amber-300">{page.tab === 'emergency' ? 'Book Emergency Service' : 'Book Commercial Service'}</button>
                    <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="inline-flex min-h-9 items-center gap-1.5 text-xs font-bold text-(--color-navy)"><Phone className="h-3.5 w-3.5 text-orange-800" />{page.callAction}</a>
                  </>
                )}
                <button type="button" onClick={() => onSelectTab(page.tab)} className="inline-flex min-h-9 items-center gap-1 text-xs font-bold text-(--color-navy) underline decoration-slate-300 underline-offset-4 hover:decoration-amber-500">{page.action} <ArrowRight className="h-3.5 w-3.5" /></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="home-customer-support" className="scroll-mt-24 border-t border-slate-200 bg-(--color-ice)">
      <div className="mx-auto max-w-7xl px-4 py-12 pb-28 sm:px-6 sm:py-16 sm:pb-28 lg:px-8 xl:pb-16">
        <div className="mx-auto mb-7 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-950">24/7 National Dispatch Center</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Contact USA Pro Plumbing &amp; Rooter</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">Reach our live dispatch operators 24 hours a day, 7 days a week, or submit an electronic inquiry below.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-12 lg:items-stretch lg:gap-6">
          <aside className="flex flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-(--color-navy) p-5 text-white shadow-lg shadow-slate-900/10 sm:p-7 lg:col-span-5 lg:p-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-300">Need help now?</p>
              <h3 className="mt-2 text-xl font-extrabold leading-tight sm:text-2xl">Talk with our dispatch team.</h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">Available 24 hours a day, 7 days a week.</p>
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300 sm:w-auto">
                <Phone className="h-4 w-4" />Call {COMPANY_INFO.phone}
              </a>
            </div>
            <div className="space-y-3 border-t border-white/15 pt-4">
              <p className="flex items-start gap-2.5 text-xs leading-5 text-slate-200"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />{COMPANY_INFO.email}</p>
              <p className="flex items-start gap-2.5 text-xs leading-5 text-slate-200"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />{COMPANY_INFO.hqAddress}</p>
              <p className="flex items-start gap-2.5 text-xs leading-5 text-slate-200"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />{COMPANY_INFO.license} · {COMPANY_INFO.insurance}</p>
            </div>
          </aside>
          <div className="lg:col-span-7">
            <ContactInquiryForm variant="home" onSubmitInquiry={onSubmitInquiry} />
          </div>
        </div>
      </div>
    </section>
  </div>
);
