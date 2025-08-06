import { useEffect, useMemo, useState } from "react";

import Papa from "papaparse";

import Chart from "./components/Chart/Chart";
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

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const uniqueExercises = useMemo(() => {
    if (parsedCsv.length === 0) return [];
    const exerciseNames = new Set(parsedCsv.map((item) => item.Name));
    return Array.from(exerciseNames);
  }, [parsedCsv]);

  const handleUploadFile = (e) => {
    const file = e?.target?.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const modifiedResults = results?.data
            ?.filter((result) => {
              return result["Set Order"] !== "Rest Timer";
            })
            .map((result: any) => {
              return {
                Date: result.Date,
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
          setParsedCsv(modifiedResults);
          const allWorkoutDates = modifiedResults.map(
            (row: ParsedResultData) => row.Date.split(" ")[0],
          );
          const uniqueWorkoutDates = [...new Set(allWorkoutDates)];
          setUniqueDates(uniqueWorkoutDates);
          setUploadSuccessful(true);
          console.log('SEY');
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

  return (
    <>
    {currentDataType && <p className="mockData-label">Using {currentDataType} data</p>}
      <div className="chart-excercise-container">
        {uniqueDates.length > 0 && uniqueExercises.length > 0 && (
          <div className="select-container">
            <label>
              Select an Exercise: <br />
              <span className="smaller-text">(can choose more than 1)</span>
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
        {parsedCsv.length > 0 && selectedExercise?.length > 0 && (
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
        {parsedCsv.length > 0 && selectedExercise?.length > 0 && (
          <WorkoutCalendar
            uniqueDates={uniqueDates}
            workoutData={parsedCsv}
          />
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
          </>
        ) : (
          <>
            <p>No previously saved file detected.</p>
            <div className="upload-container">
              <span>Upload a .CSV file exported by Strong App</span>
              <img
                src="/src/assets/arrow_down.png"
                alt="Success"
                className="arrow-icon"
              />
            </div>
            <label className="input-hidden-label input-new">
              {uploadSuccessful ? "Uploaded" : "Upload"}
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
                <img
                  src="/src/assets/check_success.png"
                  alt="Success"
                  className="success-icon"
                />
                <p>Want to save the uploaded .csv file to the browser?</p>
                <button onClick={handleSave}>
                  {saveNew ? "File saved!" : "Save the file"}
                </button>
                {saveNew && (
                  <img
                    src="/src/assets/check_success.png"
                    alt="Success"
                    className="success-icon"
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      <>
        <p>Want to try it out with mock data?</p>
        <button onClick={handleUseMockData}>Use mock data</button>
      </>
    </>
  );
}

export default App;
