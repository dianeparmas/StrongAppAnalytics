import { ParsedResultData } from "./strongAppAnalytics.types";

export interface ButtonProps {
  className?: string;
  defaultLabel?: string;
  fileLastModifiedDate: Date;
  isSuccessfulUpload?: boolean;
  isUploadBtn: boolean;
  keepLabel?: boolean;
  onAction: () => Promise<void> | void;
  onChangeFunction?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  parsedCsv: ParsedResultData[];
}
