import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = "div", children, ...props }, ref) => {
    const Comp = Component as any;
    return (
      <Comp
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-screen-xl px-4 md:px-6 lg:px-8",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Container.displayName = "Container";

export { Container };
