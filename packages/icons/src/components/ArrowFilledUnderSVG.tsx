import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const ArrowFilledUnderSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="arrow-filled-under icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          d="M11.2 14.9333C11.6 15.4667 12.4 15.4667 12.8 14.9333L16.8 9.6C17.2944 8.94076 16.824 8 16 8H8C7.17595 8 6.70557 8.94076 7.2 9.6L11.2 14.9333Z"
          fill={fill}
        />
      </svg>
    );
  },
);

ArrowFilledUnderSVG.displayName = "ArrowFilledUnderSVG";
export default ArrowFilledUnderSVG;
