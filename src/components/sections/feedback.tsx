"use client";
import React, { useState } from "react";
import Image from "next/image";
import SectionContainer from "../layouts/section-container";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    "id": 0,
    "name": "Sanket Dhanawade",
    "position": "Engineering Manager, Dhan (Raise)",
    "profile": "/clients/avatar/sanket_bhai_dhan.webp",
    "linkedin": "https://www.linkedin.com/in/sanket-dhanawade-1a19a5245/",
    "companyLogo": "/clients/dhan.svg",
    "message": "It has made me efficient. I am using it for my every use case",
    "date": "July 31, 2025",
    "rating": 5
  },
  {
    "id": 1,
    "name": "Dinesh",
    "position": "Co-Founder",
    "message": "I recently tried the Quick Incerto platform for PostgreSQL, and the results were impressive.  I tested it with a few complex SQL queries—spanning two to three pages if printed—and Incerto was able to rewrite them in a much more optimal and concise form.  Not only did it significantly reduce the query size, but it also delivered the exact performance improvements we were aiming for.  This tool is especially valuable for teams or developers who may not have deep expertise in database optimization—it truly bridges that gap with ease",
    "date": "July 31, 2025",
    "rating": 5
  },
  {
    "id": 2,
    "name": "Shubham Mahale",
    "position": "DBA, Dhan (Raise)",
    "profile": "/clients/avatar/shubham.jpg",
    "linkedin": "https://www.linkedin.com/in/shubham-mahale-39316823a/",
    "companyLogo": "/clients/dhan.svg",
    "message": "The alerting dashboard is very useful, especially with its alert remediation workflows that minimize manual intervention and reduce time to resolution. The dashboards are highly delivering real-time visibility into cluster health and query metrics",
    "date": "July 23, 2025",
    "rating": 4
  },
  {
    "id": 3,
    "name": "Santosh Prasad",
    "position": "Sr. Lead DBA, Dhan (Raise)",
    "profile": "/clients/avatar/santosh-prasad.jpeg",
    "linkedin": "https://www.linkedin.com/in/santosh-prasad-b5ab4239/",
    "companyLogo": "/clients/dhan.svg",
    "link": "https://incerto.in/blog",
    "message": "It's been an amazing experience using Incerto. It is very useful to check and monitor health of clickhouse servers and also helpful troubleshooting the issues and finding the remedies for those issue. Really a good solution for Clickhouse cluster monitoring and troubleshooting it.",
    "date": "Apr 22, 2024",
    "rating": 5
  },
  {
    "id": 4,
    "name": "Pranav Khambayatkar",
    "position": "Senior VP Engineering at Fyers",
    "profile": "/clients/avatar/pranav-khambayatkar.webp",
    "companyLogo": "/clients/fyers.svg",
    "link": "https://incerto.in/blog/india-s-leading-brokerage-firm-unlocks-85-cost-savings-using-incerto-s-industry-first-custom-observability-solution-powered-by-opentelemetry",
    "message": "Incerto has been a great help in transforming Fyers observability landscape. Their end-to-end implementation with open source technologies provided meaningful insights into our infrastructure. Real-time observability and proactive alerting mitigated issues swiftly, reducing MTTR (Mean time to resolve) significantly. Crucially, Incerto ensured seamless SIEM compliance and delivered a highly customized solution tailored to our unique needs.",
    "date": "May 15, 2024",
    "rating": 5
  },
  {
    "id": 5,
    "name": "Dhruman Bhadeshiya",
    "position": "CTO & Co-Founder",
    "profile": "/clients/avatar/dhruman.jpeg",
    "companyLogo": "/clients/kevit.svg",
    "link": "https://incerto.in/blog",
    "message": "Transforming observability in the CPaaS sector, Kevit is setting new standards with Incerto's custom-built platform. Migrating from New Relic, we've achieved a 90% reduction in monthly expenses and significant savings on cloud egress costs. Incerto's tailored stack ensures seamless data retention for one year, meeting our audit and compliance requirements. With complete data ownership, our infrastructure is now optimized for peak performance. Kevit is proud to lead the way in advanced observability solutions with Incerto.",
    "date": "Mar 08, 2024",
    "rating": 5
  },
  {
    "id": 6,
    "name": "Kunal Singh",
    "position": "Co-Founder Discite Analytics & AI",
    "profile": "/clients/avatar/kunalsingh.webp",
    "companyLogo": "/clients/discite.svg",
    "link": "https://incerto.in/blog",
    "message": "I would highly recommend them. They bring very high ownership to the projects they work on with no followups required, and they are really good problem solvers so its easy to trust them with some critical issues you are facing.",
    "date": "Jun 12, 2024",
    "rating": 5
  },
  {
    "id": 7,
    "name": "Sunil Naik",
    "position": "Director Dhruv Technology Solutions",
    "profile": "/clients/avatar/sunilnaik.webp",
    "companyLogo": "/clients/dhruv.svg",
    "link": "https://incerto.in/blog",
    "message": "This team has some rare skills with incredible flexibility and subject matter expertise. They have worked diligently to meet and exceed our expectations.",
    "date": "Feb 28, 2024",
    "rating": 5
  },
  {
    "id": 8,
    "name": "Aditya Pushpati",
    "position": "CEO Ving",
    "profile": "/clients/avatar/adityapushpati.webp",
    "companyLogo": "/clients/ving.svg",
    "link": "https://incerto.in/blog",
    "message": "Meticulous. That's the word I would use to describe our engagement with Incerto Technologies. Their planning and attention to detail was commendable. The team looked into aspects that we missed and suggested the multiple options to choose from, in terms of approach to meet our product goals. Very professional and consultative.",
    "date": "Jan 15, 2024",
    "rating": 5
  },
];

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = testimonial.message.length > 150;

  const displayMessage = isExpanded || !shouldTruncate 
    ? testimonial.message 
    : testimonial.message.slice(0, 150) + '...';

  // If there's a LinkedIn URL, make the entire card clickable
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking the "Read more" button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    if (testimonial.linkedin) {
      console.log('=== CARD LINKEDIN CLICK DEBUG ===');
      console.log('LinkedIn URL:', testimonial.linkedin);
      console.log('Testimonial name:', testimonial.name);
      console.log('Event object:', e);
      console.log('=== END CARD CLICK DEBUG ===');
      
      window.open(testimonial.linkedin, '_blank', 'noopener,noreferrer');
    }
  };

  const cardClassName = cn(
    "bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 h-fit transition-all duration-200",
    testimonial.linkedin && "cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:border-blue-300"
  );

  return (
    <div 
      className={cardClassName}
      onClick={handleCardClick}
      title={testimonial.linkedin ? `Click to view ${testimonial.name}'s LinkedIn profile` : undefined}
    >
      {/* Header with avatar and info */}
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full border border-border overflow-hidden bg-muted flex items-center justify-center">
            {testimonial.profile ? (
              <Image
                src={testimonial.profile}
                alt={testimonial.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-sm font-medium text-muted-foreground">
                {getInitials(testimonial.name)}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-foreground truncate flex items-center gap-2">
              {testimonial.name}
              {testimonial.linkedin && (
                <svg
                  className="w-4 h-4 text-blue-600 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              )}
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {testimonial.position}
          </div>
          
          <StarRating rating={testimonial.rating} />
        </div>
      </div>

      {/* Testimonial message */}
      <div className="flex-1">
        <p className="text-sm leading-relaxed text-card-foreground">
          {displayMessage}
        </p>
        {shouldTruncate && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              console.log('=== READ MORE CLICK DEBUG ===');
              console.log('Before click - isExpanded:', isExpanded);
              console.log('shouldTruncate:', shouldTruncate);
              console.log('Message length:', testimonial.message.length);
              console.log('Testimonial name:', testimonial.name);
              setIsExpanded(!isExpanded);
              console.log('After setState - new value should be:', !isExpanded);
              console.log('=== END READ MORE DEBUG ===');
            }}
            className="text-xs text-primary hover:text-primary/80 mt-2 font-medium transition-colors"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Date */}
      <div className="text-xs text-muted-foreground pt-2 border-t border-border">
        {testimonial.date}
      </div>
    </div>
  );
};

const Feedback = () => {
  return (
    <SectionContainer className="relative overflow-hidden">
      {/* Background gradient - FIXED: Added pointer-events-none */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background pointer-events-none" />

      <div className="text-center mb-12 relative z-10">
        <h3 className="mb-4 text-2xl font-medium md:text-4xl max-w-[300px] sm:max-w-none mx-auto">
          User Testimonials
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our users tell us that Incerto&apos;s clean and intuitive interface makes using databases fun again.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto relative z-10">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default Feedback;
