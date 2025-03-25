import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const ArrowFilledUpSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="arrow-filled-up icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          d="M11.2 9.06667C11.6 8.53333 12.4 8.53333 12.8 9.06667L16.8 14.4C17.2944 15.0592 16.824 16 16 16H8C7.17595 16 6.70557 15.0592 7.2 14.4L11.2 9.06667Z"
          fill={fill}
        />
      </svg>
    );
  },
);

ArrowFilledUpSVG.displayName = "ArrowFilledUpSVG";
export default ArrowFilledUpSVG;
