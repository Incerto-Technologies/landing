import { cn } from "@/lib/utils";
import { Container } from "./container";
import { forwardRef } from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, containerClassName, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("py-16 md:py-24", className)} {...props}>
        <Container className={containerClassName}>{children}</Container>
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
