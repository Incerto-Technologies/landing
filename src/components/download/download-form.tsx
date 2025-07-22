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
import {
  isValidPhoneNumber,
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input";
import { cn } from "@/lib/utils";
import React from "react";

const downloadFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  mobile: z
    .string()
    .refine(
      (value) => (value ? isValidPhoneNumber(value) : true),
      "Please enter a valid mobile number"
    ),
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

// Country data with flags
const countryData: Record<string, { flag: string; name: string }> = {
  US: { flag: "🇺🇸", name: "United States" },
  IN: { flag: "🇮🇳", name: "India" },
  GB: { flag: "🇬🇧", name: "United Kingdom" },
  CA: { flag: "🇨🇦", name: "Canada" },
  AU: { flag: "🇦🇺", name: "Australia" },
  DE: { flag: "🇩🇪", name: "Germany" },
  FR: { flag: "🇫🇷", name: "France" },
  JP: { flag: "🇯🇵", name: "Japan" },
  BR: { flag: "🇧🇷", name: "Brazil" },
  MX: { flag: "🇲🇽", name: "Mexico" },
  CN: { flag: "🇨🇳", name: "China" },
  RU: { flag: "🇷🇺", name: "Russia" },
  IT: { flag: "🇮🇹", name: "Italy" },
  ES: { flag: "🇪🇸", name: "Spain" },
  KR: { flag: "🇰🇷", name: "South Korea" },
  NL: { flag: "🇳🇱", name: "Netherlands" },
  SE: { flag: "🇸🇪", name: "Sweden" },
  CH: { flag: "🇨🇭", name: "Switzerland" },
  NO: { flag: "🇳🇴", name: "Norway" },
  DK: { flag: "🇩🇰", name: "Denmark" },
};

const CustomPhoneInput = ({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
}) => {
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [showDropdown, setShowDropdown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const countries = getCountries();
  const availableCountries = countries.filter(
    (country) => countryData[country]
  );

  // Filter countries based on search term
  const filteredCountries = availableCountries.filter((country) => {
    const countryInfo = countryData[country];
    const callingCode = getCountryCallingCode(country as any);
    return (
      countryInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      callingCode.includes(searchTerm)
    );
  });

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    const callingCode = getCountryCallingCode(country as any);
    const newValue = `+${callingCode}${phoneNumber}`;
    onChange(newValue);
    setShowDropdown(false);
    setSearchTerm("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    setPhoneNumber(number);
    const callingCode = getCountryCallingCode(selectedCountry as any);
    const fullNumber = `+${callingCode}${number}`;
    onChange(fullNumber);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      setSearchTerm("");
    }
  };

  // Close dropdown when clicking outside
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  React.useEffect(() => {
    if (showDropdown && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [showDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative flex">
        <button
          type="button"
          onClick={handleDropdownToggle}
          disabled={disabled}
          className={cn(
            "flex items-center justify-center px-3 rounded-l-md border border-r-0 border-input bg-transparent hover:bg-accent transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            disabled && "pointer-events-none opacity-50"
          )}
        >
          <span className="text-lg mr-1">
            {countryData[selectedCountry]?.flag}
          </span>
          <span className="text-sm text-muted-foreground">
            +{getCountryCallingCode(selectedCountry as any)}
          </span>
          <svg
            className={cn(
              "w-3 h-3 ml-1 text-muted-foreground transition-transform",
              showDropdown && "rotate-180"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <Input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          disabled={disabled}
          className="rounded-l-none border-l-0 focus-visible:ring-offset-0"
        />
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-input rounded-md shadow-lg overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-input">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8 text-sm"
            />
          </div>

          {/* Countries List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country}
                  type="button"
                  onClick={() => handleCountryChange(country)}
                  className={cn(
                    "w-full px-3 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm transition-colors",
                    selectedCountry === country && "bg-accent"
                  )}
                >
                  <span className="text-lg">{countryData[country]?.flag}</span>
                  <span className="flex-1">{countryData[country]?.name}</span>
                  <span className="text-muted-foreground">
                    +{getCountryCallingCode(country as any)}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
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
                  <CustomPhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your phone number"
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
