import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  return (
    <div className="space-y-2 flex-1">
      <Label htmlFor={label}>{label}</Label>
      <div className="flex items-center gap-1">
        <div
          className="relative w-12 h-12 rounded-md border"
          style={{ backgroundColor: color }}
        >
          <Input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
          />
        </div>
        <Input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 border-primary/40"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
