import { forwardRef } from "react";

import { IconProps } from "../../types/Icon.types";

import iconMap from "../../constants/iconMap";

import "./Icon.css";

const Icon = forwardRef<HTMLImageElement, IconProps>(
  ({ icon, onClickFunction, width, height }: IconProps, ref) => {
    const iconData = iconMap[icon];

    return (
      <img
        src={iconData.path}
        alt={iconData.alt}
        className={iconData.alt.replace(/ /g, "-")}
        {...(onClickFunction && { onClick: onClickFunction })}
        ref={ref}
        {...(width && { width: width })}
        {...(height && { height: height })}
      />
    );
  },
);

export default Icon;
