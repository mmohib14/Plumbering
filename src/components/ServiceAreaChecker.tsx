import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, MapPin, Phone, Search, Users } from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS_DATA } from '../data/plumbingData';
import { useZipCodeLookup } from '../services/useZipCodeLookup';
import { ServiceArea } from '../types';
import { getServiceAreaSlug } from '../services/routes';

interface ServiceAreaCheckerProps {
  onOpenBooking: () => void;
  onSelectArea: (area: ServiceArea) => void;
}

type RegionFilter = 'all' | 'texas' | 'other';

export const ServiceAreaChecker: React.FC<ServiceAreaCheckerProps> = ({ onOpenBooking, onSelectArea }) => {
  const [searchZip, setSearchZip] = useState('');
  const [areaQuery, setAreaQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('all');
  const [matchResult, setMatchResult] = useState<{ area: ServiceArea | null; message: string } | null>(null);
  const { location: zipLocation, isLoading: isLookingUpZip, lookupUnavailable } = useZipCodeLookup(searchZip);
  const matchingZipLocation = zipLocation?.zip === searchZip ? zipLocation : null;

  const matchingAreas = useMemo(() => {
    const query = areaQuery.trim().toLowerCase();
    return SERVICE_AREAS_DATA.filter(area => {
      const isTexas = area.state === 'TX';
      const matchesRegion = regionFilter === 'all' || (regionFilter === 'texas' ? isTexas : !isTexas);
      const matchesQuery = !query || [area.city, area.state, area.metroArea, ...area.zipCodes]
        .join(' ').toLowerCase().includes(query);
      return matchesRegion && matchesQuery;
    });
  }, [areaQuery, regionFilter]);

  const regionGroups = useMemo(() => {
    const groups = new Map<string, ServiceArea[]>();
    matchingAreas.forEach(area => groups.set(area.state, [...(groups.get(area.state) ?? []), area]));
    return [...groups.entries()].sort(([first], [second]) => first === 'TX' ? -1 : second === 'TX' ? 1 : first.localeCompare(second));
  }, [matchingAreas]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^\d{5}$/.test(searchZip.trim())) {
      setMatchResult({ area: null, message: 'Enter a valid 5-digit US ZIP code to check listed coverage.' });
      return;
    }
    const area = SERVICE_AREAS_DATA.find(hub => hub.zipCodes.includes(searchZip.trim())) ?? null;
    setMatchResult({
      area,
      message: area
        ? `ZIP ${searchZip.trim()} is listed with the ${area.city} hub.`
        : `Coverage is not confirmed for ZIP ${searchZip.trim()}. Call dispatch to check before scheduling.`,
    });
  };

  const filters: { id: RegionFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All hubs', count: SERVICE_AREAS_DATA.length },
    { id: 'texas', label: 'Texas', count: SERVICE_AREAS_DATA.filter(area => area.state === 'TX').length },
    { id: 'other', label: 'Other regions', count: SERVICE_AREAS_DATA.filter(area => area.state !== 'TX').length },
  ];

  return (
    <div className="bg-white text-slate-900">
      <section className="bg-(--color-navy) text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-9 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-300"><MapPin className="h-4 w-4" /> Service coverage</p>
            <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.8rem]">Find your local USA Pro service hub.</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">Explore our listed metro areas and ZIP codes. Call dispatch to confirm availability for your address.</p>
            <div className="mt-7 flex flex-wrap gap-5 border-t border-white/15 pt-5">
              <div><p className="text-2xl font-extrabold">{SERVICE_AREAS_DATA.length}</p><p className="mt-1 text-xs text-slate-300">Listed metro hubs</p></div>
              <div><p className="text-2xl font-extrabold">{SERVICE_AREAS_DATA.reduce((count, area) => count + area.zipCodes.length, 0)}</p><p className="mt-1 text-xs text-slate-300">Configured ZIP codes</p></div>
              <div><p className="text-2xl font-extrabold">24/7</p><p className="mt-1 text-xs text-slate-300">Emergency dispatch</p></div>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 text-slate-900 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-orange-900"><Search className="h-5 w-5" /></span>
              <div><h2 className="text-lg font-extrabold text-(--color-navy)">Check a ZIP code</h2><p className="mt-1 text-xs leading-5 text-slate-600">We’ll compare it with the current coverage list.</p></div>
            </div>
            <form onSubmit={handleSearch} className="mt-5 flex flex-col gap-2 sm:flex-row">
              <label className="flex min-h-12 min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100">
                <MapPin className="h-4 w-4 shrink-0 text-orange-800" />
                <input type="text" inputMode="numeric" autoComplete="postal-code" maxLength={5} value={searchZip} onChange={event => { setSearchZip(event.target.value.replace(/\D/g, '').slice(0, 5)); setMatchResult(null); }} placeholder="5-digit ZIP code" aria-label="Enter your five-digit ZIP code" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" />
              </label>
              <button type="submit" className="min-h-12 rounded-lg bg-amber-400 px-5 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300">Check coverage</button>
            </form>
            {(matchingZipLocation || isLookingUpZip || lookupUnavailable) && (
              <p role="status" aria-live="polite" className="mt-3 text-xs text-slate-600">
                {matchingZipLocation ? `ZIP location: ${matchingZipLocation.city}, ${matchingZipLocation.state}.` : isLookingUpZip ? 'Looking up ZIP location…' : 'We could not look up the ZIP location right now.'}
              </p>
            )}
            {matchResult && (
              <div role="status" aria-live="polite" className={`mt-4 flex items-start gap-2 border-l-4 px-3 py-2.5 text-xs leading-5 ${matchResult.area ? 'border-emerald-600 bg-emerald-50 text-emerald-950' : 'border-amber-500 bg-amber-50 text-amber-950'}`}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p>{matchResult.message}</p>
                  {matchResult.area && <button type="button" onClick={() => onSelectArea(matchResult.area!)} className="mt-1 font-bold underline underline-offset-2">View {matchResult.area.city} hub</button>}
                  {!matchResult.area && <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="mt-1 inline-block font-bold underline underline-offset-2">Call {COMPANY_INFO.phone}</a>}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800">Metro coverage</p>
            <h2 className="mt-2 text-2xl font-extrabold text-(--color-navy) sm:text-3xl">Browse service hubs</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Select a hub for its coverage details, listed ZIP codes, local contact, and available services.</p>
          </div>
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 px-3 lg:w-72">
            <Search className="h-4 w-4 shrink-0 text-slate-500" />
            <input type="search" value={areaQuery} onChange={event => setAreaQuery(event.target.value)} placeholder="Search city or ZIP" aria-label="Search service hubs by city or ZIP" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2" aria-label="Filter service hubs">
          {filters.map(filter => (
            <button key={filter.id} type="button" aria-pressed={regionFilter === filter.id} onClick={() => setRegionFilter(filter.id)} className={`min-h-10 rounded-full px-4 text-xs font-bold transition-colors ${regionFilter === filter.id ? 'bg-(--color-navy) text-white' : 'border border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-amber-50'}`}>
              {filter.label} <span className={regionFilter === filter.id ? 'ml-1 text-amber-300' : 'ml-1 text-slate-500'}>{filter.count}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-10">
          {regionGroups.map(([state, areas]) => (
            <section key={state} aria-labelledby={`region-${state}`}>
              <div className="flex items-baseline justify-between border-b-2 border-(--color-navy) pb-3">
                <h3 id={`region-${state}`} className="text-lg font-extrabold text-(--color-navy)">{state === 'TX' ? 'Texas service hubs' : `${state} service hub`}</h3>
                <span className="text-xs font-semibold text-slate-500">{areas.length} {areas.length === 1 ? 'metro' : 'metros'}</span>
              </div>
              <div className="divide-y divide-slate-200">
                {areas.map(area => (
                  <article key={area.id} className="grid gap-4 py-5 sm:grid-cols-3 sm:items-center sm:gap-6">
                    <button type="button" onClick={() => onSelectArea(area)} className="group min-w-0 text-left">
                      <span className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-orange-900 transition-colors group-hover:bg-amber-100"><MapPin className="h-4 w-4" /></span>
                        <span className="min-w-0">
                          <span className="block text-base font-extrabold text-(--color-navy) group-hover:text-orange-900">{area.city}</span>
                          <span className="mt-1 block text-xs leading-5 text-slate-600">{area.metroArea}</span>
                          <span className="mt-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500">{area.zipCodes.length} listed ZIP codes · {area.state}</span>
                        </span>
                      </span>
                    </button>
                    <div className="flex gap-6 pl-12 sm:pl-0">
                      <div><span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500"><Clock3 className="h-3 w-3" /> Response</span><span className="mt-1 block text-sm font-extrabold text-slate-800">~{area.averageResponseMinutes} min</span></div>
                      <div><span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500"><Users className="h-3 w-3" /> Available</span><span className="mt-1 block text-sm font-extrabold text-slate-800">{area.techniciansAvailable} technicians</span></div>
                    </div>
                    <div className="flex items-center gap-4 pl-12 sm:justify-end sm:pl-0">
                      <a href={`tel:${area.phone.replace(/\D/g, '')}`} className="inline-flex min-h-10 items-center gap-1.5 text-xs font-bold text-(--color-navy) hover:text-orange-900"><Phone className="h-3.5 w-3.5 text-orange-800" />{area.phone}</a>
                      <button type="button" onClick={() => onSelectArea(area)} aria-label={`View ${area.city} coverage details`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 transition hover:border-amber-400 hover:bg-amber-50"><ArrowRight className="h-4 w-4 text-(--color-navy)" /></button>
                    </div>
                    <p className="pl-12 text-[11px] text-slate-500 sm:col-span-3 sm:pl-0">Hub: {area.hubAddress}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
          {matchingAreas.length === 0 && <p className="py-12 text-center text-sm text-slate-600">No listed hubs match that search. Try another city, state, or ZIP code.</p>}
        </div>

        <p className="mt-8 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">Coverage shown reflects ZIP codes configured for each hub. If your ZIP is not listed, call dispatch to confirm availability before booking.</p>
      </section>
    </div>
  );
};
