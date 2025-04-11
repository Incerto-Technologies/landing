import Link from "next/link";
import Image from "next/image";
import { CONTACT_LINK } from "@/lib/constants";
import SectionContainer from "../layouts/section-container";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const CLIENTS = [
  "/clients/vking.svg",
  "/clients/dhan.svg",
  "/clients/dhruv.svg",
  "/clients/discite.svg",
  "/clients/fyers.svg",
  "/clients/kevit.svg",
  "/clients/astra.svg",
];

const Hero = () => {
  return (
    <SectionContainer className="pt-8 pb-10  overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Free Trial Banner */}
      <Link
        href={CONTACT_LINK}
        className="p-[5px] rounded-full mb-5  border-[#ededed] border w-[280px] font-mono group flex items-center h-[40px]"
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
      <h1 className="text-foreground text-4xl font-medium sm:text-5xl sm:leading-none lg:text-7xl">
        Actionable Observability for{" "}
        <br className="hidden sm:block" />
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
        <Link
          href={CONTACT_LINK}
          className={
            buttonVariants({
              variant: "primary",
            })
          }
        >
          Try Now
        </Link>
        <Link
          href="/contact"
          className={cn(
            buttonVariants({
              variant: "primary",
            }),
            "bg-[var(--color-card)] text-[var(--color-foreground)] shadow-sm  ring-[var(--color-border)] transition-colors hover:bg-[var(--color-muted)]"
          )}
        >
          Contact us
        </Link>
      </div>

      {/* Clients Section */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-medium  text-[var(--color-foreground)]">
          Trusted By
        </h3>
        <div className="my-8 flex items-center justify-center gap-12">
          {CLIENTS.map((client, index) => (
            <Image
              key={index}
              src={client}
              alt="Client Logo"
              className="h-8 w-auto grayscale transition-all hover:grayscale-0"
              width={32}
              height={32}
            />
          ))}
        </div>
        <p className="mt-2 text-[13px] font-medium text-[var(--color-muted-foreground)]">
          fast-growing companies worldwide
        </p>
      </div>
    </SectionContainer>
  );
};


export default Hero;  