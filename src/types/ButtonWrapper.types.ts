import { Dispatch, SetStateAction } from "react";

import { ParsedResultData } from "./strongAppAnalytics.types";

import { ACTIONS, ACTION_STATUS } from "../constants/actions";

export interface ButtonWrapperProps {
  className?: string;
  defaultLabel?: string;
  fileLastModifiedDate: null | Date;
  isSuccessfulUpload?: boolean;
  isUploadBtn: boolean;
  keepLabel?: boolean;
  onAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFunction?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  parsedCsv: ParsedResultData[];
  setFileLastModifiedDate: Dispatch<SetStateAction<null | Date>>;
  setIsCurrentDataSaved: Dispatch<SetStateAction<boolean>>;
  setLastSaved: Dispatch<SetStateAction<null | Date>>;
  setParsedCsv: Dispatch<SetStateAction<ParsedResultData[]>>;
}

export type ActionKey = (typeof ACTIONS)[keyof typeof ACTIONS];
export type ActionStatus = (typeof ACTION_STATUS)[keyof typeof ACTION_STATUS];
