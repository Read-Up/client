import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const ArrowFilledLeftSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="arrow-filled-left icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          d="M9.06667 12.8C8.53333 12.4 8.53333 11.6 9.06667 11.2L14.4 7.2C15.0592 6.70557 16 7.17595 16 8L16 16C16 16.824 15.0592 17.2944 14.4 16.8L9.06667 12.8Z"
          fill={fill}
        />
      </svg>
    );
  },
);

ArrowFilledLeftSVG.displayName = "ArrowFilledLeftSVG";
export default ArrowFilledLeftSVG;
