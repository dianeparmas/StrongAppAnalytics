import { ParseError } from 'papaparse';

import DATA_TYPE from '../constants/dataType';

export interface ParsedResult {
  data: ParsedResultData[];
  errors: ParseError[];
  meta: number;
}

export interface ParsedResultWithMeta {
  data: rawCsvData[];
  errors: ParseError[];
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
  "Distance (meters)": number | null;
  "Duration (sec)": number;
  "Exercise Name": string;
  Notes: string | null;
  RPE: number | null;
  Reps: number | null;
  Seconds: number | null;
  "Set Order": number | string;
  "Weight (kg)": number | null;
  "Workout #": number;
  "Workout Name": string;
  "Workout Notes": string | null;
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
  [key: string]: string | number | null | undefined;
}

export type DataType = "" | "real" | "mock";

export type DataToLoad = (typeof DATA_TYPE)['REAL'] | (typeof DATA_TYPE)['MOCK'] | "";