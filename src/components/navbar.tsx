import Link from "next/link";
import { ContactBtn } from "@/components/ui/contact";

const NAV_ITEMS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#DFDFDF] bg-[#FCFCFC]/90 backdrop-blur-[4px]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/incerto.png" alt="Incerto Logo" className="h-8" />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-medium text-gray-900 transition-colors hover:text-gray-600"
            >
              {item.label}
            </Link>
          ))}

          {/* CTA Button */}
          <ContactBtn
            className={
              "rounded-md bg-[#72E3AD] px-3 py-2 text-[11px] font-medium text-gray-900 shadow-sm ring-1 ring-[#16B674]/75 transition-colors hover:bg-[#65D69F] mt-0"
            }
          />
        </div>
      </div>
    </nav>
  );
}
