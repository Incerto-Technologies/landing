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
    title: "Product",
    links: [
      { label: "Overview", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [{ label: "Privacy Policy", href: "/legal/privacy-policy" }],
  },
];

function FooterSection({ title, links }: FooterSection) {
  return (
    <div>
      <h6 className="text-[15px] font-medium text-foreground">{title}</h6>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.href.startsWith("mailto:") ? (
              <a
                href={link.href}
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground"
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
    <footer className="bg-background">
      <div className="mx-auto py-12 px-6 lg:container lg:px-20 xl:px-20">
        {/* Horizontal Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="mt-12 gap-8 flex justify-between flex-col md:flex-row">
          {/* Logo and Social Icons */}
          <div className="max-md:mb-4 ">
            <Link href="/" className="flex items-center">
              <Image
                src="/incerto.png"
                alt="Incerto Logo"
                className="h-full w-auto block dark:hidden"
                width={128}
                height={32}
              />
              <Image
                src="/incerto-white.png"
                alt="Incerto Logo White"
                className="h-full w-auto hidden dark:block"
                width={128}
                height={32}
              />
            </Link>

            {/* Social Icons */}
            <div className="mt-6 mx-1 flex items-center space-x-4">
              {/* YouTube */}
              <Link
                href="https://www.youtube.com/@Incerto-Technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground size-7"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  id="Youtube--Streamline-Unicons"
                >
                  <desc>Youtube Streamline Icon: https://streamlinehq.com</desc>
                  <path
                    d="M23 9.70998c0.0494 -1.43134 -0.2636 -2.85198 -0.91 -4.13 -0.4386 -0.5244 -1.0473 -0.87829 -1.72 -1 -2.7825 -0.25247 -5.5765 -0.35595 -8.37 -0.31 -2.78336 -0.04804 -5.5673 0.0521 -8.34 0.3 -0.54818 0.09972 -1.05549 0.35685 -1.46 0.74 -0.9 0.83 -1 2.25 -1.1 3.45C0.954908 10.9175 0.954908 13.0824 1.1 15.24c0.02893 0.6754 0.12949 1.3458 0.3 2 0.12057 0.505 0.36452 0.9723 0.71 1.36 0.40726 0.4034 0.92638 0.6752 1.49 0.78 2.15591 0.2661 4.32821 0.3764 6.5 0.33 3.5 0.05 6.57 0 10.2 -0.28 0.5775 -0.0984 1.1112 -0.3705 1.53 -0.78 0.28 -0.2801 0.4891 -0.6229 0.61 -1 0.3576 -1.0974 0.5333 -2.2459 0.52 -3.4 0.04 -0.56 0.04 -3.94 0.04 -4.54002ZM9.74 14.85V8.65998L15.66 11.77c-1.66 0.92 -3.85 1.96 -5.92 3.08Z"
                    fill="currentColor"
                    stroke-width="1"
                  ></path>
                </svg>{" "}
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/company/incerto-technologies/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground size-5"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  id="Linkedin--Streamline-Unicons"
                >
                  <desc>
                    Linkedin Streamline Icon: https://streamlinehq.com
                  </desc>
                  <path
                    d="M21.9606 0.2402H2.0394C1.8155 0.237 1.5931 0.2781 1.385 0.3609 1.177 0.4438 0.9873 0.5668 0.8267 0.7229 0.6662 0.8791 0.538 1.0653 0.4495 1.271c-0.0886 0.2057 -0.1357 0.4269 -0.1388 0.6508v20.1564c0.0031 0.2239 0.0502 0.4451 0.1388 0.6508s0.2167 0.3919 0.3772 0.5481c0.1606 0.1562 0.3503 0.2792 0.5583 0.362 0.2081 0.0829 0.4305 0.1239 0.6544 0.1207h19.9212c0.2239 0.0032 0.4463 -0.0378 0.6543 -0.1207 0.2082 -0.0828 0.3978 -0.2058 0.5584 -0.362 0.1605 -0.1562 0.2887 -0.3425 0.3772 -0.5481 0.0886 -0.2057 0.1357 -0.4269 0.1388 -0.6508V1.9218c-0.0031 -0.2239 -0.0502 -0.445 -0.1388 -0.6508 -0.0885 -0.2057 -0.2167 -0.3919 -0.3772 -0.5481 -0.1606 -0.1561 -0.3502 -0.2792 -0.5584 -0.362 -0.208 -0.0828 -0.4304 -0.1239 -0.6543 -0.1207ZM7.4019 19.9261h-3.528V9.3423h3.528v10.5838ZM5.6379 7.8605c-0.4865 0 -0.9531 -0.1932 -1.2972 -0.5373 -0.344 -0.344 -0.5373 -0.8106 -0.5373 -1.2972 0 -0.4865 0.1933 -0.9532 0.5373 -1.2972 0.3441 -0.3441 0.8107 -0.5373 1.2972 -0.5373 0.2584 -0.0293 0.52 -0.0037 0.7678 0.0751 0.2478 0.0788 0.4761 0.2091 0.67 0.3823 0.194 0.1732 0.3491 0.3854 0.4554 0.6227 0.1062 0.2373 0.1612 0.4944 0.1612 0.7544 0 0.26 -0.055 0.5171 -0.1612 0.7544 -0.1063 0.2373 -0.2614 0.4495 -0.4554 0.6227 -0.1939 0.1732 -0.4222 0.3035 -0.67 0.3823 -0.2478 0.0789 -0.5094 0.1045 -0.7678 0.0752ZM20.126 19.9261h-3.5279v-5.68c0 -1.4229 -0.5057 -2.3519 -1.7875 -2.3519 -0.3967 0.0029 -0.783 0.1273 -1.1068 0.3565s-0.5696 0.5521 -0.7042 0.9253c-0.0921 0.2764 -0.132 0.5675 -0.1176 0.8584v5.88H9.354V9.3305h3.528v1.4935c0.3204 -0.5561 0.7866 -1.0143 1.3481 -1.3251 0.5617 -0.3108 1.1974 -0.4625 1.8388 -0.4389 2.352 0 4.0571 1.517 4.0571 4.7745v6.0916Z"
                    fill="currentColor"
                    stroke-width="1"
                  ></path>
                </svg>
              </Link>

              {/* Email */}
              <Link
                href="mailto:shiva@incerto.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground size-7"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  id="Mail--Streamline-Tabler-Filled"
                >
                  <desc>Mail Streamline Icon: https://streamlinehq.com</desc>
                  <path
                    d="M22 7.535V17a3 3 0 0 1 -2.824 2.995L19 20H5a3 3 0 0 1 -2.995 -2.824L2 17V7.535l9.445 6.297 0.116 0.066a1 1 0 0 0 0.878 0l0.116 -0.066L22 7.535z"
                    stroke-width="1"
                  ></path>
                  <path
                    d="M19 4c1.08 0 2.027 0.57 2.555 1.427L12 11.797l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42L5 4h14z"
                    stroke-width="1"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className="gap-8 flex flex-col md:flex-row">
            {FOOTER_SECTIONS.map((section) => (
              <FooterSection key={section.title} {...section} />
            ))}
          </div>
        </div>

        {/* Bottom Border and Copyright */}
        <div className="mt-12 border-t border-border pt-8 flex justify-between items-center">
          <p className="text-sm font-medium text-muted-foreground">
            © {currentYear} Copyright Incerto Technologies Pvt Ltd. All rights
            reserved.
          </p>
          {/* <ModeToggle /> */}
        </div>
      </div>
    </footer>
  );
}
