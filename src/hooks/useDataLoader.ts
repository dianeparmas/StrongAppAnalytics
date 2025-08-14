import { ParsedResultData } from "./../types/strongAppAnalytics.types";

import MOCK_DATA from "./../constants/mockData";

interface UseDataLoaderProps {
  setParsedCsv: React.Dispatch<React.SetStateAction<ParsedResultData[]>>;
  setUniqueDates: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentDataType: React.Dispatch<React.SetStateAction<"mock" | "real">>;
}

export const useDataLoader = ({
  setParsedCsv,
  setUniqueDates,
  setCurrentDataType,
}: UseDataLoaderProps) => {
  const loadExistingFile = () => {
    const savedData = localStorage.getItem("StrongAppCSV");
    let cleanedData: ParsedResultData[] = [];
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      cleanedData = JSON.parse(parsedData?.data)?.filter(
        (result: ParsedResultData) => result.SetOrder !== "Rest Timer",
      );
      setParsedCsv(cleanedData);
    }
    const allWorkoutDates = cleanedData.map((row) => row.Date.split(" ")[0]);
    setUniqueDates([...new Set(allWorkoutDates)]);
    setCurrentDataType("real");
  };

  const loadMockData = () => {
    setParsedCsv(MOCK_DATA);
    const allWorkoutDates = MOCK_DATA.map((row) => row.Date.split(" ")[0]);
    setUniqueDates([...new Set(allWorkoutDates)]);
    setCurrentDataType("mock");
  };

  return { loadExistingFile, loadMockData };
};
