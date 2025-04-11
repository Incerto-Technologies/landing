import React from "react";
import SectionContainer from "../layouts/section-container";
import TabsWithHighlights from "../tab-with-highlights";


const Features: React.FC = () => (
  <SectionContainer className="text-center max-md:px-0" id="features">
    <h3 className="mb-8 text-2xl  font-medium md:text-4xl max-w-[300px] sm:max-w-none mx-auto  ">
      What Incerto can do?
    </h3>
    <TabsWithHighlights />
  </SectionContainer>
);

export default Features;
