import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Parse RGBA from string
  const parseRgba = (rgbaString: string) => {
    const match = rgbaString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1
      };
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };

  const rgba = parseRgba(value);
  const [r, setR] = useState(rgba.r);
  const [g, setG] = useState(rgba.g);
  const [b, setB] = useState(rgba.b);
  const [a, setA] = useState(rgba.a);

  const handleApply = () => {
    onChange(`rgba(${r}, ${g}, ${b}, ${a})`);
    setIsOpen(false);
  };

  const currentColor = `rgba(${r}, ${g}, ${b}, ${a})`;

  return (
    <>
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-20 h-10 rounded border-2 border-gray-300 cursor-pointer"
            style={{ backgroundColor: value }}
          />
          <div className="flex-1 px-3 py-2 bg-gray-100 rounded text-sm">
            {value}
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
            <DialogDescription>
              Adjust the color values and transparency using the sliders below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div
              className="w-full h-24 rounded border-2 border-gray-300"
              style={{ backgroundColor: currentColor }}
            />

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Red</Label>
                  <span className="text-sm">{r}</span>
                </div>
                <Slider
                  value={[r]}
                  onValueChange={(val) => setR(val[0])}
                  max={255}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Green</Label>
                  <span className="text-sm">{g}</span>
                </div>
                <Slider
                  value={[g]}
                  onValueChange={(val) => setG(val[0])}
                  max={255}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Blue</Label>
                  <span className="text-sm">{b}</span>
                </div>
                <Slider
                  value={[b]}
                  onValueChange={(val) => setB(val[0])}
                  max={255}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Transparency</Label>
                  <span className="text-sm">{Math.round(a * 100)}%</span>
                </div>
                <Slider
                  value={[a * 100]}
                  onValueChange={(val) => setA(val[0] / 100)}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
