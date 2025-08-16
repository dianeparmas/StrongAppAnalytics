export interface AppState {
  showSaveSuccess: boolean;
  showUploadSuccess: boolean;
  showFileComponent: boolean;
}

export interface ParsedResult {
  data: ParsedResultData[];
  errors: [];
  meta: number;
}

export interface ParsedResultWithMeta {
  data: rawCsvData[];
  errors: [];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    fields: string[];
  };
}

export interface rawCsvData {
  Date: string;
  "Distance (meters)": number;
  "Duration (sec)": number;
  "Exercise Name": string;
  Notes: string;
  RPE: number;
  Reps: number;
  Seconds: number;
  "Set Order": number | string;
  "Weight (kg)": number;
  "Workout #": number;
  "Workout Name": string;
  "Workout Notes": string;
}

export interface ParsedResultData {
  Date: string;
  Duration?: null | string;
  Name: string;
  Notes: string;
  Reps: string;
  SetOrder: number | string;
  Weight: string;
  WorkoutNr: string;
  WorkoutName: string;
  WorkoutNotes: string;
}

export interface WorkoutCalendarProps {
  uniqueDates: string[];
  workoutData: ParsedResultData[];
}

export interface ChartProps {
  chartData: ParsedResultData[];
  selectedExercises: string[];
}

export interface SelectProps {
  currentDataType: string;
  uniqueExercises: string[];
  onChangeFunction: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeFunctionSingle: (value: string) => void;
}

export interface UploadBtnProps {
  className?: string;
  defaultLabel?: string;
  keepLabel?: boolean;
  isSuccessfulUpload?: boolean;
  onChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface WelcomeScreenProps {
  uploadSuccessful: boolean;
  handleUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUseMockData: () => void;
}

export interface MenuProps {
  currentDataType: string;
  handleUploadFile: () => void;
  handleUseMockData: () => void;
  handleSwitchDataType: (value: string) => void;
  lastSaved: string | Date;
}

export interface IconProps {
  icon: string;
  onClickFunction?: () => void;
}

export interface SavedFilePromptProps {
  isSuccessfulUpload: boolean;
  handleUploadFile: () => void;
  lastSaved: Date;
  fileLastModifiedDate: Date;
  loadExistingFile: () => void;
  handleSave: () => void;
  saveNew: boolean;
  handleDelete: () => void;
  deleteFile: boolean;
  currentDataType: string;
}
