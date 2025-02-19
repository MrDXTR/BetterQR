import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FileInputProps {
  label: string;
  accept: string;
  onChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, accept, onChange }) => {
  return (
    <div className="space-y-3">
      <Label htmlFor={label}>{label}</Label>
      <Input
        type="file"
        className="border-primary/40"
        id={label}
        accept={accept}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files ? e.target.files[0] : null;
          onChange(file);
        }}
      />
    </div>
  );
};

export default FileInput;
