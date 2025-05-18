"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import * as React from "react";

import { CheckedSVG } from "@readup/icons";
import { cn } from "../../lib";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn("border-1 border-solid border-primary_variant w-5 h-5 rounded-full relative", className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center absolute inset-0 text-current"
      >
        <CheckedSVG fill="#4A90E2" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
