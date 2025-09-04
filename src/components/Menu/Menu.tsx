import { useState, useEffect, useRef } from "react";

import { MenuProps } from "../../types/Menu.types";

import DATA_TYPE from "../../constants/dataType";

import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import UploadBtn from "../UploadBtn/UploadBtn";

import "./Menu.css";

const Menu = ({
  currentDataType,
  fileLastModifiedDate,
  handleSwitchDataType,
  handleUploadFile,
  handleUseMockData,
  lastSaved,
  parsedCsv,
}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLImageElement>(null);
  const isRealData = currentDataType === DATA_TYPE.REAL;

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the menu container
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    // Add the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Return a cleanup function to remove the listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return currentDataType ? (
    <div className={`dataType-container ${currentDataType}-data`} ref={menuRef}>
      <div className={`dataType-label ${currentDataType}-data`}>
        <p>Using {currentDataType} data</p>
        <Icon icon="menu" onClickFunction={handleToggleMenu} />
      </div>
      {currentDataType && (
        <div className={`dataType-menu ${isOpen ? "is-open" : ""}`}>
          {!isRealData && !lastSaved && (
            <UploadBtn
              defaultLabel={"Use real data"}
              onChangeFunction={handleUploadFile}
              className="input-new"
              keepLabel
            />
          )}
          {isRealData && (
            <Button
              defaultLabel="Upload another"
              className="input-new"
              onAction={handleUploadFile}
              isUploadBtn
              parsedCsv={parsedCsv}
              fileLastModifiedDate={fileLastModifiedDate}
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
