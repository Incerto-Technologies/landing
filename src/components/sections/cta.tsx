import { ContactBtn } from "@/components/ui/contact-btn";
import SectionContainer from "../layouts/section-container";

const CTA = () => {
  return (
    <SectionContainer >
      <div className="mx-auto max-w-4xl text-center">
      <h3 className="mb-8 text-2xl font-medium md:text-4xl max-w-[300px] sm:max-w-none mx-auto  ">
        <span className="text-secondary-foreground">
          Database Problems.
        </span>
        Try Incerto For Free!
      </h3>
        
        <ContactBtn />
      </div>
    </SectionContainer>
  );
}

export default CTA;
