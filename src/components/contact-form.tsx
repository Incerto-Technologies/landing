"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { sendContactForm } from "@/actions/contact";
import { CheckCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobile: z
    .string()
    .optional()
    .refine(
      (data) => {
        if (!data) return true;
        const regex = /^[0-9]{10}$/;
        return regex.test(data);
      },
      { message: "Please enter a valid mobile number." }
    ),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      mobile: undefined,
    },
  });

  async function onSubmit(values: FormValues) {
    startTransition(async () => {
      setError(null);
      const { success, error } = await sendContactForm({
        name: values.name,
        email: values.email,
        message: values.message,
        mobile: values.mobile?.toString(),
      });

      if (success) {
        form.reset();
        setIsSuccess(true);
      }
      if (error) {
        setIsSuccess(false);
        setError(error);
      }
    });
  }

  if (isSuccess) {
    return (
      <div className="text-primary text-xl space-y-4 text-center">
        <CheckCircle className="size-26 mx-auto" />
        Thank you for reaching out to us. <br /> We will get back to you soon.
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email<sup className="text-red-500">*</sup>
              </FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
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
                <Input placeholder="Mobile" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are you interested in? (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your needs..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <div className="space-y-4">
            <div className="border-t border-gray-200 pt-4">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSending}
        >
          {isSending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
