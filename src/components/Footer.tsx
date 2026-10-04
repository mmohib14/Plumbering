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
    <footer className="site-footer border-t border-white/10 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-12 xl:pb-8">
      {/* Top Banner inside Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-200">
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row">
          <div className="flex min-w-0 items-center space-x-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-orange) text-(--color-charcoal) shadow-lg shadow-orange-500/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Need a plumber now?
              </h3>
              <p className="site-footer-muted mt-1 max-w-xl text-sm leading-relaxed">
                Local help, available 24/7.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto lg:shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="site-footer-cta inline-flex min-h-12 flex-1 items-center justify-center whitespace-nowrap rounded-xl px-5 py-3 text-sm font-black shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 sm:flex-initial"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex min-h-12 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-all hover:border-orange-300 hover:bg-orange-50 sm:flex-initial"
            >
              Schedule Online
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-7 xl:px-8">
        {/* Column 1: Brand & Credentials */}
        <div className="space-y-3 xl:col-span-2">
          <BrandLogo compact light />

          <p className="site-footer-muted max-w-sm text-xs leading-relaxed">
            Licensed, insured plumbers. Upfront pricing.
          </p>

          <div className="space-y-1.5 pt-1 text-xs">
            <div className="flex items-center text-xs text-slate-200">
              <CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{COMPANY_INFO.license}</span>
            </div>
            <div className="flex items-center text-xs text-slate-200">
              <CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-emerald-400" />
              <span>Licensed, bonded & $2M insured</span>
            </div>
            <div className="flex items-center text-xs text-slate-200">
              <Award className="mr-2 h-4 w-4 shrink-0 text-amber-400" />
              <span>1-year parts & labor warranty</span>
            </div>
          </div>

          <div className="site-footer-muted flex flex-wrap items-center gap-x-2 pt-1 text-[10px]">
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

        {/* Column 2: Quick Links / Company */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-[0.14em] text-white">
            Company
          </h4>
          <ul className="site-footer-muted space-y-1.5 text-xs">
            {[
              ['About Us', 'home'],
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

        {/* Column 3: Core Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-[0.14em] text-white">
            Plumbing Services
          </h4>
          <ul className="site-footer-muted space-y-1.5 text-xs">
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
                className="site-footer-link pt-1 text-xs font-bold transition-colors"
              >
                + View All Services
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Top Service Metro Hubs */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-[0.14em] text-white">
            Service Areas
          </h4>
          <ul className="site-footer-muted space-y-1.5 text-xs">
            {SERVICE_AREAS_DATA.slice(0, 3).map((area) => (
              <li key={area.id}>
                <button
                  onClick={() => onSelectTab('service-areas')}
                  className="site-footer-link flex items-center text-left transition-colors"
                >
                  <MapPin className="mr-1.5 h-3.5 w-3.5 shrink-0 text-slate-600" />
                  <span>{area.city}</span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => onSelectTab('service-areas')}
                className="site-footer-link pt-1 text-xs font-bold transition-colors"
              >
                + Check Your ZIP Code
              </button>
            </li>
          </ul>
        </div>

        {/* Column 5: Resources */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-[0.14em] text-white">
            Resources
          </h4>
          <ul className="site-footer-muted space-y-1.5 text-xs">
            {[
              ['Emergency 24/7', 'emergency'],
              ['Reviews', 'reviews'],
              ['Guides & Blog', 'blog'],
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

        {/* Column 6: 24/7 National Dispatch */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-[0.14em] text-white">
            Contact
          </h4>
          <div className="site-footer-muted space-y-2.5 text-xs">
            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <div>
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="font-bold text-white transition-colors hover:text-(--color-orange)">
                  {COMPANY_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
              <div>
                <a href={`mailto:${COMPANY_INFO.email}`} className="break-all text-slate-300 transition-colors hover:text-(--color-orange)">
                  Email us
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <div>
                <span className="text-slate-300">Open 24/7</span>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => onOpenBooking()}
                className="site-footer-cta w-full rounded-lg px-2.5 py-2 text-[11px] font-black transition-colors shadow-sm"
              >
                Request callback
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 px-4 pt-6 text-xs text-slate-400 sm:px-6 md:flex-row lg:px-8">
        <p>
          © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Registered Plumbing Contractor.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={() => onOpenLegal('guarantee')}
            className="hover:text-slate-300 transition-colors"
          >
            100% Satisfaction Guarantee
          </button>
          <span>•</span>
          <button 
            onClick={() => onOpenLegal('privacy')}
            className="hover:text-slate-300 transition-colors"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button 
            onClick={() => onOpenLegal('terms')}
            className="hover:text-slate-300 transition-colors"
          >
            Terms of Service
          </button>
          <span>•</span>
          <button 
            onClick={() => onSelectTab('staff')}
            className="text-slate-400 hover:text-amber-400 font-mono transition-colors"
          >
            Staff Login
          </button>
        </div>
      </div>
    </footer>
  );
};
