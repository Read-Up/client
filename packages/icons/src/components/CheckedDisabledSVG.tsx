import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const CheckedDisabledSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 20 20", stroke = "#FFF", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="checked-disabled icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <rect
          x="0.5"
          y="0.5"
          width={ICON_SIZE_MAP[size]}
          height={ICON_SIZE_MAP[size]}
          rx="9.5"
          fill={fill}
          fillOpacity="0.3"
          stroke={stroke}
        />
      </svg>
    );
  },
);

CheckedDisabledSVG.displayName = "CheckedDisabledSVG";
export default CheckedDisabledSVG;
