import { ChartTooltipProps } from "../../types/strongAppAnalytics.types";

import Icon from "../Icon/Icon";

import "./ChartTooltip.css";

const ChartTooltip = ({
  className = "",
  defaultLabel,
  isSuccessfulUpload,
  onChangeFunction,
  keepLabel,
}: ChartTooltipProps) => {
  return (
    <div className="tooltip-container">
      <Icon icon="legend" width={40} />
      <div className="tooltip-content">
        <p>Tip: Click a legend item to hide or show its exercise line.</p>
      </div>
    </div>
  );
};

export default ChartTooltip;
