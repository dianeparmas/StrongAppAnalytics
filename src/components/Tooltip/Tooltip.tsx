import { useState } from "react";

import { TooltipProps } from "../../types/Tooltip.types";

import Icon from "../Icon/Icon";

import "./Tooltip.css";

const Tooltip = ({ children, className }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`tooltip-container ${className ? className : ""}`}>
      <Icon onClickFunction={handleToggleMenu} icon="legend" width={40} />
      <div className={`tooltip-content ${isOpen ? "is-open" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
