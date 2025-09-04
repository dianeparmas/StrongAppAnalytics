export interface UploadBtnProps {
  className?: string;
  defaultLabel?: string;
  isSuccessfulUpload?: boolean;
  keepLabel?: boolean;
  onChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
