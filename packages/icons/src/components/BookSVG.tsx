import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const BookSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="book icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0224 3.89893C16.5352 1.20791 20.7202 2.87117 22.307 4.10533C22.4288 4.20006 22.5 4.34571 22.5 4.50001V21C22.5 21.1733 22.4103 21.3342 22.2629 21.4253C22.1155 21.5164 21.9314 21.5247 21.7764 21.4472C17.9668 19.5424 13.808 20.655 12.2236 21.4472C12.0887 21.5147 11.9305 21.5176 11.7931 21.4552C7.56495 19.5333 3.63303 20.6647 2.24282 21.4371C2.08796 21.5231 1.89913 21.5208 1.74644 21.4309C1.59375 21.3411 1.5 21.1772 1.5 21V4.50001C1.5 4.32906 1.58734 4.16996 1.73156 4.07818C6.10591 1.2945 10.2196 2.67445 12.0224 3.89893ZM11.5 4.75296C10.0076 3.71538 6.40749 2.42961 2.5 4.77857V20.2123C4.34675 19.4622 7.78015 18.8138 11.5 20.2481V4.75296ZM12.5 20.237C14.4426 19.4897 18.0193 18.7988 21.5 20.2243V4.75296C20.0076 3.71538 16.4075 2.42961 12.5 4.77857V20.237Z"
          fill={fill}
        />
      </svg>
    );
  },
);

BookSVG.displayName = "BookSVG";
export default BookSVG;
