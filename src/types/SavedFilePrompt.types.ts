export interface SavedFilePromptProps {
  currentDataType: string;
  fileLastModifiedDate: null | string | Date;
  handleUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  lastSaved: Date;
  loadExistingFile: () => void;
}
