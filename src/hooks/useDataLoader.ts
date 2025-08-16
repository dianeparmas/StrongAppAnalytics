import { ParsedResultData } from "./../types/strongAppAnalytics.types";

import DATA_TYPE from "./../constants/dataType";
import MOCK_DATA from "./../constants/mockData";

interface UseDataLoaderProps {
  setParsedCsv: React.Dispatch<React.SetStateAction<ParsedResultData[]>>;
  setUniqueDates: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentDataType: React.Dispatch<React.SetStateAction<typeof DATA_TYPE[keyof typeof DATA_TYPE]>>;
}

export const useDataLoader = ({
  setParsedCsv,
  setUniqueDates,
  setCurrentDataType,
}: UseDataLoaderProps) => {
  const loadWorkoutData = (dataArray: ParsedResultData[], dataType: string) => {
    const allWorkoutDates = dataArray.map((row) => row.Date.split(" ")[0]);
    setUniqueDates([...new Set(allWorkoutDates)]);
    setCurrentDataType(dataType);
  };

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
    loadWorkoutData(cleanedData, DATA_TYPE.REAL);
  };

  const loadMockData = () => {
    setParsedCsv(MOCK_DATA);
    loadWorkoutData(MOCK_DATA, DATA_TYPE.MOCK);
  };

  return { loadExistingFile, loadMockData };
};
