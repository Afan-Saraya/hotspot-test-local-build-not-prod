import { Plus, Trash2 } from "lucide-react";
import { BilingualInput } from "./BilingualInput";
import { ColorPicker } from "./ColorPicker";
import { FileUpload } from "./FileUpload";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export interface HeroBanner {
  id: string;
  imageFile: string;
  titleBosnian: string;
  titleEnglish: string;
  subtitleBosnian: string;
  subtitleEnglish: string;
  buttonTextBosnian: string;
  buttonTextEnglish: string;
  buttonLink: string;
  titleColor: string;
  subtitleColor: string;
  buttonBackground: string;
  buttonTextColor: string;
}

interface HeroBannerTabProps {
  banners: HeroBanner[];
  onBannersChange: (banners: HeroBanner[]) => void;
}

export function HeroBannerTab({ banners, onBannersChange }: HeroBannerTabProps) {
  // Default values for new banners
  const DEFAULT_BANNER: Omit<HeroBanner, 'id'> = {
    imageFile: "",
    titleBosnian: "Specijalna ponuda dana",
    titleEnglish: "Special offer of the day",
    subtitleBosnian: "Otkrijte ekskluzivne popuste i ponude",
    subtitleEnglish: "Discover exclusive discounts and offers",
    buttonTextBosnian: "POGLEDAJ PONUDU",
    buttonTextEnglish: "VIEW OFFER",
    buttonLink: "",
    titleColor: "rgba(255, 255, 255, 1)",
    subtitleColor: "rgba(255, 255, 255, 1)",
    buttonBackground: "rgba(122, 73, 240, 1)",
    buttonTextColor: "rgba(255, 255, 255, 1)"
  };

  const addBanner = () => {
    const newBanner: HeroBanner = {
      id: Date.now().toString(),
      ...DEFAULT_BANNER
    };
    onBannersChange([...banners, newBanner]);
  };

  const removeBanner = (id: string) => {
    onBannersChange(banners.filter(b => b.id !== id));
  };

  const resetBanner = (id: string) => {
    onBannersChange(banners.map(b => b.id === id ? { ...DEFAULT_BANNER, id, imageFile: b.imageFile } : b));
  };

  const updateBanner = (id: string, updates: Partial<HeroBanner>) => {
    onBannersChange(banners.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3>Hero Banners</h3>
          <p className="text-sm text-gray-500">Add multiple hero banners for rotation (4:3 ratio)</p>
        </div>
        <Button onClick={addBanner} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Hero Banner
        </Button>
      </div>

      {banners.map((banner, index) => (
        <Card key={banner.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Hero Banner {index + 1}</CardTitle>
                <CardDescription>Configure banner content and styling</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => resetBanner(banner.id)}
                  title="Reset to default values"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M3 21v-5h5"/>
                  </svg>
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeBanner(banner.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4>Content</h4>
              <FileUpload
                label="Banner Image (4:3 ratio recommended)"
                value={banner.imageFile}
                onChange={(val) => updateBanner(banner.id, { imageFile: val })}
                accept="image/*"
              />

              <BilingualInput
                label="Title"
                bosnianValue={banner.titleBosnian}
                englishValue={banner.titleEnglish}
                onBosnianChange={(val) => updateBanner(banner.id, { titleBosnian: val })}
                onEnglishChange={(val) => updateBanner(banner.id, { titleEnglish: val })}
              />

              <BilingualInput
                label="Subtitle"
                bosnianValue={banner.subtitleBosnian}
                englishValue={banner.subtitleEnglish}
                onBosnianChange={(val) => updateBanner(banner.id, { subtitleBosnian: val })}
                onEnglishChange={(val) => updateBanner(banner.id, { subtitleEnglish: val })}
              />

              <BilingualInput
                label="Button Text"
                bosnianValue={banner.buttonTextBosnian}
                englishValue={banner.buttonTextEnglish}
                onBosnianChange={(val) => updateBanner(banner.id, { buttonTextBosnian: val })}
                onEnglishChange={(val) => updateBanner(banner.id, { buttonTextEnglish: val })}
              />

              <div className="space-y-2">
                <Label>Button Link</Label>
                <Input
                  value={banner.buttonLink}
                  onChange={(e) => updateBanner(banner.id, { buttonLink: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4>Banner Styling</h4>
              <ColorPicker
                label="Title Color"
                value={banner.titleColor}
                onChange={(val) => updateBanner(banner.id, { titleColor: val })}
              />

              <ColorPicker
                label="Subtitle Color"
                value={banner.subtitleColor}
                onChange={(val) => updateBanner(banner.id, { subtitleColor: val })}
              />

              <ColorPicker
                label="Button Background"
                value={banner.buttonBackground}
                onChange={(val) => updateBanner(banner.id, { buttonBackground: val })}
              />

              <ColorPicker
                label="Button Text Color"
                value={banner.buttonTextColor}
                onChange={(val) => updateBanner(banner.id, { buttonTextColor: val })}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {banners.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No hero banners added yet. Click "Add Hero Banner" to get started.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
