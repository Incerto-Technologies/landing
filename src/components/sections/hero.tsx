"use client";
import Link from "next/link";
import Image from "next/image";
import SectionContainer from "../layouts/section-container";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Logos from "./logos";
import RollUpText from "../ui/roll-up-words";
import { getUserOS } from "@/lib/get-user-os";
import { useMemo, useState } from "react";
import { DownloadForm } from "../download/download-form";
import { X } from "lucide-react";

const Hero = () => {
  const { os, architecture } = getUserOS();
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const imageUrl = useMemo(() => {
    if (os === "mac") return "/download/apple.png";
    if (os === "windows") return "/download/windows.svg";
    if (os === "linux") return "/download/Linux.png";
    return "/download/windows.svg";
  }, [os]);

  return (
    <SectionContainer className="pt-8 pb-10  overflow-hidden text-center flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      {/* Free Trial Banner */}
      <Link
        href={"/download"}
        className="p-[5px] rounded-full mb-5  border-[#ededed] border w-[240px] group flex items-center h-[40px]"
      >
        <div className="border rounded-full px-4 py-1 border-primary bg-[#72E3AD] text-sm mr-[10px]">
          Get Unlimited AI Credits
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
        <span className="text-primary font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text ">
          AI Co-Pilot
        </span>{" "}
        <br />
        <span className="text-foreground/90 font-medium">for</span> <br />
        <RollUpText
          animations={[
            {
              name: "Postgres",
              image: "/postgres.png",
            },
            {
              name: "ClickHouse",
              image: "/clickhouse.svg",
            },
          ]}
        />
      </h1>

      {/* CTA Buttons */}
      <div className="mt-10 flex items-center gap-3">
        <button
          className={cn(
            buttonVariants({
              variant: "primary",
            }),
            "flex items-center gap-2"
          )}
          onClick={() => setShowDownloadDialog(true)}
        >
          <Image
            src={imageUrl}
            alt={os}
            width={20}
            height={20}
            className={cn("w-3 object-contain", os === "mac" && "-mt-0.5")}
          />
          Download {os}
        </button>
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
      {showDownloadDialog && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg border">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Download Incerto
                </h3>
                {/* <p className="text-sm text-muted-foreground mt-1">
                  {downloadInfo?.platform}{" "}
                  {downloadInfo?.architecture &&
                    `(${downloadInfo.architecture})`}
                </p> */}
              </div>
              <button
                onClick={() => setShowDownloadDialog(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <DownloadForm
                canDownload={os === "mac" && architecture === "apple"}
              />
            </div>
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

export default Hero;
