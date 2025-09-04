import { ParsedResultData } from "./strongAppAnalytics.types";

import { ACTIONS, ACTION_STATUS } from "../constants/actions";

export interface ButtonProps {
  className?: string;
  defaultLabel?: string;
  fileLastModifiedDate: Date;
  isSuccessfulUpload?: boolean;
  isUploadBtn: boolean;
  keepLabel?: boolean;
  onAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFunction?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  parsedCsv: ParsedResultData[];
}

export type ActionKey = typeof ACTIONS[keyof typeof ACTIONS]; // "delete" | "save" | "upload"
export type ActionStatus = typeof ACTION_STATUS[keyof typeof ACTION_STATUS]; // "idle" | "success"