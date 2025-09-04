import { UploadBtnProps } from "../../types/UploadBtn.types";

import Icon from "../Icon/Icon";

import "./UploadBtn.css";

const UploadBtn = ({
  className = "",
  defaultLabel,
  isSuccessfulUpload,
  onChangeFunction,
  keepLabel,
}: UploadBtnProps) => {
  return (
    <label className={`input-hidden-label ${className}`}>
      {isSuccessfulUpload && !keepLabel ? "File Uploaded" : defaultLabel}
      <input
        type="file"
        id="csvFile"
        className="input-hidden"
        onChange={onChangeFunction}
        accept=".csv"
      />
      {isSuccessfulUpload && <Icon icon="success" width={16} height={16} />}
    </label>
  );
};

export default UploadBtn;
