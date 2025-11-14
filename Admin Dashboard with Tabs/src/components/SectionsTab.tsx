import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { ColorPicker } from "./ColorPicker";

export interface SectionStyle {
  titleBosnian?: string;
  titleEnglish?: string;
  subtitleBosnian?: string;
  subtitleEnglish?: string;
  icon?: string;
  showDivider?: boolean;
  subtitleGradient?: string; // CSS gradient string
  titleColor?: string;
  subtitleColor?: string;
  spacingTop?: number;
  spacingBottom?: number;
}

export interface SectionsConfig {
  chips?: SectionStyle;
  cityUtility?: SectionStyle;
  deals?: SectionStyle;
  editorsPicks?: SectionStyle;
  discovery?: SectionStyle;
  quickFun?: SectionStyle;
}

interface SectionsTabProps {
  value: SectionsConfig;
  onChange: (value: SectionsConfig) => void;
}

function SectionEditor({ label, value, onChange }: { label: string; value: SectionStyle; onChange: (s: SectionStyle) => void; }) {
  const update = (u: Partial<SectionStyle>) => onChange({ ...value, ...u });
  return (
    <Card>
      <CardHeader className="bg-gray-50">
        <CardTitle>{label}</CardTitle>
        <CardDescription>Section header & styling</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6 py-6">
        <div className="space-y-2">
          <Label>Title (Bosnian)</Label>
          <Input value={value.titleBosnian || ''} onChange={(e) => update({ titleBosnian: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Title (English)</Label>
          <Input value={value.titleEnglish || ''} onChange={(e) => update({ titleEnglish: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Subtitle (Bosnian)</Label>
          <Input value={value.subtitleBosnian || ''} onChange={(e) => update({ subtitleBosnian: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Subtitle (English)</Label>
          <Input value={value.subtitleEnglish || ''} onChange={(e) => update({ subtitleEnglish: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Icon (lucide name)</Label>
          <Input value={value.icon || ''} onChange={(e) => update({ icon: e.target.value })} placeholder="ShoppingBag, MapPin, ..." />
        </div>
        <div className="space-y-2">
          <Label>Subtitle Gradient (CSS)</Label>
          <Input value={value.subtitleGradient || ''} onChange={(e) => update({ subtitleGradient: e.target.value })} placeholder="linear-gradient(90deg,#7A49F0,#C86BFA)" />
        </div>
        <div className="space-y-2">
          <Label>Title Color</Label>
          <ColorPicker label="Title Color" value={value.titleColor || ''} onChange={(v) => update({ titleColor: v })} />
        </div>
        <div className="space-y-2">
          <Label>Subtitle Color</Label>
          <ColorPicker label="Subtitle Color" value={value.subtitleColor || ''} onChange={(v) => update({ subtitleColor: v })} />
        </div>
        <div className="space-y-2">
          <Label>Spacing Top (px)</Label>
          <Input type="number" value={value.spacingTop ?? 0} onChange={(e) => update({ spacingTop: parseInt(e.target.value) || 0 })} />
        </div>
        <div className="space-y-2">
          <Label>Spacing Bottom (px)</Label>
          <Input type="number" value={value.spacingBottom ?? 0} onChange={(e) => update({ spacingBottom: parseInt(e.target.value) || 0 })} />
        </div>
        <div className="flex items-center gap-3 col-span-2">
          <Switch id="divider" checked={!!value.showDivider} onCheckedChange={(v: boolean) => update({ showDivider: v })} />
          <Label htmlFor="divider">Show divider below section header</Label>
        </div>
      </CardContent>
    </Card>
  );
}

export function SectionsTab({ value, onChange }: SectionsTabProps) {
  const v = value || {};
  return (
    <div className="space-y-6">
      <SectionEditor label="Explore Our Platforms" value={v.chips || {}} onChange={(s) => onChange({ ...v, chips: s })} />
      <SectionEditor label="City Utility" value={v.cityUtility || {}} onChange={(s) => onChange({ ...v, cityUtility: s })} />
      <SectionEditor label="Today's Recommended Listings" value={v.deals || {}} onChange={(s) => onChange({ ...v, deals: s })} />
      <SectionEditor label="Editor's Picks" value={v.editorsPicks || {}} onChange={(s) => onChange({ ...v, editorsPicks: s })} />
      <SectionEditor label="Sarajevo Discovery" value={v.discovery || {}} onChange={(s) => onChange({ ...v, discovery: s })} />
      <SectionEditor label="Quick Fun" value={v.quickFun || {}} onChange={(s) => onChange({ ...v, quickFun: s })} />
    </div>
  );
}
