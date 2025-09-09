import { useState } from "react";
import Papa from "papaparse";

import {
  DataType,
  ParsedResultData,
  ParsedResultWithMeta,
} from "./../types/strongAppAnalytics.types";

import modifyParsedCsv from "./../helpers/modifyParsedCsv";
import { extractUniqueWorkoutDates, formatDateString } from "./../utils/dates";

import DATA_TYPE from "./../constants/dataType";

export const useCsvUpload = () => {
  const [parsedCsv, setParsedCsv] = useState<ParsedResultData[]>([]);
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [fileLastModifiedDate, setFileLastModifiedDate] = useState<Date | null>(
    null,
  );
  const [currentDataType, setCurrentDataType] = useState<DataType>("");

  const handleUploadFile = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const file = e?.target?.files?.[0];
      if (!file) {
        return reject("No file selected.");
      }

      Papa.parse(file as any, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transform: (value, field) => {
          if (file.name === "deadhang_test.csv" && field === "Date") {
            return formatDateString(value);
          }
          return value;
        },
        complete: (results: Papa.ParseResult<unknown>) => {
          try {
            const modifiedResults = modifyParsedCsv(
              results as ParsedResultWithMeta,
            );
            setFileLastModifiedDate(new Date(file.lastModified));
            setParsedCsv(modifiedResults);
            setUniqueDates(extractUniqueWorkoutDates(modifiedResults));
            setUploadSuccessful(true);
            setCurrentDataType(DATA_TYPE.REAL);
            resolve();
          } catch (err) {
            reject(err);
          }
        },
      });
    });
  };

  return {
    parsedCsv,
    uniqueDates,
    uploadSuccessful,
    fileLastModifiedDate,
    currentDataType,
    setParsedCsv,
    setUniqueDates,
    setUploadSuccessful,
    setFileLastModifiedDate,
    setCurrentDataType,
    handleUploadFile,
  };
};
