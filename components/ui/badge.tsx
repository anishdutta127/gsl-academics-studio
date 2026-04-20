import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border border-border bg-white text-azure-blue",
        turquoise: "bg-turquoise-sea text-white",
        light: "bg-light-sky text-azure-blue",
        amber: "bg-orange-peel text-azure-blue",
        outline: "border border-azure-blue/20 text-azure-blue"
      }
    },
    defaultVariants: { variant: "default" }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
