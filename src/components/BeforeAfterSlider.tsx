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
    title: 'Corroded Galvanized Iron vs. Modern Uponor PEX-a Repipe',
    subtitle: 'Residential Single-Family Repipe in Dallas, TX',
    beforeLabel: 'Before: Corroded 50-Year Galvanized Pipe (Restricted Flow & Brown Water)',
    afterLabel: 'After: Clean High-Flow PEX-a System (Full Pressure & 25-Year Warranty)',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    description: 'Homeowner suffered from low shower pressure and rusty water when running kitchen sink. We completed a full-house surgical PEX-a repipe in 2 days.',
    results: ['Domestic water pressure increased by 140%', 'Eliminated risk of pinhole leaks under slab', 'Drywall restored & water never shut off overnight']
  },
  {
    id: 'heater',
    title: 'Failing Rusted Storage Tank vs. Endless Navien Tankless',
    subtitle: 'Water Heater Replacement in Austin, TX',
    beforeLabel: 'Before: 12-Year Leaking 50-Gallon Tank (High Gas Bill & Cold Showers)',
    afterLabel: 'After: Navien High-Efficiency Tankless (Endless Hot Water & 30% Gas Savings)',
    beforeImage: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80',
    description: 'Family of 5 constantly ran out of hot water after two morning showers. We installed an outdoor Navien tankless unit with dedicated recirculation pump.',
    results: ['Continuous hot water for endless showers simultaneously', 'Saved $24/month on gas energy bills', 'Freed up 12 square feet of interior storage space']
  },
  {
    id: 'sewer',
    title: 'Root-Choked 4" Main Sewer vs. Hydro-Jetted Scoured Line',
    subtitle: 'Trenchless Rooter Clearance in Houston, TX',
    beforeLabel: 'Before: 80% Blocked by Tree Roots (Raw Sewage Backing Up into Bathtubs)',
    afterLabel: 'After: 100% Restored Pipe Diameter via 4,000 PSI Hydro Jetting',
    beforeImage: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80',
    description: 'Tree roots penetrated cast iron hub joints. Rather than excavating the paved front driveway for $8,500, we used root-cutting hydro jetting heads.',
    results: ['Saved homeowner over $5,800 in concrete demolition', 'Fully cleared grease, wipes, and root mass', 'Confirmed 100% flow with full color camera scope']
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
    <section className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-blue-400 font-bold text-xs uppercase tracking-widest bg-blue-900/60 border border-blue-700/50 px-3 py-1 rounded-full">
            Real Proof Of Quality
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Before & After Project Visualizer
          </h2>
          <p className="text-base text-slate-300 mt-2">
            See the real craftsmanship of our licensed plumbers. Drag the slider to compare deteriorated piping systems with our completed installations.
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
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {comp.title.split(' vs.')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Visualizer Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Interactive Image Comparison (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden select-none border border-slate-700 shadow-2xl">
                
                {/* AFTER Image (Full background) */}
                <img
                  src={activeComp.afterImage}
                  alt={activeComp.afterLabel}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  After (Fixed)
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
                  <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    Before (Damaged)
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
              <div className="flex items-center justify-between text-xs text-slate-400 mt-3 px-1">
                <span>◀ Slide left to reveal completed work</span>
                <span className="font-semibold text-blue-400">Drag handle or tap image</span>
                <span>Slide right to see original issue ▶</span>
              </div>
            </div>

            {/* Right Project Details (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Case Study
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeComp.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {activeComp.subtitle}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeComp.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Customer Results:
                </span>
                <ul className="space-y-2">
                  {activeComp.results.map((res, i) => (
                    <li key={i} className="flex items-start text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <span>Need similar work done?</span>
                  <span className="text-blue-400 font-bold">Free Estimates on Site</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
