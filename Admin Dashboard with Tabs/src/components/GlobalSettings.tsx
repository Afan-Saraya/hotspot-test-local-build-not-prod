import { ColorPicker } from "./ColorPicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface GlobalSettingsProps {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  onBackgroundColorChange: (color: string) => void;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}

export function GlobalSettings({
  backgroundColor,
  primaryColor,
  secondaryColor,
  onBackgroundColorChange,
  onPrimaryColorChange,
  onSecondaryColorChange
}: GlobalSettingsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Background & Theme</CardTitle>
          <CardDescription>Configure global color settings for your portal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ColorPicker
            label="Main Background Color"
            value={backgroundColor}
            onChange={onBackgroundColorChange}
          />
          
          <ColorPicker
            label="Primary Brand Color"
            value={primaryColor}
            onChange={onPrimaryColorChange}
          />
          
          <ColorPicker
            label="Secondary Accent Color"
            value={secondaryColor}
            onChange={onSecondaryColorChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
