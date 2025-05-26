import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const HearFilledSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="hear-filled icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          d="M7 3C9.8 3 11.5 5.33333 12 6.5C13.2 3.3 16 3 17 3C21 3 22 6.13469 22 8C22 11.5 18.6667 16 17 17.5C15.4 19.1 13 20.5 12 21C11 20.5 8.66667 19 7 17.5C3 13.9 2 10.5 2 8C2 4.28705 5 3 7 3Z"
          fill={fill}
        />
      </svg>
    );
  },
);

HearFilledSVG.displayName = "HearFilledSVG";
export default HearFilledSVG;
