import * as React from "react";
import { cn } from "../../lib";

export interface IconToggleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    React.RefAttributes<HTMLDivElement> {
  active: boolean;
  onChange: (active: boolean) => void;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
}

export const IconToggle = React.forwardRef<HTMLDivElement, IconToggleProps>(
  ({ active, onChange, activeIcon, inactiveIcon, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center justify-center cursor-pointer", className)}
        onClick={() => onChange(!active)}
        {...props}
      >
        {active ? activeIcon : inactiveIcon}
      </div>
    );
  },
);

IconToggle.displayName = "IconToggle";
