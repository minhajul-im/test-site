import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { SocialSignIn } from "./social";
import { Password } from "@/components/common/password";
import { useSignIn, useSignUp } from "@/controllers/authController";
import { Spinner } from "@/components/ui/spinner";
import { PhoneInput } from "@/components/common/phone-input";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";
import { Checkbox } from "@/components/ui/checkbox";

export const SignInForm = () => {
  const { getTranslation } = useTranslation();
  const { fnSignIn, isPending } = useSignIn();
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  return (
    <form onSubmit={fnSignIn}>
      <input type="hidden" name="user_type" value="customer" />
      <FieldGroup>
        <PhoneInput
          id="email"
          name="email"
          disabled={isPending}
          label={getTranslation("phone") || "Phone"}
          placeholder="01XXXXXXXXX"
          onValidationChange={(isValid) => setIsPhoneValid(isValid)}
        />

        <Password
          disabled={isPending}
          placeholder={
            getTranslation("enter_your_password") || "Enter your password"
          }
          forgotPassword={true}
        />

        <div className="flex items-center gap-2">
          <Checkbox
            id="remember_me"
            name="remember_me"
            disabled={isPending}
            className="cursor-pointer"
          />
          <FieldLabel htmlFor="remember_me" className="cursor-pointer -mt-1">
            {getTranslation("remember_me") || "Remember me"}
          </FieldLabel>
        </div>

        <Field>
          <Button
            className={cn(isPending ? "opacity-50 cursor-not-allowed" : "")}
            type="submit"
            size="lg"
            disabled={isPending || !isPhoneValid}>
            {isPending ? (
              <>
                <Spinner />
                {getTranslation("processing") || "Processing..."}
              </>
            ) : (
              getTranslation("sign_in") || "Sign in"
            )}
          </Button>
          <FieldDescription className="text-center">
            {getTranslation("dont_have_an_account") || "Don't have an account?"}
            <Link to="/signup" className="text-primary ml-1   ">
              {getTranslation("sign_up") || "Sign up"}
            </Link>
          </FieldDescription>
        </Field>

        <SocialSignIn />
      </FieldGroup>
    </form>
  );
};

export const SignUpForm = () => {
  const { getTranslation } = useTranslation();
  const { fnSignUp, isPending } = useSignUp();
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  return (
    <form onSubmit={fnSignUp}>
      <input type="hidden" name="register_by" value="phone" />
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">
            {getTranslation("full_name") || "Full Name"} *
          </FieldLabel>
          <Input
            className="h-10 "
            id="name"
            name="name"
            type="text"
            required
            disabled={isPending}
            placeholder={
              getTranslation("enter_your_full_name") || "Enter your full name"
            }
          />
        </Field>
        <PhoneInput
          id="email_or_phone"
          name="email_or_phone"
          label={getTranslation("phone") || "Phone"}
          placeholder="01XXXXXXXXX or +881XXXXXXXXX"
          onValidationChange={(isValid) => setIsPhoneValid(isValid)}
        />
        <Password
          disabled={isPending}
          placeholder={
            getTranslation("enter_your_password") || "Enter your password"
          }
        />
        <Field>
          <Button
            className={cn(isPending ? "opacity-50 cursor-not-allowed" : "")}
            type="submit"
            size="lg"
            disabled={isPending || !isPhoneValid}>
            {isPending ? (
              <>
                <Spinner />
                {getTranslation("processing") || "Processing..."}
              </>
            ) : (
              getTranslation("sign_up") || "Sign up"
            )}
          </Button>
          <FieldDescription className="text-center">
            {getTranslation("already_have_an_account") ||
              "Already have an account?"}
            <Link to="/signin" className="text-primary ml-1   ">
              {getTranslation("sign_in") || "Sign in"}
            </Link>
          </FieldDescription>
        </Field>
        <SocialSignIn />
      </FieldGroup>
    </form>
  );
};
