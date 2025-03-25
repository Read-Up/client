import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const BangSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="bang icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z"
          fill={fill}
        />
        <path
          d="M11.083 7.99655C11.0383 7.46009 11.4617 7 12 7C12.5383 7 12.9617 7.46009 12.917 7.99655L12.5415 12.5017C12.5181 12.7834 12.2826 13 12 13C11.7174 13 11.4819 12.7834 11.4585 12.5017L11.083 7.99655Z"
          fill={fill}
        />
        <circle cx="12" cy="15" r="1" fill={fill} />
      </svg>
    );
  },
);

BangSVG.displayName = "BangSVG";
export default BangSVG;
