"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SectionContainer from "../layouts/section-container";


const testimonials =[
  {
    "id": 0,
    "name": "Pranav Khambayatkar",
    "position": "Senior VP Engineering at Fyers",
    "profile": "/clients/avatar/pranav-khambayatkar.webp",
    "companyLogo": "/clients/fyers.svg",
    "link": "https://incerto.in/blog/india-s-leading-brokerage-firm-unlocks-85-cost-savings-using-incerto-s-industry-first-custom-observability-solution-powered-by-opentelemetry",
    "message": "Incerto has been a great help in transforming Fyers observability landscape. Their end-to-end implementation with open source technologies provided meaningful insights into our infrastructure. Real-time observability and proactive alerting mitigated issues swiftly, reducing MTTR (Mean time to resolve) significantly. Crucially, Incerto ensured seamless SIEM compliance and delivered a highly customized solution tailored to our unique needs."
  },
  {
    "id": 1,
    "name": "Dhruman Bhadeshiya",
    "position": "CTO & Co-Founder",
    "profile": "/clients/avatar/dhruman.jpeg",
    "companyLogo": "/clients/kevit.svg",
    "link": "https://incerto.in/blog",
    "message": "Transforming observability in the CPaaS sector, Kevit is setting new standards with Incerto's custom-built platform. Migrating from New Relic, we've achieved a 90% reduction in monthly expenses and significant savings on cloud egress costs. Incerto's tailored stack ensures seamless data retention for one year, meeting our audit and compliance requirements. With complete data ownership, our infrastructure is now optimized for peak performance. Kevit is proud to lead the way in advanced observability solutions with Incerto."
  },
  {
    "id": 2,
    "name": "Kunal Singh",
    "position": "Co-Founder Discite Analytics & AI",
    "profile": "/clients/avatar/kunalsingh.webp",
    "companyLogo": "/clients/discite.svg",
    "link": "https://incerto.in/blog",
    "message": "I would highly recommend them. They bring very high ownership to the projects they work on with no followups required, and they are really good problem solvers so its easy to trust them with some critical issues you are facing."
  },
  {
    "id": 3,
    "name": "Sunil Naik",
    "position": "Director Dhruv Technology Solutions",
    "profile": "/clients/avatar/sunilnaik.webp",
    "companyLogo": "/clients/dhruv.svg",
    "link": "https://incerto.in/blog",
    "message": "This team has some rare skills with incredible flexibility and subject matter expertise. They have worked diligently to meet and exceed our expectations."
  },
  {
    "id": 4,
    "name": "Aditya Pushpati",
    "position": "CEO Ving",
    "profile": "/clients/avatar/adityapushpati.webp",
    "companyLogo": "/clients/ving.svg",
    "link": "https://incerto.in/blog",
    "message": "Meticulous. That's the word I would use to describe our engagement with Incerto Technologies. Their planning and attention to detail was commendable. The team looked into aspects that we missed and suggested the multiple options to choose from, in terms of approach to meet our product goals. Very professional and consultative."
  },
]

const Feedback = () => {
  return (
    <SectionContainer className=" relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white" />

        <h3 className="mb-8 text-2xl text-center  font-medium md:text-4xl max-w-[300px] sm:max-w-none mx-auto  ">
        What clients say about Incerto?
        </h3>

        <div className="relative max-w-[800px] mx-auto overflow-hidden">
          {/* Left fade gradient */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />

          {/* Right fade gradient */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

          <div className="flex">
            <div className="grid grid-rows-1 grid-flow-col    animate-marquee space-x-6">
              {[
                ...testimonials,
                ...testimonials,
                ...testimonials,
                ...testimonials,
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-none w-[350px] h-fit  bg-white rounded-2xl border border-[#D6D3D1] p-6 flex flex-col gap-3 "
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full border border-[#393939] overflow-hidden">
                      <Image
                        src={testimonial.profile}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[13.2px] font-medium text-foreground">
                          {testimonial.name}
                        </span>
                        <Link
                          href={testimonial.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#898989] hover:text-[#171717] transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </Link>
                      </div>
                      <div className=" w-full items-center ">
                        <div className="text-xs  text-muted-foreground">
                          {testimonial.position}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed">
                    {testimonial.message}
                  </p>
                </div>
              ))}
            </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </SectionContainer>
  );
};

export default Feedback;
