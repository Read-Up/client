import { forwardRef } from "react";

import type { IconProps } from "../types/icon";
import { ICON_SIZE_MAP } from "../types/icon";

const UserCircleSVG = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", viewBox = "0 0 24 24", fill = "#FFF", ...rest }, ref) => {
    return (
      <svg
        width={ICON_SIZE_MAP[size]}
        height={ICON_SIZE_MAP[size]}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="user-circle icon"
        fill="none"
        ref={ref}
        className={className}
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 11C13.3807 11 14.5 9.88071 14.5 8.5C14.5 7.11929 13.3807 6 12 6C10.6193 6 9.5 7.11929 9.5 8.5C9.5 9.88071 10.6193 11 12 11ZM12 12C13.933 12 15.5 10.433 15.5 8.5C15.5 6.567 13.933 5 12 5C10.067 5 8.5 6.567 8.5 8.5C8.5 10.433 10.067 12 12 12Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.1209 17.5046C17.4747 19.631 14.8972 21 12 21C9.19097 21 6.68251 19.7131 5.03204 17.6967C7.17615 15.8735 12.8012 13.3785 19.1209 17.5046ZM19.6885 16.6809C12.9596 12.2713 6.88344 14.8536 4.44123 16.8872C3.52944 15.4798 3 13.8017 3 12C3 7.02944 7.02943 3 12 3C16.9706 3 21 7.02944 21 12C21 13.7145 20.5206 15.317 19.6885 16.6809ZM22 12C22 17.5228 17.5229 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5229 2 22 6.47715 22 12Z"
          fill={fill}
        />
      </svg>
    );
  },
);

UserCircleSVG.displayName = "UserCircleSVG";
export default UserCircleSVG;
