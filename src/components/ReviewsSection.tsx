import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, ThumbsUp, PlusCircle, X, ShieldCheck } from 'lucide-react';
import { REVIEWS_DATA, COMPANY_INFO } from '../data/plumbingData';
import { ReviewItem } from '../types';

interface ReviewsSectionProps {
  onAddReview: (review: ReviewItem) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onAddReview }) => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [serviceType, setServiceType] = useState('Drain Cleaning');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !reviewText) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author,
      location: location || 'United States',
      rating,
      date: 'Just now',
      serviceType,
      review: reviewText,
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    onAddReview(newRev);
    setFormSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
      setAuthor('');
      setLocation('');
      setReviewText('');
    }, 1500);
  };

  const displayedReviews = filterRating === 'all'
    ? reviewsList
    : reviewsList.filter(r => r.rating === filterRating);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Overall Rating Badge */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-100/70 px-3 py-1 rounded-full">
              Verified Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What Our Customers Say
            </h2>
            <p className="text-base text-slate-600 mt-1">
              Read real reviews from homeowners and business managers who trust USA Pro Plumbing.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center space-x-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm shrink-0">
            <div className="text-center pr-6 border-r border-slate-200">
              <div className="text-4xl font-black text-slate-900">{COMPANY_INFO.googleRating}</div>
              <div className="flex text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Google Score</div>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900">
                {COMPANY_INFO.totalReviewsCount} Verified Reviews
              </div>
              <p className="text-xs text-slate-500">
                98% 5-Star Customer Satisfaction
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-1 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center"
              >
                <PlusCircle className="w-3.5 h-3.5 mr-1" />
                Leave Your Review
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Filter:</span>
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterRating === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All Ratings ({reviewsList.length})
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterRating === 5 ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              5 Stars Only ★
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded-xl transition-colors shadow-sm flex items-center space-x-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Write a Customer Review</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Author row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {rev.avatar ? (
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                        {rev.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {rev.author}
                      </h4>
                      <p className="text-xs text-slate-500">{rev.location}</p>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 font-medium">
                    {rev.date}
                  </span>
                </div>

                {/* Stars and Service Type */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {rev.serviceType}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Verified Badge */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center text-emerald-600 font-medium text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  Verified Customer Job
                </span>
                <span className="text-[11px] text-slate-400">Google Verified</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 animate-in zoom-in-95">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Thank You!</h3>
                <p className="text-sm text-slate-600">
                  Your feedback has been published. We appreciate your trust in USA Pro Plumbing!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Write a Customer Review
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Help your neighbors find quality plumbing services.
                  </p>
                </div>

                {/* Rating selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Your Rating:
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-2">
                      {rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Your Full Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Michael Miller"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      City, State:
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Dallas, TX"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Service Performed:
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Drain Cleaning">Drain Cleaning & Hydro Jetting</option>
                    <option value="Emergency Plumbing">24/7 Emergency Plumbing Repair</option>
                    <option value="Water Heater Repair">Water Heater Repair / Tankless</option>
                    <option value="Sewer Line Repair">Sewer Line Camera & Trenchless</option>
                    <option value="Leak Detection">Water & Slab Leak Detection</option>
                    <option value="Commercial Plumbing">Commercial Plumbing</option>
                    <option value="Fixture Installation">Toilet & Faucet Installation</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Your Review:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us about the technician, how fast they arrived, and the quality of work..."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-md shadow-blue-600/20"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
