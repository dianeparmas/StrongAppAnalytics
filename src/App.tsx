import { useEffect, useMemo, useState } from "react";

import Chart from "./components/Chart/Chart";
import Icon from "./components/Icon/Icon";
import Menu from "./components/Menu/Menu.tsx";
import SavedFilePrompt from "./components/SavedFilePrompt/SavedFilePrompt.tsx";
import SelectExercises from "./components/SelectExercises/SelectExercises.tsx";
import UploadBtn from "./components/UploadBtn/UploadBtn";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import WorkoutCalendar from "./components/WorkoutCalendar/WorkoutCalendar";

import { extractUniqueWorkoutDates } from "./utils/dates";

import { useCsvUpload } from "./hooks/useCsvUpload";
import { useDataLoader } from "./hooks/useDataLoader.ts";

import DATA_TYPE from "./constants/dataType.ts";
import MOCK_DATA from "./constants/mockData.ts";

import "./App.css";

function App() {
  const [selectedExercise, setSelectedExercise] = useState<string[]>([]);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const {
    parsedCsv,
    uniqueDates,
    uploadSuccessful,
    fileLastModifiedDate,
    currentDataType,
    setParsedCsv,
    setUniqueDates,
    setCurrentDataType,
    setFileLastModifiedDate,
    handleUploadFile,
  } = useCsvUpload();

  const { loadExistingFile, loadMockData } = useDataLoader({
    setParsedCsv,
    setUniqueDates,
    setCurrentDataType,
  });

  useEffect(() => {
    checkLocalStorage();
  }, []);

  useEffect(() => {
    checkLocalStorage();
  }, [currentDataType]);

  const uniqueExercises = useMemo(() => {
    if (parsedCsv.length === 0) return [];
    const exerciseNames = new Set(parsedCsv.map((item) => item.Name));
    return Array.from(exerciseNames);
  }, [parsedCsv]);

  const handleExerciseChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
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

  const handleExerciseChangeSingle = (value: string) => {
    setSelectedExercise([value]);
  };

  const checkLocalStorage = () => {
    const savedData = localStorage.getItem("StrongAppCSV");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const savedDate = new Date(parsedData.storedAt);
      setLastSaved(savedDate);
      setFileLastModifiedDate(new Date(parsedData?.fileSaved));
      if (!parsedCsv.length) {
        setParsedCsv(JSON.parse(parsedData.data));
      }
    }
  };

  useEffect(() => {
    if (currentDataType === "mock") {
      setParsedCsv(MOCK_DATA);
      setUniqueDates(extractUniqueWorkoutDates(MOCK_DATA));
    }
  }, [currentDataType]);

  const handleSwitchDataType = (dataType: string) => {
    setCurrentDataType(
      dataType === DATA_TYPE.MOCK ? DATA_TYPE.REAL : DATA_TYPE.MOCK,
    );
    setUniqueDates([]);
    setSelectedExercise([]);

    if (lastSaved && dataType === DATA_TYPE.MOCK) {
      loadExistingFile();
      setUniqueDates(extractUniqueWorkoutDates(parsedCsv));
    }
  };

  const noDataType = currentDataType === "";
  const hasSelectedexercise = selectedExercise?.length > 0;
  const hasDataSelected = parsedCsv.length > 0 && hasSelectedexercise;

  return (
    <>
      {noDataType && (
        <WelcomeScreen
          uploadSuccessful={uploadSuccessful}
          handleUploadFile={handleUploadFile}
          handleUseMockData={loadMockData}
        />
      )}
      <Menu
        currentDataType={currentDataType}
        handleUseMockData={loadMockData}
        handleSwitchDataType={handleSwitchDataType}
        lastSaved={lastSaved}
        handleUploadFile={handleUploadFile}
        parsedCsv={parsedCsv}
        fileLastModifiedDate={fileLastModifiedDate}
        setParsedCsv={setParsedCsv}
        setFileLastModifiedDate={setFileLastModifiedDate}
        setLastSaved={setLastSaved}
      />
      <div className="chart-exercise-container">
        {uniqueDates.length > 0 && uniqueExercises.length > 0 && (
          <div
            className={`select-container ${hasSelectedexercise ? "select-container--with-chart" : ""}`}
          >
            <SelectExercises
              currentDataType={currentDataType}
              uniqueExercises={uniqueExercises}
              onChangeFunction={handleExerciseChange}
              onChangeFunctionSingle={handleExerciseChangeSingle}
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
          <WorkoutCalendar
            uniqueDates={uniqueDates}
            workoutData={parsedCsv}
            selectedExercise={selectedExercise}
          />
        )}
        {lastSaved && parsedCsv.length > 0 ? (
          <SavedFilePrompt
            handleUploadFile={handleUploadFile}
            lastSaved={lastSaved}
            fileLastModifiedDate={fileLastModifiedDate}
            loadExistingFile={loadExistingFile}
            currentDataType={currentDataType}
          />
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
                {(!uploadSuccessful || parsedCsv.length === 0) && (
                  <>
                    <UploadBtn
                      defaultLabel={"Upload"}
                      isSuccessfulUpload={
                        parsedCsv.length === 0 ? uploadSuccessful : undefined
                      }
                      onChangeFunction={handleUploadFile}
                      className="input-new"
                    />
                    <p>
                      Or use{" "}
                      <button onClick={loadMockData} className="text-button">
                        mock data
                      </button>{" "}
                      instead
                    </p>
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
