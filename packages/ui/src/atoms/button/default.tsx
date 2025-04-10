import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[6px] text-lg font-semibold cursor-pointer ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none transition duration-150 ease-in-out active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] leading-normal",
  {
    variants: {
      variant: {
        filled: "bg-primary text-white hover:bg-primary/90 active:bg-primary_variant  disabled:bg-gray-80",
        outline:
          "border text-foreground bg-a_gray-50 font-semibold hover:bg-a_gray-100 hover:text-accent-foreground border-primary hover:border-primary/90 text-primary hover:text-primary/90 active:bg-[#D9D9D9] active:text-white activate:text-opacity-20 disabled:border-gray-80 disabled:text-gray-80",
        text_only: "text-primary hover:text-primary/90 disabled:text-gray-90 active:text-primary_variant",
      },
      size: {
        default: "px-[20px] py-[12px] h-[45px]", // figma padding 참조
        sm: "h-6 px-3 text-sm",
        supporting: "h-6 px-3 text-sm rounded-full",
        full: "h-[45px] w-full",
        icon: "h-[45px] w-[45px]",
        icon_small: "h-5 w-5",
        grid: "h-[26px] px-[6px] text-xs",
      },
      textOption: {
        default: "",
        connected: "underline",
      },
      secondary: {
        false: null,
        true: "",
      },
    },
    compoundVariants: [
      {
        variant: "filled",
        secondary: true,
        class: "bg-on-background text-gray-30 hover:bg-on-background/90 active:bg-on-background/80",
      },
      {
        variant: "outline",
        secondary: true,
        class: "border border-gray-30 text-gray-20 hover:bg-gray-70 hover:text-on-background",
      },
      {
        variant: "text_only",
        secondary: true,
        class: "text-gray-30 hover:text-gray-40",
      },
    ],
    defaultVariants: {
      variant: "filled",
      size: "default",
      textOption: "default",
      secondary: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  textOption?: "default" | "connected";
  color?: string;
  backgroundColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, textOption, secondary, color, backgroundColor, style, ...props }, ref) => {
    const customStyle = {
      color: color,
      backgroundColor: backgroundColor,
      ...style,
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, textOption, secondary, className }))}
        ref={ref}
        style={customStyle}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
