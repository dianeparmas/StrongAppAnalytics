import { ParsedResultData } from "./strongAppAnalytics.types";

export interface SavedFilePromptProps {
  currentDataType: string;
  deleteFile: boolean;
  fileLastModifiedDate: Date;
  handleDelete: () => void;
  handleSave: () => void;
  handleUploadFile: () => void;
  isSuccessfulUpload: boolean;
  lastSaved: Date;
  loadExistingFile: () => void;
  parsedCsv: ParsedResultData[];
  saveNew: boolean;
}
