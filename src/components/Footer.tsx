import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-10 bg-background px-[10%] py-10 text-foreground max-lg:px-4">
      <div className="flex h-full w-full justify-between items-center flex-col md:flex-row gap-2 md:gap-0">
        <div className="space-y-2">
          <img
            src="/assets/logo/incerto.png"
            alt="Incerto Logo"
            className="max-w-[120px]"
          />
          <p className="text-sm text-muted-foreground">
            Incerto Technologies Pvt Ltd
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            to="mailto:support@incerto.com"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
            support@incerto.com
          </Link>
          <Link
            to="tel:+918892294565"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            +91 88922 94565
          </Link>
        </div>
      </div>
    </footer>
  );
}
