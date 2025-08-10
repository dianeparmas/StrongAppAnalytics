import { IconProps } from "../../types/strongAppAnalytics.types";

const Icon = ({ icon, onClickFunction }: IconProps) => {
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
    />
  );
};

export default Icon;
