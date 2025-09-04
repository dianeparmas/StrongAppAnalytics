import { ChartTooltipProps } from "../../types/ChartTooltip.types";

import Icon from "../Icon/Icon";

import "./ChartTooltip.css";

const ChartTooltip = ({}: ChartTooltipProps) => {
  const handleToggleMenu = () => {
    const content = document.querySelector(".tooltip-content");

    if (content) {
      content.classList.toggle("is-open");
    }
  };
  return (
    <div className="tooltip-container">
      <Icon onClickFunction={handleToggleMenu} icon="legend" width={40} />
      <div className="tooltip-content">
        <p>Tip: Click a legend item to hide or show its exercise line.</p>
      </div>
    </div>
  );
};

export default ChartTooltip;
