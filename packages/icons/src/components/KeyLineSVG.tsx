import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const KeyLineSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="key-line icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          d="M13 16.3092C13 15.9523 13.2055 15.6352 13.4512 15.3763C13.7913 15.0177 14 14.5332 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 14.5332 10.2087 15.0177 10.5488 15.3763C10.7945 15.6352 11 15.9523 11 16.3092V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V16.3092Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 9C7.55228 9 8 8.55228 8 8V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V8C16 8.55228 16.4477 9 17 9H18C18.5523 9 19 9.44772 19 10V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V10C5 9.44772 5.44772 9 6 9H7ZM15 6V8C15 8.55228 14.5523 9 14 9H10C9.44772 9 9 8.55228 9 8V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6ZM17 10C17.5523 10 18 10.4477 18 11V20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20V11C6 10.4477 6.44772 10 7 10H17Z"
          fill={fill}
        />
      </svg>
    );
  },
);

KeyLineSVG.displayName = "KeyLineSVG";
export default KeyLineSVG;
