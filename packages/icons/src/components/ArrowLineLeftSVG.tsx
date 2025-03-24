import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const ArrowLineLeftSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="arrow-line-left icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.0771 17.6644C14.2709 17.8451 14.5778 17.8216 14.7418 17.6135C14.8877 17.4283 14.8673 17.1623 14.6949 17.0016L10.1138 12.7315C9.68953 12.3361 9.68953 11.6639 10.1138 11.2685L14.6949 6.99843C14.8673 6.83772 14.8877 6.57166 14.7418 6.38655C14.5778 6.17844 14.2709 6.15491 14.0771 6.33559L8.78481 11.2685C8.36058 11.6639 8.36058 12.3361 8.7848 12.7315L14.0771 17.6644Z"
          fill={fill}
        />
      </svg>
    );
  },
);

ArrowLineLeftSVG.displayName = "ArrowLineLeftSVG";
export default ArrowLineLeftSVG;
