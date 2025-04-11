"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Dummy testimonial data
const testimonials = [
  {
    name: "John Smith",
    role: "Senior Developer",
    image: "/dashboard.png",
    linkedin: "https://linkedin.com/in/johnsmith",
    company: "https://company.com",
    companyName: "Tech Corp",
    quote:
      "Working with @supabase has been one of the best dev experiences I've had lately. Incredibly easy to set up, great documentation, and so many fewer hoops to jump through than the competition. I definitely plan to use it on any and all future projects.",
  },
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    image: "/dashboard.png",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    company: "https://company.com",
    companyName: "Product Co",
    quote:
      "Working with @supabase has been one of the best dev experiences I've had lately. Incredibly easy to set up, great documentation, and so many fewer hoops to jump through than the competition. I definitely plan to use it on any and all future projects.",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/dashboard.png",
    linkedin: "https://linkedin.com/in/michaelchen",
    company: "https://company.com",
    companyName: "Startup Inc",
    quote:
      "Working with @supabase has been one of the best dev experiences I've had lately. Incredibly easy to set up, great documentation, and so many fewer hoops to jump through than the competition. I definitely plan to use it on any and all future projects.",
  },
  {
    name: "Emily Davis",
    role: "Lead Engineer",
    image: "/dashboard.png",
    linkedin: "https://linkedin.com/in/emilydavis",
    company: "https://company.com",
    companyName: "Engineering Co",
    quote:
      "Working with @supabase has been one of the best dev experiences I've had lately. Incredibly easy to set up, great documentation, and so many fewer hoops to jump through than the competition. I definitely plan to use it on any and all future projects.",
  },
];

const Feedback = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white" />

      <div className="container mx-auto px-6 lg:px-16 xl:px-20 relative">
        <div className="text-center mb-16">
          <h2 className="text-[33.75px] font-medium leading-[1.185] mb-4">
            Checkout!
            <br />
            <span className="text-muted-foreground">What Our Clients Say</span>
          </h2>
        </div>

        <div className="relative max-w-[800px] mx-auto overflow-hidden">
          {/* Left fade gradient */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />

          {/* Right fade gradient */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

          <div className="flex">
            <div className="flex animate-marquee">
              {[
                ...testimonials,
                ...testimonials,
                ...testimonials,
                ...testimonials,
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-none w-[304px] bg-white rounded-2xl border border-[#D6D3D1] p-6 flex flex-col gap-3 mr-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full border border-[#393939] overflow-hidden">
                      <Image
                        src={testimonial.image}
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
                          href={testimonial.linkedin}
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
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-muted-foreground">
                          {testimonial.role}
                        </span>
                        <span className="text-[11px] text-[#898989]">•</span>
                        <Link
                          href={testimonial.company}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-blue-500 hover:underline underline-offset-4 transition-colors"
                        >
                          {testimonial.companyName}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <p className="text-[15.1px] leading-[1.589]">
                    {testimonial.quote}
                  </p>
                </div>
              ))}
            </div>
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
    </section>
  );
};

export default Feedback;
