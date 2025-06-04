import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const CompleteCheckSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0,0,256,256", stroke = "#FFF", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width="48px"
        height="48px"
        fillRule="nonzero"
        aria-label="complete-check icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <g
          fill={fill}
          fillRule="nonzero"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeDasharray=""
          strokeDashoffset="0"
          fontFamily="none"
          fontWeight="none"
          fontSize="none"
          textAnchor="none"
        >
          <g transform="scale(5.33333,5.33333)">
            <path d="M40.6,12.1l-23.6,23.6l-9.6,-9.6l-2.8,2.9l12.4,12.3l26.4,-26.4z"></path>
          </g>
        </g>
      </svg>
    );
  },
);

CompleteCheckSVG.displayName = "CompleteCheckSVG";
export default CompleteCheckSVG;
