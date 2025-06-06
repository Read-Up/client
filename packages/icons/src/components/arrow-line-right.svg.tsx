import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const ArrowLineRightSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="arrow-line-right icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.92289 17.6644C8.72905 17.8451 8.4222 17.8216 8.25817 17.6135C8.11226 17.4283 8.13265 17.1623 8.30507 17.0016L12.8862 12.7315C13.3105 12.3361 13.3105 11.6639 12.8862 11.2685L8.30507 6.99843C8.13265 6.83772 8.11226 6.57166 8.25817 6.38655C8.4222 6.17844 8.72905 6.15491 8.92289 6.33559L14.2152 11.2685C14.6394 11.6639 14.6394 12.3361 14.2152 12.7315L8.92289 17.6644Z"
          fill={fill}
        />
      </svg>
    );
  },
);

ArrowLineRightSVG.displayName = "ArrowLineRightSVG";
export default ArrowLineRightSVG;
