export interface AppState {
  showFileComponent: boolean;
  showSaveSuccess: boolean;
  showUploadSuccess: boolean;
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
    aborted: boolean;
    delimiter: string;
    fields: string[];
    linebreak: string;
    truncated: boolean;
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
