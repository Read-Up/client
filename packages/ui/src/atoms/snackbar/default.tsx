import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib";

const snackbarVariants = cva(
  "flex justify-center items-center gap-[10px] px-[16px] py-[4px] rounded-[999px] bg-overlay-16dp",
  {
    variants: {
      variant: {
        notice: "text-secondary",
        warning: "text-error",
      },
    },
    defaultVariants: {
      variant: "notice",
    },
  },
);

interface SnackBarProps {
  variant?: "notice" | "warning";
  children: React.ReactNode;
}

const SnackBar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & SnackBarProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(snackbarVariants({ variant }), className)} {...props}>
        {children}
      </div>
    );
  },
);

SnackBar.displayName = "SnackBar";

export { SnackBar, snackbarVariants };
