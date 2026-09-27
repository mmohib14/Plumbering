import { useEffect, useState } from 'react';

export interface ZipCodeLocation {
  zip: string;
  city: string;
  state: string;
}

interface ZipApiResponse {
  places?: { 'place name'?: string; 'state abbreviation'?: string }[];
}

const locationCache = new Map<string, ZipCodeLocation>();

async function lookupZipCode(zip: string, signal: AbortSignal): Promise<ZipCodeLocation | null> {
  const cachedLocation = locationCache.get(zip);
  if (cachedLocation) return cachedLocation;

  const response = await fetch(`https://api.zippopotam.us/us/${zip}`, { signal });
  if (!response.ok) return null;

  const data = await response.json() as ZipApiResponse;
  const place = data.places?.[0];
  if (!place?.['place name'] || !place['state abbreviation']) return null;

  const location = {
    zip,
    city: place['place name'],
    state: place['state abbreviation'],
  };
  locationCache.set(zip, location);
  return location;
}

export function useZipCodeLookup(zip: string) {
  const [location, setLocation] = useState<ZipCodeLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lookupUnavailable, setLookupUnavailable] = useState(false);

  useEffect(() => {
    const cleanZip = zip.trim();
    if (!/^\d{5}$/.test(cleanZip)) {
      setLocation(null);
      setIsLoading(false);
      setLookupUnavailable(false);
      return;
    }

    const cachedLocation = locationCache.get(cleanZip);
    if (cachedLocation) {
      setLocation(cachedLocation);
      setIsLoading(false);
      setLookupUnavailable(false);
      return;
    }

    const controller = new AbortController();
    let isCurrent = true;
    setLocation(null);
    setIsLoading(true);
    setLookupUnavailable(false);

    lookupZipCode(cleanZip, controller.signal)
      .then(result => {
        if (!isCurrent) return;
        setLocation(result);
        setLookupUnavailable(!result);
      })
      .catch(() => {
        if (!isCurrent) return;
        setLocation(null);
        setLookupUnavailable(true);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [zip]);

  return { location, isLoading, lookupUnavailable };
}