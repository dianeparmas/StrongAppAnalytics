export interface UploadBtnProps {
  className?: string;
  defaultLabel?: string;
  isMenu?: boolean;
  isSuccessfulUpload?: boolean;
  keepLabel?: boolean;
  onChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
