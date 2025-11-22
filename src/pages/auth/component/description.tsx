import { FieldDescription } from "@/components/ui/field";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export const AuthDescription = () => {
  const { getTranslation } = useTranslation();
  return (
    <FieldDescription className="px-6 text-center text-white">
      {getTranslation("by_clicking_continue_you_agree_to_our") ||
        "By clicking continue, you agree to our"}{" "}
      <Link to="/policy/terms-condition">
        {getTranslation("terms__condition") || "Terms & Condition"}
      </Link>{" "}
      &{" "}
      <Link to="/policy/privacy-policy">
        {getTranslation("privacy_policy") || "Privacy Policy"}
      </Link>
      .
    </FieldDescription>
  );
};
