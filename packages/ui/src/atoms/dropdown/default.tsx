"use client";

import { ArrowFilledUnderSVG } from "@readup/icons";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./shadcn";

const dropdownVariants = cva(
  "flex text-gray-99 justify-center items-center gap-[2px] px-[3px] py-[8px] w-[80px] h-[30px] rounded-md border border-gray-60",
);

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dropdownVariants> {
  children: React.ReactNode;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(({ children }, ref) => {
  return (
    <div ref={ref} className={dropdownVariants()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-[2px]">
            <button>필터명</button>
            <ArrowFilledUnderSVG />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[80px] w-[80px] text-gray-99 border-gray-60">
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

Dropdown.displayName = "Dropdown";

export { Dropdown, dropdownVariants };
