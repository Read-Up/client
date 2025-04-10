"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib";

const dividerVariants = cva("", {
  variants: {
    direction: {
      horizontal: "w-full h-[1px]",
      vertical: "h-full w-[1px]",
    },
    variantColor: {
      default: "bg-gray-40",
      gray: "bg-gray-60",
      light: "bg-gray-90",
      dark: "bg-gray-20",
      primary: "bg-primary",
      error: "bg-error",
    },
  },
  defaultVariants: {
    direction: "horizontal",
    variantColor: "default",
  },
});

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement>, VariantProps<typeof dividerVariants> {}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ direction, variantColor, className, ...props }, ref) => {
    return (
      <hr ref={ref} className={cn(dividerVariants({ direction, variantColor }), "border-none", className)} {...props} />
    );
  },
);

Divider.displayName = "Divider";

export { Divider, dividerVariants };
