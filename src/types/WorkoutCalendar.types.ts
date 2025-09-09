import { ParsedResultData } from "./strongAppAnalytics.types";

export interface WorkoutCalendarProps {
  currentDataType: string;
  selectedExercise: string[];
  uniqueDates: string[];
  workoutData: ParsedResultData[];
}

export interface WorkoutCalendarTileArgs {
  date: Date;
  view: string;
}

export interface GroupedExercises {
  [exerciseName: string]: ParsedResultData[];
}
