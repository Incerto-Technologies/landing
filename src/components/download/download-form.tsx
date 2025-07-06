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
import { useState, useTransition } from "react";

const downloadFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  mobile: z
    .string()
    .optional()
    .refine((value) => (value ? /^\d{10}$/.test(value) : true), {
      message: "Please enter a valid 10 digit mobile number",
    }),
});

type FormData = z.infer<typeof downloadFormSchema>;

export const DownloadForm = () => {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<DownloadResponse | null>(null);
  const [loading, setLoading] = useState(false);

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

        if (result.success) {
          const downloadUrl =
            "https://dfeebj4kxn.ufs.sh/f/kGNlPW1twzn7kGWPavetwzn7PHqYpkabNj2oW31dAt8lGgTZ";
          window.location.href = downloadUrl;
        }

        setResponse(result);

        if (result.success) {
          form.reset();
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setResponse({
          success: false,
          message: "An unexpected error occurred. Please try again.",
        });
      } finally {
        setLoading(false);
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
                <FormLabel>Email *</FormLabel>
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
                <FormLabel>Mobile (Optional)</FormLabel>
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
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {response.message}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Download"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
