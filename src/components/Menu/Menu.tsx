import { useState, useEffect, useRef } from "react";

import { MenuProps } from "../../types/Menu.types";

import DATA_TYPE from "../../constants/dataType";

import ButtonWrapper from "../ButtonWrapper/ButtonWrapper";
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
  setFileLastModifiedDate,
  setLastSaved,
  setParsedCsv,
}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrentDataSaved, setIsCurrentDataSaved] = useState(false);
  const menuRef = useRef<HTMLImageElement>(null);
  const isRealData = currentDataType === DATA_TYPE.REAL;

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsCurrentDataSaved(lastSaved ? true : false);
  }, [lastSaved]);

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
        <p className="hide-mobile">Using {currentDataType} data</p>
        {isCurrentDataSaved && isRealData && (
          <Icon icon="saved" width={20} height={20} />
        )}
        <Icon icon={currentDataType} width={16} height={16} />
        <Icon icon="menu" onClickFunction={handleToggleMenu} />
      </div>
      {currentDataType && (
        <div className={`dataType-menu ${isOpen ? "is-open" : ""}`}>
          {!isRealData && !lastSaved && (
            <UploadBtn
              defaultLabel={"Use real data"}
              onChangeFunction={handleUploadFile}
              className="input-new no-top-padding"
              keepLabel
              isMenu
            />
          )}
          {isRealData && (
            <ButtonWrapper
              defaultLabel="Upload another"
              className="input-new"
              onAction={handleUploadFile}
              isUploadBtn
              parsedCsv={parsedCsv}
              fileLastModifiedDate={fileLastModifiedDate}
              setFileLastModifiedDate={setFileLastModifiedDate}
              setLastSaved={setLastSaved}
              setParsedCsv={setParsedCsv}
              setIsCurrentDataSaved={setIsCurrentDataSaved}
            />
          )}
          {(!isRealData && lastSaved) || isRealData ? (
            <button
              className="hidden"
              onClick={() => handleSwitchDataType(currentDataType)}
            >
              <span className="hide-mobile">
                {isRealData
                  ? `Use ${DATA_TYPE.MOCK} data`
                  : `Use ${DATA_TYPE.REAL} data`}
              </span>
              <Icon
                icon={
                  currentDataType === DATA_TYPE.REAL
                    ? DATA_TYPE.MOCK
                    : DATA_TYPE.REAL
                }
                width={16}
                height={16}
              />
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
