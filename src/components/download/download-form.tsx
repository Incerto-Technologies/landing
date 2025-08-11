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

const downloadFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  mobile: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value || value === "") return true; // Allow empty values (optional field)

        try {
          // First try to parse the phone number to get country info
          const phoneNumber = parsePhoneNumber(value);

          if (phoneNumber) {
            // If we can parse it, validate with the detected country
            return isValidPhoneNumber(value, phoneNumber.country);
          } else {
            // If we can't parse it, try validating as international number
            return isValidPhoneNumber(value);
          }
        } catch {
          // If all else fails, try one more time with basic validation
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
    ),
});

type FormData = z.infer<typeof downloadFormSchema>;

const getDownloadUrl = (os: string, platform: string) => {
  if (os === "mac" && platform === "apple") {
    return "https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7gTlPIKQdcy0T7nD6RAhrsJufNLBV2p8k4t9H";
  }
  if (os === "windows") {
    return "https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7EqrrNCDGkxUp0H2csZafrivEgS4dNlJAOyjo";
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

  const form = useForm<FormData>({
    resolver: zodResolver(downloadFormSchema),
    defaultValues: {
      email: "",
      mobile: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    startTransition(async () => {
      try {
        const result = await createDownloadRequest({
          email: data.email,
          mobile: data.mobile || "",
        });

        if (result.success && canDownload) {
          const downloadUrl = getDownloadUrl(os, platform);
          window.location.href = downloadUrl;
        }

        setResponse(result);

        if (result.success) {
          form.reset();
          setShowDialog(false);
        } else {
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

  return (
    <div className="w-full max-w-lg mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm lg:text-base">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="your-email@example.com"
                    disabled={isPending}
                    className="text-sm lg:text-base"
                  />
                </FormControl>
                <FormMessage className="text-xs lg:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm lg:text-base">Mobile</FormLabel>
                <FormControl>
                  <PhoneInputWithCountrySelect
                    placeholder="Enter phone number"
                    value={field.value || ""}
                    onChange={(value) => {
                      field.onChange(value || "");
                      // Trigger validation when value changes
                      form.trigger("mobile");
                    }}
                    onCountryChange={() => {
                      // Trigger validation when country changes
                      setTimeout(() => {
                        form.trigger("mobile");
                      }, 100);
                    }}
                    defaultCountry="IN"
                    international={false}
                    disabled={isPending}
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
                    className="flex text-sm lg:text-base"
                  />
                </FormControl>
                <FormMessage className="text-xs lg:text-sm" />
              </FormItem>
            )}
          />

          {response && (
            <div
              className={`p-3 lg:p-4 rounded-md text-xs lg:text-sm ${
                response.success
                  ? "bg-green-50  border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {response.success ? (
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
                  <span data-success={response.success}>
                    Here is the tutorial video to install the app.
                  </span>
                  <Link
                    href="https://youtu.be/7P8WA_Wyr-E"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-xs lg:text-sm font-medium"
                  >
                    Click Here
                  </Link>
                </div>
              ) : (
                response.message
              )}
            </div>
          )}

          <div className="p-3 lg:p-4 bg-slate-50 dark:bg-slate-900 rounded-md text-xs lg:text-sm text-slate-600 dark:text-slate-400 border">
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-medium">
                🔒
              </span>
              <div>
                <span className="font-medium">
                  Completely air-gapped and secure.
                </span>
                <span className="ml-1">
                  Our product runs entirely on-premise with no external data
                  transmission.
                </span>
                <Link
                  href="/blogs/safe-co-pilot"
                  className="text-blue-500 hover:underline ml-1 font-medium"
                >
                  Read more about security →
                </Link>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full text-sm lg:text-base py-2 lg:py-3"
            disabled={loading}
          >
            {loading
              ? canDownload
                ? "Downloading..."
                : "Submitting..."
              : canDownload
              ? "Download"
              : "Join the waitlist"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
