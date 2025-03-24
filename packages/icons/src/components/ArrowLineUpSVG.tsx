import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const ArrowLineUpSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="arrow-line-up icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.33559 15.0771C6.15491 15.2709 6.17844 15.5778 6.38655 15.7418C6.57166 15.8877 6.83772 15.8673 6.99843 15.6949L11.2685 11.1138C11.6639 10.6895 12.3361 10.6895 12.7315 11.1138L17.0016 15.6949C17.1623 15.8673 17.4283 15.8877 17.6135 15.7418C17.8216 15.5778 17.8451 15.2709 17.6644 15.0771L12.7315 9.78481C12.3361 9.36058 11.6639 9.36058 11.2685 9.7848L6.33559 15.0771Z"
          fill={fill}
        />
      </svg>
    );
  },
);

ArrowLineUpSVG.displayName = "ArrowLineUpSVG";
export default ArrowLineUpSVG;
