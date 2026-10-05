import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Award,
  CreditCard,
  Lock
} from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS_DATA } from '../data/plumbingData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'guarantee') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenBooking,
  onOpenLegal
}) => {
  return (
    <footer className="site-footer border-t border-slate-200/80 pb-8 pt-10 sm:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_16px_30px_rgba(13,44,84,0.06)] sm:p-6 lg:p-7">
          <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-orange) text-(--color-charcoal) shadow-lg shadow-orange-500/20">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                  Need a plumber now?
                </h3>
                <p className="site-footer-muted mt-1 max-w-xl text-sm leading-relaxed">
                  Local help, available 24/7.
                </p>
              </div>
            </div>
            <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="site-footer-cta inline-flex min-h-12 flex-1 items-center justify-center whitespace-nowrap rounded-xl px-5 py-3 text-sm font-black shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex min-h-12 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-all hover:border-orange-300 hover:bg-orange-50"
              >
                Book Online
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-7 xl:px-8">
        <div className="space-y-3 xl:col-span-2">
          <BrandLogo compact light />

          <p className="site-footer-muted max-w-sm text-sm leading-relaxed">
            Licensed, insured plumbers. Upfront pricing.
          </p>

          <div className="space-y-2 pt-1 text-sm">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>{COMPANY_INFO.license}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>Licensed, bonded & $2M insured</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Award className="h-4 w-4 shrink-0 text-amber-500" />
              <span>1-year parts & labor warranty</span>
            </div>
          </div>

          <div className="site-footer-muted flex flex-wrap items-center gap-x-2 pt-1 text-[11px]">
            <span className="inline-flex items-center">
              <Lock className="mr-1 h-3.5 w-3.5 text-slate-500" />
              Secure booking
            </span>
            <span>•</span>
            <span className="inline-flex items-center">
              <CreditCard className="mr-1 h-3.5 w-3.5 text-slate-500" />
              Financing available
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-[0.14em] text-slate-800">
            Company
          </h4>
          <ul className="site-footer-muted space-y-2 text-sm">
            {[
              ['Home', 'home'],
              ['Recent Projects', 'reviews'],
              ['Blog', 'blog'],
              ['Offers', 'services'],
              ['Contact Us', 'contact']
            ].map(([label, target]) => (
              <li key={label}>
                <button
                  onClick={() => onSelectTab(target)}
                  className="site-footer-link text-left transition-colors"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-[0.14em] text-slate-800">
            Plumbing Services
          </h4>
          <ul className="site-footer-muted space-y-2 text-sm">
            {[
              'Emergency Plumbing',
              'Drain Cleaning',
              'Water Heaters',
              'Sewer Repair'
            ].map((service) => (
              <li key={service}>
                <button
                  onClick={() => onSelectTab('services')}
                  className="site-footer-link text-left transition-colors"
                >
                  {service}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => onSelectTab('services')}
                className="site-footer-link pt-1 text-sm font-bold transition-colors"
              >
                + View All Services
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-[0.14em] text-slate-800">
            Service Areas
          </h4>
          <ul className="site-footer-muted space-y-2 text-sm">
            {SERVICE_AREAS_DATA.slice(0, 3).map((area) => (
              <li key={area.id}>
                <button
                  onClick={() => onSelectTab('service-areas')}
                  className="site-footer-link flex items-center text-left transition-colors"
                >
                  <MapPin className="mr-1.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                  <span>{area.city}</span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => onSelectTab('service-areas')}
                className="site-footer-link pt-1 text-sm font-bold transition-colors"
              >
                + Check Your ZIP Code
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-[0.14em] text-slate-800">
            Resources
          </h4>
          <ul className="site-footer-muted space-y-2 text-sm">
            {[
              ['Emergency 24/7', 'emergency'],
              ['Reviews', 'reviews'],
              ['Guides & Blog', 'blog'],
              ['FAQs', 'faq'],
              ['Cost Estimator', 'calculator'],
              ['Commercial', 'commercial']
            ].map(([label, target]) => (
              <li key={label}>
                <button
                  onClick={() => onSelectTab(target)}
                  className="site-footer-link text-left transition-colors"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
          <h4 className="text-xs font-black uppercase tracking-[0.14em] text-slate-800">
            Contact
          </h4>
          <div className="site-footer-muted space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <div>
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="font-bold text-slate-900 transition-colors hover:text-(--color-orange-dark)">
                  {COMPANY_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
              <div>
                <a href={`mailto:${COMPANY_INFO.email}`} className="break-all text-slate-700 transition-colors hover:text-(--color-orange-dark)">
                  Email us
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <div>
                <span className="text-slate-700">Open 24/7</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-200 px-4 pt-6 text-xs text-slate-500 sm:px-6 md:flex-row lg:px-8">
        <p>
          © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Registered Plumbing Contractor.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <button 
            onClick={() => onOpenLegal('guarantee')}
            className="transition-colors hover:text-(--color-orange-dark)"
          >
            100% Satisfaction Guarantee
          </button>
          <span className="hidden sm:inline">•</span>
          <button 
            onClick={() => onOpenLegal('privacy')}
            className="transition-colors hover:text-(--color-orange-dark)"
          >
            Privacy Policy
          </button>
          <span className="hidden sm:inline">•</span>
          <button 
            onClick={() => onOpenLegal('terms')}
            className="transition-colors hover:text-(--color-orange-dark)"
          >
            Terms of Service
          </button>
          <span className="hidden sm:inline">•</span>
          <a
            href="/staff"
            className="font-semibold hover:text-(--color-orange-dark)"
          >
            Staff Login
          </a>
        </div>
      </div>
    </footer>
  );
};
