import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Text Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl font-semibold text-gray-900">
              Talk to our Sales team
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Book a demo and set up a trial Enterprise account to see how INCERTO's scalable features can accelerate your business growth and app development.
            </p>

            <div className="mt-8">
              <p className="text-gray-600">
                Need technical help instead?{" "}
                <a href="mailto:support@incerto.in" className="text-green-600 hover:text-green-700">
                  Contact support
                </a>
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="rounded-xl border border-gray-200 bg-white p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
} 