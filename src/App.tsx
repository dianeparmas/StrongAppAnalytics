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

  // Example of how you might add a new workout
  // This could be triggered by a form submission
  const handleAddWorkoutClick = () => {
    const newEntry = {
      date: `2025-08-0${workoutData.length + 1}`,
      calories: Math.floor(Math.random() * 500) + 300,
      type: "Yoga",
    };
    addWorkout(newEntry);
  };

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
          // 'results.data' is an array of objects
          setCsvData(results.data);
          // 'results.meta.fields' contains the header names
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

    // 1. Filter the data to only include the selected exercise
    const filteredData = exArray.filter(
      (item) => item.Name === selectedExercise,
    );

    // 2. Group the data by workout session (Date) to find the max weight
    const sessions = {};
    filteredData.forEach((item) => {
      // The Date includes time, so we need to truncate it to a single day for the x-axis
      const workoutDate = item.Date.split(" ")[0];

      // If this is the first entry for this workout session, initialize it
      if (!sessions[workoutDate]) {
        sessions[workoutDate] = {
          date: workoutDate,
          maxWeight: item.Weight,
        };
      } else {
        // Otherwise, update the max weight if the current item is heavier
        if (item.Weight > sessions[workoutDate].maxWeight) {
          sessions[workoutDate].maxWeight = item.Weight;
        }
      }
    });

    // 3. Convert the grouped sessions object into an array for the chart
    const processedChartData = Object.values(sessions);

    // 4. Sort the data by date to ensure the line chart is chronological
    processedChartData.sort((a, b) => new Date(a.Date) - new Date(b.Date));

    // This is the final data format your Chart.js component expects
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

          <select
            // defaultValue="Goblet Squat (Kettlebell)"
            onChange={(e) => setSelectedExercise(e.target.value)}
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
    </>
  );
}

export default App;
