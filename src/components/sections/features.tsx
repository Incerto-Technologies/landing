import React from "react";
import SectionContainer from "../layouts/section-container";
import TabsWithHighlights, {
  MobileTabsWithHighlights,
} from "../tab-with-highlights";

const Features: React.FC = () => (
  <SectionContainer className="text-center max-md:px-0" id="features">
    <h3 className="mb-8 text-2xl  font-medium md:text-4xl max-w-[300px] sm:max-w-none mx-auto  ">
      What Incerto can do?
    </h3>
    <div className="hidden md:block">
      <TabsWithHighlights />
    </div>
    <div className="md:hidden block">
      <MobileTabsWithHighlights />
    </div>
  </SectionContainer>
);

export default Features;
