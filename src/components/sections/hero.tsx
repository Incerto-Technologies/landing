import Link from "next/link"

const CLIENTS = [
  "/clients/vking.svg",
  "/clients/dhan.svg",
  "/clients/dhruv.svg",
  "/clients/discite.svg",
  "/clients/fyers.svg",
  "/clients/kevit.svg",
  "/clients/astra.svg",
]

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center  pt-16">
      {/* Free Trial Banner */}
      <Link
        href="/discover"
        className="group font-mono relative mb-8 rounded-full bg-gradient-to-b from-[var(--color-card)] to-[var(--color-muted)] px-4 py-2 text-sm font-normal text-[var(--color-primary)] shadow-sm ring-1 ring-[var(--color-primary)] backdrop-blur-xl"
      >
        Get 14 Days Free Trial
        <span className="absolute -right-10 top-1/2 -translate-y-1/2 transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>

      {/* Hero Content */}
      <h1 className="max-w-4xl text-center text-[68px] font-normal leading-tight text-[var(--color-foreground)]">
        Actionable Observability for <span className="text-primary">Databases</span>
      </h1>
      <p className="mt-6 max-w-3xl text-center text-[17px] font-medium leading-relaxed text-[var(--color-foreground)]">
        Gain full visibility into your database performance with real-time monitoring and intelligent insights. Instantly
        detect anomalies, identify root causes, and take corrective actions with a single click. Reduce downtime, optimize
        queries, and ensure peak efficiency—without the guesswork. Experience the power of proactive database observability,
        all in one seamless platform.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex items-center gap-2">
        <Link
          href="/discover"
          className="rounded-md bg-primary px-4 py-2 text-[13px] font-medium text-foreground shadow-sm ring-1 ring-primary/75 transition-colors hover:bg-primary/90"
        >
          Discover Now
        </Link>
        <Link
          href="/contact"
          className="rounded-md bg-[var(--color-card)] px-4 py-2 text-[13px] font-medium text-[var(--color-foreground)] shadow-sm ring-1 ring-[var(--color-border)] transition-colors hover:bg-[var(--color-muted)]"
        >
          Contact us
        </Link>
      </div>

      {/* Clients Section */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-medium text-[var(--color-foreground)]">Our Clients</h3>
        <div className="my-8 flex items-center justify-center gap-12">
          {CLIENTS.map((client, index) => (
            <img
              key={index}
              src={client}
              alt="Client Logo"
              className="h-8 w-auto grayscale transition-all hover:grayscale-0"
            />
          ))}
        </div>
        <p className="mt-2 text-[13px] font-medium text-[var(--color-muted-foreground)]">
          Trusted by fast-growing companies worldwide
        </p>
      </div>
    </section>
  )
} 