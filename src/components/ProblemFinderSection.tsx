import React from 'react';
import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  CreditCard,
  Droplets,
  Flame,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/plumbingData';

interface ProblemFinderSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectTab: (tab: string) => void;
}

const commonIssues = [
  {
    id: 'water-heater',
    icon: <Flame className="h-5 w-5" />,
    title: 'No hot water',
    description: 'Water heater repair or replacement',
  },
  {
    id: 'emergency-plumbing',
    icon: <Droplets className="h-5 w-5" />,
    title: 'Burst pipe or leak',
    description: 'Leaks, burst pipes, or flooding',
  },
  {
    id: 'drain-cleaning',
    icon: <Sparkles className="h-5 w-5" />,
    title: 'Slow or clogged drains',
    description: 'Slow sinks, clogged drains, or backups',
  },
  {
    id: 'repiping',
    icon: <Wrench className="h-5 w-5" />,
    title: 'Low pressure or old pipes',
    description: 'Old pipes, low pressure, or rusty water',
  },
  {
    id: 'leak-detection',
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Hidden leak',
    description: 'Find hidden leaks and water damage',
  },
  {
    id: 'commercial-plumbing',
    icon: <Building2 className="h-5 w-5" />,
    title: 'Commercial plumbing issue',
    description: 'Plumbing for businesses and properties',
  },
] as const;

const financingHighlights = [
  {
    title: 'Clear, upfront pricing',
    description: 'Know the price before work begins.',
    icon: <CalendarCheck2 className="h-5 w-5" />,
  },
  {
    title: 'Flexible financing options',
    description: 'Payment plans for larger repairs.',
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: 'Annual maintenance plan',
    description: 'Priority scheduling and routine care.',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
] as const;

export const ProblemFinderSection: React.FC<ProblemFinderSectionProps> = ({
  onOpenBooking,
  onSelectTab,
}) => {
  return (
    <section className="border-b border-slate-200 bg-(--color-ice) py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 text-center lg:text-left">
          <span className="inline-flex w-fit self-center items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-(--color-orange-dark) lg:self-start">
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-orange)" />
            Plumbing help, made simple
          </span>
          <h2
            className="text-4xl font-extrabold leading-[1.08] tracking-normal text-(--color-navy) lg:text-5xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            What needs <span className="text-(--color-orange)">fixing?</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-slate-600 lg:mx-0">
            Choose an issue to book the right plumber.
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1.65fr_0.85fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {commonIssues.map((issue) => (
              <button
                key={issue.id}
                type="button"
                onClick={() => onOpenBooking(issue.id)}
                className="group relative flex min-h-28 cursor-pointer items-center gap-3 overflow-hidden rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-orange) hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-orange) sm:p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-(--color-orange-dark) transition-colors group-hover:bg-(--color-orange) group-hover:text-(--color-charcoal)">
                  {issue.icon}
                </div>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-extrabold text-(--color-navy)">{issue.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-600">{issue.description}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-black uppercase tracking-wide text-(--color-orange-dark)">
                  Book <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-lg bg-(--color-navy) p-4 text-white shadow-lg shadow-slate-900/10 sm:p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-(--color-orange)">
                The USA Pro difference
              </p>
              <h3 className="mt-2 text-lg font-black tracking-tight">Good work. No guesswork.</h3>
              <div className="mt-2 space-y-1">
                {financingHighlights.map((item) => (
                  <div key={item.title} className="flex items-center gap-2.5 border-t border-white/15 py-2.5 first:border-0 first:pt-0 last:pb-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/10 text-(--color-orange)">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-300" title={item.description}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-orange-200 bg-white p-3">
              <h3 className="text-sm font-black text-(--color-navy)">Need help now?</h3>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-(--color-orange) px-4 py-3 text-sm font-black text-(--color-charcoal) transition-colors hover:brightness-95"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call {COMPANY_INFO.phone}
                </a>
                <button
                  type="button"
                  onClick={() => onSelectTab('services')}
                  className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-(--color-navy) transition-colors hover:border-(--color-orange) hover:bg-orange-50"
                >
                  View all services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
