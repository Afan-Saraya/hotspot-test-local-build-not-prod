import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FileUpload } from "./FileUpload";

export interface DiscoveryPlaceItem {
  id: string;
  nameBosnian: string;
  nameEnglish: string;
  categoryBosnian?: string;
  categoryEnglish?: string;
  imageFile: string;
  link: string;
}

interface DiscoveryTabProps {
  places: DiscoveryPlaceItem[];
  onChange: (items: DiscoveryPlaceItem[]) => void;
}

export function DiscoveryTab({ places, onChange }: DiscoveryTabProps) {
  const addPlace = () => {
    onChange([
      ...places,
      {
        id: Date.now().toString(),
        nameBosnian: "",
        nameEnglish: "",
        categoryBosnian: "",
        categoryEnglish: "",
        imageFile: "",
        link: ""
      }
    ]);
  };

  const removePlace = (id: string) => {
    onChange(places.filter(p => p.id !== id));
  };

  const updatePlace = (id: string, updates: Partial<DiscoveryPlaceItem>) => {
    onChange(places.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3>Sarajevo Discovery</h3>
          <p className="text-sm text-gray-500">Add 2–3 places or businesses to highlight.</p>
        </div>
        <Button onClick={addPlace} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Place
        </Button>
      </div>

      {places.map((place, idx) => (
        <Card key={place.id} className="border-2">
          <CardHeader className="bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Place {idx + 1}</CardTitle>
                <CardDescription>Highlighted discovery item</CardDescription>
              </div>
              <Button variant="destructive" size="icon" onClick={() => removePlace(place.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload label="Place Image" folder="discovery" value={place.imageFile} onChange={(val) => updatePlace(place.id, { imageFile: val })} accept="image/*" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name (Bosnian)</Label>
                <Input value={place.nameBosnian} onChange={(e) => updatePlace(place.id, { nameBosnian: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Name (English)</Label>
                <Input value={place.nameEnglish} onChange={(e) => updatePlace(place.id, { nameEnglish: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category (Bosnian)</Label>
                <Input value={place.categoryBosnian || ''} onChange={(e) => updatePlace(place.id, { categoryBosnian: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Category (English)</Label>
                <Input value={place.categoryEnglish || ''} onChange={(e) => updatePlace(place.id, { categoryEnglish: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Link</Label>
              <Input value={place.link} onChange={(e) => updatePlace(place.id, { link: e.target.value })} placeholder="https://example.com" />
            </div>
          </CardContent>
        </Card>
      ))}

      {places.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">No discovery items yet. Click "Add Place".</CardContent>
        </Card>
      )}
    </div>
  );
}
