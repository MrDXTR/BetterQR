import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  id: string;
  label: string;
  type: "text" | "email" | "url" | "textarea";
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  required?: boolean;
  error?: string;
  showCharCount?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  className,
  maxLength,
  required,
  error,
  showCharCount = true,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor={id} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        {maxLength && showCharCount && (
          <span className="text-xs text-muted-foreground">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {type === "textarea" ? (
        <div className="relative">
          <Textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`${className} ${error ? "border-destructive" : ""}`}
          />
          {/* {maxLength && (
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {value.length}/{maxLength}
            </div>
          )} */}
        </div>
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={`${className} ${error ? "border-destructive" : ""}`}
        />
      )}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
