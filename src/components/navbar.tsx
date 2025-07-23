"use client";

import Link from "next/link";
import { ContactBtn } from "@/components/ui/contact-btn";
import Image from "next/image";
import MobileNavbar from "./mobile-navbar";
import { useState } from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/theme-toggle";
import { useTheme } from "next-themes";
import React from "react";

const NAV_ITEMS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  // { label: "Resources", href: "/resources" },
  // { label: "Company", href: "/company" },
  // { label: "Download", href: "/download" },
  { label: "Contact Us", href: "/contact" },
];

const RIGHT_NAV_ITEMS = [
  { label: "What is Real Co-Pilot?", href: "/real-co-pilot-for-databases" },
];

export function Navbar() {
  const [showMobileHeaderNav, setShowMobileHeaderNav] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, systemTheme } = useTheme();
  
  // Ensure component is mounted before using theme
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // Use systemTheme as fallback when resolvedTheme is not available yet
  // Default to dark theme as per the layout configuration
  const currentTheme = mounted ? (resolvedTheme || systemTheme || 'dark') : 'dark';
  const logoSrc = currentTheme === "dark" ? "/incerto-white.png" : "/incerto.png";
  
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-[4px]">
      <div className="mx-auto flex h-16 items-center justify-between lg:container px-6 lg:px-16 xl:px-20">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            key={logoSrc} // Force re-render when logo source changes
            src={logoSrc}
            alt="Incerto Logo"
            className="h-full w-auto"
            width={128}
            height={32}
            priority
          />
        </Link>

        {/* Navigation - Centered */}
        <nav className="hidden md:flex items-center gap-10 flex-1 justify-center">
          {NAV_ITEMS.filter(item => item.label !== "Blog").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button and Theme Toggle - Right Aligned */}
        <div className="hidden md:flex items-center gap-4">
          {RIGHT_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
          <ModeToggle />
          <ContactBtn className="text-xs" href="/download">
            All Downloads
          </ContactBtn>
        </div>

        {/* Mobile Menu Button */}
        <Button
          aria-label="Menu"
          // onClick={() => setShowMobileHeaderNav((prev) => !prev)}
          onClick={() => setShowMobileHeaderNav(!showMobileHeaderNav)}
          variant="secondary"
          className="md:hidden"
          size="icon"
        >
          <span className="sr-only">
            {showMobileHeaderNav ? "Close menu" : "Open menu"}
          </span>
          {showMobileHeaderNav ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </Button>
      </div>

      {showMobileHeaderNav && (
        <MobileNavbar
          links={[...NAV_ITEMS, ...RIGHT_NAV_ITEMS]}
          setShowMobileHeaderNav={setShowMobileHeaderNav}
        >
          <div className="flex items-center gap-4">
            <ModeToggle />
            <ContactBtn className="text-xs" href="/download">
              All Downloads
            </ContactBtn>
          </div>
        </MobileNavbar>
      )}
    </header>
  );
}
