import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[6px] text-lg font-semibold cursor-pointer ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 transition duration-150 ease-in-out active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] leading-normal",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        pressed: "bg-primary_variant hover:bg-primary_variant/90 text-white",
        secondary: "bg-white text-gray-30 hover:bg-gray-80",
        disabled: "bg-gray-80 text-white hover:bg-gray-80/80",
        outline:
          "border text-foreground bg-a_gray-50 font-semibold hover:bg-a_gray-100 hover:text-accent-foreground border-primary hover:border-primary/90 text-primary hover:text-primary/90",
        // period: "text-background bg-a_gray-250 hover:bg-black",
        // ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        // link: "text-foreground underline hover:underline",
        // modal: "border border-[#c8cad2] bg-background hover:bg-accent hover:text-accent-foreground",
        disabled_outline: "border border-gray-80 text-gray-80 hover:border-gray-80/80 hover:text-gray-80/80",
        secondary_outline: "border border-gray-30 text-gray-20 hover:border-gray-30/80 hover:text-gray-20/80",
        text: "text-primary hover:text-primary/90",
        text_disabled: "text-gray-90 hover:text-gray-90/80",
        text_secondary: "text-gray-30 hover:text-gray-30/80",
        text_connected: "text-gray-90 hover:text-gray-90/80 underline",
      },
      size: {
        default: "px-[20px] py-[12px] h-[45px]", // figma padding 참조
        sm: "h-6 px-3 text-sm",
        supporting: "h-6 px-3 text-sm rounded-full",
        lg: "h-[45px] w-[343px]",
        full: "h-[45px] w-full",
        icon: "h-[45px] w-[45px]",
        icon_small: "h-5 w-5",
        grid: "h-[26px] px-[6px] text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});

Button.displayName = "Button";

export { Button, buttonVariants };
