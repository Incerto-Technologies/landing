import { PricingCard } from "@/components/pricing-card";
import { FAQSection } from "@/components/faq-section";
import CTA from "@/components/sections/cta";
import SectionContainer from "@/components/layouts/section-container";

const pricingPlans = [
  {
    title: "Pro",
    description: "For production applications with the power to scale.",
    price: "$25",
    popular: true,
    buttonText: "Discover Now",
    buttonVariant: "primary" as const,
    features: [
      "100,000 monthly active users",
      "8 GB disk size per project",
      "250 GB bandwidth",
      "100 GB file storage",
      "Email support",
      "Daily backups stored for 7 days",
      "7-day log retention",
    ],
  },
  {
    title: "Team",
    description:
      "Add features such as SSO, control over backups, and industry certifications.",
    price: "$599",
    buttonText: "Discover Now",
    buttonVariant: "primary" as const,
    features: [
      "SOC2",
      "HIPAA available as paid add-on",
      "Read-only and Billing member roles",
      "SSO for Dashboard",
      "Priority email support & SLAs",
      "Daily backups stored for 14 days",
      "28-day log retention",
    ],
  },
  {
    title: "Enterprise",
    description:
      "For large-scale applications running Internet scale workloads.",
    price: "Custom",
    buttonText: "Contact Us",
    buttonVariant: "outline" as const,
    features: [
      "Designated Support manager",
      "Uptime SLAs",
      "BYO Cloud supported",
      "24×7×365 premium enterprise support",
      "Private Slack channel",
      "Custom Security Questionnaires",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="">
      {/* Header */}
      <SectionContainer className="flex flex-col items-center justify-center   space-y-16">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-900">
            <span className="text-primary">Predictable pricing</span>, designed to scale
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Start building for free, collaborate with your team, then scale to
            millions of users
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </SectionContainer>

      <FAQSection />
      <CTA />
    </main>
  );
}
