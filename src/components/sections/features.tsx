import React from "react";
import SectionContainer from "../layouts/section-container";
import TabsWithHighlights from "../tab-with-highlights";

interface Props {}

const Features: React.FC<Props> = () => (
  <SectionContainer className="text-center" id="features">
    <h3 className="mb-8 text-2xl font-medium md:text-4xl max-w-[300px] sm:max-w-none mx-auto  ">
      What Incerto can do for you?
      <br className="hidden sm:block" />
      <span className="text-secondary-foreground">
        without leaving the dashboard
      </span>
    </h3>
    <TabsWithHighlights />
  </SectionContainer>
);

export default Features;
