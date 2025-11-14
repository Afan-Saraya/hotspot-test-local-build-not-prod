import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { FileUpload } from "./FileUpload";

export interface EditorsPickItem {
  id: string;
  titleBosnian: string;
  titleEnglish: string;
  teaserBosnian?: string;
  teaserEnglish?: string;
  imageFile: string;
  link: string;
}

interface EditorsPicksTabProps {
  items: EditorsPickItem[];
  onChange: (items: EditorsPickItem[]) => void;
}

export function EditorsPicksTab({ items, onChange }: EditorsPicksTabProps) {
  const addItem = () => {
    const now = Date.now().toString();
    onChange([
      ...items,
      {
        id: now,
        titleBosnian: "",
        titleEnglish: "",
        teaserBosnian: "",
        teaserEnglish: "",
        imageFile: "",
        link: ""
      }
    ]);
  };

  const removeItem = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, updates: Partial<EditorsPickItem>) => {
    onChange(items.map(i => (i.id === id ? { ...i, ...updates } : i)));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3>Editor's Picks</h3>
          <p className="text-sm text-gray-500">Add 2–3 curated article snippets.</p>
        </div>
        <Button onClick={addItem} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      {items.map((item, idx) => (
        <Card key={item.id} className="border-2">
          <CardHeader className="bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Pick {idx + 1}</CardTitle>
                <CardDescription>Curated article card</CardDescription>
              </div>
              <Button variant="destructive" size="icon" onClick={() => removeItem(item.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload label="Card Image" folder="editors" value={item.imageFile} onChange={(val) => updateItem(item.id, { imageFile: val })} accept="image/*" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title (Bosnian)</Label>
                <Input value={item.titleBosnian} onChange={(e) => updateItem(item.id, { titleBosnian: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Title (English)</Label>
                <Input value={item.titleEnglish} onChange={(e) => updateItem(item.id, { titleEnglish: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Teaser (Bosnian)</Label>
                <Textarea rows={3} value={item.teaserBosnian || ''} onChange={(e) => updateItem(item.id, { teaserBosnian: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Teaser (English)</Label>
                <Textarea rows={3} value={item.teaserEnglish || ''} onChange={(e) => updateItem(item.id, { teaserEnglish: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Link</Label>
              <Input value={item.link} onChange={(e) => updateItem(item.id, { link: e.target.value })} placeholder="https://example.com" />
            </div>
          </CardContent>
        </Card>
      ))}

      {items.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">No editor picks yet. Click "Add Item".</CardContent>
        </Card>
      )}
    </div>
  );
}
