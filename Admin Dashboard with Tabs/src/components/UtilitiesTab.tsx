import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface UtilitiesConfig {
  city: string;
  lat: number;
  lon: number;
  baseCurrency: string;
  targetCurrencies: string[];
  timezone?: string;
}

interface UtilitiesTabProps {
  value: UtilitiesConfig;
  onChange: (value: UtilitiesConfig) => void;
}

export function UtilitiesTab({ value, onChange }: UtilitiesTabProps) {
  const update = (updates: Partial<UtilitiesConfig>) => {
    onChange({ ...value, ...updates });
  };

  return (
    <Card>
      <CardHeader className="bg-gray-50">
        <CardTitle>Utilities Configuration</CardTitle>
        <CardDescription>Defaults for city utility widgets (weather/time/currency)</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6 py-6">
        <div className="space-y-2">
          <Label>City Name</Label>
          <Input value={value.city} onChange={(e) => update({ city: e.target.value })} placeholder="Sarajevo" />
        </div>
        <div className="space-y-2">
          <Label>Base Currency</Label>
          <Input value={value.baseCurrency} onChange={(e) => update({ baseCurrency: e.target.value.toUpperCase() })} placeholder="EUR" />
        </div>
        <div className="space-y-2">
          <Label>Timezone (IANA)</Label>
          <Input value={value.timezone || ''} onChange={(e) => update({ timezone: e.target.value })} placeholder="Europe/Sarajevo" />
        </div>
        <div className="space-y-2">
          <Label>Latitude</Label>
          <Input type="number" value={value.lat} onChange={(e) => update({ lat: parseFloat(e.target.value) || 0 })} />
        </div>
        <div className="space-y-2">
          <Label>Longitude</Label>
          <Input type="number" value={value.lon} onChange={(e) => update({ lon: parseFloat(e.target.value) || 0 })} />
        </div>
        <div className="space-y-2 col-span-2">
          <Label>Target Currencies (comma separated)</Label>
          <Input
            value={value.targetCurrencies.join(',')}
            onChange={(e) => update({ targetCurrencies: e.target.value.split(',').map(s => s.trim().toUpperCase()).filter(Boolean) })}
            placeholder="BAM, USD"
          />
        </div>
      </CardContent>
    </Card>
  );
}
