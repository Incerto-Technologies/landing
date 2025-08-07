import { ContactForm } from "@/components/contact-form";
import SectionContainer from "@/components/layouts/section-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get Started with Incerto Database AI",
  description:
    "Ready to solve your database problems 5x faster? Contact our team to get started with Incerto's agentic AI database management solution. Get personalized support and expert guidance.",
  keywords:
    "contact incerto, database AI support, database management help, incerto contact, database optimization consultation",
  openGraph: {
    title: "Contact Us - Get Started with Incerto Database AI",
    description:
      "Ready to solve your database problems 5x faster? Contact our team to get started with Incerto's agentic AI database management solution.",
    type: "website",
    url: "https://incerto.in/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Get Started with Incerto Database AI",
    description:
      "Ready to solve your database problems 5x faster? Contact our team to get started with Incerto's agentic AI database management solution.",
  },
};

export default function ContactPage() {
  return (
    <main className="">
      <SectionContainer className="flex flex-col items-center justify-center space-y-16">
        <div className="text-center">
          <h1 className="text-3xl font-semibold md:font-medium md:text-4xl sm:leading-none text-foreground">
            Let&apos;s solve your database problems 5x faster
          </h1>
          <p className="mt-2 text-base md:text-lg text-muted-foreground">
            Start your journey with Agentic AI - just tell us what you need.
          </p>
        </div>

        {/* Right Column - Form */}
        <div className="w-full max-w-lg">
          <ContactForm />
        </div>
      </SectionContainer>
    </main>
  );
}
