"use client";

import { CheckedSVG } from "@readup/icons";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib";

const checkboxVariants = cva("flex items-center justify-center rounded-full cursor-pointer transition-colors", {
  variants: {
    size: {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
      "2xl": "w-12 h-12",
      "3xl": "w-16 h-16",
    },
    checked: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      checked: true,
      className: "bg-primary  border-none",
    },
    {
      checked: false,
      className: "bg-transparent border border-white",
    },
  ],
  defaultVariants: {
    size: "md",
    checked: false,
  },
});

export interface CheckboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof checkboxVariants> {
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ checked = false, size, color = "#4A90E2", className, onChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(checkboxVariants({ size, checked }), className)}
        onClick={() => onChange?.(!checked)}
        {...props}
      >
        {checked && <CheckedSVG size={size} className="overflow-visible cursor-pointer" fill={color} />}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
