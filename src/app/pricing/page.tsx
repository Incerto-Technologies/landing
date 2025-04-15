"use client";

import { useState } from "react";
import { FAQSection } from "@/components/faq-section";
import CTA from "@/components/sections/cta";
import SectionContainer from "@/components/layouts/section-container";
import { CurrencyToggle, type Currency, currencySymbols, exchangeRates } from "@/components/currency-toggle";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const pricingPlans = [
  {
    title: "STANDARD",
    price: 149,
    buttonText: "Contact Us",
    buttonVariant: "primary" as const,
    features: [
      "Upto 10 Databases",
      "Hosted in your Cloud",
      "Unlimited Users",
      "Unlimited Alerts",
      "Limited Integrations",
      "Priority Slack Support & SLAs",
    ],
  },
  {
    title: "ENTERPRISE",
    price: "Custom",
    buttonText: "Contact Us",
    buttonVariant: "primary" as const,
    features: [
      "Unlimited Databases",
      "Hosted in your Cloud",
      "Unlimited Users",
      "Unlimited Alerts",
      "Custom Integrations",
      "24×7×365 premium enterprise support",
    ],
  },
];

export default function PricingPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD");

  const formatPrice = (price: number | string) => {
    if (typeof price === "string") return price;
    const numericPrice = price * exchangeRates[selectedCurrency];
    return formatCurrency(numericPrice, selectedCurrency, "standard");
  };

  return (
    <main className="">

      <SectionContainer className="flex flex-col items-center justify-center space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold md:font-medium md:text-4xl sm:leading-none text-gray-900">
            Pricing
          </h1>
          <p className="mt-2 text-base md:text-lg text-gray-600">
            Whether you are a small company or a large enterprise – we have the right plan for you. 
            <br />
            <Link href="/contact" className="text-primary">Contact us</Link> for custom requirements like annual plans or compare our plans below.
          </p>
        </div>

        <CurrencyToggle onCurrencyChange={setSelectedCurrency} />

        {/* Pricing Cards */}
        <div className="grid gap-8 sm:grid-cols-2">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col p-8 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{plan.title}</h3>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {formatPrice(plan.price)}
                  </span>
                  {typeof plan.price === "number" && (
                    <span className="ml-1 text-xl font-semibold">/Monthly/DB</span>
                  )}
                </div>
                <ul role="list" className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-500" />
                      <span className="ml-3 text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="/contact"
                className={`mt-8 block w-full px-6 py-3 text-center text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </SectionContainer>

      <FAQSection />
      <CTA />
    </main>
  );
}
