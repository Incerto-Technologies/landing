import { ContactForm } from "@/components/contact-form";
import SectionContainer from "@/components/layouts/section-container";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="">
      <SectionContainer >
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Text Content */}
          <div className="max-w-xl max-md:text-center ">
            <h1 className="text-3xl font-semibold md:font-medium md:text-4xl sm:leading-none  text-gray-900">
              Talk to our Sales team
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Book a demo and set up a trial Enterprise account to see how
              INCERTO&apos;s scalable features can accelerate your business
              growth and app development.
            </p>

            <div className="mt-8">
              <p className="text-gray-600">
                Need technical help instead?{" "}
                <Link
                  href="mailto:support@incerto.in"
                  className="text-primary hover:text-primary/80"
                >
                  Contact support
                </Link>
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="rounded-xl border border-gray-200 bg-white p-8">
            <ContactForm />
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
