import { ContactForm } from "@/components/contact-form";
import SectionContainer from "@/components/layouts/section-container";

export default function ContactPage() {
  return (
    <main className="">
       <SectionContainer className="flex flex-col items-center justify-center space-y-16">
        <div className="text-center">
          <h1 className="text-3xl font-semibold md:font-medium md:text-4xl sm:leading-none text-gray-900">
          Talk to our team!
          </h1>
          <p className="mt-2 text-base md:text-lg text-gray-600">
            Our team would love to hear from you.
          </p>
        </div>

          {/* Right Column - Form */}
          <div className="">
            <ContactForm />
          </div>
        
      </SectionContainer>
    </main>
  );
}
