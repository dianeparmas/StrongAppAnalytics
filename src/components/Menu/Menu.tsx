import { MenuProps } from "../../types/strongAppAnalytics.types";

import Icon from "../Icon/Icon";
import UploadBtn from "../UploadBtn/UploadBtn";

import DATA_TYPE from "../../constants/dataType";

import "./Menu.css";

const Menu = ({
  currentDataType,
  handleUploadFile,
  handleUseMockData,
  handleSwitchDataType,
  lastSaved,
}: MenuProps) => {
  const isRealData = currentDataType === DATA_TYPE.REAL;

  const handleOpenMenu = () => {
    const menu = document.querySelector(".dataType-menu");
    if (menu) {
      menu.classList.toggle("is-open");
    }
  };

  return currentDataType ? (
    <div className={`dataType-container ${currentDataType}-data`}>
      <div className={`dataType-label ${currentDataType}-data`}>
        <p>Using {currentDataType} data</p>
        <Icon icon="menu" onClickFunction={handleOpenMenu} />
      </div>
      {currentDataType && (
        <div className="dataType-menu">
          {!isRealData && !lastSaved && (
            <UploadBtn
              defaultLabel={"Use real data"}
              onChangeFunction={handleUploadFile}
              className="input-new"
            />
          )}
          {(!isRealData && lastSaved) || isRealData ? (
            <button
              className="hidden"
              onClick={() => handleSwitchDataType(currentDataType)}
            >
              {isRealData
                ? `Use ${DATA_TYPE.MOCK} data`
                : `Use ${DATA_TYPE.REAL} data`}
            </button>
          ) : null}
        </div>
      )}
    </div>
  ) : (
    <div className="mockData-container">
      <Icon icon="menu" />
      <div className="hidden">
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
