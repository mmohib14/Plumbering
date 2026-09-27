import { useEffect, useState } from 'react';
import { SERVICE_AREAS_DATA } from '../data/plumbingData';
import { ZipCodeLocation } from './useZipCodeLookup';

interface ZipApiResponse {
  places?: {
    'place name'?: string;
    'state abbreviation'?: string;
    'post code'?: string;
  }[];
}

const cityZipCache = new Map<string, ZipCodeLocation | null>();
const regionWords = /\b(greater|metro|metropolitan|valley|central|front|range|area)\b/g;
const stateNames = new Set(['arizona', 'colorado', 'florida', 'georgia', 'north carolina', 'texas']);

const normalizePlace = (value: string) => value
  .toLowerCase()
  .replace(/[^a-z0-9 ]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

function findConfiguredCity(city: string, state: string, explicitState: boolean): ZipCodeLocation | null {
  const requestedCity = normalizePlace(city);
  const matchingAreas = SERVICE_AREAS_DATA.filter(area => {
    if (explicitState && area.state !== state) return false;

    const areaNames = [
      area.city.replace(/\([^)]*\)/g, ''),
      area.metroArea,
      ...area.metroArea.split(','),
      ...area.city.split(/[&,()\-/]+/),
    ];
    const aliases = areaNames
      .map(name => normalizePlace(name).replace(regionWords, '').replace(/\s+/g, ' ').trim())
      .filter(alias => alias.length > 2 && !stateNames.has(alias));

    return aliases.includes(requestedCity);
  });

  const matchingArea = matchingAreas.find(area => area.state === state) || (matchingAreas.length === 1 ? matchingAreas[0] : undefined);
  return matchingArea
    ? { zip: matchingArea.zipCodes[0], city, state: matchingArea.state }
    : null;
}

export function useCityZipLookup(cityInput: string, stateInput: string, enabled: boolean) {
  const [suggestion, setSuggestion] = useState<ZipCodeLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lookupUnavailable, setLookupUnavailable] = useState(false);

  useEffect(() => {
    const cityAndState = cityInput.trim().match(/^(.*?)(?:,\s*([a-z]{2}))?$/i);
    const city = cityAndState?.[1]?.trim() || '';
    const explicitState = Boolean(cityAndState?.[2]);
    const state = (cityAndState?.[2] || stateInput).trim().toUpperCase();

    if (!enabled || city.length < 3 || !/^[A-Z]{2}$/.test(state)) {
      setSuggestion(null);
      setIsLoading(false);
      setLookupUnavailable(false);
      return;
    }

    const configuredCity = findConfiguredCity(city, state, explicitState);
    if (configuredCity) {
      setSuggestion(configuredCity);
      setIsLoading(false);
      setLookupUnavailable(false);
      return;
    }

    const cacheKey = `${state}:${normalizePlace(city)}`;
    if (cityZipCache.has(cacheKey)) {
      const cachedSuggestion = cityZipCache.get(cacheKey) || null;
      setSuggestion(cachedSuggestion);
      setIsLoading(false);
      setLookupUnavailable(!cachedSuggestion);
      return;
    }

    const controller = new AbortController();
    let isCurrent = true;
    setSuggestion(null);
    setIsLoading(true);
    setLookupUnavailable(false);

    const timeoutId = window.setTimeout(() => {
      fetch(`https://api.zippopotam.us/us/${state}/${encodeURIComponent(city)}`, { signal: controller.signal })
        .then(async response => response.ok ? await response.json() as ZipApiResponse : null)
        .then(data => {
          if (!isCurrent) return;
          const requestedCity = normalizePlace(city);
          const exactPlace = data?.places?.find(place => {
            if (!place['place name'] || !place['post code']) return false;
            const resultCity = normalizePlace(place['place name']);
            return resultCity === requestedCity || resultCity === `${requestedCity} city`;
          });
          const result = exactPlace?.['place name'] && exactPlace['post code']
            ? { city: exactPlace['place name'], state: exactPlace['state abbreviation'] || state, zip: exactPlace['post code'] }
            : null;
          cityZipCache.set(cacheKey, result);
          setSuggestion(result);
          setLookupUnavailable(!result);
        })
        .catch(() => {
          if (!isCurrent) return;
          cityZipCache.set(cacheKey, null);
          setSuggestion(null);
          setLookupUnavailable(true);
        })
        .finally(() => {
          if (isCurrent) setIsLoading(false);
        });
    }, 350);

    return () => {
      isCurrent = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [cityInput, stateInput, enabled]);

  return { suggestion, isLoading, lookupUnavailable };
}