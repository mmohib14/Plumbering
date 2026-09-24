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
import { COMPANY_INFO, SERVICES_DATA, SERVICE_AREAS_DATA } from '../data/plumbingData';
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
    <footer className="site-footer border-t border-white/10 pb-8 pt-12">
      {/* Top Banner inside Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800/80">
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.16)] sm:p-6 lg:flex-row">
          <div className="flex min-w-0 items-center space-x-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-orange) text-(--color-charcoal) shadow-lg shadow-orange-500/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                Plumbing emergency? We are ready to help.
              </h3>
              <p className="site-footer-muted mt-1 max-w-xl text-sm leading-relaxed">
                Fast dispatch, upfront pricing, and licensed technicians available around the clock.
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
              className="inline-flex min-h-12 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/15 sm:flex-initial"
            >
              Schedule Online
            </button>
          </div>
        </div>
      </div>

      {/* 5-Column Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        {/* Column 1: Brand & Credentials */}
        <div className="lg:col-span-2 space-y-4">
          <BrandLogo compact />

          <p className="site-footer-muted max-w-sm text-sm leading-relaxed">
            America's trusted residential and commercial plumbing contractor. Fully licensed master plumbers, bonded, insured, and dedicated to transparent upfront flat-rate pricing.
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-center text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
              <span>{COMPANY_INFO.license}</span>
            </div>
            <div className="flex items-center text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
              <span>{COMPANY_INFO.insurance}</span>
            </div>
            <div className="flex items-center text-sm text-slate-200">
              <Award className="w-4 h-4 mr-2 text-amber-400 shrink-0" />
              <span>{COMPANY_INFO.guarantee}</span>
            </div>
          </div>

          <div className="site-footer-muted flex items-center space-x-3 pt-2 text-xs">
            <span className="inline-flex items-center">
              <Lock className="w-3.5 h-3.5 mr-1 text-slate-500" />
              Secure 256-Bit SSL Booking
            </span>
            <span>•</span>
            <span className="inline-flex items-center">
              <CreditCard className="w-3.5 h-3.5 mr-1 text-slate-500" />
              All Cards & Financing Accepted
            </span>
          </div>
        </div>

        {/* Column 2: Core Services */}
        <div className="space-y-3">
          <h4 className="text-sm font-black uppercase tracking-[0.16em] text-white">
            Plumbing Services
          </h4>
          <ul className="site-footer-muted space-y-2 text-sm">
            {SERVICES_DATA.slice(0, 6).map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => onSelectTab('services')}
                  className="site-footer-link text-left transition-colors"
                >
                  {s.title}
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

        {/* Column 3: Top Service Metro Hubs */}
        <div className="space-y-3">
          <h4 className="text-sm font-black uppercase tracking-[0.16em] text-white">
            Service Areas
          </h4>
          <ul className="site-footer-muted space-y-2 text-sm">
            {SERVICE_AREAS_DATA.slice(0, 6).map((area) => (
              <li key={area.id}>
                <button
                  onClick={() => onSelectTab('service-areas')}
                  className="site-footer-link flex items-center text-left transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-600" />
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

        {/* Column 4: 24/7 National Dispatch */}
        <div className="space-y-3">
          <h4 className="text-sm font-black uppercase tracking-[0.16em] text-white">
            Dispatch Center
          </h4>
          <div className="site-footer-muted space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold uppercase text-slate-400">Toll-Free 24/7 Hotline</div>
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="font-bold text-white transition-colors hover:text-(--color-orange)">
                  {COMPANY_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold uppercase text-slate-400">Electronic Inquiries</div>
                <span className="text-slate-300">{COMPANY_INFO.email}</span>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold uppercase text-slate-400">Hours of Operation</div>
                <span className="text-slate-300">Open 24 Hours / 7 Days</span>
                <div className="text-xs text-emerald-400 font-medium">Holidays & Weekends Included</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="site-footer-cta w-full rounded-lg px-3 py-2 text-xs font-black transition-colors shadow-sm"
              >
                Request Fast Callback
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
