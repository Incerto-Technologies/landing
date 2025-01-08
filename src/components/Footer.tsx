import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 bg-background px-[10%] py-10 text-foreground max-lg:px-4">
      <div className="flex h-full w-full flex-wrap gap-8">
        <div className="flex h-full w-[250px] flex-col gap-3 max-md:w-full">
          <img
            src="/assets/logo/incerto.png"
            alt="Incerto Logo"
            className="max-w-[120px]"
          />
          <div className="flex flex-col gap-2 text-muted-foreground">
            <div>Incerto Technologies Pvt Ltd</div>
            <a
              href="mailto:support@incerto.com"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              support@incerto.com
            </a>
            <a
              href="tel:+918892294565"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              +91 88922 94565
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
