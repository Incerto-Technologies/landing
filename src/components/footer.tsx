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
      { label: "Deep Research", href: "/features/deep-research" },
      { label: "Query Optimization", href: "/features/query-optimization" },
      { label: "Sql Editor", href: "/features/sql-editor" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "FAQs", href: "/faqs" },
      { label: "Slack", href: "/slack" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Blogs", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Contact",
    links: [{ label: "support@incerto.in", href: "mailto:support@incerto.in" }],
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
          {/* Logo */}
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
          </div>

          {/* Navigation Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <FooterSection key={section.title} {...section} />
          ))}
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
