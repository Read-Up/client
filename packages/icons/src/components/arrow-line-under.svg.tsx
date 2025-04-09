import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const ArrowLineUnderSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="arrow-line-under icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.33559 9.92289C6.15491 9.72905 6.17844 9.4222 6.38655 9.25817C6.57166 9.11226 6.83772 9.13265 6.99843 9.30507L11.2685 13.8862C11.6639 14.3105 12.3361 14.3105 12.7315 13.8862L17.0016 9.30507C17.1623 9.13265 17.4283 9.11226 17.6135 9.25817C17.8216 9.4222 17.8451 9.72905 17.6644 9.92289L12.7315 15.2152C12.3361 15.6394 11.6639 15.6394 11.2685 15.2152L6.33559 9.92289Z"
          fill={fill}
        />
      </svg>
    );
  },
);

ArrowLineUnderSVG.displayName = "ArrowLineUnderSVG";
export default ArrowLineUnderSVG;
