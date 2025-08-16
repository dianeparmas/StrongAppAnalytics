import { SavedFilePromptProps } from "../../types/strongAppAnalytics.types";

import Icon from "./../Icon/Icon";
import UploadBtn from "./../UploadBtn/UploadBtn";

import "./SavedFilePrompt.css";

const SavedFilePrompt = ({
  isSuccessfulUpload,
  handleUploadFile,
  lastSaved,
  fileLastModifiedDate,
  loadExistingFile,
  handleSave,
  saveNew,
  handleDelete,
  deleteFile,
  currentDataType,
}: SavedFilePromptProps) => {
  return (
    <>
      <p>{`${currentDataType === "real" ? "Using" : "Detecting"} a saved file:`}</p>
      <ul className="savedFile-data">
        <li>last saved in App at {lastSaved.toLocaleString()} (local time)</li>
        <li>
          last modified by User at {fileLastModifiedDate.toLocaleString()}{" "}
          (local time)
        </li>
      </ul>
      <p>Would you like to use that file or upload a new one?</p>
      <div className="button-container">
        <button
          // onClick={handleUseExistingFile}
          onClick={loadExistingFile}
        >
          Use this file
        </button>
        <UploadBtn
          defaultLabel={"Upload new file"}
          isSuccessfulUpload={isSuccessfulUpload}
          onChangeFunction={handleUploadFile}
        />
        {isSuccessfulUpload && (
          <>
            <Icon icon="success" />
            <p>Want to save the uploaded .csv file to the browser?</p>
            <button onClick={handleSave}>
              {saveNew ? "File saved!" : "Save the file"}
            </button>
            {saveNew && <Icon icon="success" />}
          </>
        )}
        <button onClick={handleDelete}>
          {deleteFile ? "File deleted!" : "Delete the saved file"}
        </button>
        {deleteFile && <Icon icon="success" />}
      </div>
    </>
  );
};

export default SavedFilePrompt;
