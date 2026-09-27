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
  FileText,
  UserCheck
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/plumbingData';
import { ServiceItem } from '../types';
import { BrandLogo } from './BrandLogo';

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
  const [speechMessage, setSpeechMessage] = useState('');
  const [speechLanguage, setSpeechLanguage] = useState<'en-US' | 'hi-IN'>(() =>
    typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('hi') ? 'hi-IN' : 'en-US'
  );
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const recognitionRunRef = useRef(0);

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
  }, []);

  const handleNavClick = (tab: string) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (service: ServiceItem) => {
    onSelectService(service);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

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

      <div className="site-header-main">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-2 sm:min-h-18 sm:py-2.5">
            <div
              onClick={() => handleNavClick('home')}
              className="cursor-pointer"
            >
              <BrandLogo light />
            </div>

            <nav className="site-nav order-3 hidden basis-full min-w-0 items-center justify-center gap-1 rounded-xl border-t px-2 py-1.5 xl:flex">
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
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('services')}
                    className={`flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                    currentTab === 'services'
                      ? 'site-nav-active shadow-sm'
                      : 'text-slate-700 hover:bg-orange-50'
                  }`}
                >
                  Services
                  <ChevronDown className="ml-1 h-3.5 w-3.5 text-slate-500" />
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
                    : 'text-slate-800 hover:bg-orange-50'
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
                        : 'text-slate-700 hover:bg-orange-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1 lg:flex">
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
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-800"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full max-h-[calc(100vh-5.5rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 pb-6 pt-3 text-slate-900 shadow-2xl xl:hidden">
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
                className="site-nav flex w-1/2 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800"
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

          <div className="mt-3 space-y-1.5">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'home' ? 'bg-orange-100 text-orange-950' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'services' ? 'bg-orange-100 text-orange-950' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Plumbing Services
            </button>

            <button
              onClick={() => handleNavClick('emergency')}
              className="flex w-full items-center justify-between rounded-xl bg-(--color-orange) px-3 py-2.5 text-left text-sm font-bold text-slate-950"
            >
              <span className="flex items-center">
                <Flame className="mr-2 h-4 w-4 text-red-400" />
                24/7 Emergency Dispatch
              </span>
              <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-black uppercase text-orange-950">Live</span>
            </button>

            <button
              onClick={() => handleNavClick('commercial')}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'commercial' ? 'bg-orange-100 text-orange-950' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Commercial Plumbing
            </button>

            <button
              onClick={() => handleNavClick('calculator')}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'calculator' ? 'bg-orange-100 text-orange-950' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Cost Estimator Calculator
            </button>

            <button
              onClick={() => handleNavClick('service-areas')}
              className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'service-areas' ? 'bg-orange-100 text-orange-950' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <MapPin className="mr-2 h-4 w-4 text-(--color-orange-dark)" />
              Service Areas & ZIP Checker
            </button>

            <button
              onClick={() => handleNavClick('reviews')}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'reviews' ? 'bg-orange-100 text-orange-950' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Customer Reviews ({COMPANY_INFO.googleRating}★)
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'blog' ? 'bg-orange-100 text-orange-950' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileText className="mr-2 h-4 w-4 text-(--color-orange-dark)" />
              Plumbing Guides & Articles
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                currentTab === 'contact' ? 'bg-orange-100 text-orange-950' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Contact Us
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="flex w-full items-center justify-between rounded-xl border border-orange-200 bg-orange-50 px-3 py-2.5 text-left text-sm font-semibold text-orange-950"
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
    <div className={`relative ${variant === 'mobile' ? 'w-full' : 'shrink-0 lg:w-56 xl:w-72'}`}>
      <form
        onSubmit={onSubmit}
        className={`flex h-11 items-center rounded-xl border border-slate-200 bg-white px-2 text-slate-900 shadow-sm transition-shadow focus-within:border-(--color-orange) focus-within:shadow-md ${variant === 'mobile' ? 'w-full' : ''}`}
        role="search"
      >
        <input
          value={query}
          onChange={event => onQueryChange(event.target.value)}
          onFocus={() => onOpenChange(true)}
          onKeyDown={event => { if (event.key === 'Escape') onOpenChange(false); }}
          placeholder={variant === 'mobile' ? 'Search or describe a plumbing issue' : 'Search plumbing services'}
          className="min-w-0 flex-1 bg-transparent px-2 text-sm font-medium outline-none placeholder:text-slate-400"
          aria-label="Search plumbing services and website sections"
          aria-controls={panelId}
          aria-expanded={hasPanel}
        />
        {query && (
          <button
            type="button"
            onClick={() => { onQueryChange(''); onOpenChange(false); }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-(--color-orange)"
            aria-label="Clear search"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-orange-50 hover:text-(--color-orange-dark) focus-visible:outline-2 focus-visible:outline-(--color-orange)"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
        <select
          value={speechLanguage}
          onChange={event => onSpeechLanguageChange(event.target.value as 'en-US' | 'hi-IN')}
          className="h-8 w-12 shrink-0 border-l border-slate-200 bg-transparent pl-1 text-[10px] font-bold text-slate-600 outline-none focus-visible:text-orange-900"
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
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-(--color-orange) ${listening ? 'bg-(--color-orange) text-slate-950' : 'text-slate-700 hover:bg-orange-50 hover:text-(--color-orange-dark)'}`}
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
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-(--color-orange)"
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
                    <h3 className="line-clamp-1 text-sm font-bold text-slate-900">{service.title}</h3>
                    <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-relaxed text-slate-600">{service.shortDesc}</p>
                    <p className="mt-2 text-xs font-semibold text-slate-700">From {service.priceRange}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => onSelectService(service)} className="rounded-lg border border-slate-300 px-2 py-2 text-xs font-bold text-slate-800 hover:border-(--color-orange) hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-(--color-orange)">
                        View Service
                      </button>
                      <button type="button" onClick={() => onBookService(service)} className="rounded-lg bg-(--color-orange) px-2 py-2 text-xs font-bold text-slate-950 hover:bg-(--color-orange-dark) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-orange)">
                        Book Now
                      </button>
                      <button type="button" onClick={() => onBookService(service)} className="rounded-lg border border-orange-200 px-2 py-2 text-xs font-bold text-orange-900 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-(--color-orange)">
                        Request Quote
                      </button>
                      <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="flex items-center justify-center gap-1 rounded-lg border border-slate-300 px-2 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-(--color-orange)">
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
                <button key={page.tab} type="button" onClick={() => onSelectPage(page.tab)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-orange-100 hover:text-orange-900 focus-visible:outline-2 focus-visible:outline-(--color-orange)">
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
