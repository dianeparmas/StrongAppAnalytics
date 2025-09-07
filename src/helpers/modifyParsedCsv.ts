import {
  ParsedResultData,
  ParsedResultWithMeta,
  rawCsvData,
} from "../types/strongAppAnalytics.types";

const modifyParsedCsv = (csv: ParsedResultWithMeta) => {
  const transformedData = csv?.data
    ?.filter((result: rawCsvData) => {
      return result["Set Order"] !== "Rest Timer";
    })
    .map((result: any) => {
      return {
        Date: result.Date,
        Duration: result["Seconds"],
        Name: result["Exercise Name"],
        Notes: result.Notes,
        Reps: result.Reps,
        SetOrder: result["Set Order"],
        Weight: result["Weight (kg)"],
        WorkoutNr: result["Workout #"],
        WorkoutName: result["Workout Name"],
        WorkoutNotes: result["Workout Notes"],
      };
    });
  return transformedData as ParsedResultData[];
};

export default modifyParsedCsv;
