import { useState } from "react";

import { SavedFilePromptProps } from "../../types/SavedFilePrompt.types";

import DATA_TYPE from "../../constants/dataType";

import UploadBtn from "../UploadBtn/UploadBtn";

import "./SavedFilePrompt.css";

const SavedFilePrompt = ({
  currentDataType,
  fileLastModifiedDate,
  handleUploadFile,
  lastSaved,
  loadExistingFile,
}: SavedFilePromptProps) => {
  const [showUseThisBtn, setShowUseThisBtn] = useState(true);

  const handleClickBtn = () => {
    loadExistingFile();
    setShowUseThisBtn(false);
  };

  return (
    <>
      <p>{`${currentDataType === DATA_TYPE.REAL ? "Using" : "Detecting"} a saved file:`}</p>
      <ul className="savedFile-data">
        <li>last saved in App at {lastSaved.toLocaleString()} (local time)</li>
        <li>
          last modified by User at {fileLastModifiedDate?.toLocaleString()}{" "}
          (local time)
        </li>
      </ul>
      <div className="button-container">
        {showUseThisBtn && (
          <>
            <p>Would you like to use that file or upload a new one?</p>
            <button onClick={handleClickBtn}>Use this file</button>
          </>
        )}
        <UploadBtn
          defaultLabel={"Upload another"}
          onChangeFunction={handleUploadFile}
          className="input-new"
          keepLabel
          setShowUseThisBtn={setShowUseThisBtn}
        />
      </div>
    </>
  );
};

export default SavedFilePrompt;
