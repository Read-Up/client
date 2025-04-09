import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const UncheckedSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 20 20", stroke = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="unchecked icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <rect x="0.5" y="0.5" width={ICON_SIZE_MAP[size]} height={ICON_SIZE_MAP[size]} rx="9.5" stroke={stroke} />
      </svg>
    );
  },
);

UncheckedSVG.displayName = "UncheckedSVG";
export default UncheckedSVG;
