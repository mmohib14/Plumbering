import React, { useEffect, useState } from 'react';
import { Phone, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../data/plumbingData';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting);
    });
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  if (footerVisible) return null;

  return (
    <div className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-40 rounded-2xl border border-slate-200 bg-white/95 px-3 py-2.5 shadow-2xl backdrop-blur-md sm:inset-x-5 xl:hidden">
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="flex min-h-12 items-center justify-center space-x-2 rounded-xl bg-(--color-orange) px-3 py-3 text-sm font-bold whitespace-nowrap text-slate-950 shadow-md shadow-orange-600/20 transition-transform active:bg-(--color-orange-dark) active:scale-95"
        >
          <Phone className="w-4 h-4 animate-pulse" />
          <span>Call Now</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex min-h-12 items-center justify-center space-x-2 rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-bold whitespace-nowrap text-slate-800 transition-transform active:bg-orange-50 active:scale-95"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Online</span>
        </button>
      </div>
    </div>
  );
};
