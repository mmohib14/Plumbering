import React from 'react';
import { Star } from 'lucide-react';
import { ReviewItem } from '../types';

interface FeaturedReviewProps {
  review: ReviewItem;
  title: string;
}

export const FeaturedReview: React.FC<FeaturedReviewProps> = ({ review, title }) => (
  <section className="border-y border-slate-200 bg-slate-50">
    <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-11 lg:px-8">
      <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-3">
        <div className="flex flex-row items-center justify-between gap-4 bg-(--color-navy) p-5 text-white sm:p-7 md:flex-col md:items-start md:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-amber-300">Verified customer</p>
            <h2 className="mt-2 text-lg font-extrabold leading-snug sm:text-xl">{title}</h2>
            <p className="mt-3 text-3xl font-extrabold">{review.rating.toFixed(1)}<span className="ml-1 text-sm font-bold text-slate-300">/ 5</span></p>
            <div className="mt-2 flex gap-1 text-amber-300" role="img" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className={`h-4 w-4 ${review.rating >= index + 1 ? 'fill-current' : review.rating > index ? 'fill-current opacity-60' : ''}`} />
              ))}
            </div>
          </div>
          <p className="shrink-0 text-right text-[11px] leading-5 text-slate-300 md:text-left">Verified service feedback<br />{review.date}</p>
        </div>

        <blockquote className="flex min-w-0 flex-col justify-between p-5 sm:p-7 md:col-span-2 md:p-9">
          <div>
            <span className="font-serif text-4xl leading-none text-orange-800" aria-hidden="true">“</span>
            <p className="mt-1 text-base font-medium leading-7 text-slate-800 sm:text-lg">{review.review}</p>
          </div>
          <footer className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-extrabold text-(--color-navy)" aria-hidden="true">
              {review.author.split(/\s+/).map(part => part[0]).join('').slice(0, 2)}
            </span>
            <div className="min-w-0">
              <cite className="block not-italic text-sm font-extrabold text-(--color-navy)">{review.author}</cite>
              <p className="mt-0.5 text-xs leading-5 text-slate-600">{review.location} · {review.serviceType}</p>
            </div>
            {review.verified && <span className="ml-auto shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-emerald-800">Verified</span>}
          </footer>
        </blockquote>
      </div>
    </div>
  </section>
);
