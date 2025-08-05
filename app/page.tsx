"use client";

import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { getMarineWeather } from "../lib/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [marineWeather, setMarineWeather] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      setError("Failed to fetch locations.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLocationSelect(loc) {
    setSelectedLocation(loc);
    setMarineWeather(null);
    setReportError("");
    setReportLoading(true);
    try {
      console.log("Fetching marine weather for:", loc);
      const report = await getMarineWeather(loc.latitude, loc.longitude);
      console.log("Marine weather report:", report);
      setMarineWeather(report);
    } catch (err) {
      setReportError("Failed to fetch marine weather report.");
      console.error(err);
    } finally {
      setReportLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Location Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <Input
              placeholder="Search for a location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" disabled={loading || !query}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {!selectedLocation ? (
            <ul>
              {loading && Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="mb-2">
                  <Card className="bg-muted">
                    <CardContent>
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-3 w-1/3" />
                    </CardContent>
                  </Card>
                </li>
              ))}
              {!loading && results.map((loc) => (
                <li key={loc.id} className="mb-2">
                  <Card className="bg-muted cursor-pointer" onClick={() => handleLocationSelect(loc)}>
                    <CardContent>
                      <div className="font-semibold">{loc.name}, {loc.country}</div>
                      <div className="text-xs text-muted-foreground">
                        Lat: {loc.latitude}, Lon: {loc.longitude}
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
              {!loading && results.length === 0 && query && !error && (
                <li className="text-muted-foreground py-2">No locations found.</li>
              )}
            </ul>
          ) : (
            <div className="mt-6">
              <Button variant="outline" className="mb-4" onClick={() => setSelectedLocation(null)}>
                ← Back to results
              </Button>
              <Card>
                <CardHeader>
                  <CardTitle>Marine Weather Report</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {selectedLocation.name}, {selectedLocation.country}
                  </div>
                </CardHeader>
                <CardContent>
                  {reportLoading && <Skeleton className="h-6 w-1/2 mb-2" />}
                  {reportError && <div className="text-red-500 mb-2">{reportError}</div>}
                  {marineWeather && marineWeather.current && (
                    <div className="space-y-2">
                      <div>
                        <strong>Current Wave Height:</strong> {marineWeather.current.wave_height !== undefined && marineWeather.current.wave_height !== null && marineWeather.current.wave_height !== '' ? `${marineWeather.current.wave_height} m` : <span className="text-muted-foreground">No wave height data available for this location</span>}
                      </div>
                      {marineWeather.hourly && marineWeather.hourly.sea_surface_temperature && marineWeather.hourly.sea_surface_temperature.length > 0 && marineWeather.hourly.sea_surface_temperature[marineWeather.hourly.sea_surface_temperature.length - 1] !== undefined && marineWeather.hourly.sea_surface_temperature[marineWeather.hourly.sea_surface_temperature.length - 1] !== null && marineWeather.hourly.sea_surface_temperature[marineWeather.hourly.sea_surface_temperature.length - 1] !== '' ? (
                        <div><strong>Current Sea Temperature:</strong> {marineWeather.hourly.sea_surface_temperature[marineWeather.hourly.sea_surface_temperature.length - 1]} °C</div>
                      ) : (
                        <div className="text-muted-foreground"><strong>Current Sea Temperature:</strong> No sea temperature data available for this location</div>
                      )}
                    </div>
                  )}
                  {marineWeather && (
                    ((marineWeather.current == null || marineWeather.current.wave_height === undefined || marineWeather.current.wave_height === null) && (!marineWeather.hourly?.sea_surface_temperature || marineWeather.hourly.sea_surface_temperature.length === 0)) && (
                      <div className="text-muted-foreground mt-2">No wave height or sea temperature data available for this location.</div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
