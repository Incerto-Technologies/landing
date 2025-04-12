import Image from "next/image";
import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Features",
    links: [
      { label: "AI Remediation", href: "/?tab=remediation#features" },
      { label: "Query Optimizer", href: "/?tab=query-optimizer#features" },
      { label: "Deep Research", href: "/?tab=deep-research#features" },
      { label: "SQL Editor", href: "/?tab=sql-editor#features" },
      { label: "Misc.", href: "/?tab=misc#features" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { label: "Reach out", href: "/contact" },
      { label: "support@incerto.in", href: "mailto:support@incerto.in" },
    ],
  },
  {
    title: "Pricing",
    links: [
      { label: "View Plans", href: "/pricing" },
    ],
  },
];

function FooterSection({ title, links }: FooterSection) {
  return (
    <div>
      <h6 className="text-[15px] font-medium text-gray-900">{title}</h6>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.href.startsWith("mailto:") ? (
              <a
                href={link.href}
                className="text-[13px] font-medium text-gray-500 hover:text-gray-900"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-[13px] font-medium text-gray-500 hover:text-gray-900"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FDFDFD]">
      <div className="mx-auto py-12 px-6 lg:container lg:px-16 xl:px-20">
        {/* Horizontal Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#DFDFDF] to-transparent" />

        <div className="mt-12 grid gap-8 grid-cols-2 md:grid-cols-5 lg:grid-cols-6">
          {/* Logo and Social Icons */}
          <div className="col-span-2 max-md:mb-4 md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/incerto.png"
                alt="Incerto Logo"
                className="h-full w-auto"
                width={128}
                height={32}
              />
            </Link>
            
            {/* Social Icons */}
            <div className="mt-6 mx-1 flex space-x-4">
              {/* YouTube */}
              <Link
                href="https://www.youtube.com/channel/UCGMqTLUaCiMsP_N3gSJ4liQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </Link>
              
              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/company/incerto-technologies/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
              
              {/* Email */}
              <Link 
                href="mailto:shiva@incerto.in" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </Link>
            </div>
          </div>

          {/* Empty column for spacing on medium screens */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Navigation Sections - Moved to right */}
          <div className="col-span-2 md:col-span-3 lg:col-span-3 md:ml-auto grid grid-cols-2 md:grid-cols-3 gap-8">
            {FOOTER_SECTIONS.map((section) => (
              <FooterSection key={section.title} {...section} />
            ))}
          </div>
        </div>

        {/* Bottom Border and Copyright */}
        <div className="mt-12 border-t border-[#DFDFDF] pt-8 flex justify-between items-center">
          <p className="text-sm font-medium text-gray-500">
            © {currentYear} Copyright Incerto Technologies Pvt Ltd. All rights
            reserved.
          </p>
          {/* <ModeToggle /> */}
        </div>
      </div>
    </footer>
  );
}
