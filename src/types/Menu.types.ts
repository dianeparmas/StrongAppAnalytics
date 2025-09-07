import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { DataType, ParsedResultData } from "./strongAppAnalytics.types";

export interface MenuProps {
  currentDataType: DataType;
  fileLastModifiedDate: null | string | Date;
  handleSwitchDataType: (value: string) => void;
  handleUploadFile: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUseMockData: () => void;
  lastSaved: null | string | Date;
  parsedCsv: ParsedResultData[];
  setFileLastModifiedDate: Dispatch<SetStateAction<null | Date | string>>;
  setLastSaved: Dispatch<SetStateAction<null | Date | string>>;
  setParsedCsv: Dispatch<SetStateAction<ParsedResultData[]>>;
}
