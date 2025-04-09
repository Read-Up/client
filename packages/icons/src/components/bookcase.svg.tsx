import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const BookcaseSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="bookcase icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 3C17.5523 3 18 3.44772 18 4V8C18 8.55228 17.5523 9 17 9H12V5C12 4.44772 11.5523 4 11 4C10.4477 4 10 4.44772 10 5V9H9V5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V9H6C5.44772 9 5 8.55228 5 8V4C5 3.44772 5.44772 3 6 3H17ZM8 10H11H17C17.5523 10 18 10.4477 18 11V15C18 15.5523 17.5523 16 17 16V12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12V16H14V12C14 11.4477 13.5523 11 13 11C12.4477 11 12 11.4477 12 12V16H10.5366L11.4499 12.2977C11.5822 11.7615 11.2548 11.2196 10.7186 11.0873C10.1824 10.955 9.64044 11.2825 9.50816 11.8187L8.55006 15.7023C8.5254 15.8022 8.51671 15.9023 8.52237 16H6C5.44772 16 5 15.5523 5 15V11C5 10.4477 5.44772 10 6 10H8ZM6 17H13H16H17C17.5523 17 18 17.4477 18 18V20C18 20.5523 17.5523 21 17 21H6C5.44772 21 5 20.5523 5 20V18C5 17.4477 5.44772 17 6 17ZM4 10V9V3C4 2.44772 4.44772 2 5 2H18C18.5523 2 19 2.44772 19 3V9V10V16V17V21C19 21.5523 18.5523 22 18 22H5C4.44772 22 4 21.5523 4 21V17V16V10Z"
          fill={fill}
        />
      </svg>
    );
  },
);

BookcaseSVG.displayName = "BookcaseSVG";
export default BookcaseSVG;
