import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { FileUpload } from "./FileUpload";

export interface QuickFunItem {
  titleBosnian?: string;
  titleEnglish?: string;
  subtitleBosnian?: string;
  subtitleEnglish?: string;
  imageFile: string;
  link: string;
}

interface QuickFunTabProps {
  item: QuickFunItem | null;
  onChange: (item: QuickFunItem | null) => void;
}

export function QuickFunTab({ item, onChange }: QuickFunTabProps) {
  const ensureItem = () => {
    if (!item) {
      onChange({ imageFile: "", link: "" });
    }
  };

  const update = (updates: Partial<QuickFunItem>) => {
    onChange({ ...(item || { imageFile: "", link: "" }), ...updates });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3>Quick Fun Feature</h3>
          <p className="text-sm text-gray-500">Single 16:9 image banner linking to a game or interactive experience.</p>
        </div>
        {!item && (
          <Button onClick={ensureItem} className="gap-2">Create</Button>
        )}
      </div>

      {!item && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">No quick fun banner yet. Click Create.</CardContent>
        </Card>
      )}

      {item && (
        <Card className="border-2">
          <CardHeader className="bg-gray-50">
            <CardTitle>Featured Media Link</CardTitle>
            <CardDescription>Displayed near the bottom of the portal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload label="Banner Image (16:9)" folder="quickfun" value={item.imageFile} onChange={(val) => update({ imageFile: val })} accept="image/*" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title (Bosnian)</Label>
                <Input value={item.titleBosnian || ''} onChange={(e) => update({ titleBosnian: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Title (English)</Label>
                <Input value={item.titleEnglish || ''} onChange={(e) => update({ titleEnglish: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Subtitle (Bosnian)</Label>
                <Textarea rows={2} value={item.subtitleBosnian || ''} onChange={(e) => update({ subtitleBosnian: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Subtitle (English)</Label>
                <Textarea rows={2} value={item.subtitleEnglish || ''} onChange={(e) => update({ subtitleEnglish: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Link</Label>
              <Input value={item.link} onChange={(e) => update({ link: e.target.value })} placeholder="https://example.com" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
