import { CustomUploadBtnProps } from "../../types/strongAppAnalytics.types";

const CustomUploadBtn = ({
  className = "",
  defaultLabel,
  isMultiple = false,
  isSuccessfulUpload,
  onChangeFunction,
}: CustomUploadBtnProps) => {
  return (
    <label 
      className={`input-hidden-label ${className}`}
    >
      {isSuccessfulUpload ? "Uploaded" : defaultLabel}
      <input
        type="file"
        id="csvFile"
        className="input-hidden"
        onChange={onChangeFunction}
        accept=".csv"
        multiple={isMultiple}
      />
    </label>
  );
};

export default CustomUploadBtn;
