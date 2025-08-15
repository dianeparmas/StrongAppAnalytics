import { UploadBtnProps } from "../../types/strongAppAnalytics.types";

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
    </label>
  );
};

export default UploadBtn;
