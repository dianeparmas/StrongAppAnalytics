import { ParsedResultData } from "./strongAppAnalytics.types";

export interface MenuProps {
  currentDataType: string;
  fileLastModifiedDate: Date;
  handleSwitchDataType: (value: string) => void;
  handleUploadFile: () => void;
  handleUseMockData: () => void;
  lastSaved: string | Date;
  parsedCsv: ParsedResultData[];
}
