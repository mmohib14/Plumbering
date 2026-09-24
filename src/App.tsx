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
          <ContactPage />
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
      <MobileStickyBar
        onOpenBooking={() => handleOpenBooking()}
      />

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
