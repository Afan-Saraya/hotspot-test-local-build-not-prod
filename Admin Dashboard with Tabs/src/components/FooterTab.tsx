import { Plus, Trash2 } from "lucide-react";
import { ColorPicker } from "./ColorPicker";
import { FileUpload } from "./FileUpload";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";

export interface FooterIcon {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface FooterStyling {
  footerBackground: string;
  iconColor: string;
  textColor: string;
}

interface FooterTabProps {
  icons: FooterIcon[];
  styling: FooterStyling;
  onIconsChange: (icons: FooterIcon[]) => void;
  onStylingChange: (styling: FooterStyling) => void;
}

export function FooterTab({ icons, styling, onIconsChange, onStylingChange }: FooterTabProps) {
  const addIcon = () => {
    if (icons.length >= 4) {
      return;
    }
    const newIcon: FooterIcon = {
      id: Date.now().toString(),
      name: "",
      url: "",
      icon: ""
    };
    onIconsChange([...icons, newIcon]);
  };

  const removeIcon = (id: string) => {
    onIconsChange(icons.filter(i => i.id !== id));
  };

  const updateIcon = (id: string, updates: Partial<FooterIcon>) => {
    onIconsChange(icons.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3>Footer Icons</h3>
          <p className="text-sm text-gray-500">Add up to 4 footer icons</p>
        </div>
        <Button 
          onClick={addIcon} 
          className="gap-2"
          disabled={icons.length >= 4}
        >
          <Plus className="w-4 h-4" />
          Add Icon
        </Button>
      </div>

      {icons.length >= 4 && (
        <Alert>
          <AlertDescription>
            Maximum of 4 footer icons reached
          </AlertDescription>
        </Alert>
      )}

      {icons.map((icon, index) => (
        <Card key={icon.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Footer Icon {index + 1}</CardTitle>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeIcon(icon.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={icon.name}
                onChange={(e) => updateIcon(icon.id, { name: e.target.value })}
                placeholder="Icon name"
              />
            </div>

            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                value={icon.url}
                onChange={(e) => updateIcon(icon.id, { url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <FileUpload
              label="Icon Image"
              value={icon.icon}
              onChange={(val) => updateIcon(icon.id, { icon: val })}
              accept="image/*"
            />
          </CardContent>
        </Card>
      ))}

      {icons.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No footer icons added yet. Click "Add Icon" to get started.
          </CardContent>
        </Card>
      )}

      <Separator className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Footer Styling</CardTitle>
          <CardDescription>
            Configure footer appearance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ColorPicker
            label="Footer Background"
            value={styling.footerBackground}
            onChange={(val) => onStylingChange({ ...styling, footerBackground: val })}
          />

          <ColorPicker
            label="Icon Color"
            value={styling.iconColor}
            onChange={(val) => onStylingChange({ ...styling, iconColor: val })}
          />

          <ColorPicker
            label="Text Color"
            value={styling.textColor}
            onChange={(val) => onStylingChange({ ...styling, textColor: val })}
          />
        </CardContent>
      </Card>
    </div>
  );
}
