import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/plumbingData';

interface LegalModalsProps {
  modalType: 'privacy' | 'terms' | 'guarantee' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ modalType, onClose }) => {
  if (!modalType) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {modalType === 'guarantee' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Our 100% Satisfaction & 1-Year Workmanship Guarantee
                </h3>
                <p className="text-xs text-slate-500">
                  {COMPANY_INFO.name} Service Protection Commitment
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              At {COMPANY_INFO.name}, we believe in doing every plumbing repair right the first time. We back our craftsmanship with an ironclad promise:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <strong className="block text-slate-900 mb-0.5">1-Year Parts & Labor Warranty:</strong>
                  If any valve, pipe joint, drain fitting, or fixture installed by our team fails within 365 days of installation under normal usage, we will return and remedy it at zero cost to you.
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <strong className="block text-slate-900 mb-0.5">Upfront Fixed Price Guarantee:</strong>
                  You will never be surprised by unexpected travel fees, overtime surcharges, or hourly billing inflation. The price presented before work begins is the final price.
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <strong className="block text-slate-900 mb-0.5">Clean Home Guarantee:</strong>
                  Our technicians wear sanitary shoe covers and lay protective floor runners. If our workspace is left dirty, we pay for professional cleaning.
                </div>
              </div>
            </div>
          </div>
        )}

        {modalType === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Privacy Policy</h3>
                <p className="text-xs text-slate-500">Last updated: September 2026</p>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p>
                <strong>Information Collection:</strong> {COMPANY_INFO.name} collects contact details (name, phone number, physical address, and email) solely to facilitate on-site plumbing service calls, technician GPS dispatching, and SMS appointment updates.
              </p>
              <p>
                <strong>No Third-Party Sharing:</strong> We never sell, rent, or lease your personal information to third-party telemarketers or advertising brokers. Your information is accessed only by authorized dispatchers and assigned technicians.
              </p>
              <p>
                <strong>SMS Communications:</strong> By providing your mobile telephone number, you consent to receive transactional SMS updates regarding technician arrival times and appointment confirmations. You may opt out at any time by replying STOP.
              </p>
            </div>
          </div>
        )}

        {modalType === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Terms of Service</h3>
                <p className="text-xs text-slate-500">Contractor Agreement Terms</p>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p>
                <strong>Authorization for Service:</strong> By approving an upfront written estimate on-site, the property owner or authorized agent grants {COMPANY_INFO.name} permission to enter the premises and perform designated plumbing repairs.
              </p>
              <p>
                <strong>Licensing & Permits:</strong> All work complies with the International Plumbing Code (IPC) and Uniform Plumbing Code (UPC). Work requiring municipal permits will be pulled under Master Plumber Lic #MP-849204.
              </p>
              <p>
                <strong>Payment Terms:</strong> Payment is due upon completion and demonstration of working fixtures. We accept all major credit cards, electronic checks, and pre-approved consumer financing.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-5 rounded-xl text-xs"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
