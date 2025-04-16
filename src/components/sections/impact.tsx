import SectionContainer from "../layouts/section-container";
import { ImpactBento } from "../ui/impact-bento";

const Impact = () => {
  return (
    <SectionContainer className="text-center" id="impact">
      <h3 className="mb-8 text-2xl font-medium md:text-4xl max-w-[300px] sm:max-w-none mx-auto  ">
        Why teams love Incerto?
      </h3>
      <ImpactBento />
    </SectionContainer>
  );
};

export default Impact;
