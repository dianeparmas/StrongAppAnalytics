import { useMemo, useState } from "react";

import Papa from "papaparse";

import Chart from "./components/Chart/Chart";

import "./App.css";

function App() {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [exArray, setExArray] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const [workoutData, setWorkoutData] = useState([
    { date: "2025-08-01", calories: 450, type: "Running" },
    { date: "2025-08-02", calories: 600, type: "Cycling" },
    { date: "2025-08-03", calories: 300, type: "Walking" },
    { date: "2025-08-04", calories: 750, type: "Running" },
    { date: "2025-08-05", calories: 500, type: "Swimming" },
  ]);

  const addWorkout = (newWorkout) => {
    setWorkoutData([...workoutData, newWorkout]);
  };

  const uniqueExercises = useMemo(() => {
    if (exArray.length === 0) return [];
    const exerciseNames = new Set(exArray.map((item) => item.Name));
    return Array.from(exerciseNames);
  }, [exArray]);

  const onChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const modifiedResults = results?.data?.map((result) => {
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
          console.log("modifiedResults", modifiedResults);
          setExArray(modifiedResults);
          setCsvData(results.data);
          setHeaders(results.meta.fields);
          console.log(results);
        },
        error: function (err, file) {
          console.error("Error while parsing:", err, file);
        },
      });
    }
  };

  const chartData = useMemo(() => {
    if (!selectedExercise || exArray.length === 0) {
      return null;
    }
    const filteredData = exArray.filter(
      (item) => item.Name === selectedExercise,
    );

    const sessions = {};
    filteredData.forEach((item) => {
      const workoutDate = item.Date.split(" ")[0];

      if (!sessions[workoutDate]) {
        sessions[workoutDate] = {
          date: workoutDate,
          maxWeight: item.Weight,
        };
      } else {
        if (item.Weight > sessions[workoutDate].maxWeight) {
          sessions[workoutDate].maxWeight = item.Weight;
        }
      }
    });

    const processedChartData = Object.values(sessions);
    processedChartData.sort((a, b) => new Date(a.Date) - new Date(b.Date));

    console.log("processedChartData:", processedChartData);
    return processedChartData;
  }, [exArray, selectedExercise]);

  return (
    <>
      <div className="card">
        {chartData && (
          <div className="chart-container">
            <Chart chartData={chartData || []} title={selectedExercise} />
          </div>
        )}
        <p>Upload a .CSV file exported by Strong App</p>
        <input type="file" id="csvFile" onChange={onChange} accept=".csv" />
      </div>
      <div id="output"></div>
      {uniqueExercises.length > 0 && (
        <div>
          <label>Select an Exercise:</label>
          <select onChange={(e) => setSelectedExercise(e.target.value)}>
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
    </>
  );
}

export default App;
