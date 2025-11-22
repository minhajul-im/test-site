import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SeoWrapper } from "@/components/common/seo-wrapper";
import { SignUpForm } from "./component/form";
import { useTranslation } from "@/hooks/useTranslation";
import { Logo } from "@/components/layout/header/logo";
import { AuthDescription } from "./component/description";

export const SignUpPage = () => {
  const { getTranslation } = useTranslation();

  return (
    <>
      <SeoWrapper title={getTranslation("sign_up") || "Sign up"} />
      <div
        style={{
          backgroundImage: "url('/signup.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex min-h-svh flex-col items-center justify-center">
        <div className="flex w-full max-w-lg flex-col gap-6">
          <div className={cn("flex flex-col gap-6")}>
            <Card>
              <CardHeader className="flex gap-2 flex-col items-center justify-center">
                <Link to="/">
                  <Logo type="DESKTOP" />
                </Link>
                <div className="text-center">
                  <CardTitle className="text-xl">
                    {getTranslation("welcome") || "Welcome"}
                  </CardTitle>
                  <CardDescription>
                    {getTranslation("sign_up_to_your_account") ||
                      "Sign up to your account"}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <SignUpForm />
              </CardContent>
            </Card>
            <AuthDescription />
          </div>
        </div>
      </div>
    </>
  );
};
