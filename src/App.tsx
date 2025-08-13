import { useEffect, useMemo, useState } from "react";

import Papa from "papaparse";

import Chart from "./components/Chart/Chart";
import CustomUploadBtn from "./components/CustomUploadBtn/CustomUploadBtn";
import Icon from "./components/Icon/Icon";
import WorkoutCalendar from "./components/WorkoutCalendar/WorkoutCalendar";

import {
  ParsedResult,
  ParsedResultData,
} from "./types/strongAppAnalytics.types";

import MOCK_DATA from "./constants/mockData.tsx";

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

  const checkLocalStorage = () => {
    const savedData = localStorage.getItem("StrongAppCSV");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const savedDate = new Date(parsedData.savedAt);
      setLastSaved(savedDate);
    }
  };

  const handleSave = () => {
    console.log("handlesave fn");
    const payload = {
      data: JSON.stringify(parsedCsv),
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem("StrongAppCSV", JSON.stringify(payload));
    setSaveNew(true);
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
    console.log('handleuse fn', parsedCsv);
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
        <>
          <h1>Custom simple analytics for Strong-app data</h1>
          <h2>Welcome !</h2>
          <p>
            This is a very lightweight and straightforward web app. You can
            either{" "}
            <CustomUploadBtn
              defaultLabel={"upload"}
              isSuccessfulUpload={uploadSuccessful}
              onChangeFunction={handleUploadFile}
              className="input--style-text"
            />{" "}
            your exported .csv file to see your own data, or you can use the{" "}
            <button onClick={handleUseMockData} className="text-button">
              mock data
            </button>
            .
          </p>
          <p>
            I made this because I kept forgetting when was the last time I
            raised my weights for a given excercise.
          </p>
          <p>This simple web app is using react-calendar and ChartJS</p>
        </>
      )}
      {currentDataType && (
        <div className="dataType-container">
          <div className="dataType-label">
            <p>Using {currentDataType} data</p>
            <Icon icon="menu" onClickFunction={handleOpenMenu} />
          </div>
          <div className="dataType-menu">
            <button onClick={() => handleSwitchDataType(currentDataType)}>
              Use {currentDataType === "mock" ? "real" : "mock"} data instead
            </button>
          </div>
        </div>
      )}
      <div className="chart-excercise-container">
        {uniqueDates.length > 0 && uniqueExercises.length > 0 && (
          <div
            className={`select-container ${hasSelectedExcercise ? "select-container--with-chart" : ""}`}
          >
            <label>
              Select an Exercise from{" "}
              {currentDataType === "mock" ? "mock data" : "real data"}:<br />
              <span className="smaller-text">(can choose multiple)</span>
            </label>
            <select
              onChange={(event) => handleChange(event)}
              multiple={true}
              defaultValue={[
                "Bench Press (Dumbbell)",
                "Strict Military Press (Barbell)",
              ]}
              size={6}
            >
              <option key={"None"} value={"None"}>
                {"None"}
              </option>
              {uniqueExercises.map((exerciseName) => (
                <option key={exerciseName} value={exerciseName}>
                  {exerciseName}
                </option>
              ))}
            </select>
          </div>
        )}
        {parsedCsv.length > 0 && hasSelectedExcercise && (
          <>
            <div className="chart-container">
              <Chart
                chartData={parsedCsv}
                selectedExercises={selectedExercise}
              />
            </div>
          </>
        )}
      </div>
      <div className="card">
        {parsedCsv.length > 0 && hasSelectedExcercise && (
          <WorkoutCalendar uniqueDates={uniqueDates} workoutData={parsedCsv} />
        )}
        {lastSaved && !saveNew ? (
          <>
            <p>
              Detecting a file last saved at {lastSaved.toLocaleString()} (local
              time).
            </p>
            <p>Would you like to use that file or upload a new one?</p>
            <button onClick={handleUseExistingFile}>Use this file</button>
            <label className="input-hidden-label">
              Upload a new file
              <input
                type="file"
                id="csvFile"
                className="input-hidden"
                onChange={handleUploadFile}
                accept=".csv"
              />
            </label>
            {uploadSuccessful && (
              <>
                <Icon icon="success" />
                <p>Want to save the uploaded .csv file to the browser?</p>
                <button onClick={handleSave}>
                  {saveNew ? "File saved!" : "Save the file"}
                </button>
                {saveNew && <Icon icon="success" />}
              </>
            )}
          </>
        ) : (
          <>
            {currentDataType !== "mock" && (
              <>
                <p>No previously saved file detected.</p>
                <div className="upload-container">
                  <span>Upload a .CSV file exported by Strong App</span>
                  <Icon icon="arrowDown" />
                </div>
                <CustomUploadBtn
                  defaultLabel={"Upload"}
                  isSuccessfulUpload={uploadSuccessful}
                  onChangeFunction={handleUploadFile}
                  className="input-new"
                />
                <>
                  <CustomUploadBtn
                    defaultLabel={"Upload multiple"}
                    isSuccessfulUpload={uploadSuccessful}
                    onChangeFunction={handleMultipleUploadFiles}
                    isMultiple
                    className="input-new"
                  />
                </>
                {uploadSuccessful && (
                  <>
                    <Icon icon="success" />
                    <p>Want to save the uploaded .csv file to the browser?</p>
                    <button onClick={handleSave}>
                      {saveNew ? "File saved!" : "Save the file"}
                    </button>
                    {saveNew && <Icon icon="success" />}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      {noDataType && (
        <div className="mockData-container">
          <p>
            Want to try it out <br />
            with mock data {currentDataType === "real" && "instead"}?
          </p>
          <button onClick={handleUseMockData}>Use mock data</button>
        </div>
      )}
    </>
  );
}

export default App;
