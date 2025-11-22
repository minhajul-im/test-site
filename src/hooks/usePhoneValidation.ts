import { useState, useCallback } from "react";
import { useTranslation } from "@/hooks/useTranslation";
interface PhoneValidationType {
  isValid: boolean;
  error?: string;
  formattedNumber?: string;
  operator?: string;
}

export const usePhoneValidation = () => {
  const [phone, setPhone] = useState("");
  const { getTranslation } = useTranslation();
  const [touched, setTouched] = useState(false);
  const validateBangladeshiPhone = (phone: string): PhoneValidationType => {
    if (!phone) {
      return {
        isValid: false,
        error:
          getTranslation("phone_number_is_required") ||
          "Phone number is required",
      };
    }

    const cleanPhone = phone?.replace(/[^\d+]/g, "");

    if (!cleanPhone || cleanPhone.length === 0) {
      return {
        isValid: false,
        error:
          getTranslation("phone_number_is_required") ||
          "Phone number is required",
      };
    }

    let phoneNumber = cleanPhone.startsWith("+")
      ? cleanPhone.slice(1)
      : cleanPhone;

    if (phoneNumber.startsWith("880")) {
      phoneNumber = "0" + phoneNumber.slice(3);
    } else if (phoneNumber.startsWith("88")) {
      phoneNumber = "0" + phoneNumber.slice(2);
    }

    if (!phoneNumber.startsWith("01")) {
      return {
        isValid: false,
        error:
          getTranslation("phone_number_must_start_with_01_or_88") ||
          "Phone number must start with 01 or +88",
      };
    }

    if (phoneNumber.length !== 11) {
      return {
        isValid: false,
        error:
          getTranslation("phone_number_must_be_11_digits_01xxxxxxxxx") ||
          "Phone number must be 11 digits (01XXXXXXXXX)",
      };
    }

    if (!/^01\d{9}$/.test(phoneNumber)) {
      return {
        isValid: false,
        error:
          getTranslation("invalid_phone_number_format") ||
          "Invalid phone number format",
      };
    }

    return {
      isValid: true,
      formattedNumber: phoneNumber,
      operator: "Mobile",
    };
  };

  const handlePhoneChange = useCallback((value: string) => {
    setPhone(value);
    setTouched(true);
  }, []);

  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const validation = validateBangladeshiPhone(phone);
  const isValid = validation.isValid;
  const error = touched && !isValid ? validation.error : undefined;

  return {
    phone,
    touched,
    isValid,
    error,
    handleBlur,
    handlePhoneChange,
    validateBangladeshiPhone,
  };
};
