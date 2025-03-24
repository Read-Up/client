import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const SearchSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="search icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.0195 2.5C6.31738 2.5 2.5 6.33768 2.5 11.0786C2.5 15.8195 6.31738 19.6572 11.0195 19.6572C13.4024 19.6572 15.5565 18.6727 17.1037 17.0835C18.6103 15.536 19.539 13.4172 19.539 11.0786C19.539 6.33768 15.7216 2.5 11.0195 2.5ZM1.5 11.0786C1.5 5.79156 5.75895 1.5 11.0195 1.5C16.28 1.5 20.539 5.79156 20.539 11.0786C20.539 13.5098 19.6382 15.7306 18.1544 17.4198L22.3547 21.6476C22.5493 21.8435 22.5483 22.1601 22.3524 22.3547C22.1565 22.5493 21.8399 22.5483 21.6453 22.3524L17.4561 18.1358C15.7623 19.7007 13.5017 20.6572 11.0195 20.6572C5.75895 20.6572 1.5 16.3656 1.5 11.0786Z"
          fill={fill}
        />
      </svg>
    );
  },
);

SearchSVG.displayName = "SearchSVG";
export default SearchSVG;
