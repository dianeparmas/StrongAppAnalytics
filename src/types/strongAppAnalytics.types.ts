export interface ParsedResult {
  data: ParsedResultData[];
  errors: [];
  meta: number;
}

export interface ParsedResultWithMeta {
  data: ParsedResultData[];
  errors: [];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    fields: string[];
  };
}

export interface ParsedResultData {
  Date: string;
  Name: string;
  Notes: string;
  Reps: string;
  SetOrder: string;
  Weight: string;
  WorkoutNr: string;
  WorkoutName: string;
  WorkoutNotes: string;
}

export interface WorkoutCalendarProps {
  uniqueDates: string[];
  workoutData: ParsedResultData[];
}
