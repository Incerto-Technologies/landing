import Link from "next/link";
import Image from "next/image";
import { ContactBtn } from "../ui/contact";
import { Marquee } from "../ui/marquee";

const CLIENTS = [
  "/clients/vking.svg",
  "/clients/dhan.svg",
  "/clients/dhruv.svg",
  "/clients/discite.svg",
  "/clients/fyers.svg",
  "/clients/kevit.svg",
  "/clients/astra.svg",
];
export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center  pt-16">
      {/* Free Trial Banner */}
      <Link
        href="/discover"
        className="p-[5px] rounded-full border-[#ededed] border w-[280px] font-mono group flex items-center h-[40px]"
      >
        <div className="border rounded-full px-4 py-1 border-primary bg-primary/30 text-[#097C4F] text-sm mr-[22px]">
          Get 14 Days Free Trial
        </div>

        <div className="text-sm font-bold">
          <Image
            src="/icons/right-arrow.svg"
            alt="Arrow Right"
            width={16}
            height={16}
            className="group-hover:translate-x-1 transition-all duration-300"
          />
        </div>
      </Link>

      {/* Hero Content */}
      <h1 className="max-w-4xl text-center h1">
        {/* <h1 className="max-w-4xl text-center text-[68px] font-normal leading-tight text-[var(--color-foreground)]"> */}
        Actionable Observability for{" "}
        <span className="text-primary/80">Databases</span>
      </h1>
      <p className="mt-6 max-w-3xl text-center text-[17px] font-medium leading-relaxed text-[var(--color-foreground)] font-sans">
        Gain full visibility into your database performance with real-time
        monitoring and intelligent insights. Instantly detect anomalies,
        identify root causes, and take corrective actions with a single click.
        Reduce downtime, optimize queries, and ensure peak efficiency—without
        the guesswork. Experience the power of proactive database observability,
        all in one seamless platform.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex items-center gap-2">
        <ContactBtn className="rounded-md bg-primary/50 px-4 py-2 text-[13px] font-medium shadow-sm border border-primary transition-colors hover:bg-primary/60 mt-0 text-foreground ring-0" />
        <Link
          href="/contact"
          className="rounded-md bg-[var(--color-card)] px-4 py-2 text-[13px] font-medium text-[var(--color-foreground)] shadow-sm ring-1 ring-[var(--color-border)] transition-colors hover:bg-[var(--color-muted)]"
        >
          Contact us
        </Link>
      </div>

      {/* Clients Section */}

      <div className="mt-20 text-center space-y-[15px]">
        <h3 className="text-2xl font-medium text-[var(--color-foreground)]">
          Trusted By
        </h3>
        <Marquee images={CLIENTS} />
        <p className="text-[13px] font-medium text-[var(--color-muted-foreground)]">
          Trusted by fast-growing companies worldwide
        </p>
      </div>
    </section>
  );
}
