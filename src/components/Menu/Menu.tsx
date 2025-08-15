import { MenuProps } from "../../types/strongAppAnalytics.types";

import Icon from "../Icon/Icon";

import DATA_TYPE from "../../constants/dataType";

import "./Menu.css";

const Menu = ({
  currentDataType,
  handleUseMockData,
  handleSwitchDataType,
}: MenuProps) => {
  const isRealData = currentDataType === DATA_TYPE.REAL;

  const handleOpenMenu = () => {
    const menu = document.querySelector(".dataType-menu");
    if (menu) {
      menu.classList.toggle("is-open");
    }
  };

  return currentDataType ? (
    <div className="dataType-container">
      <div className="dataType-label">
        <p>Using {currentDataType} data</p>
        <Icon icon="menu" onClickFunction={handleOpenMenu} />
      </div>
      <div className="dataType-menu">
        <button onClick={() => handleSwitchDataType(currentDataType)}>
          Use {isRealData ? DATA_TYPE.MOCK : DATA_TYPE.REAL} data instead
        </button>
      </div>
    </div>
  ) : (
    <div className="mockData-container">
      <Icon icon="menu" />
      <div>
        <p>
          Want to try it out <br />
          with mock data {isRealData && "instead"}?
        </p>
        <button onClick={handleUseMockData}>Use mock data</button>
      </div>
    </div>
  );
};

export default Menu;
