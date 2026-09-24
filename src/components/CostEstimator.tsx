import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Info,
  DollarSign,
  Calendar,
  Sparkles
} from 'lucide-react';
import { COST_ESTIMATOR_BENCHMARKS, COMPANY_INFO } from '../data/plumbingData';

const categoryButtonLabels: Record<string, string> = {
  'Drain Cleaning & Clogs': 'Drain & Clogs',
  'Water Heaters': 'Water Heaters',
  'Water Leaks & Slab': 'Leaks & Slab',
  'Fixtures & Restrooms': 'Fixtures'
};

interface CostEstimatorProps {
  onOpenBookingWithEstimate: (details: {
    serviceName: string;
    estimatedCost: string;
    notes: string;
  }) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  onOpenBookingWithEstimate
}) => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(
    COST_ESTIMATOR_BENCHMARKS[0].options[0].id
  );
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [urgency, setUrgency] = useState<'standard' | 'same_day' | 'emergency'>('standard');

  const currentCategory = COST_ESTIMATOR_BENCHMARKS[selectedCategoryIdx];
  const currentOption = currentCategory.options.find(o => o.id === selectedOptionId) || currentCategory.options[0];

  // Calculate pricing based on multipliers
  let propertyMultiplier = propertyType === 'commercial' ? 1.25 : 1.0;
  let urgencyMultiplier = urgency === 'emergency' ? 1.2 : urgency === 'same_day' ? 1.05 : 1.0;

  const minTotal = Math.round(currentOption.min * propertyMultiplier * urgencyMultiplier);
  const maxTotal = Math.round(currentOption.max * propertyMultiplier * urgencyMultiplier);

  const handleBookEstimate = () => {
    onOpenBookingWithEstimate({
      serviceName: `${currentCategory.category}: ${currentOption.name}`,
      estimatedCost: `$${minTotal} - $${maxTotal}`,
      notes: `Pre-calculated estimate: ${propertyType.toUpperCase()} property, ${urgency.toUpperCase()} priority. Estimated duration: ${currentOption.time}.`
    });
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-100/70 px-3 py-1 rounded-full">
            Transparent Pricing Tool
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Instant Plumbing Cost Estimator
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Get an instant, realistic price estimate for common plumbing repairs based on national US labor averages and OEM parts. No email required to view your estimate.
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Inputs (8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Category */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                1. Select Plumbing Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {COST_ESTIMATOR_BENCHMARKS.map((cat, idx) => (
                  <button
                    key={cat.category}
                    onClick={() => {
                      setSelectedCategoryIdx(idx);
                      setSelectedOptionId(cat.options[0].id);
                    }}
                    className={`flex h-16 min-h-16 min-w-0 items-center justify-center rounded-xl border p-2 text-center text-xs font-semibold leading-snug break-words transition-all sm:text-sm ${
                      selectedCategoryIdx === idx
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {categoryButtonLabels[cat.category] || cat.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Specific Issue */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                2. Select Specific Job or Service
              </label>
              <div className="space-y-2">
                {currentCategory.options.map((opt) => (
                  <label
                    key={opt.id}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`flex min-h-14 items-center justify-between gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedOptionId === opt.id
                        ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-600/20 text-blue-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedOptionId === opt.id ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                      }`}>
                        {selectedOptionId === opt.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <span className="min-w-0 wrap-break-word text-sm leading-snug">{opt.name}</span>
                    </div>

                    <span className="shrink-0 text-right text-xs font-semibold text-slate-500">
                      ~{opt.time}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Property Type & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  3. Property Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPropertyType('residential')}
                    className={`flex h-12 items-center justify-center px-2 rounded-xl text-[11px] font-bold border text-center transition-colors ${
                      propertyType === 'residential'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Residential
                  </button>
                  <button
                    onClick={() => setPropertyType('commercial')}
                    className={`flex h-12 items-center justify-center px-2 rounded-xl text-[11px] font-bold border text-center transition-colors ${
                      propertyType === 'commercial'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Commercial
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  4. Timing / Urgency
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setUrgency('standard')}
                    className={`flex h-12 items-center justify-center px-1.5 rounded-xl text-[11px] font-bold border text-center transition-colors ${
                      urgency === 'standard'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Flexible
                  </button>
                  <button
                    onClick={() => setUrgency('same_day')}
                    className={`flex h-12 items-center justify-center px-1.5 rounded-xl text-[11px] font-bold border text-center transition-colors ${
                      urgency === 'same_day'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Same Day
                  </button>
                  <button
                    onClick={() => setUrgency('emergency')}
                    className={`flex h-12 items-center justify-center px-1.5 rounded-xl text-[11px] font-bold border text-center transition-colors ${
                      urgency === 'emergency'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Emergency
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-blue-200 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                Live Price Calculation
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                Zero Obligation
              </span>
            </div>

            <div>
              <div className="text-xs text-slate-500 uppercase font-semibold">Estimated Cost Range</div>
              <div className="text-4xl font-black text-slate-900 tracking-tight mt-1 flex items-baseline">
                ${minTotal} – ${maxTotal}
                <span className="text-xs text-slate-500 font-normal ml-2">USD</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Includes certified diagnostic inspection, licensed labor, standard fittings, and our 1-year guarantee.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Selected Service:</span>
                <strong className="text-slate-800 text-right">{currentOption.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Estimated Completion:</span>
                <strong className="text-slate-800">{currentOption.time}</strong>
              </div>
              <div className="flex justify-between">
                <span>Property Scope:</span>
                <strong className="text-slate-800 capitalize">{propertyType}</strong>
              </div>
              <div className="flex justify-between">
                <span>Timing:</span>
                <strong className="text-slate-800 capitalize">{urgency.replace('_', ' ')}</strong>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleBookEstimate}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/25 transition-all text-sm flex items-center justify-center space-x-2"
              >
                <span>Book This Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Price confirmed in writing before technician begins work</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
