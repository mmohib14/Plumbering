import React, { useState } from 'react';
import { Sparkles, ArrowLeftRight, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ProjectComparison {
  id: string;
  title: string;
  subtitle: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  results: string[];
}

const COMPARISONS: ProjectComparison[] = [
  {
    id: 'pipes',
    title: 'Pipe Replacement Preview',
    subtitle: 'Illustrative residential repipe scenario',
    beforeLabel: 'Illustration: Corroded galvanized piping',
    afterLabel: 'Illustration: Replacement pipework',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    description: 'An inspection can help identify deteriorated pipework and determine whether a targeted repair or repiping is appropriate.',
    results: ['Inspect pipe condition and water quality', 'Compare repair and replacement options', 'Confirm scope and pricing before work begins']
  },
  {
    id: 'heater',
    title: 'Water Heater Upgrade Preview',
    subtitle: 'Illustrative water heater service scenario',
    beforeLabel: 'Illustration: Aging water heater',
    afterLabel: 'Illustration: Water heater service',
    beforeImage: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    description: 'A plumber can assess a failing unit and explain repair and replacement options based on household needs.',
    results: ['Check the unit, connections, and venting', 'Compare tank and tankless options', 'Review installation requirements and estimate']
  },
  {
    id: 'sewer',
    title: 'Drain and Sewer Service Preview',
    subtitle: 'Illustrative drain cleaning scenario',
    beforeLabel: 'Illustration: Drain blockage',
    afterLabel: 'Illustration: Drain cleaning service',
    beforeImage: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    description: 'A camera inspection can help locate a sewer concern and inform the right cleaning or repair approach.',
    results: ['Inspect the line to locate the concern', 'Review cleaning and repair options', 'Confirm the recommended work before scheduling']
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100

  const activeComp = COMPARISONS[selectedIdx];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-orange-950 font-bold text-xs uppercase tracking-widest bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
            Illustrative Service Previews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Plumbing Repair Comparisons
          </h2>
          <p className="text-base text-slate-600 mt-2">
            These stock images illustrate common plumbing services; they are not actual customer before-and-after photos. Drag to explore each example.
          </p>

          {/* Project Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {COMPARISONS.map((comp, idx) => (
              <button
                key={comp.id}
                onClick={() => {
                  setSelectedIdx(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedIdx === idx
                    ? 'bg-(--color-orange) text-slate-950 shadow-lg shadow-orange-600/20'
                    : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
                }`}
              >
                {comp.title.split(' vs.')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Visualizer Container */}
        <div className="mx-auto max-w-[1100px] bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Interactive Image Comparison (7 cols) */}
            <div className="lg:col-span-8 lg:mx-auto lg:w-full">
              <div className="relative mx-auto h-80 w-full max-w-[980px] rounded-2xl overflow-hidden select-none border border-slate-200 shadow-lg sm:h-96">
                
                {/* AFTER Image (Full background) */}
                <img
                  src={activeComp.afterImage}
                  alt={activeComp.afterLabel}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  Service example
                </div>

                {/* BEFORE Image (Clipped on top based on sliderPosition) */}
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={activeComp.beforeImage}
                    alt={activeComp.beforeLabel}
                    className="absolute inset-0 w-full h-full object-cover max-w-none grayscale brightness-75 contrast-125"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                    <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    Issue example
                  </div>
                </div>

                {/* Divider Line */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center">
                    <ArrowLeftRight className="w-4 h-4 text-slate-800" />
                  </div>
                </div>

                {/* Invisible HTML range slider on top for touch/mouse drag */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
                  aria-label="Drag before and after slider"
                />
              </div>

              {/* Slider instruction */}
              <div className="flex items-center justify-between text-xs text-slate-600 mt-3 px-1">
                <span>◀ Slide left to reveal completed work</span>
                <span className="font-semibold text-orange-900">Drag handle or tap image</span>
                <span>Slide right to see original issue ▶</span>
              </div>
            </div>

            {/* Right Project Details (5 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">
                  Example Scenario
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {activeComp.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {activeComp.subtitle}
                </p>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {activeComp.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  What to expect:
                </span>
                <ul className="space-y-2">
                  {activeComp.results.map((res, i) => (
                    <li key={i} className="flex items-start text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <div className="p-3.5 bg-orange-50 rounded-xl border border-orange-200 text-xs text-slate-700 flex items-center justify-between">
                  <span>Need similar work done?</span>
                  <span className="text-orange-900 font-bold">Free Estimates on Site</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
