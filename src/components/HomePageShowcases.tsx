import React from 'react';
import { AlertTriangle, ArrowRight, BadgeCheck, BookOpen, Building2, Calculator, Clock3, CreditCard, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Star, Wrench } from 'lucide-react';
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
    title: 'Emergency Plumbing',
    description: '24/7 help for burst pipes, leaks, and sewer backups.',
    icon: <AlertTriangle className="h-4 w-4" />,
    tab: 'emergency',
    action: 'Explore emergency service',
    serviceId: 'emergency-plumbing',
    callAction: 'Call Now',
  },
  {
    label: 'Commercial',
    title: 'Commercial Plumbing',
    description: 'Repairs, inspections, replacements, and maintenance for businesses.',
    icon: <Building2 className="h-4 w-4" />,
    tab: 'commercial',
    action: 'Explore commercial plumbing',
    serviceId: 'commercial-plumbing',
    callAction: 'Call Commercial Desk',
  },
  {
    label: 'Pricing',
    title: 'Cost Estimator',
    description: 'Estimate common repairs with national labor averages and OEM parts.',
    icon: <Calculator className="h-4 w-4" />,
    tab: 'calculator',
    action: 'Open cost estimator',
  },
  {
    label: 'Customer feedback',
    title: 'Customer Reviews',
    description: 'Read feedback from homeowners and business managers.',
    icon: <Star className="h-4 w-4" />,
    tab: 'reviews',
    action: 'Read customer reviews',
  },
  {
    label: 'Knowledge center',
    title: 'Plumbing Guides',
    description: 'Advice on water damage, hot water systems, and emergency shutoffs.',
    icon: <BookOpen className="h-4 w-4" />,
    tab: 'blog',
    action: 'Browse plumbing guides',
  },
  {
    label: 'Contact',
    title: 'Contact Our Team',
    description: 'Call our 24/7 dispatch team or submit an inquiry.',
    icon: <MessageCircle className="h-4 w-4" />,
    tab: 'contact',
    action: 'Contact our team',
  },
] as const;

const serviceCardDescriptions: Record<string, string> = {
  'emergency-plumbing': '24/7 help for burst pipes, leaks, and sewer backups.',
  'drain-cleaning': 'Clear clogged drains with hydro jetting and rooter service.',
  'water-heater': 'Repair or replace tank and tankless water heaters.',
  'sewer-repair': 'Camera inspections and trenchless sewer repairs.',
  'leak-detection': 'Locate hidden and slab leaks with acoustic detection.',
  'commercial-plumbing': 'Repairs and maintenance for commercial properties.',
  repiping: 'Replace aging pipes with modern PEX or copper.',
  'fixture-repair': 'Repair faucets, toilets, showers, and disposals.',
};

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
              <button type="button" onClick={() => onSelectService(service)} aria-label={`View ${getShortServiceName(service)} service details`} className="group relative block aspect-[16/10] overflow-hidden bg-slate-100 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-orange-500">
                {service.imageUrl ? (
                  <img src={service.imageUrl} alt={service.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                ) : (
                  <span className="flex h-full items-center justify-center bg-gradient-to-br from-sky-100 via-white to-orange-100 text-(--color-navy)" aria-hidden="true">
                    <Wrench className="h-12 w-12" />
                  </span>
                )}
                <span aria-label={`Typical range: ${service.priceRange} for ${service.unit}`} className="absolute bottom-2 left-2 rounded-md bg-white/95 px-2.5 py-1 text-xs font-extrabold text-(--color-navy)">{service.priceRange}<span className="ml-1.5 text-[10px] font-semibold text-slate-600">typical range</span></span>
              </button>
              <div className="flex flex-1 flex-col p-3.5">
                <h3 className="text-sm font-extrabold leading-5 text-(--color-navy)">{getShortServiceName(service)}</h3>
                <p className="mt-1.5 line-clamp-2 min-h-9 flex-1 text-xs leading-4 text-slate-600">{serviceCardDescriptions[service.id] ?? service.shortDesc}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-slate-100 pt-2 text-[9px] font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-700" />Licensed &amp; insured</span>
                  <span className="inline-flex items-center gap-1"><BadgeCheck className="h-3 w-3 text-orange-800" />Upfront pricing</span>
                  {service.isEmergency && <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3 text-orange-800" />24/7</span>}
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <button type="button" onClick={() => onSelectService(service)} className="inline-flex min-h-10 items-center gap-1 text-xs font-bold text-(--color-navy) underline decoration-slate-300 underline-offset-4 hover:decoration-amber-500">Details <ArrowRight className="h-3.5 w-3.5" /></button>
                  <button type="button" onClick={() => onOpenBooking(service.id)} className="inline-flex min-h-10 items-center justify-center rounded-md bg-amber-400 px-3 text-xs font-extrabold text-slate-950 hover:bg-amber-300">Book service</button>
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
        <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">Service coverage</p>
            <h2 className="mt-2 text-2xl font-extrabold text-(--color-navy) sm:text-3xl">Find your local USA Pro service hub.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Browse metro hubs and ZIP codes. Call to confirm your address.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:min-w-[320px]">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-3 text-center">
              <strong className="block text-lg font-extrabold leading-5 text-(--color-navy)">{SERVICE_AREAS_DATA.length}</strong>
              <span className="mt-1 block text-[10px] font-semibold leading-4 text-slate-600">Metro hubs</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-3 text-center">
              <strong className="block text-lg font-extrabold leading-5 text-(--color-navy)">{SERVICE_AREAS_DATA.reduce((count, area) => count + area.zipCodes.length, 0)}</strong>
              <span className="mt-1 block text-[10px] font-semibold leading-4 text-slate-600">ZIP codes</span>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-3 text-center">
              <strong className="block text-lg font-extrabold leading-5 text-(--color-navy)">24/7</strong>
              <span className="mt-1 block text-[10px] font-semibold leading-4 text-slate-600">Dispatch</span>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICE_AREAS_DATA.map(area => (
            <article key={area.id} className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-lg sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-800">{area.state} service hub</p>
                  <h3 className="mt-1.5 text-base font-extrabold leading-5 text-(--color-navy)">{getShortAreaName(area)}, {area.state}</h3>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-orange-800 transition-colors group-hover:bg-amber-100"><MapPin className="h-4 w-4" /></span>
              </div>
              <p className="mt-2 line-clamp-1 text-xs leading-5 text-slate-600">{area.metroArea}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 border-y border-slate-100 py-3">
                <div><p className="text-sm font-extrabold text-(--color-navy)">~{area.averageResponseMinutes} min</p><p className="mt-0.5 text-[10px] text-slate-500">Avg. response</p></div>
                <div><p className="text-sm font-extrabold text-(--color-navy)">{area.zipCodes.length}</p><p className="mt-0.5 text-[10px] text-slate-500">Listed ZIP codes</p></div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                <button type="button" onClick={() => onSelectServiceArea(area)} className="inline-flex min-h-10 items-center gap-1 text-xs font-bold text-(--color-navy) underline decoration-slate-300 underline-offset-4 hover:decoration-amber-500">Hub details <ArrowRight className="h-3.5 w-3.5" /></button>
                <a href={`tel:${area.phone.replace(/\D/g, '')}`} aria-label={`Call ${getShortAreaName(area)} service hub`} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-amber-100 px-3 text-xs font-bold text-(--color-navy) hover:bg-amber-200"><Phone className="h-3.5 w-3.5" />Call</a>
              </div>
              <button type="button" onClick={() => onOpenBooking()} className="mt-2 inline-flex min-h-10 items-center justify-center rounded-lg bg-amber-400 px-3 text-xs font-extrabold text-slate-950 transition-colors hover:bg-amber-300">Request service</button>
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
            <article key={page.tab} className={`group flex h-full min-w-0 flex-col rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-5 ${page.tab === 'emergency' ? 'border-amber-200 bg-amber-50/70 hover:border-amber-300' : 'border-slate-200 bg-(--color-ice) hover:border-slate-300 hover:bg-white'}`}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-orange-800 shadow-sm ring-1 ring-slate-200/70">{page.icon}</span>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-800">{page.label}</p>
              </div>
              <h3 className="mt-3 text-base font-extrabold leading-5 text-(--color-navy)">{page.title}</h3>
              <p className="mt-1.5 line-clamp-2 min-h-10 flex-1 text-xs leading-5 text-slate-600">{page.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {'serviceId' in page && (
                  <>
                    <button type="button" onClick={() => onOpenBooking(page.serviceId)} className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg bg-amber-400 px-3 text-xs font-extrabold text-slate-950 transition-colors hover:bg-amber-300">{page.tab === 'emergency' ? 'Book emergency' : 'Book commercial'}</button>
                    <a href={`tel:${COMPANY_INFO.phoneRaw}`} aria-label={page.callAction} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-bold text-(--color-navy) transition-colors hover:border-amber-400 hover:bg-amber-50"><Phone className="h-3.5 w-3.5 text-orange-800" />Call</a>
                  </>
                )}
                <button type="button" onClick={() => onSelectTab(page.tab)} className="inline-flex min-h-10 items-center gap-1 text-xs font-bold text-(--color-navy) underline decoration-slate-300 underline-offset-4 hover:decoration-amber-500">{'serviceId' in page ? 'Explore details' : page.action} <ArrowRight className="h-3.5 w-3.5" /></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="home-customer-support" className="scroll-mt-24 border-t border-slate-200 bg-(--color-ice)">
      <div className="mx-auto max-w-7xl px-4 py-12 pb-28 sm:px-6 sm:py-16 sm:pb-28 lg:px-8 xl:pb-16">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-950"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />24/7 National Dispatch</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-(--color-navy) sm:text-3xl">How can we help?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">Call our dispatch team or send a message about your plumbing needs.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-12 lg:items-stretch lg:gap-6">
          <aside className="flex flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-linear-to-br from-(--color-navy) to-slate-900 p-5 text-white shadow-lg shadow-slate-900/10 sm:p-7 lg:col-span-5 lg:p-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-300">Need help now?</p>
              <h3 className="mt-2 text-xl font-extrabold leading-tight sm:text-2xl">Talk with our dispatch team.</h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">Get help any time, day or night.</p>
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 text-sm font-extrabold text-slate-950 shadow-md shadow-black/10 transition hover:bg-amber-300 sm:w-auto">
                <Phone className="h-4 w-4" />Call {COMPANY_INFO.phone}
              </a>
              <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-bold text-slate-100">
                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1">Licensed</span>
                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1">Bonded</span>
                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1">$2M insured</span>
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-start gap-2.5 text-xs leading-5 text-slate-100 underline decoration-white/30 underline-offset-2 hover:text-white"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />{COMPANY_INFO.email}</a>
              <p className="flex items-start gap-2.5 text-xs leading-5 text-slate-100"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />{COMPANY_INFO.hqAddress}</p>
              <p className="flex items-start gap-2.5 text-xs leading-5 text-slate-100"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />{COMPANY_INFO.license}</p>
              <div className="border-t border-white/10 pt-3">
                <p className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-slate-300">Payment options</p>
                <div className="flex flex-wrap gap-1.5" aria-label="Payment options">
                  <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-white/10 px-2.5 text-[10px] font-semibold text-slate-100"><CreditCard className="h-3.5 w-3.5 text-amber-300" />Credit cards</span>
                  <span className="inline-flex min-h-8 items-center rounded-full bg-white/10 px-2.5 text-[10px] font-semibold text-slate-100">E-checks</span>
                  <span className="inline-flex min-h-8 items-center rounded-full bg-white/10 px-2.5 text-[10px] font-semibold text-slate-100">Financing</span>
                </div>
              </div>
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
