import React, { useEffect, useMemo, useState } from 'react';
import type { UtilitiesConfig, LanguageCode } from '../../types/portalContent';

interface CityUtilityProps {
  title: string;
  subtitle?: string;
  language: LanguageCode;
  config?: UtilitiesConfig;
}

interface WeatherData {
  temperatureC?: number;
  description?: string;
  error?: boolean;
}

interface RatesData {
  base: string;
  rates: Record<string, number>;
}

export function CityUtility({ title, subtitle, language, config }: CityUtilityProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [rates, setRates] = useState<RatesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [now, setNow] = useState<Date>(new Date());
  const [amount, setAmount] = useState<number>(1);
  const [target, setTarget] = useState<string>(config?.targetCurrencies?.[0] || '');

  // Live local time in configured timezone (defaults to Sarajevo)
  const timezone = config?.timezone || 'Europe/Sarajevo';
  const locale = language === 'BA' ? 'bs-BA' : 'en-GB';
  const localTime = useMemo(() => new Intl.DateTimeFormat(locale, {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: timezone,
  }).format(now), [now, timezone, locale]);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        // Weather
        if (config?.lat && config?.lon) {
          const w = await fetch(`/api/utility/weather?lat=${config.lat}&lon=${config.lon}`).then(r => r.ok ? r.json() : null);
          if (active && w) {
            setWeather({ temperatureC: w?.current?.temperature_2m, description: w?.current_units?.temperature_2m ? 'Clear' : undefined });
          }
        }
        // Rates
        if (config?.baseCurrency && config?.targetCurrencies?.length) {
          const symbols = encodeURIComponent(config.targetCurrencies.join(','));
          const r = await fetch(`/api/utility/rates?base=${encodeURIComponent(config.baseCurrency)}&symbols=${symbols}`).then(r => r.ok ? r.json() : null);
          if (active && r) {
            setRates({ base: r.base, rates: r.rates || {} });
          }
        }
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();
    return () => { active = false; };
  }, [config?.lat, config?.lon, config?.baseCurrency, JSON.stringify(config?.targetCurrencies)]);

  // Tick clock every second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    // Header is rendered by parent via renderHeader(); this section only renders the cards
    <section className="cityUtility px-6 mt-0">
      <div className="layout grid-cols-3 gap-3">
        {/* Weather */}
        <div className="card rounded-xl bg-white/5 border border-white/10 p-3">
          <div className="header opacity-70 mb-1">{language === 'BA' ? 'Vrijeme' : 'Weather'}</div>
          {loading && <div className="h-6 w-16 rounded bg-white/10 animate-pulse" />}
          {!loading && weather?.temperatureC != null && (
            <div className="content text-lg font-semibold">{Math.round(weather.temperatureC)}°C</div>
          )}
          {!loading && weather?.temperatureC == null && (
            <div className="content text-sm opacity-60">{error ? (language === 'BA' ? 'Greška' : 'Error') : (language === 'BA' ? 'Nedostupno' : 'Unavailable')}</div>
          )}
        </div>
        {/* Local time */}
        <div className="card rounded-xl bg-white/5 border border-white/10 p-3">
          <div className="header opacity-70 mb-1">{language === 'BA' ? 'Lokalno vrijeme' : 'Local Time'}</div>
          <div className="content text-lg font-semibold">{localTime}</div>
          <div className="content text-[10px] opacity-60 mt-0.5">{config?.city || 'Sarajevo'}</div>
        </div>
        {/* Currency */}
        <div className="card rounded-xl bg-white/5 border border-white/10 p-3">
          <div className="header opacity-70 mb-1">{language === 'BA' ? 'Kursna lista' : 'Currency'}</div>
          {loading && <div className="space-y-1">
            <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-white/10 animate-pulse" />
          </div>}
          {!loading && rates?.rates && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-20 rounded-md bg-white/10 border border-white/15 px-2 py-1 text-sm"
                  value={amount}
                  min={0}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                />
                <span className="text-sm">{rates.base}</span>
                <span className="text-sm">→</span>
                <select
                  className="flex-1 rounded-md bg-white/10 border border-white/15 px-2 py-1 text-sm"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                >
                  {(config?.targetCurrencies || []).map(code => (
                    <option value={code} key={code}>{code}</option>
                  ))}
                </select>
              </div>
              <div className="text-sm flex justify-between">
                <span>
                  1 {rates.base} → {target}
                </span>
                <span className="font-medium">{rates.rates[target]?.toFixed(4) ?? '—'}</span>
              </div>
              <div className="text-base font-semibold">
                {Number.isFinite(rates.rates[target]) ? (amount * (rates.rates[target] || 0)).toFixed(2) : '—'} {target}
              </div>
            </div>
          )}
          {!loading && !rates?.rates && (
            <div className="text-sm opacity-60">{error ? (language === 'BA' ? 'Greška' : 'Error') : '—'}</div>
          )}
        </div>
      </div>
    </section>
  );
}
