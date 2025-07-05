import { cn } from "@/lib/utils";
import Link from "next/link";

interface MobileHeaderNavProps {
  links: {
    label: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
  }[];
  children?: React.ReactNode;
  setShowMobileHeaderNav: (value: boolean) => void;
}

function MobileHeaderNav({
  links,
  children,
  setShowMobileHeaderNav,
}: MobileHeaderNavProps) {
  return (
    <div
      onClick={() => {
        setShowMobileHeaderNav(false);
      }}
      className={cn(
        "fixed inset-0 top-16 z-500 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row auto-rows-max text-sm ">
          {links.map((link, index) => (
            <Link
              onClick={() => {
                setShowMobileHeaderNav(false);
              }}
              key={index}
              href={link?.disabled ? "#" : link.href}
              target={link?.external ? "_blank" : "_self"}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                link?.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-0.5 my-4 w-full bg-gradient-to-r from-transparent via-[#DFDFDF] to-transparent" />
          {children}
        </nav>
      </div>
    </div>
  );
}

export default MobileHeaderNav;
