import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const HomeSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="home icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21 10.8457V21C21 21.5523 20.5523 22 20 22L16 22V14C16 13.4477 15.5523 13 15 13H9C8.44772 13 8 13.4477 8 14V22L4 22C3.44772 22 3 21.5523 3 21V10.8457C3 10.5392 3.14053 10.2497 3.38131 10.0601L11.3813 3.76008C11.7443 3.47426 12.2557 3.47426 12.6187 3.76008L20.6187 10.0601C20.8595 10.2497 21 10.5392 21 10.8457ZM2 10.8457C2 10.2328 2.28107 9.65367 2.76262 9.27444L10.7626 2.97444C11.4885 2.40281 12.5115 2.40281 13.2374 2.97444L21.2374 9.27444C21.7189 9.65367 22 10.2328 22 10.8457V21C22 22.1046 21.1046 23 20 23H4C2.89543 23 2 22.1046 2 21V10.8457ZM9 14H15V22H9V14Z"
          fill={fill}
        />
      </svg>
    );
  },
);

HomeSVG.displayName = "HomeSVG";
export default HomeSVG;
