import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const ShareFilledSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="share-filled icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 16.1365C17.24 16.1365 16.56 16.4378 16.04 16.9096L8.91 12.743C8.96 12.512 9 12.2811 9 12.0402C9 11.7992 8.96 11.5683 8.91 11.3373L15.96 7.21084C16.5 7.71285 17.21 8.0241 18 8.0241C19.66 8.0241 21 6.67871 21 5.01205C21 3.34538 19.66 2 18 2C16.34 2 15 3.34538 15 5.01205C15 5.25301 15.04 5.48394 15.09 5.71486L8.04 9.84137C7.5 9.33936 6.79 9.02811 6 9.02811C4.34 9.02811 3 10.3735 3 12.0402C3 13.7068 4.34 15.0522 6 15.0522C6.79 15.0522 7.5 14.741 8.04 14.239L15.16 18.4157C15.11 18.6265 15.08 18.8474 15.08 19.0683C15.08 20.6847 16.39 22 18 22C19.61 22 20.92 20.6847 20.92 19.0683C20.92 17.4518 19.61 16.1365 18 16.1365Z"
          fill={fill}
        />
      </svg>
    );
  },
);

ShareFilledSVG.displayName = "ShareFilledSVG";
export default ShareFilledSVG;
