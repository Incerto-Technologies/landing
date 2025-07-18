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

const downloadFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  mobile: z
    .string()
    .min(10, "Please enter a valid 10 digit mobile number")
    .refine((value) => (value ? /^\d{10}$/.test(value) : true), {
      message: "Please enter a valid 10 digit mobile number",
    }),
});

type FormData = z.infer<typeof downloadFormSchema>;

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
    startTransition(async () => {
      try {
        setLoading(true);
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
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setResponse({
          success: false,
          message: "An unexpected error occurred. Please try again.",
        });
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="your-email@example.com"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your mobile number"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {response && (
            <div
              className={`p-3 rounded-md text-sm ${
                response.success
                  ? "bg-green-50  border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {response.success ? (
                <div className="flex items-center gap-2">
                  <span data-success={response.success}>
                    Here is the tutorial video to install the app.
                  </span>
                  <Link
                    href="https://youtu.be/7P8WA_Wyr-E"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm font-medium"
                  >
                    Click Here
                  </Link>
                </div>
              ) : (
                response.message
              )}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
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
