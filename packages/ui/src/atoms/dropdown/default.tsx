import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./shadcn";
import { ArrowFilledUnderSVG } from "@readup/icons";

const dropdownVariants = cva(
  "flex text-gray-99 justify-center items-center gap-[2px] px-[3px] py-[8px] w-[100px] h-[30px] rounded-md border border-gray-60",
);

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dropdownVariants> {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  triggerLabel?: React.ReactNode;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className, backgroundColor, triggerLabel }, ref) => {
    return (
      <div ref={ref} className={dropdownVariants() + " " + className}>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full" asChild>
            <div className="flex items-center flex-row justify-between px-1">
              <button>{triggerLabel ?? "필터명"}</button>
              <ArrowFilledUnderSVG />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={
              (backgroundColor ? `bg-${backgroundColor} ` : "") +
              "min-w-[100px] w-[80px] text-gray-99 border-gray-60" +
              " " +
              className
            }
          >
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";

export { Dropdown, dropdownVariants };
