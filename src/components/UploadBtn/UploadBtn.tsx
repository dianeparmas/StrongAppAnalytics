import { UploadBtnProps } from "../../types/UploadBtn.types";

import Icon from "../Icon/Icon";

import "./UploadBtn.css";

const UploadBtn = ({
  className = "",
  defaultLabel,
  isSuccessfulUpload,
  onChangeFunction,
  // keepLabel,
  isMenu = false,
}: UploadBtnProps) => {
  return (
    <label className={`input-hidden-label ${className}`}>
      {/* <span className={`${isMenu ? "hide-mobile" : ""}`}>{isSuccessfulUpload && !keepLabel ? "File Uploaded" : defaultLabel}</span> */}
      <span className={`${isMenu ? "hide-mobile" : ""}`}>{defaultLabel}</span>
      <input
        type="file"
        id="csvFile"
        className="input-hidden"
        onChange={onChangeFunction}
        accept=".csv"
      />
      <Icon icon={isMenu ? "real" : "upload"} width={16} height={16} />
      {isSuccessfulUpload && <Icon icon="success" width={16} height={16} />}
    </label>
  );
};

export default UploadBtn;
