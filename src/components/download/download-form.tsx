"use client";

import {
  createDownloadRequest,
  type DownloadResponse,
} from "@/actions/donwload-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import PhoneInputWithCountrySelect, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { Loader2, ArrowLeft } from "lucide-react";

// Schema for mobile number validation
const mobileSchema = z
  .string()
  .min(1, "Mobile number is required")
  .refine(
    (value) => {
      if (!value || value === "") return false;

      try {
        const phoneNumber = parsePhoneNumber(value);

        if (phoneNumber) {
          return isValidPhoneNumber(value, phoneNumber.country);
        } else {
          return isValidPhoneNumber(value);
        }
      } catch {
        try {
          return isValidPhoneNumber(value);
        } catch {
          return false;
        }
      }
    },
    {
      message: "Please enter a valid mobile number",
    }
  );

const mobileFormSchema = z.object({
  mobile: mobileSchema,
});

type MobileFormData = z.infer<typeof mobileFormSchema>;

const getDownloadUrl = (os: string, platform: string) => {
  if (os === "mac" && platform === "apple") {
    return "https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7Lz71aznKiZ23OUBzHkuDRd5Wh4aoNVGtwFTe";
  }
  if (os === "windows") {
    return "https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7ilBGQiKsq6AhXSmeKlJHnu1cBIQPD9WdkyV5";
  }
  return "";
};

export const DownloadForm = ({
  os,
  platform,
  setShowDialog,
}: {
  os: string;
  platform: string;
  setShowDialog: (show: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<DownloadResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<"login" | "mobile">("login");

  const { data: session, status } = useSession();
  const isLoggedIn = !!session?.user;

  const getCanDownload = (os: string, platform: string) => {
    if (os === "mac" && platform === "apple") {
      return true;
    }

    if (os === "windows") {
      return true;
    }

    return false;
  };

  const canDownload = useMemo(
    () => getCanDownload(os, platform),
    [os, platform]
  );

  // Move to mobile step when user logs in
  React.useEffect(() => {
    if (isLoggedIn && currentStep === "login") {
      setCurrentStep("mobile");
    }
  }, [isLoggedIn, currentStep]);

  const form = useForm<MobileFormData>({
    resolver: zodResolver(mobileFormSchema),
    defaultValues: {
      mobile: "",
    },
  });

  const handleMobileSubmit = async (data: MobileFormData) => {
    setLoading(true);
    startTransition(async () => {
      try {
        const result = await createDownloadRequest({
          email: session?.user?.email || "",
          mobile: data.mobile || "",
        });

        if (result.success) {
          setResponse(result);
          // Automatically trigger download after successful mobile submission
          if (canDownload) {
            const downloadUrl = getDownloadUrl(os, platform);
            window.location.href = downloadUrl;
          }
          // Close dialog after a short delay to show success message
          setTimeout(() => {
            setShowDialog(false);
          }, 2000);
        } else {
          setResponse(result);
          setLoading(false);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setResponse({
          success: false,
          message: "An unexpected error occurred. Please try again.",
        });
        setLoading(false);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      }
    });
  };

  const handleBackToLogin = () => {
    setCurrentStep("login");
    setResponse(null);
  };

  // Step 1: Login
  if (currentStep === "login") {
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Sign in to Download</h3>
          <p className="text-sm text-muted-foreground">
            Please sign in with your Google account to continue with the
            download.
          </p>
        </div>

        <Button
          onClick={() => signIn("google", { callbackUrl: "/download" })}
          className="w-full h-12 text-base font-medium"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </Button>
      </div>
    );
  }

  // Step 2: Mobile Number
  if (currentStep === "mobile") {
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Welcome, {session?.user?.name || session?.user?.email}!
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {session?.user?.email}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Please provide your mobile number to continue.
            </p>
          </div>
        </div>

        {response?.success ? (
          <div className="space-y-4">
            <div className="p-4 bg-background border border-border rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-sm font-medium text-foreground">
                  Download Started!
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Your download should begin automatically. If it doesn&apos;t,
                check your browser&apos;s download settings.
              </p>
            </div>

            <div className="p-3 bg-muted/50 border border-border rounded-md">
              <p className="text-sm text-foreground mb-2">
                Here is the tutorial video to install the app.
              </p>
              <Link
                href="https://youtu.be/7P8WA_Wyr-E"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm font-medium"
              >
                Watch Tutorial
              </Link>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleMobileSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Mobile Number *
                    </FormLabel>
                    <FormControl>
                      <PhoneInputWithCountrySelect
                        placeholder="Enter phone number"
                        value={field.value || ""}
                        onChange={(value) => {
                          field.onChange(value || "");
                          form.trigger("mobile");
                        }}
                        onCountryChange={() => {
                          setTimeout(() => {
                            form.trigger("mobile");
                          }, 100);
                        }}
                        defaultCountry="IN"
                        international={false}
                        disabled={loading}
                        inputComponent={Input}
                        style={
                          {
                            "--PhoneInputCountryFlag-height": "1rem",
                            "--PhoneInputCountrySelectArrow-color":
                              "hsl(var(--muted-foreground))",
                            "--PhoneInputCountrySelectArrow-opacity": "0.5",
                            "--PhoneInput-color--focus": "hsl(var(--ring))",
                          } as React.CSSProperties
                        }
                        className="flex text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {response && !response.success && (
                <div className="p-3 bg-destructive/10 border border-destructive rounded-md">
                  <p className="text-sm text-destructive">{response.message}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  "Download Now"
                )}
              </Button>
            </form>
          </Form>
        )}
      </div>
    );
  }

  return null;
};
