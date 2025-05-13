import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const PencilSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", stroke = "#FFF", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="pencil icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <g clipPath="url(#clip0_1221_15663)">
          <path
            d="M19.9393 6.41988L17.5798 4.06033C17.3845 3.86507 17.0679 3.86507 16.8727 4.06033L6.47186 14.4612C6.41954 14.5135 6.37998 14.5765 6.35516 14.6455L6.33513 14.7166L5.74472 17.6659C5.67908 17.9941 5.94666 18.2861 6.26884 18.2632L6.33306 18.2543L9.28302 17.6645C9.37981 17.6452 9.46872 17.5976 9.53852 17.5278L19.9393 7.12699C20.1346 6.93173 20.1346 6.61515 19.9393 6.41988Z"
            stroke={stroke}
          />
        </g>
        <defs>
          <clipPath id="clip0_1221_15663">
            <rect
              width={ICON_SIZE_MAP[size]}
              height={ICON_SIZE_MAP[size]}
              fill={fill}
              transform="matrix(-1 0 0 1 24 0)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  },
);

PencilSVG.displayName = "PencilSVG";
export default PencilSVG;
