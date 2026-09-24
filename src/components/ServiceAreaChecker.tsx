import React, { useState } from 'react';
import { MapPin, CheckCircle2, Phone, Clock, Users, Search, AlertCircle } from 'lucide-react';
import { SERVICE_AREAS_DATA, COMPANY_INFO } from '../data/plumbingData';

interface ServiceAreaCheckerProps {
  onOpenBooking: () => void;
}

export const ServiceAreaChecker: React.FC<ServiceAreaCheckerProps> = ({ onOpenBooking }) => {
  const [searchZip, setSearchZip] = useState('');
  const [matchResult, setMatchResult] = useState<{
    matched: boolean;
    hub?: typeof SERVICE_AREAS_DATA[0];
    message: string;
  } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = searchZip.trim();

    if (!cleanZip || cleanZip.length < 5) {
      setMatchResult({
        matched: false,
        message: 'Please enter a valid 5-digit United States ZIP code.'
      });
      return;
    }

    // Check if zip belongs to any hub
    const foundHub = SERVICE_AREAS_DATA.find(area => 
      area.zipCodes.includes(cleanZip) || area.zipCodes.some(z => z.slice(0, 3) === cleanZip.slice(0, 3))
    );

    if (foundHub) {
      setMatchResult({
        matched: true,
        hub: foundHub,
        message: `Priority coverage active! Nearest hub is in ${foundHub.city}. Expected response time is ~${foundHub.averageResponseMinutes} minutes with ${foundHub.techniciansAvailable} technicians on duty.`
      });
    } else {
      setMatchResult({
        matched: true, // We still service nationally through partner network
        message: `Technician network available for ZIP ${cleanZip}. Our regional dispatch can have an on-call licensed plumber to your address within 60-90 minutes.`
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-100/70 px-3 py-1 rounded-full">
            Local Technicians Near You
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Proudly Serving Local Communities
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Our local service trucks are staged strategically across major metropolitan areas to ensure fast arrival when minutes matter.
          </p>

          {/* Interactive ZIP Checker */}
          <div className="mt-8 max-w-lg mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-300 shadow-sm">
              <div className="flex items-center w-full px-3">
                <MapPin className="w-5 h-5 text-blue-600 mr-2 shrink-0" />
                <input
                  type="text"
                  maxLength={5}
                  value={searchZip}
                  onChange={(e) => setSearchZip(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter your 5-digit ZIP code (e.g. 75201)..."
                  className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none py-2"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shrink-0 transition-colors shadow-sm"
              >
                Verify Coverage
              </button>
            </form>

            {matchResult && (
              <div className={`mt-3 p-3.5 rounded-xl text-xs sm:text-sm font-medium text-left flex items-start space-x-2.5 ${
                matchResult.matched ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}>
                {matchResult.matched ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p>{matchResult.message}</p>
                  {matchResult.matched && (
                    <button
                      onClick={onOpenBooking}
                      className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                    >
                      Book Plumber for this location now →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Metro Hubs Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_AREAS_DATA.map((area) => (
            <div
              key={area.id}
              className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {area.state} Metro
                  </span>
                  <div className="flex items-center text-[11px] font-bold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
                    Active Hub
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {area.city}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                  {area.metroArea}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200/70">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      Avg Response:
                    </span>
                    <strong className="text-slate-800">~{area.averageResponseMinutes} mins</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center">
                      <Users className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      On-Duty Techs:
                    </span>
                    <strong className="text-emerald-700 font-bold">{area.techniciansAvailable} Vans</strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
                <a
                  href={`tel:${area.phone.replace(/\D/g, '')}`}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  {area.phone}
                </a>
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-semibold text-slate-600 hover:text-blue-600"
                >
                  Schedule →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* National Network Footnote */}
        <div className="mt-8 text-center text-xs text-slate-500">
          📍 Don't see your city listed above? We provide nationwide emergency dispatch through our verified network of 2,400+ licensed contractors across all 50 states.
        </div>

      </div>
    </section>
  );
};
