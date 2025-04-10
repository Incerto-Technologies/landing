import Link from "next/link";
import { ContactBtn } from "@/components/ui/contact-btn";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#DFDFDF] bg-[#FCFCFC]/90 backdrop-blur-[4px]">
      <div className="mx-auto flex h-16 items-center justify-between lg:container lg:px-16 xl:px-20">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/incerto.png"
            alt="Incerto Logo"
            className="h-full w-auto"
            width={128}
            height={32}
          />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-600"
            >
              {item.label}
            </Link>
          ))}

          {/* CTA Button */}
          <ContactBtn
             className="text-xs"
          />
        </div>
      </div>
    </nav>
  );
}
