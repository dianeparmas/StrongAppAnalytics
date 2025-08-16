import { useEffect, useMemo, useState } from "react";

import Papa from "papaparse";

import Chart from "./components/Chart/Chart";
import Icon from "./components/Icon/Icon";
import Menu from "./components/Menu/Menu.tsx";
import SavedFilePrompt from "./components/SavedFilePrompt/SavedFilePrompt.tsx";
import Select from "./components/Select/Select.tsx";
import UploadBtn from "./components/UploadBtn/UploadBtn";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import WorkoutCalendar from "./components/WorkoutCalendar/WorkoutCalendar";

import {
  ParsedResult,
  ParsedResultData,
} from "./types/strongAppAnalytics.types";

import { useCsvUpload } from "./hooks/useCsvUpload";
import { useDataLoader } from "./hooks/useDataLoader.ts";
import { useFileActions } from "./hooks/useFileActions";

import DATA_TYPE from "./constants/dataType.ts";
import MOCK_DATA from "./constants/mockData.ts";

import "./App.css";

function App() {
  const [parsedCsv, setParsedCsv] = useState<ParsedResult[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<
    string | null | string[]
  >(null);
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [lastSaved, setLastSaved] = useState("");
  const [saveNew, setSaveNew] = useState(false);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [currentDataType, setCurrentDataType] = useState("");
  const [uploadedFileDate, setUploadedFileDate] = useState<Date>();
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const uniqueExercises = useMemo(() => {
    if (parsedCsv.length === 0) return [];
    const exerciseNames = new Set(parsedCsv.map((item) => item.Name));
    return Array.from(exerciseNames);
  }, [parsedCsv]);

  const modifyParsedCSV = (csv) => {
    const transformedData = csv?.data
      ?.filter((result) => {
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

  const handleUploadFile = (e) => {
    const file = e?.target?.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true, // Convert numbers automatically
        skipEmptyLines: true,
        complete: function (results) {
          const modifiedResults = modifyParsedCSV(results);
          setUploadedFileDate(file.lastModifiedDate);
          setParsedCsv(modifiedResults);
          const allWorkoutDates = modifiedResults.map(
            (row: ParsedResultData) => row.Date.split(" ")[0],
          );
          const uniqueWorkoutDates = [...new Set(allWorkoutDates)];
          setUniqueDates(uniqueWorkoutDates);

          setTimeout(() => {
            setUploadSuccessful(true);
          }, 500);

          setCurrentDataType("real");
        },
        error: function (err, file) {
          console.error("Error while parsing:", err, file);
        },
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectElement = event.target;
    const newSelectedOptions: string[] = [];
    for (const option of selectElement.options as unknown as HTMLOptionElement[]) {
      if (option.selected) {
        newSelectedOptions.push(option.value);
      }
    }
    setSelectedExercise(
      newSelectedOptions.length > 1
        ? newSelectedOptions
        : [newSelectedOptions[0]],
    );
  };

  const handleChangeSingle = (value: string) => {
    setSelectedExercise([value]);
  };

  const checkLocalStorage = () => {
    const savedData = localStorage.getItem("StrongAppCSV");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const savedDate = new Date(parsedData.storedAt);
      setLastSaved(savedDate);
      setFileLastModifiedDate(new Date(parsedData?.fileSaved));
    }
  };

  const handleSave = () => {
    console.log("handlesave fn");
    const payload = {
      data: JSON.stringify(parsedCsv),
      storedAt: new Date().toISOString(),
      fileSaved: fileLastModifiedDate?.toISOString(),
    };

    localStorage.setItem("StrongAppCSV", JSON.stringify(payload));
    // setSaveNew(true);
    setAppState((prevState) => ({ ...prevState, showSaveSuccess: true }));
  };

  const handleDelete = () => {
    localStorage.removeItem("StrongAppCSV");
    setDeleteFile(true);
  };

  const handleUseExistingFile = () => {
    const savedData = localStorage.getItem("StrongAppCSV");
    let cleanedData: ParsedResultData[] = [];
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      cleanedData = JSON.parse(parsedData?.data)?.filter((result) => {
        return result.SetOrder !== "Rest Timer";
      });
      setParsedCsv(cleanedData);
    }
    console.log("handleuse fn", parsedCsv);
    const allWorkoutDates = cleanedData.map(
      (row: ParsedResultData) => row.Date.split(" ")[0],
    );
    const uniqueWorkoutDates = [...new Set(allWorkoutDates)];
    setUniqueDates(uniqueWorkoutDates);
    setCurrentDataType("real");
  };

  const handleUseMockData = () => {
    setParsedCsv(MOCK_DATA);
    const allWorkoutDates = MOCK_DATA.map(
      (row: ParsedResultData) => row.Date.split(" ")[0],
    );
    const uniqueWorkoutDates = [...new Set(allWorkoutDates)];
    setUniqueDates(uniqueWorkoutDates);
    setCurrentDataType("mock");
  };

  useEffect(() => {
    if (currentDataType === "mock") {
      setParsedCsv(MOCK_DATA);
      const allWorkoutDates = MOCK_DATA.map(
        (row: ParsedResultData) => row.Date.split(" ")[0],
      );
      const uniqueWorkoutDates = [...new Set(allWorkoutDates)];
      setUniqueDates(uniqueWorkoutDates);
    }
  }, [currentDataType]);
  return (
    <>
      {noDataType && (
        <WelcomeScreen
          uploadSuccessful={uploadSuccessful}
          handleUploadFile={handleUploadFile}
          handleUseMockData={handleUseMockData}
        />
      )}
      <Menu
        currentDataType={currentDataType}
        handleUseMockData={handleUseMockData}
        handleSwitchDataType={handleSwitchDataType}
        lastSaved={lastSaved}
        handleUploadFile={handleUploadFile}
      />
      <div className="chart-excercise-container">
        {uniqueDates.length > 0 && uniqueExercises.length > 0 && (
          <div
            className={`select-container ${hasSelectedExcercise ? "select-container--with-chart" : ""}`}
          >
            <Select
              currentDataType={currentDataType}
              uniqueExercises={uniqueExercises}
              onChangeFunction={handleChange}
              onChangeFunctionSingle={handleChangeSingle}
            />
          </div>
        )}
        {hasDataSelected && (
          <div className="chart-container">
            <Chart chartData={parsedCsv} selectedExercises={selectedExercise} />
          </div>
        )}
      </div>
      <div className="content">
        {hasDataSelected && (
          <WorkoutCalendar uniqueDates={uniqueDates} workoutData={parsedCsv} currentDataType={currentDataType} />
        )}
        {lastSaved && !saveNew ? (
          !deleteFile && (
            <SavedFilePrompt
              isSuccessfulUpload={uploadSuccessful}
              handleUploadFile={handleUploadFile}
              lastSaved={lastSaved}
              fileLastModifiedDate={fileLastModifiedDate}
              loadExistingFile={loadExistingFile}
              handleSave={handleSave}
              saveNew={saveNew}
              handleDelete={handleDelete}
              deleteFile={deleteFile}
              currentDataType={currentDataType}
            />
          )
        ) : (
          <>
            {currentDataType !== DATA_TYPE.MOCK && (
              <>
                {parsedCsv.length === 0 && (
                  <>
                    <p>No previously saved file detected.</p>
                    <div className="upload-container">
                      <span>Upload a .csv file exported by Strong App</span>
                      <Icon icon="arrowDown" />
                    </div>
                  </>
                )}
                {/* <UploadBtn
                  defaultLabel={"Upload file"}
                  isSuccessfulUpload={uploadSuccessful}
                  onChangeFunction={handleUploadFile}
                  className="input-new"
                /> */}
                <UploadBtn
                  defaultLabel={"Upload file"}
                  isSuccessfulUpload={appState.showUploadSuccess}
                  onChangeFunction={handleUploadFile}
                  className="input-new"
                />
                {/* {appState.showUploadSuccess && (
                  <>
                    <Icon icon="success" />
                    <p>Want to save the uploaded .csv file to the browser?</p>
                    <button onClick={handleSave}>
                      {appState.showSaveSuccess ? "File saved!" : "Save file"}
                    </button>
                    {appState.showSaveSuccess && <Icon icon="success" />}
                  </>
                )} */}
                {uploadSuccessful && (
                  <>
                    {appState.showUploadSuccess && <Icon icon="success" />}
                    <p>Want to save the uploaded .csv file to the browser?</p>
                    <button onClick={handleSave}>
                      {appState.showSaveSuccess ? "File saved!" : "Save file"}
                    </button>
                    {appState.showSaveSuccess && <Icon icon="success" />}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
