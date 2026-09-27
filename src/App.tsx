import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { HeroSection } from './components/HeroSection';
import { EmergencyAlertBanner } from './components/EmergencyAlertBanner';
import { ServicesGrid } from './components/ServicesGrid';
import { ServiceDetailModal } from './components/ServiceDetailModal';
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

import { INITIAL_BOOKINGS, COMPANY_INFO } from './data/plumbingData';
import { ServiceItem, BookingRequest, BookingStatus, ReviewItem, AuthUser } from './types';
import { operationsStorage } from './services/operationsStorage';

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
  const [currentTab, setCurrentTab] = useState<string>(() => {
    const requestedTab = window.location.hash.replace(/^#\/?/, '');
    return NAV_TABS.has(requestedTab) ? requestedTab : 'home';
  });
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
    const metadata = (currentTab === 'admin' || currentTab === 'staff') && currentUser
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
  }, [currentTab, currentUser]);

  useEffect(() => {
    const handleHashChange = () => {
      const requestedTab = window.location.hash.replace(/^#\/?/, '');
      const guardedTab = requestedTab === 'admin' && currentUser?.role === 'staff'
        ? 'staff'
        : requestedTab === 'staff' && currentUser && currentUser.role !== 'staff'
          ? 'admin'
          : requestedTab;
      setCurrentTab(NAV_TABS.has(guardedTab) ? guardedTab : 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentUser]);

  const handleSelectTab = (tab: string) => {
    if (!NAV_TABS.has(tab)) return;
    if (tab === 'admin' && currentUser?.role === 'staff') tab = 'staff';
    if (tab === 'staff' && currentUser && currentUser.role !== 'staff') tab = 'admin';
    setCurrentTab(tab);
    window.location.hash = tab === 'home' ? '' : tab;
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleSelectTab}
        onOpenBooking={handleOpenBooking}
        onSelectService={(service) => setSelectedServiceForModal(service)}
        leadsCount={bookings.filter(b => b.status === 'new').length}
      />

      {/* Main Content Area based on currentTab */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            <HeroSection
              onOpenBooking={handleOpenBooking}
              onSelectTab={handleSelectTab}
            />
            <EmergencyAlertBanner
              onOpenBooking={() => handleOpenBooking('emergency-plumbing')}
            />
            <ServiceHighlights
              onSelectService={(service) => setSelectedServiceForModal(service)}
              onSelectTab={handleSelectTab}
            />
            <ProcessSection
              onOpenBooking={handleOpenBooking}
            />
          </>
        )}

        {currentTab === 'services' && (
          <div className="py-8">
            <ServicesGrid
              onSelectService={(service) => setSelectedServiceForModal(service)}
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

        {currentTab === 'service-areas' && (
          <div className="py-8">
            <ServiceAreaChecker
              onOpenBooking={handleOpenBooking}
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
            onSubmitInquiry={({ name, phone, email, message }) => handleAddBooking({
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
            })}
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
      <ServiceDetailModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onBookService={(serviceId) => handleOpenBooking(serviceId)}
      />

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
