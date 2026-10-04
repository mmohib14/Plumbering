import React from 'react';
import { ArrowUpRight, BookOpen, Building2, Calculator, Mail, MapPin, MessageSquare, Phone, Star } from 'lucide-react';
import { BLOG_POSTS_DATA, COMPANY_INFO, COST_ESTIMATOR_BENCHMARKS, REVIEWS_DATA, SERVICE_AREAS_DATA } from '../data/plumbingData';

interface ExploreMoreSectionProps {
  onSelectTab: (tab: string) => void;
}

const serviceEstimate = COST_ESTIMATOR_BENCHMARKS[0].options[0];
const latestGuide = BLOG_POSTS_DATA[0];
const recentReview = REVIEWS_DATA[0];
const featuredArea = SERVICE_AREAS_DATA[0];

const previews = [
  {
    icon: <Building2 className="h-5 w-5" />,
    label: 'For businesses',
    title: 'Commercial plumbing',
    detail: 'Grease traps, backflow testing, and facility maintenance.',
    action: 'Explore commercial',
    tab: 'commercial',
  },
  {
    icon: <Calculator className="h-5 w-5" />,
    label: 'Plan your repair',
    title: 'Typical repair pricing',
    detail: `${serviceEstimate.name}: $${serviceEstimate.min}-$${serviceEstimate.max}. Final pricing is confirmed on-site.`,
    action: 'Estimate a repair',
    tab: 'calculator',
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: 'Check availability',
    title: 'Service near you',
    detail: `${SERVICE_AREAS_DATA.length} listed hubs, including ${featuredArea.city}. Verify ZIP coverage before booking.`,
    action: 'Check your area',
    tab: 'service-areas',
  },
  {
    icon: <Star className="h-5 w-5" />,
    label: 'Customer feedback',
    title: `${COMPANY_INFO.googleRating}/5 average rating`,
    detail: `“${recentReview.review.slice(0, 88)}…” — ${recentReview.author}`,
    action: 'Read reviews',
    tab: 'reviews',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: 'Latest guide',
    title: latestGuide.title,
    detail: `${latestGuide.category} · ${latestGuide.readTime}`,
    action: 'Browse plumbing guides',
    tab: 'blog',
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    label: 'Need more help?',
    title: 'Talk with our team',
    detail: `Call ${COMPANY_INFO.phone} or send a service inquiry.`,
    action: 'Contact USA Pro',
    tab: 'contact',
  },
];

export const ExploreMoreSection: React.FC<ExploreMoreSectionProps> = ({ onSelectTab }) => (
  <section className="border-b border-slate-200 bg-white py-14 sm:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-(--color-orange-dark)">More from USA Pro</p>
          <h2 className="mt-1 text-3xl font-black text-(--color-navy)">Explore your next step</h2>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-slate-600">Pricing, coverage, customer feedback, and helpful resources in one place.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {previews.map((preview) => (
          <button
            key={preview.tab}
            type="button"
            onClick={() => onSelectTab(preview.tab)}
            className="group flex min-h-36 cursor-pointer flex-col rounded-lg border border-slate-200 bg-(--color-ice) p-4 text-left transition-colors hover:border-(--color-orange) hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-orange)"
          >
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.12em] text-(--color-orange-dark)">
              {preview.icon}
              {preview.label}
            </span>
            <span className="mt-3 block text-base font-extrabold leading-snug text-(--color-navy)">{preview.title}</span>
            <span className="mt-1 block text-xs leading-relaxed text-slate-600">{preview.detail}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-bold text-(--color-navy)">
              {preview.action}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-black text-(--color-navy)">Need help with a plumbing issue?</h3>
          <p className="mt-1 text-sm text-slate-600">Reach the team by phone or email, or send a service inquiry.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-(--color-navy) transition-colors hover:border-(--color-orange) hover:bg-(--color-ice)">
            <Phone className="h-4 w-4 text-(--color-orange-dark)" />
            {COMPANY_INFO.phone}
          </a>
          <a href={`mailto:${COMPANY_INFO.email}`} aria-label={`Email ${COMPANY_INFO.email}`} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-(--color-navy) transition-colors hover:border-(--color-orange) hover:bg-(--color-ice)">
            <Mail className="h-4 w-4 text-(--color-orange-dark)" />
          </a>
          <button type="button" onClick={() => onSelectTab('contact')} className="inline-flex min-h-11 items-center gap-1 rounded-lg bg-(--color-orange) px-4 py-2 text-sm font-black text-(--color-charcoal) transition-colors hover:brightness-95">
            Contact us <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </section>
);
