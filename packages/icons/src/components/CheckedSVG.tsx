import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const CheckedSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 20 20", stroke = "#FFF", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="checked icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <rect width={ICON_SIZE_MAP[size]} height={ICON_SIZE_MAP[size]} rx="10" fill={fill} />
        <path d="M5 10.2353L8.2 14L15 6" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  },
);

CheckedSVG.displayName = "CheckedSVG";
export default CheckedSVG;
