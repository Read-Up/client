import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const BooksSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 20 20", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="books icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.2 1H4.8C4.91046 1 5 1.08954 5 1.2V4.5H1V1.2C1 1.08954 1.08954 1 1.2 1ZM1 5.5V18.8C1 18.9105 1.08954 19 1.2 19H4.8C4.91046 19 5 18.9105 5 18.8V5.5H1ZM0 1.2C0 0.53726 0.537258 0 1.2 0H4.8C5.46274 0 6 0.537258 6 1.2V18.8C6 19.4627 5.46274 20 4.8 20H1.2C0.537258 20 0 19.4627 0 18.8V1.2ZM8.2 1H11.8C11.9105 1 12 1.08954 12 1.2V4.5H8V1.2C8 1.08954 8.08954 1 8.2 1ZM8 5.5H12V18.8C12 18.9105 11.9105 19 11.8 19H8.2C8.08954 19 8 18.9105 8 18.8V5.5ZM7 1.2C7 0.53726 7.53726 0 8.2 0H11.8C12.4627 0 13 0.537258 13 1.2V18.8C13 19.4627 12.4627 20 11.8 20H8.2C7.53726 20 7 19.4627 7 18.8V1.2ZM18.8 1H15.2C15.0895 1 15 1.08954 15 1.2V4.5H19V1.2C19 1.08954 18.9105 1 18.8 1ZM19 5.5H15V18.8C15 18.9105 15.0895 19 15.2 19H18.8C18.9105 19 19 18.9105 19 18.8V5.5ZM15.2 0C14.5373 0 14 0.53726 14 1.2V18.8C14 19.4627 14.5373 20 15.2 20H18.8C19.4627 20 20 19.4627 20 18.8V1.2C20 0.537258 19.4627 0 18.8 0H15.2Z"
          fill={fill}
        />
      </svg>
    );
  },
);

BooksSVG.displayName = "BooksSVG";
export default BooksSVG;
