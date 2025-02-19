import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface FileInputProps {
  label: string;
  accept: string;
  onChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, accept, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onChange(files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={label}>{label}</Label>
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-primary/40"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Drag and drop a file here, or
        </p>
        <Input
          type="file"
          className="hidden"
          id={label}
          accept={accept}
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            onChange(file);
          }}
        />
        <label
          htmlFor={label}
          className="text-sm text-primary hover:underline cursor-pointer"
        >
          browse
        </label>
      </div>
    </div>
  );
};

export default FileInput;
