import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const ShareLineSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", stroke = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="share-line icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          d="M18 15.6365C17.2401 15.6365 16.5518 15.8924 15.993 16.303L9.46553 12.4885C9.48625 12.3461 9.5 12.1963 9.5 12.0402C9.5 11.8839 9.48623 11.734 9.46549 11.5916L15.9094 7.81983C16.4917 8.25828 17.2107 8.5241 18 8.5241C19.938 8.5241 21.5 6.95297 21.5 5.01205C21.5 3.07113 19.938 1.5 18 1.5C16.062 1.5 14.5 3.07113 14.5 5.01205C14.5 5.1683 14.5138 5.31822 14.5345 5.46065L8.09063 9.23238C7.50834 8.79393 6.78928 8.52811 6 8.52811C4.06197 8.52811 2.5 10.0992 2.5 12.0402C2.5 13.9811 4.06197 15.5522 6 15.5522C6.78915 15.5522 7.5081 15.2865 8.09033 14.8482L14.6059 18.6703C14.5892 18.8005 14.58 18.9337 14.58 19.0683C14.58 20.959 16.112 22.5 18 22.5C19.888 22.5 21.42 20.959 21.42 19.0683C21.42 17.1776 19.888 15.6365 18 15.6365Z"
          stroke={stroke}
        />
      </svg>
    );
  },
);

ShareLineSVG.displayName = "ShareLineSVG";
export default ShareLineSVG;
