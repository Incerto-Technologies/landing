import Link from "next/link";
import Image from "next/image";
import { CONTACT_LINK } from "@/lib/constants";
import SectionContainer from "../layouts/section-container";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Logos from "./logos";

const Hero = () => {
  return (
    <SectionContainer className="pt-8 pb-10  overflow-hidden text-center flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      {/* Free Trial Banner */}
      <Link
        href={CONTACT_LINK}
        className="p-[5px] rounded-full mb-5  border-[#ededed] border w-[240px] group flex items-center h-[40px]"
      >
        <div className="border rounded-full px-4 py-1 border-primary bg-[#72E3AD] text-sm mr-[10px]">
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
      <h1 className="text-foreground text-4xl font-semibold md:font-medium md:text-6xl lg:text-7xl leading-tight md:leading-tight lg:leading-tight max-w-5xl">
        <span className="text-primary font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text ">Agentic AI</span> <br />
        <span className="text-foreground/90 font-medium">That Solves</span> <br />
        <span className="text-foreground font-bold">All Database Problems</span>
      </h1>

      {/* CTA Buttons */}
      <div className="mt-10 flex items-center gap-3">
        <Link
          href={CONTACT_LINK}
          className={buttonVariants({
            variant: "primary",
          })}
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
          Contact Us
        </Link>
      </div>

      {/* Clients Section */}
      <div className="space-y-5 relative overflow-hidden text-center mt-[10vh]">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white" />

        <h3 className="text-xl md:text-2xl leading-tight font-medium  text-[var(--color-foreground)]">
          Trusted By
        </h3>
        <Logos />
      </div>
    </SectionContainer>
  );
};

export default Hero;
