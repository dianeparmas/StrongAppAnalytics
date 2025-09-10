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
  setShowUseThisBtn,
}: UploadBtnProps) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setShowUseThisBtn !== undefined) {
      setShowUseThisBtn(true);
    }
    onChangeFunction(e);
  };

  return (
    <label className={`input-hidden-label ${className}`}>
      {/* <span className={`${isMenu ? "hide-mobile" : ""}`}>{isSuccessfulUpload && !keepLabel ? "File Uploaded" : defaultLabel}</span> */}
      <span className={`${isMenu ? "hide-mobile" : ""}`}>{defaultLabel}</span>
      <input
        type="file"
        id="csvFile"
        className="input-hidden"
        onChange={(e) => handleUpload(e)}
        accept=".csv"
      />
      <Icon icon={isMenu ? "real" : "upload"} width={16} height={16} />
      {isSuccessfulUpload && <Icon icon="success" width={16} height={16} />}
    </label>
  );
};

export default UploadBtn;
