import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface UploadBtnProps {
  className?: string;
  defaultLabel?: string;
  isMenu?: boolean;
  isSuccessfulUpload?: boolean;
  keepLabel?: boolean;
  onChangeFunction: (event: ChangeEvent<HTMLInputElement>) => void;
  setShowUseThisBtn: Dispatch<SetStateAction<boolean>>;
}
