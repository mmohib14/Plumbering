import React from 'react';
import { Phone, Calendar, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/plumbingData';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-2xl lg:hidden">
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="flex min-h-12 items-center justify-center space-x-2 rounded-xl bg-red-600 px-3 py-3 text-sm font-bold whitespace-nowrap text-white shadow-md shadow-red-600/30 transition-transform active:bg-red-700 active:scale-95"
        >
          <Phone className="w-4 h-4 animate-pulse" />
          <span>Call Now</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex min-h-12 items-center justify-center space-x-2 rounded-xl bg-blue-600 px-3 py-3 text-sm font-bold whitespace-nowrap text-white shadow-md shadow-blue-600/30 transition-transform active:bg-blue-700 active:scale-95"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Online</span>
        </button>
      </div>
    </div>
  );
};
