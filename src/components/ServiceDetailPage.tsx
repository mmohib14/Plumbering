import React from 'react';
import {
  ArrowRight,
  BadgeDollarSign,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Flame,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { COMPANY_INFO, REVIEWS_DATA, SERVICE_AREAS_DATA, SERVICES_DATA } from '../data/plumbingData';
import { ServiceArea, ServiceItem } from '../types';
import { getServiceAreaSlug } from '../services/routes';
import { FeaturedReview } from './FeaturedReview';

interface ServiceDetailPageProps {
  service: ServiceItem;
  onBookService: (serviceId: string) => void;
  onSelectTab: (tab: string) => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectServiceArea: (area: ServiceArea) => void;
}

const REVIEW_TERMS: Record<string, string[]> = {
  'emergency-plumbing': ['emergency plumbing'],
  'drain-cleaning': ['hydro jetting'],
  'water-heater': ['water heater'],
  'sewer-repair': ['sewer line'],
  'leak-detection': ['slab leak'],
  'commercial-plumbing': ['commercial plumbing'],
};

const getServiceReview = (service: ServiceItem) => {
  const terms = REVIEW_TERMS[service.id] ?? [];
  return REVIEWS_DATA.find(review =>
    review.verified &&
    terms.some(term => review.serviceType.toLowerCase().includes(term))
  );
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBookService,
  onSelectTab,
  onSelectService,
  onSelectServiceArea,
}) => {
  const review = getServiceReview(service);
  const relatedServices = SERVICES_DATA
    .filter(item => item.id !== service.id && item.category === service.category)
    .concat(SERVICES_DATA.filter(item => item.id !== service.id && item.category !== service.category))
    .slice(0, 3);
  const isCommercial = service.category === 'commercial';
  const isDrainOrSewer = service.category === 'drain-sewer';
  const imageFirst = service.id === 'sewer-repair' || service.id === 'water-heater' || isCommercial;
  const serviceName = service.title.replace(/^(24\/7 )?/, '');
  return (
    <div className="overflow-hidden bg-white text-slate-900">
      <section className="bg-(--color-navy) text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-9 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-16">
          <div className={`max-w-xl ${imageFirst ? 'lg:order-2' : ''}`}>
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-300">
              {service.isEmergency ? <Flame className="h-4 w-4" /> : <Wrench className="h-4 w-4" />}
              {isCommercial ? 'Commercial plumbing' : service.isEmergency ? '24/7 dispatch available' : 'Residential plumbing'}
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
              {service.title}
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-200 sm:text-base">
              {service.shortDesc}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onBookService(service.id)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <CalendarDays className="h-4 w-4" /> Book this service
              </button>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> Call {COMPANY_INFO.phone}
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-4 text-xs font-semibold text-slate-200">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-amber-300" /> Licensed &amp; insured</span>
              <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-amber-300" /> Upfront pricing</span>
              {service.isEmergency && <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4 text-amber-300" /> 24/7 availability</span>}
            </div>
          </div>

          <div className={`relative min-w-0 ${imageFirst ? 'lg:order-1' : ''}`}>
            <div className="relative overflow-hidden rounded-2xl bg-slate-800 lg:rounded-[1.75rem]" style={{ aspectRatio: '4 / 3' }}>
              {service.detailImageUrl ? (
                <img
                  src={service.detailImageUrl}
                  alt={service.detailImageAlt || service.title}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-orange-100 text-(--color-navy)" aria-hidden="true">
                  <Wrench className="h-20 w-20" />
                </div>
              )}
            </div>
            <div className={`absolute bottom-3 ${imageFirst ? 'left-3 sm:left-6' : 'right-3 sm:right-6'} max-w-[calc(100%-1.5rem)] rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-slate-900 shadow-lg backdrop-blur-sm sm:px-5`}>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">Typical price range</p>
              <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-xl font-extrabold text-(--color-navy)">{service.priceRange}</span>
                <span className="text-xs text-slate-600">{service.unit}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Service overview" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="flex min-h-24 items-center gap-3 border-b border-r border-slate-200 py-4 pr-3 sm:pr-5 md:border-b-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-orange-900"><BadgeDollarSign className="h-4 w-4" /></span>
            <div className="min-w-0"><p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Price guide</p><p className="mt-1 text-sm font-extrabold text-(--color-navy)">{service.priceRange}</p></div>
          </div>
          <div className="flex min-h-24 items-center gap-3 border-b border-slate-200 py-4 pl-3 sm:pl-5 md:border-b-0 md:border-r md:pr-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-(--color-navy)"><Wrench className="h-4 w-4" /></span>
            <div className="min-w-0"><p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Service scope</p><p className="mt-1 text-xs font-bold leading-5 text-(--color-navy) sm:text-sm">{service.unit}</p></div>
          </div>
          <div className="flex min-h-24 items-center gap-3 border-r border-slate-200 py-4 pr-3 sm:pr-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-800"><ShieldCheck className="h-4 w-4" /></span>
            <div className="min-w-0"><p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Credentials</p><p className="mt-1 text-xs font-bold leading-5 text-(--color-navy) sm:text-sm">{COMPANY_INFO.license}</p></div>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('service-areas')}
            className="group flex min-h-24 items-center gap-3 py-4 pl-3 text-left transition-colors hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-(--color-orange) sm:pl-5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-orange-900"><MapPin className="h-4 w-4" /></span>
            <span className="min-w-0"><span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Coverage</span><span className="mt-1 inline-flex items-center gap-1 text-xs font-bold leading-5 text-(--color-navy) group-hover:text-orange-900 sm:text-sm">Check service areas <ArrowRight className="h-3.5 w-3.5 shrink-0" /></span></span>
          </button>
        </div>
      </section>

      {service.id === 'emergency-plumbing' ? (
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-5 lg:items-center lg:gap-14 lg:px-8 lg:py-14">
          <div className="lg:col-span-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">When minutes matter</p>
            <h2 className="mt-2 text-2xl font-extrabold text-(--color-navy) sm:text-3xl">Get help with urgent plumbing problems.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{service.fullDesc}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"><Phone className="h-4 w-4" />Call dispatch</a>
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-xs font-semibold text-slate-600 underline decoration-slate-300 underline-offset-2 hover:text-(--color-navy)">{COMPANY_INFO.phone}</a>
            </div>
            <div className="mt-6 flex items-start gap-3 border-t border-slate-200 pt-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-orange-900"><Clock3 className="h-4 w-4" /></span>
              <p className="text-xs leading-5 text-slate-600"><strong className="text-slate-800">{service.features[0]}.</strong><br />Call to confirm dispatch availability for your ZIP.</p>
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 sm:p-5 lg:col-span-3">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-3">
              <div><p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-800">Recognize the warning signs</p><h3 className="mt-1 text-base font-extrabold text-(--color-navy)">When to call an emergency plumber</h3></div>
              <span className="hidden shrink-0 text-xs font-semibold text-slate-500 sm:block">{service.commonSymptoms.length} signs</span>
            </div>
            <ul className="mt-2 grid gap-x-6 sm:grid-cols-2">
              {service.commonSymptoms.map((symptom, index) => (
                <li key={symptom} className="flex min-h-14 items-start gap-3 border-b border-slate-200 py-3 last:border-0">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white font-mono text-[10px] font-bold text-orange-900">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-xs leading-5 text-slate-700 sm:text-sm">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </section>
      ) : isDrainOrSewer ? (
        <section className="bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">Know what is going on</p>
              <h2 className="mt-2 text-2xl font-extrabold text-(--color-navy) sm:text-3xl">A clearer way to address {service.id === 'sewer-repair' ? 'sewer line problems' : 'persistent drain issues'}.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.fullDesc}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-orange-900"><Wrench className="h-5 w-5" /></span>
                <div><p className="text-sm font-bold text-slate-900">Service range</p><p className="text-xs text-slate-600">{service.priceRange} · {service.unit}</p></div>
              </div>
            </div>
            <div className="grid gap-x-8 sm:grid-cols-2">
              <div>
                <h3 className="border-b border-slate-300 pb-3 text-sm font-extrabold text-(--color-navy)">What you may notice</h3>
                <ul className="mt-2 space-y-3">
                  {service.commonSymptoms.map(item => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-700"><span className="mt-1 text-orange-800">•</span>{item}</li>)}
                </ul>
              </div>
              <div className="mt-7 sm:mt-0">
                <h3 className="border-b border-slate-300 pb-3 text-sm font-extrabold text-(--color-navy)">What the service includes</h3>
                <ul className="mt-2 space-y-3">
                  {service.features.map(item => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : isCommercial ? (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">Built around your operation</p>
              <h2 className="mt-2 text-2xl font-extrabold text-(--color-navy) sm:text-3xl">Keep your business moving.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.fullDesc}</p>
              <button type="button" onClick={() => onBookService(service.id)} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-amber-400 px-4 text-sm font-extrabold text-slate-950 hover:bg-amber-300">Request commercial service <ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="grid gap-x-8 sm:grid-cols-2">
              {service.features.map((feature, index) => (
                <div key={feature} className="flex gap-4 border-t border-slate-200 py-4">
                  <span className="font-mono text-sm font-bold text-orange-800">0{index + 1}</span>
                  <p className="text-sm leading-6 text-slate-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">A practical solution, clearly explained</p>
            <h2 className="mt-2 text-2xl font-extrabold text-(--color-navy) sm:text-3xl">What to expect from {serviceName.toLowerCase()}.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{service.fullDesc}</p>
            <div className="mt-6 border-l-2 border-amber-400 pl-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Typical range</p>
              <p className="mt-1 text-lg font-extrabold text-(--color-navy)">{service.priceRange}</p>
              <p className="text-xs text-slate-600">{service.unit}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Included with this service</h3>
            <ol className="mt-3 divide-y divide-slate-200 border-y border-slate-200">
              {service.features.map((feature, index) => (
                <li key={feature} className="flex items-start gap-4 py-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--color-navy) text-xs font-bold text-white">{index + 1}</span>
                  <span className="pt-1 text-sm leading-6 text-slate-700">{feature}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {service.faqs.length > 0 && (
        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-7 px-4 py-11 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-14">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">Good to know</p>
              <h2 className="mt-2 text-2xl font-extrabold text-(--color-navy)">Service questions</h2>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {service.faqs.map(faq => (
                <details key={faq.question} className="group py-4">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-sm font-bold text-slate-900 transition-colors hover:text-orange-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-orange) [&::-webkit-details-marker]:hidden">
                    {faq.question}<ChevronRight className="h-4 w-4 shrink-0 text-orange-800 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="max-w-3xl pt-2 pr-8 text-sm leading-6 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {review && <FeaturedReview review={review} title="A customer's experience" />}

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-9 sm:px-6 md:grid-cols-3 md:items-center lg:px-8">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">Explore more</p>
            <h2 className="mt-2 text-xl font-extrabold text-(--color-navy)">Related services</h2>
            <p className="mt-1 text-xs leading-5 text-slate-600">Other ways our team can help.</p>
          </div>
          <div className="grid gap-x-6 md:col-span-2 sm:grid-cols-2">
            {relatedServices.map((item, index) => (
              <button key={item.id} type="button" onClick={() => onSelectService(item)} className={`group flex min-h-14 items-center justify-between gap-3 border-t border-slate-200 py-3 text-left transition-colors hover:text-orange-900 ${index === 0 ? 'sm:col-span-2' : ''}`}>
                <span className="min-w-0"><span className="block text-sm font-bold text-slate-800 group-hover:text-orange-900">{item.title}</span><span className="mt-0.5 block text-xs text-slate-500">{item.priceRange} · {item.unit}</span></span><ArrowRight className="h-4 w-4 shrink-0 text-orange-800 transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-2xl bg-(--color-navy) p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-300">Ready when you are</p>
            <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">Need help with {serviceName.toLowerCase()}?</h2>
            <p className="mt-2 text-sm text-slate-200">Call to confirm availability or request a service appointment.</p>
          </div>
          <div className="flex flex-col gap-2 sm:min-w-52">
            <button type="button" onClick={() => onBookService(service.id)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-extrabold text-slate-950 hover:bg-amber-300">Book service <ArrowRight className="h-4 w-4" /></button>
            <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/30 px-5 text-sm font-bold text-white hover:bg-white/10"><Phone className="h-4 w-4" />{COMPANY_INFO.phone}</a>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-slate-200 pt-5">
          <span className="mr-1 text-xs font-extrabold uppercase tracking-wider text-slate-500">Service locations</span>
          {SERVICE_AREAS_DATA.map(area => (
            <button key={area.id} type="button" onClick={() => onSelectServiceArea(area)} className="inline-flex min-h-9 items-center gap-1 rounded-full border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:border-amber-400 hover:bg-amber-50">
              <MapPin className="h-3.5 w-3.5 text-orange-800" />{area.city}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
