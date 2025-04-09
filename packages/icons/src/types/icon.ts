import type { HTMLAttributes } from "react";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export const ICON_SIZE_MAP: Record<IconSize, string> = {
  xs: "12px",
  sm: "16px",
  md: "20px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
};

export interface IconProps extends HTMLAttributes<SVGSVGElement> {
  className?: string;
  size?: IconSize;
  viewBox?: string;
  fill?: string;
  stroke?: string;
}
