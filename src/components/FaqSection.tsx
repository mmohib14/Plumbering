import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/plumbingData';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS_LIST: FaqItem[] = [
  {
    question: "How quickly can a plumber arrive at my property?",
    answer: "For emergency calls (burst pipes, severe leaks, sewage backups), our average on-site arrival time is under 45 minutes across our active service areas. For non-emergency repairs, we offer convenient same-day 2-hour appointment windows with real-time GPS technician tracking sent to your phone."
  },
  {
    question: "Do you provide 24-hour emergency plumbing services?",
    answer: "Yes, absolutely. Our emergency dispatch operators and on-call master plumbers are available 24 hours a day, 7 days a week, 365 days a year — including nights, weekends, and all major federal holidays."
  },
  {
    question: "How much does a professional plumber cost?",
    answer: "Plumbing costs vary depending on the problem. Minor drain snaking or toilet repairs typically range from $110 to $220, standard water heater replacements range from $1,100 to $1,850, and hydro-jetting averages $380 to $680. We provide 100% upfront flat-rate quotes in writing before any work begins, so you never encounter unexpected hourly surprises."
  },
  {
    question: "Do you provide same day plumbing service?",
    answer: "Yes. Over 90% of our standard service requests are scheduled and completed on the exact same day. Our rolling warehouse vans are stocked with over 1,200 genuine OEM replacement valves, pipes, elements, and tools."
  },
  {
    question: "Do you repair and install both tank and tankless water heaters?",
    answer: "Yes. We service, repair, and install all major brands including Rheem, Bradford White, Navien, A.O. Smith, and Rinnai. Whether you need a thermocouple replaced, a sediment tank flushed, or a conversion to an endless high-efficiency tankless system, our specialists handle everything to local safety codes."
  },
  {
    question: "Do you provide hydro jetting and professional drain cleaning?",
    answer: "Yes. We offer both heavy-duty motorized cable snaking for quick branch clogs and 4,000 PSI high-velocity hydro jetting to scour main sewer lines clean of tree roots, cooking grease, and mineral scale."
  },
  {
    question: "Do you repair sewer lines without digging up my yard or driveway?",
    answer: "Yes! We specialize in no-dig trenchless sewer line repairs, including CIPP (Cured-In-Place-Pipe) epoxy lining and pipe bursting. This restores collapsed, cracked, or root-invaded sewer mains without destroying your expensive lawn, porch, or driveway."
  },
  {
    question: "Do you provide commercial plumbing for businesses and restaurants?",
    answer: "Yes. Our commercial division services restaurants, hotels, retail facilities, multi-family apartment complexes, and office buildings. We handle commercial grease traps, annual backflow assembly testing (RPZ), flushometers, and preventative maintenance contracts."
  },
  {
    question: "How can I prevent catastrophic plumbing problems?",
    answer: "Schedule an annual plumbing inspection, flush your water heater once per year to remove mineral scale, never pour cooking oil or fat down kitchen sinks, avoid flushing 'flushable' wipes, and know where your home's main water shutoff valve is located."
  },
  {
    question: "Do you provide video camera plumbing inspections?",
    answer: "Yes. We carry high-definition fiber-optic self-leveling sewer inspection cameras. We insert the camera through your cleanout to provide real-time color footage of your underground pipe condition, which we can email or save to a flash drive for you."
  }
];

export const FaqSection: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-100/70 px-3 py-1 rounded-full">
            Answers To Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Frequently Asked Plumbing Questions
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Quick answers about pricing, response times, and service.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS_LIST.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between bg-slate-50/60 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-2 bg-white border-t border-slate-100 text-sm text-slate-600 leading-relaxed animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Have a specific question about your plumbing system?
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Speak directly with an on-duty master plumber or schedule an on-site consultation.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center"
            >
              <Phone className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              <span>Call Us</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs"
            >
              Book Service
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
