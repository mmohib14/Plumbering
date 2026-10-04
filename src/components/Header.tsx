import React, { useEffect, useRef, useState } from 'react';
import { 
  Phone, 
  Search,
  Mic,
  MicOff,
  XCircle,
  Menu, 
  X, 
  Wrench, 
  ChevronDown, 
  Calendar, 
  Flame, 
  MapPin,
  UserCheck
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA, SERVICE_AREAS_DATA } from '../data/plumbingData';
import { ServiceArea, ServiceItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { getShortAreaName, getShortServiceName } from '../services/displayLabels';

type SpeechResultEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

const SERVICE_SEARCH_ALIASES: Record<string, string[]> = {
  'emergency-plumbing': ['emergency', 'urgent', 'burst pipe', 'flooding', 'plumber now', '24 7', '24/7'],
  'drain-cleaning': ['clog', 'blocked drain', 'slow drain', 'kitchen sink', 'drain blockage', 'sewer backup'],
  'water-heater': ['hot water', 'no hot water', 'water heater', 'boiler', 'tankless'],
  'sewer-repair': ['sewer line', 'sewer repair', 'main line', 'tree roots', 'sewage'],
  'leak-detection': ['leak', 'leaking', 'hidden leak', 'slab leak', 'pipe leak', 'water leak'],
  'commercial-plumbing': ['commercial', 'business', 'restaurant', 'office', 'grease trap'],
  repiping: ['pipe repair', 'pipe replacement', 'broken pipe', 'bathroom pipe', 'bathroom plumbing', 'repiping'],
  'fixture-repair': ['bathroom', 'bathroom plumbing', 'bathroom sink', 'kitchen sink', 'faucet', 'toilet', 'shower', 'garbage disposal'],
};

const SEARCH_INTENTS: { phrases: string[]; serviceIds: string[] }[] = [
  { phrases: ['emergency plumbing', 'emergency plumber', 'urgent plumber', 'need emergency'], serviceIds: ['emergency-plumbing', 'leak-detection', 'drain-cleaning', 'sewer-repair'] },
  { phrases: ['bathroom pipe', 'bathroom plumbing', 'bathroom repair', 'bathroom leak', 'bathroom pipe repair'], serviceIds: ['repiping', 'leak-detection', 'fixture-repair', 'emergency-plumbing'] },
  { phrases: ['kitchen sink', 'sink leaking', 'sink repair'], serviceIds: ['fixture-repair', 'drain-cleaning', 'leak-detection', 'emergency-plumbing'] },
  { phrases: ['pipe repair', 'pipe burst', 'broken pipe', 'burst pipe'], serviceIds: ['repiping', 'emergency-plumbing', 'leak-detection'] },
  { phrases: ['water heater', 'no hot water', 'hot water'], serviceIds: ['water-heater', 'emergency-plumbing'] },
  { phrases: ['plumber near me', 'service area', 'near me'], serviceIds: ['emergency-plumbing'] },
];

const normalizeSearch = (value: string) => value
  .toLowerCase()
  .replace(/इमरजेंसी|आपातकाल/g, ' emergency ')
  .replace(/प्लंबर|प्लम्बिंग/g, ' plumber ')
  .replace(/चाहिए|चाहिये/g, ' ')
  .replace(/बाथरूम|स्नानघर/g, ' bathroom ')
  .replace(/पाइपलाइन|पाइप/g, ' pipe ')
  .replace(/मरम्मत|ठीक/g, ' repair ')
  .replace(/रिसाव|लीक/g, ' leak ')
  .replace(/रसोई|किचन/g, ' kitchen ')
  .replace(/सिंक|नल/g, ' sink ')
  .replace(/वॉटर\s*हीटर|गीजर/g, ' water heater ')
  .replace(/[^a-z0-9/ ]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/^(i need|i want|looking for|please|can you|find me)\s+/, '')
  .replace(/\s+(please|chahiye)$/g, '');

const getServiceMatches = (query: string) => {
  const normalizedQuery = normalizeSearch(query);
  const genericWords = new Set(['the', 'for', 'and', 'with', 'plumber', 'plumbing', 'service', 'services', 'repair', 'need', 'want', 'help', 'issue', 'please']);
  const queryWords = normalizedQuery.split(' ').filter(word => word.length > 2 && !genericWords.has(word));
  const intentIds = new Set(SEARCH_INTENTS
    .filter(intent => intent.phrases.some(phrase => normalizedQuery.includes(phrase)))
    .flatMap(intent => intent.serviceIds));

  const rankedServices = SERVICES_DATA.map(service => {
    const searchableText = normalizeSearch([
      service.title,
      service.shortDesc,
      service.fullDesc,
      service.category,
      ...service.commonSymptoms,
      ...SERVICE_SEARCH_ALIASES[service.id] || [],
    ].join(' '));
    const matchedWords = queryWords.filter(word => searchableText.includes(word)).length;
    const aliasMatches = (SERVICE_SEARCH_ALIASES[service.id] || []).filter(alias => normalizedQuery.includes(alias)).length;
    const score = (intentIds.has(service.id) ? 8 : 0) + aliasMatches * 5 + matchedWords * 2 + (searchableText.includes(normalizedQuery) ? 6 : 0);
    return { service, score };
  })
    .filter(result => result.score > 0)
    .sort((first, second) => second.score - first.score || Number(second.service.isEmergency) - Number(first.service.isEmergency));

  const relevantServices = intentIds.size > 0
    ? rankedServices.filter(result => intentIds.has(result.service.id))
    : rankedServices;

  return relevantServices.slice(0, 6).map(result => result.service);
};

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenBooking: (serviceId?: string) => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectServiceArea: (area: ServiceArea) => void;
  leadsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenBooking,
  onSelectService,
  onSelectServiceArea,
  leadsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [serviceAreasDropdownOpen, setServiceAreasDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechMessage, setSpeechMessage] = useState('');
  const [speechLanguage, setSpeechLanguage] = useState<'en-US' | 'hi-IN'>(() =>
    typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('hi') ? 'hi-IN' : 'en-US'
  );
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const recognitionRunRef = useRef(0);
  const servicesCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const areasCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearServicesCloseTimer = () => {
    if (servicesCloseTimerRef.current) clearTimeout(servicesCloseTimerRef.current);
    servicesCloseTimerRef.current = null;
  };

  const clearAreasCloseTimer = () => {
    if (areasCloseTimerRef.current) clearTimeout(areasCloseTimerRef.current);
    areasCloseTimerRef.current = null;
  };

  const scheduleServicesClose = () => {
    clearServicesCloseTimer();
    servicesCloseTimerRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
      servicesCloseTimerRef.current = null;
    }, 1200);
  };

  const scheduleAreasClose = () => {
    clearAreasCloseTimer();
    areasCloseTimerRef.current = setTimeout(() => {
      setServiceAreasDropdownOpen(false);
      areasCloseTimerRef.current = null;
    }, 1200);
  };

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

  const searchResults = searchQuery.trim() ? getServiceMatches(searchQuery) : [];
  const matchedPages = searchQuery.trim()
    ? searchPages.filter(page => normalizeSearch(`${page.label} ${page.keywords}`)
      .split(' ')
      .some(word => word.length > 2 && normalizeSearch(searchQuery).includes(word)) ||
      (page.tab === 'service-areas' && /near me|nearby|location/.test(normalizeSearch(searchQuery))))
    : [];

  useEffect(() => () => {
    recognitionRunRef.current += 1;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    clearServicesCloseTimer();
    clearAreasCloseTimer();
  }, []);

  const handleNavClick = (tab: string) => {
    clearServicesCloseTimer();
    clearAreasCloseTimer();
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setServiceAreasDropdownOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (service: ServiceItem) => {
    clearServicesCloseTimer();
    const servicePath = `/services/${service.slug}`;
    if (window.location.pathname !== servicePath) {
      window.history.pushState({}, '', servicePath);
    }
    onSelectService(service);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  const handleServiceAreaClick = (area: ServiceArea) => {
    clearAreasCloseTimer();
    onSelectServiceArea(area);
    setServiceAreasDropdownOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  const serviceGroups = [
    { label: 'Drains & Sewer', services: SERVICES_DATA.filter(service => service.category === 'drain-sewer') },
    { label: 'Water Heaters', services: SERVICES_DATA.filter(service => service.category === 'water-heater') },
    { label: 'Emergency & Residential', services: SERVICES_DATA.filter(service => service.category === 'emergency' || service.category === 'residential') },
    { label: 'Commercial', services: SERVICES_DATA.filter(service => service.category === 'commercial') },
  ].filter(group => group.services.length > 0);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchOpen(true);
  };

  const startVoiceSearch = () => {
    const speechWindow = window as Window & {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      setSpeechMessage('Voice search is not supported in this browser. You can still type a service above.');
      setSearchOpen(true);
      return;
    }

    if (recognitionRef.current) {
      recognitionRunRef.current += 1;
      const activeRecognition = recognitionRef.current;
      recognitionRef.current = null;
      setIsListening(false);
      setSpeechMessage('Voice search stopped. Try again or type your request.');
      activeRecognition.stop();
      return;
    }

    try {
      setSearchQuery('');
      const recognition = new Recognition();
      recognition.lang = speechLanguage;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      const runId = ++recognitionRunRef.current;
      recognition.onstart = () => {
        if (recognitionRunRef.current !== runId) {
          recognition.stop();
          return;
        }
        setIsListening(true);
        setSpeechMessage('Listening. Speak your plumbing request, then pause to see matching services.');
        setSearchOpen(true);
      };
      recognition.onresult = event => {
        if (recognitionRunRef.current !== runId) return;
        const transcript = event.results[0]?.[0]?.transcript.trim();
        if (!transcript) {
          setSpeechMessage('We did not catch that. Try speaking again or type your request.');
          return;
        }
        setSearchQuery(transcript);
        setSpeechMessage('Voice request processed. Matching services are below.');
        setSearchOpen(true);
      };
      recognition.onerror = event => {
        if (recognitionRunRef.current !== runId) return;
        const messages: Record<string, string> = {
          'not-allowed': 'Microphone access is blocked. Allow microphone access in your browser site settings, then try again.',
          'service-not-allowed': 'Microphone access is blocked. Allow microphone access in your browser site settings, then try again.',
          'no-speech': 'No speech was heard. Try again in a quieter place or type your request.',
          'audio-capture': 'No microphone was found. Connect a microphone or type your request instead.',
          network: 'Voice search could not connect. Check your connection or type your request.',
        };
        setSpeechMessage(messages[event.error] || 'Voice search stopped. Please try again or type your request.');
        setIsListening(false);
        recognitionRef.current = null;
      };
      recognition.onend = () => {
        if (recognitionRunRef.current !== runId) return;
        setIsListening(false);
        recognitionRef.current = null;
      };
      recognitionRef.current = recognition;
      setSpeechMessage('Starting microphone...');
      setSearchOpen(true);
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setIsListening(false);
      setSpeechMessage('Microphone could not start. Check browser permissions and try again.');
      setSearchOpen(true);
    }
  };

  return (
    <header className="site-header sticky top-0 z-50 border-b transition-all">
      <div className="site-announcement border-b text-[10px] font-bold sm:text-xs">
        <div className="site-announcement-inner mx-auto flex min-h-8 max-w-360 flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-4 py-1 sm:justify-between sm:px-6 lg:px-8">
          <span className="tracking-wide">America&apos;s trusted plumbing team <span className="hidden sm:inline">· Licensed, insured, and available 24/7</span></span>
          <button
            onClick={() => handleNavClick('reviews')}
            className="font-extrabold underline decoration-1 underline-offset-2 transition-colors hover:text-blue-900"
          >
            {COMPANY_INFO.googleRating} / 5 · {COMPANY_INFO.totalReviewsCount} customer reviews
          </button>
        </div>
      </div>

      <div className="site-header-main">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <div className="site-header-row flex min-h-16 flex-wrap items-center justify-between gap-3 py-2 sm:min-h-18 sm:py-2.5 xl:flex-nowrap">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              aria-label="USA Pro Plumbing home"
              className="shrink-0 p-0 text-left xl:order-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-orange)"
            >
              <BrandLogo light />
            </button>

            <nav className="order-3 hidden basis-full justify-center pt-1.5 xl:order-2 xl:flex xl:basis-auto xl:flex-1 xl:pt-0">
              <div className="flex w-fit min-w-0 items-center justify-center gap-1">
              <button
                onClick={() => handleNavClick('home')}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                  currentTab === 'home'
                    ? 'site-nav-active shadow-sm'
                    : 'text-slate-700 hover:bg-orange-50'
                }`}
              >
                Home
              </button>

              <div
                className="relative"
                onMouseEnter={() => {
                  clearServicesCloseTimer();
                  clearAreasCloseTimer();
                  setServicesDropdownOpen(true);
                  setServiceAreasDropdownOpen(false);
                }}
                onFocus={() => {
                  clearServicesCloseTimer();
                  clearAreasCloseTimer();
                  setServicesDropdownOpen(true);
                  setServiceAreasDropdownOpen(false);
                }}
                onBlur={event => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleServicesClose();
                }}
                onMouseLeave={scheduleServicesClose}
              >
                <button
                  onClick={() => handleNavClick('services')}
                  aria-haspopup="true"
                  aria-expanded={servicesDropdownOpen}
                  aria-controls="services-mega-menu"
                    className={`flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                    currentTab === 'services'
                      ? 'site-nav-active shadow-sm'
                      : 'text-slate-700 hover:bg-orange-50'
                  }`}
                >
                  Services
                  <ChevronDown className="ml-1 h-3.5 w-3.5 text-slate-500" />
                </button>

                <div className="absolute left-0 top-full z-40 h-2" aria-hidden="true" />
                {servicesDropdownOpen && (
                  <div id="services-mega-menu" className="fixed left-1/2 top-[6.5rem] z-[60] w-[min(94vw,74rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 border-t-4 border-t-(--color-orange) bg-white text-(--color-navy) shadow-[0_24px_60px_rgba(13,44,84,0.2)]">
                    <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_0.85fr] gap-0">
                      {serviceGroups.map(group => (
                        <div key={group.label} className="space-y-1 border-r border-slate-200 p-3">
                          <div className="mb-1 text-[9px] font-black uppercase tracking-[0.14em] text-(--color-orange-dark)">{group.label}</div>
                          {group.services.map(service => (
                            <button key={service.id} type="button" onClick={() => handleServiceClick(service)} className="flex min-h-12 w-full items-center rounded-md px-2 text-left transition-colors hover:bg-(--color-ice) hover:text-(--color-navy)">
                              <span className="block text-xs font-bold leading-4 text-slate-800">{getShortServiceName(service)}</span>
                            </button>
                          ))}
                        </div>
                      ))}

                      <div className="flex flex-col justify-between bg-(--color-ice) p-3">
                        <div>
                          <div className="text-[9px] font-black uppercase tracking-[0.14em] text-(--color-orange-dark)">Need help now?</div>
                          <div className="mt-2 text-xl font-black tracking-tight text-(--color-navy)">24/7</div>
                          <div className="mt-0.5 text-xs font-semibold text-slate-700">Emergency plumbing</div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <button
                            type="button"
                            onClick={() => handleNavClick('emergency')}
                            className="block min-h-12 w-full rounded-lg bg-(--color-orange) px-2.5 py-2 text-xs font-black text-(--color-charcoal) transition-colors hover:brightness-95"
                          >
                            Emergency service
                          </button>
                          <button
                            type="button"
                            onClick={() => handleNavClick('services')}
                            className="block min-h-12 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-bold text-(--color-navy) transition-colors hover:border-(--color-orange)"
                          >
                            All services
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => {
                  clearAreasCloseTimer();
                  clearServicesCloseTimer();
                  setServiceAreasDropdownOpen(true);
                  setServicesDropdownOpen(false);
                }}
                onFocus={() => {
                  clearAreasCloseTimer();
                  clearServicesCloseTimer();
                  setServiceAreasDropdownOpen(true);
                  setServicesDropdownOpen(false);
                }}
                onBlur={event => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleAreasClose();
                }}
                onMouseLeave={scheduleAreasClose}
              >
                <button
                  onClick={() => handleNavClick('service-areas')}
                  aria-haspopup="true"
                  aria-expanded={serviceAreasDropdownOpen}
                  aria-controls="service-areas-mega-menu"
                  className={`flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                    currentTab === 'service-areas'
                      ? 'site-nav-active shadow-sm'
                      : 'text-slate-700 hover:bg-orange-50'
                  }`}
                >
                  Service Areas
                  <ChevronDown className="ml-1 h-3.5 w-3.5 text-slate-500" />
                </button>

                <div className="absolute left-0 top-full z-40 h-2" aria-hidden="true" />
                {serviceAreasDropdownOpen && (
                  <div id="service-areas-mega-menu" className="fixed left-1/2 top-[6.5rem] z-[60] w-[min(94vw,38rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 border-t-4 border-t-(--color-orange) bg-white text-(--color-navy) shadow-[0_24px_60px_rgba(13,44,84,0.2)]">
                    <div className="grid grid-cols-[minmax(0,1fr)_10rem]">
                      <div className="p-4">
                        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-(--color-orange-dark)">Service coverage</p>
                        <h3 className="mt-1 text-base font-black text-(--color-navy)">Find a plumber near you</h3>
                        <div className="mt-3 grid grid-cols-2 gap-1.5">
                        {SERVICE_AREAS_DATA.map((area) => (
                          <button
                            key={area.id}
                            type="button"
                            onClick={() => handleServiceAreaClick(area)}
                            className="flex min-h-12 min-w-0 items-center rounded-md border border-slate-200 px-2.5 py-2 text-left transition-colors hover:border-(--color-orange) hover:bg-(--color-ice) hover:text-(--color-navy)"
                          >
                            <span className="block truncate text-xs font-bold leading-4 text-slate-800">{getShortAreaName(area)}</span>
                          </button>
                        ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNavClick('service-areas')}
                          className="mt-3 inline-flex min-h-12 items-center text-xs font-bold text-(--color-navy) underline decoration-(--color-orange) underline-offset-4 hover:text-(--color-orange-dark)"
                        >
                          Check your ZIP code
                        </button>
                      </div>

                      <div className="flex flex-col justify-between border-l border-slate-200 bg-(--color-ice) p-4">
                        <div>
                          <div className="text-[9px] font-black uppercase tracking-[0.14em] text-(--color-orange-dark)">Fast response</div>
                          <div className="mt-2 text-2xl font-black tracking-tight text-(--color-navy)">24/7</div>
                          <div className="mt-1 text-xs font-semibold text-slate-700">Emergency service</div>
                        </div>
                        <a
                          href={`tel:${COMPANY_INFO.phoneRaw}`}
                          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-(--color-orange) px-3 py-2.5 text-sm font-black text-(--color-charcoal) transition-colors hover:brightness-95"
                        >
                          <Phone className="mr-2 h-4 w-4" /> Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('contact')}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                  currentTab === 'contact'
                    ? 'site-nav-active shadow-sm'
                    : 'text-slate-700 hover:bg-orange-50'
                }`}
              >
                Contact
              </button>
              </div>
            </nav>

            <div className="hidden items-center gap-2 xl:order-3 xl:flex">
              <HeaderSearchControl
                variant="desktop"
                query={searchQuery}
                onQueryChange={value => { setSearchQuery(value); setSpeechMessage(''); setSearchOpen(true); }}
                open={searchOpen}
                onOpenChange={setSearchOpen}
                results={searchResults}
                pages={matchedPages}
                listening={isListening}
                speechMessage={speechMessage}
                speechLanguage={speechLanguage}
                onSpeechLanguageChange={setSpeechLanguage}
                onVoiceSearch={startVoiceSearch}
                onSubmit={handleSearchSubmit}
                onSelectService={handleServiceClick}
                onBookService={service => { setSearchOpen(false); onOpenBooking(service.id); }}
                onSelectPage={handleNavClick}
              />
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="group flex h-11 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-transparent px-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-(--color-orange) hover:bg-white"
                aria-label={`Call emergency plumbing 24/7 at ${COMPANY_INFO.phone}`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-105">
                  <Flame className="h-4 w-4 text-(--color-orange-dark)" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase leading-tight tracking-wide">Emergency 24/7</div>
                  <div className="text-xs font-bold leading-tight text-slate-600">{COMPANY_INFO.phone}</div>
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
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-transparent text-(--color-orange-dark) hover:bg-white"
                aria-label={`Call USA Pro Plumbing at ${COMPANY_INFO.phone}`}
                title="Call Plumber"
              >
                <Phone className="h-4 w-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-800"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
        <button
          type="button"
          className="fixed inset-x-0 bottom-0 top-20 z-10 bg-slate-950/35 backdrop-blur-sm xl:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        />
        <div id="mobile-navigation" className="absolute left-0 right-0 top-full z-20 max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 pb-5 pt-3 text-slate-900 shadow-xl xl:hidden sm:px-6">
          <div className="space-y-2 border-b border-white/15 pb-3">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="site-emergency flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold"
              >
                <Phone className="h-4 w-4" />
                <span>Emergency Call</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="site-cta flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Online</span>
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => handleNavClick('staff')}
                className="site-nav flex min-h-12 w-1/2 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800"
              >
                <UserCheck className="h-4 w-4" />
                <span>Staff Login</span>
              </button>
            </div>
          </div>

          <div className="mt-3">
            <HeaderSearchControl
              variant="mobile"
              query={searchQuery}
              onQueryChange={value => { setSearchQuery(value); setSpeechMessage(''); setSearchOpen(true); }}
              open={searchOpen}
              onOpenChange={setSearchOpen}
              results={searchResults}
              pages={matchedPages}
              listening={isListening}
              speechMessage={speechMessage}
              speechLanguage={speechLanguage}
              onSpeechLanguageChange={setSpeechLanguage}
              onVoiceSearch={startVoiceSearch}
              onSubmit={handleSearchSubmit}
              onSelectService={handleServiceClick}
              onBookService={service => { setSearchOpen(false); onOpenBooking(service.id); }}
              onSelectPage={handleNavClick}
            />
          </div>

          <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`min-h-12 w-full rounded-lg px-3 py-2 text-left text-sm font-semibold ${
                currentTab === 'home' ? 'bg-orange-100 text-orange-950' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`min-h-12 w-full rounded-lg px-3 py-2 text-left text-sm font-semibold ${
                currentTab === 'services' ? 'bg-orange-100 text-orange-950' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Services
            </button>

            <button
              type="button"
              onClick={() => setMobileServicesOpen(open => !open)}
              aria-expanded={mobileServicesOpen}
              className="flex min-h-12 w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Browse services <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="grid gap-1 border-l-2 border-orange-300 pl-3 sm:col-start-2">
                {SERVICES_DATA.map(service => (
                <button key={service.id} type="button" onClick={() => handleServiceClick(service)} className="flex min-h-12 w-full items-center rounded-lg px-3 py-2 text-left hover:bg-orange-50 hover:text-orange-900">
                  <span className="block text-xs font-semibold leading-4 text-slate-800">{getShortServiceName(service)}</span>
                </button>
              ))}
              </div>
            )}

            <button
              onClick={() => handleNavClick('emergency')}
              className="flex min-h-12 w-full items-center justify-between rounded-lg bg-(--color-orange) px-3 py-2 text-left text-sm font-bold text-slate-950 sm:col-span-2"
            >
              <span className="flex items-center">
                <Flame className="mr-2 h-4 w-4 text-red-400" />
                24/7 Emergency Dispatch
              </span>
              <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-black uppercase text-orange-950">Live</span>
            </button>

            <button
              onClick={() => handleNavClick('service-areas')}
              className={`flex min-h-12 w-full items-center rounded-lg px-3 py-2 text-left text-sm font-semibold ${
                currentTab === 'service-areas' ? 'bg-orange-100 text-orange-950' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <MapPin className="mr-2 h-4 w-4 text-(--color-orange-dark)" />
              Service Areas
            </button>

            <button
              type="button"
              onClick={() => setMobileAreasOpen(open => !open)}
              aria-expanded={mobileAreasOpen}
              className="flex min-h-12 w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Browse service areas <ChevronDown className={`h-4 w-4 transition-transform ${mobileAreasOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileAreasOpen && (
              <div className="grid gap-1 border-l-2 border-orange-300 pl-3 sm:col-start-1">
                {SERVICE_AREAS_DATA.map(area => (
                  <button key={area.id} type="button" onClick={() => handleServiceAreaClick(area)} className="flex min-h-12 w-full items-center rounded-lg px-3 py-2 text-left hover:bg-orange-50 hover:text-orange-900">
                    <span className="block text-xs font-semibold leading-4 text-slate-800">{getShortAreaName(area)}</span>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => handleNavClick('contact')}
              className={`min-h-12 w-full rounded-lg px-3 py-2 text-left text-sm font-semibold ${
                currentTab === 'contact' ? 'bg-orange-100 text-orange-950' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Contact Us
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="flex min-h-12 w-full items-center justify-between rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-left text-sm font-semibold text-orange-950 sm:col-span-2"
            >
              <span className="flex items-center">
                <UserCheck className="mr-2 h-4 w-4" />
                Dispatcher CRM / Admin Portal
              </span>
              <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold text-slate-800">
                {leadsCount} Leads
              </span>
            </button>

          </div>
        </div>
        </>
      )}
    </header>
  );
};

interface SearchPageResult {
  tab: string;
  label: string;
}

interface HeaderSearchControlProps {
  variant: 'desktop' | 'mobile';
  query: string;
  onQueryChange: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: ServiceItem[];
  pages: SearchPageResult[];
  listening: boolean;
  speechMessage: string;
  speechLanguage: 'en-US' | 'hi-IN';
  onSpeechLanguageChange: (language: 'en-US' | 'hi-IN') => void;
  onVoiceSearch: () => void;
  onSubmit: (event: React.FormEvent) => void;
  onSelectService: (service: ServiceItem) => void;
  onBookService: (service: ServiceItem) => void;
  onSelectPage: (tab: string) => void;
}

const HeaderSearchControl: React.FC<HeaderSearchControlProps> = ({
  variant,
  query,
  onQueryChange,
  open,
  onOpenChange,
  results,
  pages,
  listening,
  speechMessage,
  speechLanguage,
  onSpeechLanguageChange,
  onVoiceSearch,
  onSubmit,
  onSelectService,
  onBookService,
  onSelectPage,
}) => {
  const hasPanel = open && (Boolean(query.trim()) || listening || Boolean(speechMessage));
  const panelId = `service-search-results-${variant}`;

  return (
    <div className={`relative ${variant === 'mobile' ? 'w-full' : 'shrink-0 lg:w-48 xl:w-60'}`}>
      <form
        onSubmit={onSubmit}
        className={`flex ${variant === 'mobile' ? 'h-12' : 'h-11'} items-center rounded-xl border border-slate-200 bg-white px-2 text-slate-900 shadow-sm transition-shadow focus-within:border-(--color-orange) focus-within:shadow-md ${variant === 'mobile' ? 'w-full' : ''}`}
        role="search"
      >
        <input
          value={query}
          onChange={event => onQueryChange(event.target.value)}
          onFocus={() => onOpenChange(true)}
          onKeyDown={event => { if (event.key === 'Escape') onOpenChange(false); }}
          placeholder={variant === 'mobile' ? 'Search or describe a plumbing issue' : 'Search...'}
          className="min-w-0 flex-1 bg-transparent px-2 text-sm font-medium outline-none placeholder:text-slate-400"
          aria-label="Search plumbing services and website sections"
          aria-controls={panelId}
          aria-expanded={hasPanel}
        />
        {query && (
          <button
            type="button"
            onClick={() => { onQueryChange(''); onOpenChange(false); }}
            className={`flex shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-(--color-orange) ${variant === 'mobile' ? 'h-12 w-12' : 'h-8 w-8'}`}
            aria-label="Clear search"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          className={`flex shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-orange-50 hover:text-(--color-orange-dark) focus-visible:outline-2 focus-visible:outline-(--color-orange) ${variant === 'mobile' ? 'h-12 w-12' : 'h-8 w-8'}`}
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
        <select
          value={speechLanguage}
          onChange={event => onSpeechLanguageChange(event.target.value as 'en-US' | 'hi-IN')}
          className={`${variant === 'mobile' ? 'h-12 w-12' : 'h-8 w-12'} shrink-0 border-l border-slate-200 bg-transparent pl-1 text-[10px] font-bold text-slate-600 outline-none focus-visible:text-orange-900`}
          aria-label="Voice search language"
          title="Voice search language"
          disabled={listening}
        >
          <option value="en-US">EN</option>
          <option value="hi-IN">HI</option>
        </select>
        <button
          type="button"
          onClick={onVoiceSearch}
          className={`flex shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-(--color-orange) ${variant === 'mobile' ? 'h-12 w-12' : 'h-8 w-8'} ${listening ? 'bg-(--color-orange) text-slate-950' : 'text-slate-700 hover:bg-orange-50 hover:text-(--color-orange-dark)'}`}
          title={listening ? 'Stop voice search' : 'Search by voice'}
          aria-label={listening ? 'Stop voice search' : 'Search by voice'}
          aria-pressed={listening}
        >
          {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </button>
      </form>

      {hasPanel && (
        <section
          id={panelId}
          className={`z-60 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900 shadow-2xl ${variant === 'mobile' ? 'relative w-full' : 'absolute right-0 top-full w-[min(82vw,56rem)]'}`}
          aria-label="Plumbing service search results"
        >
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase text-slate-500">{listening ? 'Listening' : query ? 'Suggested services' : 'Search services'}</p>
              {query && <p className="mt-0.5 truncate text-sm font-semibold">{query}</p>}
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={`flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-(--color-orange) ${variant === 'mobile' ? 'h-12 w-12' : 'h-8 w-8'}`}
              aria-label="Close search results"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {speechMessage && (
            <p className={`px-4 py-2 text-xs ${listening ? 'bg-orange-50 font-semibold text-orange-900' : 'text-slate-600'}`} role="status" aria-live="polite">
              {listening && <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-(--color-orange)" />}
              {speechMessage}
            </p>
          )}

          {query && results.length > 0 && (
            <div className="flex snap-x gap-3 overflow-x-auto px-4 py-3 focus-visible:outline-2 focus-visible:outline-(--color-orange)" tabIndex={0} aria-label="Matching services. Scroll horizontally for more results.">
              {results.map(service => (
                <article key={service.id} className="w-72 shrink-0 snap-start overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="relative h-28 bg-slate-100">
                    <img src={service.imageUrl} alt={service.title} loading="lazy" className="h-full w-full object-cover" />
                    {service.isEmergency && (
                      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold text-red-800 shadow-sm">
                        <Flame className="h-3 w-3" /> 24/7 Emergency
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-1 text-sm font-bold text-slate-900">{getShortServiceName(service)}</h3>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => onSelectService(service)} className="min-h-12 rounded-lg border border-slate-300 px-2 py-2 text-xs font-bold text-slate-800 hover:border-(--color-orange) hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-(--color-orange)">
                        View Service
                      </button>
                      <button type="button" onClick={() => onBookService(service)} className="min-h-12 rounded-lg bg-(--color-orange) px-2 py-2 text-xs font-bold text-slate-950 hover:bg-(--color-orange-dark) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-orange)">
                        Book Now
                      </button>
                      <button type="button" onClick={() => onBookService(service)} className="min-h-12 rounded-lg border border-orange-200 px-2 py-2 text-xs font-bold text-orange-900 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-(--color-orange)">
                        Request Quote
                      </button>
                      <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="flex min-h-12 items-center justify-center gap-1 rounded-lg border border-slate-300 px-2 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-(--color-orange)">
                        <Phone className="h-3 w-3" /> Call Now
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {query && results.length === 0 && !listening && (
            <p className="px-4 py-4 text-sm text-slate-600" role="status">No close service match yet. Try “leak repair”, “drain cleaning”, or “water heater”.</p>
          )}

          {pages.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 px-4 py-3">
              <span className="text-xs font-semibold text-slate-500">Related pages</span>
              {pages.map(page => (
                <button key={page.tab} type="button" onClick={() => onSelectPage(page.tab)} className="min-h-12 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-orange-100 hover:text-orange-900 focus-visible:outline-2 focus-visible:outline-(--color-orange)">
                  {page.label}
                </button>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
