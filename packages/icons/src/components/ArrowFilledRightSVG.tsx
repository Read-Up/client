import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const ArrowFilledRightSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="arrow-filled-right icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          d="M14.9333 12.8C15.4667 12.4 15.4667 11.6 14.9333 11.2L9.6 7.2C8.94076 6.70557 8 7.17595 8 8L8 16C8 16.824 8.94076 17.2944 9.6 16.8L14.9333 12.8Z"
          fill={fill}
        />
      </svg>
    );
  },
);

ArrowFilledRightSVG.displayName = "ArrowFilledRightSVG";
export default ArrowFilledRightSVG;
