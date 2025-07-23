import { ContactForm } from "@/components/contact-form";
import SectionContainer from "@/components/layouts/section-container";

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
