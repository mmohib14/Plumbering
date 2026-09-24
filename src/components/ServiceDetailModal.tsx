import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  HelpCircle, 
  Flame,
  Wrench
} from 'lucide-react';
import { ServiceItem } from '../types';
import { COMPANY_INFO } from '../data/plumbingData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Photo Banner */}
        <div className="relative h-56 sm:h-64 bg-slate-900 shrink-0">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges and Title */}
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {service.isEmergency && (
                <span className="bg-red-600 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center">
                  <Flame className="w-3 h-3 mr-1" />
                  24/7 Rapid Emergency Dispatch
                </span>
              )}
              <span className="bg-blue-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                Certified Master Plumbers
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {service.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
          
          {/* Price Range & Quick Highlights Box */}
          <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
                Transparent Upfront Estimate
              </div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                {service.priceRange} <span className="text-xs font-medium text-slate-500">({service.unit})</span>
              </div>
              <p className="text-xs text-blue-700 mt-1">
                Zero surprise overtime fees • 100% Upfront Quote before work starts
              </p>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onBookService(service.id);
                }}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-md shadow-blue-600/20"
              >
                Book This Service
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Service Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Key Features & Deliverables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                What's Included:
              </h3>
              <ul className="space-y-2">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Common Symptoms We Fix:
              </h3>
              <ul className="space-y-2">
                {service.commonSymptoms.map((symp, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-700">
                    <Wrench className="w-4 h-4 text-blue-500 mr-2 shrink-0 mt-0.5" />
                    <span>{symp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQs if present */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="border-t border-slate-200 pt-6 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
                <HelpCircle className="w-4 h-4 mr-1.5 text-blue-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                      {faq.question}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Backed by {COMPANY_INFO.guarantee}</span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex-1 sm:flex-initial bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookService(service.id);
              }}
              className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-md shadow-blue-600/20"
            >
              Book Online
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
