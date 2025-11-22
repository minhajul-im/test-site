import React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePhoneValidation } from "@/hooks/usePhoneValidation";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onValidationChange?: (isValid: boolean, phone: string) => void;
}

export const PhoneInput = ({
  id,
  name,
  label = "Phone",
  placeholder = "01XXXXXXXXX",
  disabled = false,
  required = true,
  className,
  onValidationChange,
}: Props) => {
  const { phone, touched, handlePhoneChange, handleBlur, isValid, error } =
    usePhoneValidation();
  const { getTranslation } = useTranslation();
  React.useEffect(() => {
    onValidationChange?.(isValid, phone);
  }, [isValid, phone, onValidationChange]);

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label} *</FieldLabel>
      <div className="space-y-1">
        <Input
          id={id}
          name={name}
          value={phone}
          disabled={disabled}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onBlur={handleBlur}
          className={cn(
            "h-10",
            touched && !isValid && "border-red-500 focus:border-red-500",
            touched && isValid && "border-green-500 focus:border-green-500",
            className
          )}
          type="text"
          placeholder={placeholder}
          required={required}
        />

        {touched && error && (
          <div className="text-sm text-red-500">{error}</div>
        )}

        {touched && isValid && (
          <div className="text-sm text-green-600">
            ✓ {getTranslation("valid_phone_number") || "Valid phone number"}
          </div>
        )}

        {!touched && (
          <div className="text-sm text-muted-foreground">
            {getTranslation(
              "enter_your_mobile_number_11_digits_starting_with_01"
            ) || "Enter your mobile number (11 digits starting with 01)"}
          </div>
        )}
      </div>
    </Field>
  );
};
