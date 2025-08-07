import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const HeartFilledSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 30 30", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="heart-filled icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          d="M9 4C12.36 4 14.4 6.85185 15 8.27778C16.44 4.36667 19.8 4 21 4C25.8 4 27 7.83129 27 10.1111C27 14.3889 23 19.8889 21 21.7222C19.08 23.6778 16.2 25.3889 15 26C13.8 25.3889 11 23.5556 9 21.7222C4.2 17.3222 3 13.1667 3 10.1111C3 5.57306 6.6 4 9 4Z"
          fill={fill}
        />
      </svg>
    );
  },
);

HeartFilledSVG.displayName = "HeartFilledSVG";
export default HeartFilledSVG;
