import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const BellFilledSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="bell-filled icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 21.5C13.1 21.5 14 20.6 14 19.5H10C10 20.6 10.89 21.5 12 21.5ZM18 15.5V10.5C18 7.43 16.36 4.86 13.5 4.18V3.5C13.5 2.67 12.83 2 12 2C11.17 2 10.5 2.67 10.5 3.5V4.18C7.63 4.86 6 7.42 6 10.5V15.5L4 17.5V18.5H20V17.5L18 15.5Z"
          fill={fill}
        />
      </svg>
    );
  },
);

BellFilledSVG.displayName = "BellFilledSVG";
export default BellFilledSVG;
