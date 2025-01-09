import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/assets/logo/incerto.png"
              alt="Incerto"
              className="w-[130px] object-contain"
            />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-accent/50"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
              to="/clickhouse-remediation"
            >
              Our ClickHouse Remediation
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={cn(
          "lg:hidden",
          isOpen
            ? "block border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            : "hidden"
        )}
      >
        <nav className="container py-4">
          <Link
            className="block w-full text-center py-2 px-4 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
            to="/clickhouse-remediation"
            onClick={() => setIsOpen(false)}
          >
            Our ClickHouse Remediation
          </Link>
        </nav>
      </div>
    </header>
  );
};
