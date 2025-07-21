import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const HeartLineSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 30 30", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="heart-line icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          d="M15 26C14.912 26 14.8256 25.9766 14.7495 25.9321C14.63 25.8626 11.793 24.1973 8.9105 21.5143C4.9885 17.8641 3 14.2572 3 10.7942C3 6.12632 6.1395 4 9.0565 4C11.306 4 13.8215 5.29441 15 8.14142C16.1785 5.29441 18.6945 4 20.9435 4C23.8605 4 27 6.12632 27 10.7942C27 14.2572 25.0115 17.8641 21.0895 21.5143C18.207 24.1973 15.37 25.8631 15.2505 25.9321C15.1744 25.9766 15.088 26 15 26ZM9.0565 5.00654C6.621 5.00654 4 6.81782 4 10.7942C4 17.771 13.337 23.8772 15 24.9089C16.6615 23.8767 26 17.766 26 10.7942C26 6.81782 23.379 5.00654 20.9435 5.00654C18.707 5.00654 16.1535 6.54756 15.491 9.99044C15.469 10.1053 15.408 10.2089 15.3184 10.2834C15.2288 10.3579 15.1162 10.3987 15 10.3987C14.8838 10.3987 14.7712 10.3579 14.6816 10.2834C14.592 10.2089 14.531 10.1053 14.509 9.99044C13.8465 6.54806 11.293 5.00654 9.0565 5.00654Z"
          fill={fill}
        />
      </svg>
    );
  },
);

HeartLineSVG.displayName = "HeartLineSVG";
export default HeartLineSVG;
