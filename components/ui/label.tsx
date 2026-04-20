import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * Minimal label without @radix-ui/react-label. Native <label htmlFor> already
 * forwards clicks to the referenced input; Radix adds some accessibility
 * niceties we can adopt later if the need appears.
 */

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };
