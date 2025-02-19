import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  color,
  onChange,
}) => {
  const isValidColor = (color: string) => {
    // Check if it's a valid hex color
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(color)) return true;

    // Check if it's a valid RGB/RGBA color
    const rgbRegex = /^rgb[a]?\([\d\s,%.]+\)$/;
    if (rgbRegex.test(color)) return true;

    // Check if it's a valid HSL/HSLA color
    const hslRegex = /^hsl[a]?\([\d\s,%.\-]+\)$/;
    if (hslRegex.test(color)) return true;

    return false;
  };

  return (
    <div className="space-y-2 flex-1">
      <Label htmlFor={label}>{label}</Label>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="relative w-12 h-12 rounded-md border transition-transform hover:scale-105"
                style={{
                  backgroundColor: isValidColor(color) ? color : "#000000",
                }}
              >
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to pick a color</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 border-primary/40 ${
            !isValidColor(color) ? "border-destructive" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
