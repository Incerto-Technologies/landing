import { ContactBtn } from "@/components/ui/contact-btn";
import SectionContainer from "../layouts/section-container";

const CTA = () => {
  return (
    <SectionContainer id="cta" className="text-center">
      <div className="mx-auto max-w-4xl">
        <h3 className="mb-8 text-2xl font-medium md:text-4xl max-w-[300px] sm:max-w-none mx-auto  ">
          Try Incerto For Free!
        </h3>

        <ContactBtn href="/download">Download Now</ContactBtn>
      </div>
    </SectionContainer>
  );
};

export default CTA;
