import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const MenuSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="menu icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18C2 17.4477 2.44772 17 3 17H21C21.5523 17 22 17.4477 22 18Z"
          fill={fill}
        />
      </svg>
    );
  },
);

MenuSVG.displayName = "MenuSVG";
export default MenuSVG;
