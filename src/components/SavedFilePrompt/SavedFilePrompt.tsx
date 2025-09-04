import { SavedFilePromptProps } from "../../types/SavedFilePrompt.types";

import DATA_TYPE from "../../constants/dataType";

import Button from "../Button/Button";

import "./SavedFilePrompt.css";

const SavedFilePrompt = ({
  currentDataType,
  fileLastModifiedDate,
  handleUploadFile,
  lastSaved,
  loadExistingFile,
  parsedCsv,
}: SavedFilePromptProps) => {
  return (
    <>
      <p>{`${currentDataType === DATA_TYPE.REAL ? "Using" : "Detecting"} a saved file:`}</p>
      <ul className="savedFile-data">
        <li>last saved in App at {lastSaved.toLocaleString()} (local time)</li>
        <li>
          last modified by User at {fileLastModifiedDate.toLocaleString()}{" "}
          (local time)
        </li>
      </ul>
      <p>Would you like to use that file or upload a new one?</p>
      <div className="button-container">
        <button onClick={loadExistingFile}>Use this file</button>
        <Button
          defaultLabel={"Upload new"}
          className="input-new"
          onAction={handleUploadFile}
          isUploadBtn
          parsedCsv={parsedCsv}
          fileLastModifiedDate={fileLastModifiedDate}
        />
      </div>
    </>
  );
};

export default SavedFilePrompt;
