import { forwardRef } from "react";

import { useTheme } from "../../contexts/ThemeContext";

import { IconProps } from "../../types/Icon.types";

import iconMap from "../../constants/iconMap";

import "./Icon.css";

const Icon = forwardRef<HTMLImageElement, IconProps>(
  ({ icon, onClickFunction, width, height }: IconProps, ref) => {
    const { isDarkMode } = useTheme();
    const iconData = iconMap[icon];
    const iconPath = isDarkMode ? iconData.dark : iconData.light;

    return (
      <img
        src={iconPath}
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
