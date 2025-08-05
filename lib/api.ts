// lib/api.ts

export type LocationResult = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export async function searchLocations(query: string): Promise<LocationResult[]> {
  if (!query) return [];
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Failed to fetch locations");
  const data = await res.json();
  return data.results || [];
}

export type MarineWeatherCurrent = {
  time: string;
  interval: number;
  wave_height: number;
};

export type MarineWeatherHourly = {
  time: string[];
  wave_height: number[];
  sea_surface_temperature: number[];
};

export type MarineWeatherReport = {
  latitude: number;
  longitude: number;
  timezone: string;
  current: MarineWeatherCurrent | null;
  hourly: MarineWeatherHourly | null;
};

export async function getMarineWeather(latitude: number, longitude: number): Promise<MarineWeatherReport | null> {
  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&hourly=wave_height,sea_surface_temperature&current=wave_height`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
    current: data.current ? {
      time: data.current.time,
      interval: data.current.interval,
      wave_height: data.current.wave_height,
    } : null,
    hourly: data.hourly ? {
      time: data.hourly.time,
      wave_height: data.hourly.wave_height,
      sea_surface_temperature: data.hourly.sea_surface_temperature,
    } : null,
  };
}
