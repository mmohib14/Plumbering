import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, User, X, Tag, Sparkles } from 'lucide-react';
import { BLOG_POSTS_DATA } from '../data/plumbingData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onOpenBooking: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenBooking }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-100/70 px-3 py-1 rounded-full">
            Homeowner Knowledge Center
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Plumbing Advice & Educational Guides
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Expert articles from our Master Plumbers on preventing expensive water damage, maintaining hot water systems, and managing emergency shutoffs.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS_DATA.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
            >
              {/* Image banner */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {post.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 
                    onClick={() => setSelectedPost(post)}
                    className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author & Read More */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-800">{post.author.name}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Post Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
          <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col animate-in zoom-in-95">
            
            {/* Header image banner */}
            <div className="relative h-60 bg-slate-900 shrink-0">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {selectedPost.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedPost.title}
                </h2>
              </div>
            </div>

            {/* Scrollable post content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Author & Meta */}
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">{selectedPost.author.name}</div>
                  <div className="text-xs text-slate-500">{selectedPost.author.role} • {selectedPost.date}</div>
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                {selectedPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium flex items-center">
                    <Tag className="w-3 h-3 mr-1 text-slate-400" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Inline Need Help Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-blue-900">
                    Need professional help with this issue?
                  </h4>
                  <p className="text-xs text-blue-700 mt-0.5">
                    Our master plumbers are on call 24/7 across your area.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    onOpenBooking();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shrink-0 transition-colors shadow-sm"
                >
                  Book Service Call
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
