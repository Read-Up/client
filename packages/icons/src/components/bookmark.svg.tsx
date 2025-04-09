import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const BookmarkSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", stroke = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="bookmark icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          d="M5.5 18.9425V4C5.5 3.72386 5.72386 3.5 6 3.5H18C18.2761 3.5 18.5 3.72386 18.5 4V18.9425C18.5 19.3598 18.0192 19.5935 17.6911 19.3357L12.9267 15.5923C12.3828 15.1649 11.6172 15.1649 11.0733 15.5923L6.30891 19.3357C5.98085 19.5935 5.5 19.3598 5.5 18.9425Z"
          stroke={stroke}
        />
      </svg>
    );
  },
);

BookmarkSVG.displayName = "BookmarkSVG";
export default BookmarkSVG;
