import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const ShareLine2SVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="share-line-2 icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 19C4.55228 19 5 18.5523 5 18C5 17.4477 4.55228 17 4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19ZM4 20C5.10457 20 6 19.1046 6 18C6 16.8954 5.10457 16 4 16C2.89543 16 2 16.8954 2 18C2 19.1046 2.89543 20 4 20Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 13C4.55228 13 5 12.5523 5 12C5 11.4477 4.55228 11 4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13ZM4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 7C4.55228 7 5 6.55228 5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7ZM4 8C5.10457 8 6 7.10457 6 6C6 4.89543 5.10457 4 4 4C2.89543 4 2 4.89543 2 6C2 7.10457 2.89543 8 4 8Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 18C7.5 17.7239 7.72386 17.5 8 17.5H21.5C21.7761 17.5 22 17.7239 22 18C22 18.2761 21.7761 18.5 21.5 18.5H8C7.72386 18.5 7.5 18.2761 7.5 18Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 12C7.5 11.7239 7.72386 11.5 8 11.5H21.5C21.7761 11.5 22 11.7239 22 12C22 12.2761 21.7761 12.5 21.5 12.5H8C7.72386 12.5 7.5 12.2761 7.5 12Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 6C7.5 5.72386 7.72386 5.5 8 5.5H21.5C21.7761 5.5 22 5.72386 22 6C22 6.27614 21.7761 6.5 21.5 6.5H8C7.72386 6.5 7.5 6.27614 7.5 6Z"
          fill={fill}
        />
      </svg>
    );
  },
);

ShareLine2SVG.displayName = "ShareLine2SVG";
export default ShareLine2SVG;
