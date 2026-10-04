import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { HeroSection } from './components/HeroSection';
import { ProblemFinderSection } from './components/ProblemFinderSection';
import { EmergencyAlertBanner } from './components/EmergencyAlertBanner';
import { ServicesGrid } from './components/ServicesGrid';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { CostEstimator } from './components/CostEstimator';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessSection } from './components/ProcessSection';
import { ServiceHighlights } from './components/ServiceHighlights';
import { ServiceAreaChecker } from './components/ServiceAreaChecker';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { BookingModal } from './components/BookingModal';
import { LoginPage } from './components/LoginPage';
import { OperationsDashboard } from './components/OperationsDashboard';
import { EmergencyPage } from './components/EmergencyPage';
import { CommercialPage } from './components/CommercialPage';
import { ContactPage } from './components/ContactPage';
import { LegalModals } from './components/LegalModals';
import { ExploreMoreSection } from './components/ExploreMoreSection';

import { INITIAL_BOOKINGS, COMPANY_INFO, SERVICES_DATA, SERVICE_AREAS_DATA } from './data/plumbingData';
import { ServiceItem, ServiceArea, BookingRequest, BookingStatus, ReviewItem, AuthUser } from './types';
import { operationsStorage } from './services/operationsStorage';
import { getServiceAreaSlug } from './services/routes';
import { ServiceAreaDetailPage } from './components/ServiceAreaDetailPage';

const NAV_TABS = new Set([
  'home',
  'services',
  'emergency',
  'commercial',
  'calculator',
  'service-areas',
  'reviews',
  'blog',
  'contact',
  'admin',
  'staff'
]);

const getTabFromLocation = (): string => {
  const pathname = window.location.pathname.replace(/^\/|\/$/g, '');
  if (pathname && NAV_TABS.has(pathname)) return pathname;
  if (pathname.startsWith('services/')) return 'services';
  if (pathname.startsWith('service-areas/')) return 'service-areas';

  const requestedTab = window.location.hash.replace(/^#\/?/, '');
  return NAV_TABS.has(requestedTab) ? requestedTab : 'home';
};

const getServiceSlugFromLocation = (): string | null => {
  const match = window.location.pathname.match(/^\/services\/([^/?#]+)/i);
  return match ? decodeURIComponent(match[1]) : null;
};

const getServiceAreaSlugFromLocation = (): string | null => {
  const match = window.location.pathname.match(/^\/service-areas\/([^/?#]+)/i);
  return match ? decodeURIComponent(match[1]) : null;
};

const PAGE_METADATA: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Dallas Plumber & 24/7 Emergency Plumbing | USA Pro',
    description: 'Emergency plumbing, drain cleaning, water-heater repair, leak detection, and upfront estimates across our listed service hubs. Call to confirm ZIP coverage.',
  },
  services: {
    title: 'Plumbing Services | USA Pro Plumbing',
    description: 'Explore emergency plumbing, drain and sewer repair, water heaters, leak detection, repiping, and fixture services from USA Pro.',
  },
  emergency: {
    title: '24/7 Emergency Plumber | USA Pro Plumbing',
    description: 'Call USA Pro for urgent burst pipes, active leaks, sewage backups, and overflowing fixtures. Confirm dispatch availability for your ZIP.',
  },
  commercial: {
    title: 'Commercial Plumbing | USA Pro Plumbing',
    description: 'Commercial plumbing repairs, grease traps, backflow testing, and maintenance for businesses in our listed service hubs.',
  },
  calculator: {
    title: 'Plumbing Cost Estimator | USA Pro Plumbing',
    description: 'Review typical plumbing repair price ranges and request an upfront estimate for your home or business.',
  },
  'service-areas': {
    title: 'Plumbing Service Areas | USA Pro Plumbing',
    description: 'Check configured plumbing service ZIP codes and active metro hubs. Call dispatch to verify any location not listed.',
  },
  reviews: {
    title: 'Customer Reviews & Plumbing Projects | USA Pro',
    description: 'Read customer feedback and explore plumbing repair and replacement project examples from USA Pro.',
  },
  blog: {
    title: 'Plumbing Guides & Advice | USA Pro Plumbing',
    description: 'Practical plumbing guidance on emergency water shutoffs, drain care, water heaters, and home maintenance.',
  },
  contact: {
    title: 'Contact USA Pro Plumbing | Request Service',
    description: 'Contact USA Pro Plumbing to ask about service availability, request an estimate, or get help with an urgent plumbing issue.',
  },
  admin: { title: 'Operations Sign In | USA Pro Plumbing', description: 'Secure operations sign-in for USA Pro Plumbing administrators.' },
  staff: { title: 'Staff Sign In | USA Pro Plumbing', description: 'Secure operations sign-in for USA Pro Plumbing field staff.' },
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>(() => getTabFromLocation());
  const [serviceRouteSlug, setServiceRouteSlug] = useState<string | null>(() => getServiceSlugFromLocation());
  const [serviceAreaRouteSlug, setServiceAreaRouteSlug] = useState<string | null>(() => getServiceAreaSlugFromLocation());
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);
  const [preselectedBookingServiceId, setPreselectedBookingServiceId] = useState<string | undefined>();
  const [estimateDetailsForBooking, setEstimateDetailsForBooking] = useState<{
    serviceName: string;
    estimatedCost: string;
    notes: string;
  } | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'guarantee' | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => operationsStorage.getSession());

  // Leads & Bookings state (initialized from INITIAL_BOOKINGS and stored)
  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem('usa_plumbing_bookings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // fallback
    }
    return INITIAL_BOOKINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('usa_plumbing_bookings', JSON.stringify(bookings));
    } catch (e) {
      // ignore
    }
  }, [bookings]);

  useEffect(() => {
    const service = serviceRouteSlug ? SERVICES_DATA.find(item => item.slug === serviceRouteSlug) : null;
    const serviceArea = serviceAreaRouteSlug
      ? SERVICE_AREAS_DATA.find(area => getServiceAreaSlug(area) === serviceAreaRouteSlug)
      : null;
    const metadata = service
      ? { title: `${service.title} | USA Pro Plumbing`, description: service.shortDesc }
      : serviceArea
        ? { title: `Plumber in ${serviceArea.city}, ${serviceArea.state} | USA Pro Plumbing`, description: `Explore plumbing services and coverage information for ${serviceArea.city}, ${serviceArea.state}. ${serviceArea.metroArea}.` }
        : (currentTab === 'admin' || currentTab === 'staff') && currentUser
      ? {
          title: `${currentUser.role === 'owner' ? 'Owner' : currentUser.role === 'admin' ? 'Admin' : 'Staff'} Operations | USA Pro`,
          description: 'USA Pro Plumbing local operations dashboard for customer requests and staff management.',
        }
      : PAGE_METADATA[currentTab] || PAGE_METADATA.home;
    document.title = metadata.title;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descriptionTag) descriptionTag.content = metadata.description;
    const socialMetadata: [string, string][] = [
      ['meta[property="og:title"]', metadata.title],
      ['meta[property="og:description"]', metadata.description],
      ['meta[name="twitter:title"]', metadata.title],
      ['meta[name="twitter:description"]', metadata.description],
    ];
    socialMetadata.forEach(([selector, content]) => {
      const tag = document.querySelector<HTMLMetaElement>(selector);
      if (tag) tag.content = content;
    });
  }, [currentTab, currentUser, serviceRouteSlug, serviceAreaRouteSlug]);

  useEffect(() => {
    const handleLocationChange = () => {
      const requestedTab = getTabFromLocation();
      const guardedTab = requestedTab === 'admin' && currentUser?.role === 'staff'
        ? 'staff'
        : requestedTab === 'staff' && currentUser && currentUser.role !== 'staff'
          ? 'admin'
          : requestedTab;
      setCurrentTab(NAV_TABS.has(guardedTab) ? guardedTab : 'home');
      setServiceRouteSlug(getServiceSlugFromLocation());
      setServiceAreaRouteSlug(getServiceAreaSlugFromLocation());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [currentUser]);

  const handleSelectTab = (tab: string) => {
    if (!NAV_TABS.has(tab)) return;
    if (tab === 'admin' && currentUser?.role === 'staff') tab = 'staff';
    if (tab === 'staff' && currentUser && currentUser.role !== 'staff') tab = 'admin';
    setCurrentTab(tab);
    if (tab === 'home') {
      window.history.pushState({}, '', '/');
    } else {
      window.history.pushState({}, '', `/${tab}`);
    }
    setServiceRouteSlug(null);
    setServiceAreaRouteSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServicePage = (service: ServiceItem) => {
    const nextPath = `/services/${service.slug}`;
    if (window.location.pathname !== nextPath) window.history.pushState({}, '', nextPath);
    setCurrentTab('services');
    setServiceRouteSlug(service.slug);
    setServiceAreaRouteSlug(null);
    setSelectedServiceForModal(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceAreaPage = (area: ServiceArea) => {
    const slug = getServiceAreaSlug(area);
    const nextPath = `/service-areas/${slug}`;
    if (window.location.pathname !== nextPath) window.history.pushState({}, '', nextPath);
    setCurrentTab('service-areas');
    setServiceRouteSlug(null);
    setServiceAreaRouteSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (user: AuthUser) => {
    operationsStorage.saveSession(user);
    setCurrentUser(user);
    handleSelectTab(user.role === 'staff' ? 'staff' : 'admin');
  };

  const handleLogout = () => {
    operationsStorage.saveSession(null);
    setCurrentUser(null);
    handleSelectTab('home');
  };

  // Open booking modal handler
  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedBookingServiceId(serviceId);
    setEstimateDetailsForBooking(null);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithEstimate = (details: {
    serviceName: string;
    estimatedCost: string;
    notes: string;
  }) => {
    setEstimateDetailsForBooking(details);
    setIsBookingOpen(true);
  };

  const handleAddBooking = (newBooking: BookingRequest) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleSubmitContactInquiry = ({ name, phone, email, message }: { name: string; phone: string; email: string; message: string }) => handleAddBooking({
    id: `USA-${Date.now()}`,
    createdAt: new Date().toISOString(),
    customerName: name,
    phone,
    email,
    address: 'To be confirmed',
    city: '',
    state: '',
    zip: '',
    propertyType: 'residential',
    serviceId: 'general-plumbing',
    serviceName: 'General Plumbing Inquiry',
    urgency: 'flexible',
    preferredDate: 'To be scheduled',
    preferredTimeSlot: 'Customer requested follow-up',
    description: message,
    status: 'new',
    estimatedCost: 'Pending estimate',
  });

  const handleUpdateBookingStatus = (
    id: string, 
    newStatus: BookingStatus, 
    notes?: string, 
    assignedTech?: string
  ) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status: newStatus,
          notes: notes !== undefined ? notes : b.notes,
          assignedTechnician: assignedTech !== undefined ? assignedTech : b.assignedTechnician
        };
      }
      return b;
    }));
  };

  const handleAddReview = (newReview: ReviewItem) => {
    // In real app sends to server, here logged
    console.log('New verified customer review:', newReview);
  };

  const activeServiceRoute = serviceRouteSlug
    ? SERVICES_DATA.find((service) => service.slug === serviceRouteSlug) ?? null
    : null;
  const activeServiceAreaRoute = serviceAreaRouteSlug
    ? SERVICE_AREAS_DATA.find((area) => getServiceAreaSlug(area) === serviceAreaRouteSlug) ?? null
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleSelectTab}
        onOpenBooking={handleOpenBooking}
        onSelectService={handleSelectServicePage}
        onSelectServiceArea={handleSelectServiceAreaPage}
        leadsCount={bookings.filter(b => b.status === 'new').length}
      />

      {/* Main Content Area based on currentTab */}
      <main className="flex-1">
        {activeServiceRoute ? (
          <ServiceDetailPage
            service={activeServiceRoute}
            onSelectTab={handleSelectTab}
            onSelectService={handleSelectServicePage}
            onSelectServiceArea={handleSelectServiceAreaPage}
            onBookService={(serviceId) => {
              setSelectedServiceForModal(null);
              handleOpenBooking(serviceId);
            }}
          />
        ) : activeServiceAreaRoute ? (
          <ServiceAreaDetailPage
            area={activeServiceAreaRoute}
            onSelectService={handleSelectServicePage}
            onOpenBooking={handleOpenBooking}
          />
        ) : currentTab === 'home' && (
          <>
            <HeroSection
              onOpenBooking={handleOpenBooking}
              onSelectTab={handleSelectTab}
            />
            <ProblemFinderSection
              onOpenBooking={handleOpenBooking}
              onSelectTab={handleSelectTab}
            />
            <EmergencyAlertBanner
              onOpenBooking={() => handleOpenBooking('emergency-plumbing')}
            />
            <ServiceHighlights
              onSelectService={handleSelectServicePage}
              onSelectTab={handleSelectTab}
            />
            <ProcessSection
              onOpenBooking={handleOpenBooking}
            />
            <ExploreMoreSection onSelectTab={handleSelectTab} />
          </>
        )}

        {currentTab === 'services' && !activeServiceRoute && (
          <div className="py-8">
            <ServicesGrid
              onSelectService={handleSelectServicePage}
              onOpenBooking={handleOpenBooking}
            />
            <CostEstimator
              onOpenBookingWithEstimate={handleOpenBookingWithEstimate}
            />
          </div>
        )}

        {currentTab === 'emergency' && (
          <EmergencyPage
            onOpenBooking={() => handleOpenBooking('emergency-plumbing')}
          />
        )}

        {currentTab === 'commercial' && (
          <CommercialPage
            onOpenBooking={() => handleOpenBooking('commercial-plumbing')}
          />
        )}

        {currentTab === 'calculator' && (
          <div className="py-8">
            <CostEstimator
              onOpenBookingWithEstimate={handleOpenBookingWithEstimate}
            />
            <FaqSection
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {currentTab === 'service-areas' && !activeServiceAreaRoute && (
          <div className="py-8">
            <ServiceAreaChecker
              onOpenBooking={handleOpenBooking}
              onSelectArea={handleSelectServiceAreaPage}
            />
            <WhyChooseUs />
          </div>
        )}

        {currentTab === 'reviews' && (
          <div className="py-8">
            <ReviewsSection
              onAddReview={handleAddReview}
            />
            <BeforeAfterSlider />
          </div>
        )}

        {currentTab === 'blog' && (
          <div className="py-8">
            <BlogSection
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {currentTab === 'contact' && (
          <ContactPage
            onSubmitInquiry={handleSubmitContactInquiry}
          />
        )}

        {(currentTab === 'admin' || currentTab === 'staff') && !currentUser && (
          <LoginPage onLogin={handleLogin} requestedRole={currentTab === 'staff' ? 'staff' : 'admin'} />
        )}

        {currentTab === 'admin' && currentUser && currentUser.role !== 'staff' && (
          <OperationsDashboard
            currentUser={currentUser}
            bookings={bookings}
            onLogout={handleLogout}
          />
        )}

        {currentTab === 'staff' && currentUser?.role === 'staff' && (
          <OperationsDashboard
            currentUser={currentUser}
            bookings={bookings}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenBooking={handleOpenBooking}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Mobile Sticky Call / Request Bar */}
      {currentTab !== 'admin' && currentTab !== 'staff' && (
        <MobileStickyBar
          onOpenBooking={() => handleOpenBooking()}
        />
      )}

      {/* Service Detail Modal */}
      {!activeServiceRoute && (
        <ServiceDetailModal
          service={selectedServiceForModal}
          onClose={() => setSelectedServiceForModal(null)}
          onBookService={(serviceId) => handleOpenBooking(serviceId)}
        />
      )}

      {/* Booking / Appointment Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedBookingServiceId}
        estimateDetails={estimateDetailsForBooking}
        onSubmitBooking={handleAddBooking}
      />

      {/* Legal & Guarantee Modals */}
      <LegalModals
        modalType={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

    </div>
  );
}
