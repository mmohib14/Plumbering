import React from 'react';
import { ShieldCheck, Wrench } from 'lucide-react';

interface BrandLogoProps {
  compact?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ compact = false }) => (
  <div className={`group flex select-none items-center ${compact ? 'gap-2.5' : 'gap-3.5'}`} aria-label="USA Pro Plumbing and Rooter Services">
    <div className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(3,45,70,0.24)] ring-1 ring-white/80 transition-transform duration-200 group-hover:scale-105 ${compact ? 'h-11 w-11' : 'h-12 w-12 sm:h-13 sm:w-13'}`}>
      <div className={`relative flex items-center justify-center rounded-[13px] bg-(--color-navy) ring-2 ring-sky-100 ${compact ? 'h-8 w-8' : 'h-9 w-9 sm:h-10 sm:w-10'}`}>
        <ShieldCheck className={`absolute text-sky-100 ${compact ? 'h-7 w-7' : 'h-8 w-8 sm:h-9 sm:w-9'}`} strokeWidth={1.5} />
        <Wrench className={`relative -rotate-45 text-(--color-orange) ${compact ? 'h-4 w-4' : 'h-5 w-5'}`} strokeWidth={2.8} />
      </div>
      <span className="absolute bottom-0 left-0 right-0 h-1 bg-(--color-orange)" />
    </div>
    <div className="leading-none">
      <div className={`font-black uppercase tracking-[-0.06em] text-white ${compact ? 'text-xl' : 'text-xl sm:text-3xl'}`}>
        USA <span className="text-(--color-orange)">PRO</span>
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        <span className={`h-px bg-(--color-orange) ${compact ? 'w-4' : 'w-5 sm:w-7'}`} />
        <p className={`font-bold uppercase tracking-[0.14em] text-sky-100 ${compact ? 'text-[8px]' : 'text-[8px] sm:text-[10px]'}`}>
          Plumbing & Rooter Services
        </p>
      </div>
    </div>
  </div>
);
