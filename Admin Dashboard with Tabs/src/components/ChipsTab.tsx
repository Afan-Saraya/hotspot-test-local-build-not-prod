import { Plus, Trash2 } from "lucide-react";
import { FileUpload } from "./FileUpload";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface Chip {
  id: string;
  nameBosnian: string;
  nameEnglish: string;
  link: string;
  icon: string;
}

interface ChipsTabProps {
  chips: Chip[];
  onChipsChange: (chips: Chip[]) => void;
}

export function ChipsTab({ chips, onChipsChange }: ChipsTabProps) {
  const addChip = () => {
    const newChip: Chip = {
      id: Date.now().toString(),
      nameBosnian: "",
      nameEnglish: "",
      link: "",
      icon: ""
    };
    onChipsChange([...chips, newChip]);
  };

  const removeChip = (id: string) => {
    onChipsChange(chips.filter(c => c.id !== id));
  };

  const updateChip = (id: string, updates: Partial<Chip>) => {
    onChipsChange(chips.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3>Navigation Chips</h3>
          <p className="text-sm text-gray-500">Add quick action buttons with icons</p>
        </div>
        <Button onClick={addChip} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Chip
        </Button>
      </div>

      {chips.map((chip, index) => (
        <Card key={chip.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Chip {index + 1}</CardTitle>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeChip(chip.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name (Bosnian)</Label>
                <Input
                  value={chip.nameBosnian}
                  onChange={(e) => updateChip(chip.id, { nameBosnian: e.target.value })}
                  placeholder="Naziv"
                />
              </div>

              <div className="space-y-2">
                <Label>Name (English)</Label>
                <Input
                  value={chip.nameEnglish}
                  onChange={(e) => updateChip(chip.id, { nameEnglish: e.target.value })}
                  placeholder="Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Link URL</Label>
              <Input
                value={chip.link}
                onChange={(e) => updateChip(chip.id, { link: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <FileUpload
              label="Icon Image"
              value={chip.icon}
              onChange={(val) => updateChip(chip.id, { icon: val })}
              accept="image/*"
            />
          </CardContent>
        </Card>
      ))}

      {chips.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No chips added yet. Click "Add Chip" to get started.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
