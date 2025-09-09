import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { DataType, ParsedResultData } from "./strongAppAnalytics.types";

export interface MenuProps {
  currentDataType: DataType;
  fileLastModifiedDate: null | Date;
  handleSwitchDataType: (value: string) => void;
  handleUploadFile: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUseMockData: () => void;
  lastSaved: null | string | Date;
  parsedCsv: ParsedResultData[];
  setFileLastModifiedDate: Dispatch<SetStateAction<null | Date>>;
  setLastSaved: Dispatch<SetStateAction<null | Date>>;
  setParsedCsv: Dispatch<SetStateAction<ParsedResultData[]>>;
}
