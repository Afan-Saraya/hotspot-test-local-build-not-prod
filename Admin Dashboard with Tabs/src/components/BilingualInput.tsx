import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface BilingualInputProps {
  label: string;
  bosnianValue: string;
  englishValue: string;
  onBosnianChange: (value: string) => void;
  onEnglishChange: (value: string) => void;
  multiline?: boolean;
}

export function BilingualInput({
  label,
  bosnianValue,
  englishValue,
  onBosnianChange,
  onEnglishChange,
  multiline = false
}: BilingualInputProps) {
  const InputComponent = multiline ? Textarea : Input;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-xs text-gray-500">Bosnian</Label>
          <InputComponent
            value={bosnianValue}
            onChange={(e) => onBosnianChange(e.target.value)}
            placeholder={`${label} (Bosnian)`}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-gray-500">English</Label>
          <InputComponent
            value={englishValue}
            onChange={(e) => onEnglishChange(e.target.value)}
            placeholder={`${label} (English)`}
          />
        </div>
      </div>
    </div>
  );
}
