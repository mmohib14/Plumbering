import React, { useState } from 'react';
import { 
  Phone, 
  Search,
  Mic,
  Menu, 
  X, 
  Wrench, 
  ChevronDown, 
  Calendar, 
  Flame, 
  MapPin,
  FileText,
  UserCheck
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/plumbingData';
import { ServiceItem } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenBooking: (serviceId?: string) => void;
  onSelectService: (service: ServiceItem) => void;
  leadsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenBooking,
  onSelectService,
  leadsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const searchPages = [
    { tab: 'home', label: 'Home', keywords: 'home plumbing' },
    { tab: 'services', label: 'All Plumbing Services', keywords: 'services plumbing repairs' },
    { tab: 'emergency', label: 'Emergency Plumbing', keywords: 'emergency urgent 24/7' },
    { tab: 'commercial', label: 'Commercial Plumbing', keywords: 'commercial business plumbing' },
    { tab: 'calculator', label: 'Cost Estimator', keywords: 'price cost estimate calculator' },
    { tab: 'service-areas', label: 'Service Areas', keywords: 'areas zip location' },
    { tab: 'reviews', label: 'Customer Reviews', keywords: 'reviews testimonials rating' },
    { tab: 'blog', label: 'Guides & Blog', keywords: 'guides articles tips blog' },
    { tab: 'contact', label: 'Contact Us', keywords: 'contact phone address' },
  ];

  const searchResults = searchQuery.trim()
    ? [
        ...SERVICES_DATA.filter((service) =>
          `${service.title} ${service.shortDesc} ${service.category}`
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase())
        ).map((service) => ({
          type: 'service' as const,
          label: service.title,
          description: service.shortDesc,
          service,
        })),
        ...searchPages
          .filter((page) => `${page.label} ${page.keywords}`.toLowerCase().includes(searchQuery.trim().toLowerCase()))
          .map((page) => ({ type: 'page' as const, label: page.label, description: 'Open this section', tab: page.tab })),
      ].slice(0, 6)
    : [];

  const handleNavClick = (tab: string) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (service: ServiceItem) => {
    onSelectService(service);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const firstResult = searchResults[0];
    if (!firstResult) return;

    if (firstResult.type === 'service') {
      handleServiceClick(firstResult.service);
    } else {
      handleNavClick(firstResult.tab);
    }
    setSearchOpen(false);
  };

  const startVoiceSearch = () => {
    const speechWindow = window as Window & {
      SpeechRecognition?: new () => SpeechRecognition;
      webkitSpeechRecognition?: new () => SpeechRecognition;
    };
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      setSearchQuery('Voice search is not supported in this browser');
      setSearchOpen(true);
      return;
    }

    const recognition = new Recognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setSearchQuery(event.results[0][0].transcript);
      setSearchOpen(true);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <header className="site-header relative sticky top-0 z-50 border-b transition-all">
      <div className="site-announcement border-b text-center text-[10px] font-bold sm:text-xs">
        <div className="mx-auto flex min-h-7 max-w-360 items-center justify-center gap-2 px-4 py-1">
          <span>America's trusted plumbing team</span>
          <button
            onClick={() => handleNavClick('reviews')}
            className="font-black underline decoration-1 underline-offset-2 hover:text-blue-900"
          >
            See why homeowners choose us
          </button>
        </div>
      </div>

      <div className="site-header-main text-white">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-2 sm:min-h-18 sm:py-2.5">
            <div
              onClick={() => handleNavClick('home')}
              className="cursor-pointer"
            >
              <BrandLogo />
            </div>

            <nav className="site-nav order-3 hidden basis-full min-w-0 items-center justify-center gap-1 rounded-xl border-t px-2 py-1.5 xl:flex">
              <button
                onClick={() => handleNavClick('home')}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                  currentTab === 'home'
                    ? 'site-nav-active shadow-sm'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Home
              </button>

              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('services')}
                    className={`flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                    currentTab === 'services'
                      ? 'site-nav-active shadow-sm'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Services
                  <ChevronDown className="ml-1 h-3.5 w-3.5 text-sky-100" />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-2 text-slate-900 shadow-2xl">
                    <div className="mb-2 flex items-center justify-between border-b border-slate-100 px-3 pb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Core Solutions</span>
                      <button
                        onClick={() => handleNavClick('services')}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View All
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {SERVICES_DATA.map((srv) => (
                        <button
                          key={srv.id}
                          onClick={() => handleServiceClick(srv)}
                          className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
                        >
                          <div className={`mt-0.5 rounded-lg p-1.5 ${srv.isEmergency ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                            <Wrench className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center text-sm font-semibold text-slate-800">
                              {srv.title}
                              {srv.isEmergency && (
                                <span className="ml-2 rounded bg-red-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-red-700">
                                  24/7
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500">{srv.shortDesc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('emergency')}
                className={`flex items-center rounded-lg px-3 py-1.5 text-sm font-bold transition-all ${
                  currentTab === 'emergency'
                    ? 'site-emergency shadow-sm'
                    : 'text-white hover:bg-red-500/80'
                }`}
              >
                <Flame className="mr-1 h-3.5 w-3.5 text-red-400" />
                Emergency 24/7
              </button>

              {[
                ['commercial', 'Commercial'],
                ['calculator', 'Cost Estimator'],
                ['service-areas', 'Service Areas'],
                ['reviews', 'Reviews'],
                ['blog', 'Guides & Blog'],
                ['contact', 'Contact'],
              ].map(([tab, label]) => (
                <button
                  key={tab}
                  onClick={() => handleNavClick(tab)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                      currentTab === tab
                        ? 'site-nav-active shadow-sm'
                        : 'text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 lg:flex">
              <div className="relative">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex h-11 w-56 items-center rounded-xl border border-slate-200 bg-white px-2.5 text-slate-900 shadow-sm transition-shadow focus-within:shadow-md"
                >
                  <Search className="ml-1 h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    value={searchQuery}
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                      setSearchOpen(true);
                    }}
                    onFocus={() => setSearchOpen(true)}
                    placeholder="Search services..."
                    className="min-w-0 flex-1 bg-transparent px-2 text-xs font-medium outline-none placeholder:text-slate-400"
                    aria-label="Search services and website sections"
                  />
                  <button
                    type="button"
                    onClick={startVoiceSearch}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${isListening ? 'bg-(--color-orange) text-slate-950' : 'text-(--color-navy) hover:bg-slate-100'}`}
                    title="Search by voice"
                    aria-label="Search by voice"
                  >
                    <Mic className="h-3.5 w-3.5" />
                  </button>
                </form>
                {searchOpen && searchQuery.trim() && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-slate-900 shadow-2xl">
                    {searchResults.length > 0 ? searchResults.map((result) => (
                      <button
                        key={result.label}
                        type="button"
                        onClick={() => {
                          if (result.type === 'service') handleServiceClick(result.service);
                          else handleNavClick(result.tab);
                          setSearchOpen(false);
                        }}
                        className="w-full rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-50"
                      >
                        <span className="block text-sm font-bold">{result.label}</span>
                        <span className="block truncate text-xs text-slate-500">{result.description}</span>
                      </button>
                    )) : (
                      <p className="px-3 py-2 text-xs text-slate-500">No matching services or sections.</p>
                    )}
                  </div>
                )}
              </div>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="site-surface group flex h-11 shrink-0 items-center gap-2 rounded-xl border border-white/25 px-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-(--color-orange) hover:bg-white"
                aria-label={`Call emergency plumbing at ${COMPANY_INFO.phone}`}
              >
                <div className="site-emergency flex h-8 w-8 items-center justify-center rounded-lg shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[8px] font-black uppercase tracking-[0.14em] text-slate-500">Emergency</div>
                  <div className="text-sm font-black leading-tight tracking-tight text-slate-900">{COMPANY_INFO.phone}</div>
                </div>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="site-cta flex h-11 shrink-0 items-center gap-2 rounded-xl px-4 text-xs font-black uppercase transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Now</span>
              </button>
            </div>

            <div className="flex items-center gap-2 xl:hidden">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="site-emergency flex h-10 w-10 items-center justify-center rounded-xl shadow-lg shadow-orange-500/20"
                title="Call Plumber"
              >
                <Phone className="h-4 w-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full max-h-[calc(100vh-5.5rem)] overflow-y-auto border-t border-white/15 bg-(--color-navy) px-4 pb-6 pt-3 shadow-2xl xl:hidden">
          <div className="space-y-2 border-b border-white/15 pb-3">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="site-emergency flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold"
              >
                <Phone className="h-4 w-4" />
                <span>Emergency Call</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="site-cta flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Online</span>
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => handleNavClick('staff')}
                className="site-nav flex w-1/2 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-white"
              >
                <UserCheck className="h-4 w-4" />
                <span>Staff Login</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="mt-3 flex h-11 items-center rounded-xl bg-white px-2 text-slate-900">
            <Search className="ml-1 h-4 w-4 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSearchOpen(true);
              }}
              placeholder="Search services or pages"
              className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-slate-400"
              aria-label="Search services and website sections"
            />
            <button
              type="button"
              onClick={startVoiceSearch}
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${isListening ? 'bg-(--color-orange) text-slate-950' : 'text-(--color-navy) hover:bg-slate-100'}`}
              title="Search by voice"
              aria-label="Search by voice"
            >
              <Mic className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-3 space-y-1.5">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'home' ? 'bg-white text-slate-900' : 'text-white'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'services' ? 'bg-white text-slate-900' : 'text-white'
              }`}
            >
              All Plumbing Services
            </button>

            <button
              onClick={() => handleNavClick('emergency')}
              className="flex w-full items-center justify-between rounded-xl bg-red-500 px-3 py-2.5 text-left text-sm font-bold text-white"
            >
              <span className="flex items-center">
                <Flame className="mr-2 h-4 w-4 text-red-400" />
                24/7 Emergency Dispatch
              </span>
              <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase text-white">Live</span>
            </button>

            <button
              onClick={() => handleNavClick('commercial')}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'commercial' ? 'bg-white text-slate-900' : 'text-white'
              }`}
            >
              Commercial Plumbing
            </button>

            <button
              onClick={() => handleNavClick('calculator')}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'calculator' ? 'bg-white text-slate-900' : 'text-white'
              }`}
            >
              Cost Estimator Calculator
            </button>

            <button
              onClick={() => handleNavClick('service-areas')}
              className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'service-areas' ? 'bg-white text-slate-900' : 'text-white'
              }`}
            >
              <MapPin className="mr-2 h-4 w-4 text-slate-400" />
              Service Areas & ZIP Checker
            </button>

            <button
              onClick={() => handleNavClick('reviews')}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'reviews' ? 'bg-white text-slate-900' : 'text-white'
              }`}
            >
              Customer Reviews ({COMPANY_INFO.googleRating}★)
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'blog' ? 'bg-white text-slate-900' : 'text-white'
              }`}
            >
              <FileText className="mr-2 h-4 w-4 text-slate-400" />
              Plumbing Guides & Articles
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'contact' ? 'bg-white text-slate-900' : 'text-white'
              }`}
            >
              Contact Us
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="flex w-full items-center justify-between rounded-xl bg-slate-800 px-3 py-2.5 text-left text-sm font-semibold text-amber-300"
            >
              <span className="flex items-center">
                <UserCheck className="mr-2 h-4 w-4" />
                Dispatcher CRM / Admin Portal
              </span>
              <span className="rounded bg-slate-700 px-2 py-0.5 text-[10px] font-bold text-white">
                {leadsCount} Leads
              </span>
            </button>

          </div>
        </div>
      )}
    </header>
  );
};
