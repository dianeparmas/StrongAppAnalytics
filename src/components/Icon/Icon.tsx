import { forwardRef } from 'react';

import { IconProps } from "../../types/Icon.types";

import "./Icon.css";

const Icon = forwardRef<HTMLImageElement, IconProps>(({ icon, onClickFunction, width, height }: IconProps, ref) => {
  let path;
  let alt;

  switch (icon) {
    case "arrowDown":
      path = "/src/assets/arrow_down.png";
      alt = "down arrow icon";
      break;
    case "menu":
      path = "/src/assets/menu.png";
      alt = "menu icon";
      break;
    case "success":
      path = "/src/assets/check_success.png";
      alt = "success icon";
      break;
    case "newTab":
      path = "/src/assets/new_tab.png";
      alt = "new tab icon";
      break;
    case "legend":
      path = "/src/assets/legend.png";
      alt = "legend icon";
      break;
    default:
      path = "";
      alt = "icon";
      break;
  }

  return (
    <img
      src={path}
      alt={alt}
      className={alt.replace(/ /g, "-")}
      {...(onClickFunction && { onClick: onClickFunction })}
      ref={ref}
      {...(width && { width: width })}
      {...(height && { height: height })}
    />
  );
});

export default Icon;
