import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const ScanSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="scan icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 3.36364C2 2.61052 2.61052 2 3.36364 2H7V2.90909H3.36364C3.1126 2.90909 2.90909 3.1126 2.90909 3.36364V7H2V3.36364Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 20.6364C2 21.3895 2.61052 22 3.36364 22H7V21.0909H3.36364C3.1126 21.0909 2.90909 20.8874 2.90909 20.6364V17H2V20.6364Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 3.36364C22 2.61052 21.3895 2 20.6364 2H17V2.90909H20.6364C20.8874 2.90909 21.0909 3.1126 21.0909 3.36364V7H22V3.36364Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 20.6364C22 21.3895 21.3895 22 20.6364 22H17V21.0909H20.6364C20.8874 21.0909 21.0909 20.8874 21.0909 20.6364V17H22V20.6364Z"
          fill={fill}
        />
        <rect x="6" y="8" width={ICON_SIZE_MAP[size]} height={ICON_SIZE_MAP[size]} fill={fill} />
        <rect x="4" y="12" width={ICON_SIZE_MAP[size]} height={ICON_SIZE_MAP[size]} fill={fill} />
        <rect x="6" y="16" width={ICON_SIZE_MAP[size]} height={ICON_SIZE_MAP[size]} fill={fill} />
      </svg>
    );
  },
);

ScanSVG.displayName = "ScanSVG";
export default ScanSVG;
