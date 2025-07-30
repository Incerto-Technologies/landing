import React from "react";
import SectionContainer from "../layouts/section-container";
import StickyScrollWithHighlights, {
  MobileTabsWithHighlights,
} from "../tab-with-highlights";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Features: React.FC = () => (
  <SectionContainer className="text-center max-md:px-0" id="features">
    <h3 className="mb-8 text-2xl  font-medium md:text-4xl max-w-[300px] sm:max-w-none mx-auto  ">
      What Incerto can do?
    </h3>
    <div className="hidden md:block">
      <StickyScrollWithHighlights />
    </div>
    <div className="md:hidden block">
      <MobileTabsWithHighlights />
    </div>

    {/* Features Page Button */}
    <div className="mt-12">
      <Button size="lg" asChild>
        <Link href="/features">
          View All Features
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Button>
    </div>
  </SectionContainer>
);

export default Features;
