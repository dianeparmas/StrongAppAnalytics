import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Chart = ({ chartData = [], selectedExercises = [] }) => {

  const [workoutData, setWorkoutData] = useState([]);

  const formatDateToYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (
      selectedExercises &&
      selectedExercises.length > 0 &&
      chartData.length > 0
    ) {
      const compiledData = {};
      chartData.forEach((item) => {
        const workoutDate = formatDateToYYYYMMDD(new Date(item.Date));
        const numericWeight = Number(item.Weight);
        const numericDuration = Number(item.Duration);

        // Check if the exercise key exists
        if (!compiledData[item.Name]) {
          compiledData[item.Name] = {};
        }

        if (item.Name === "Deadhang") {
          // For "Deadhang", we want to store the duration in seconds
          if (
            !compiledData[item.Name][workoutDate] ||
            numericDuration > compiledData[item.Name][workoutDate]
          ) {
            compiledData[item.Name][workoutDate] = numericDuration;
          }
        } else {
          // Check if an entry for this date exists, and if the current weight is a new max
          if (
            !compiledData[item.Name][workoutDate] ||
            numericWeight > compiledData[item.Name][workoutDate]
          ) {
            compiledData[item.Name][workoutDate] = numericWeight;
          }
        }
      });

      // 2. Get all unique dates across all selected exercises for the X-axis labels
      const allDates = selectedExercises.flatMap((exerciseName) =>
        Object.keys(compiledData[exerciseName] || {}),
      );
      const uniqueDates = [...new Set(allDates)].sort();

      // An array of unique point styles and their recommended radius for visual balance
      const pointStyles = [
        { style: 'circle', radius: 7, offset: 0 },
        { style: 'rect', radius: 7, offset: 0.1 }, // Offset by 0.1
        { style: 'star', radius: 7, offset: -0.1 }, // Offset by -0.1
        { style: 'triangle', radius: 8, offset: 0.2 },
        { style: 'cross', radius: 7, offset: -0.2 },
        { style: 'dash', radius: 8, offset: 0.3 }
      ];

      // create a dataset for each selected exercise
      const newDatasets = selectedExercises?.map((exerciseName, index) => {
        const exerciseProgress = compiledData[exerciseName] || {};
        let lastKnownWeight = null;
        const dataForChart = [];
        const backgroundColors = [];
        const pointBackgroundColors = [];
        const randomColor = `hsl(${Math.random() * 360}, 70%, 50%)`;

        uniqueDates.map((date) => {
          // Check if there is a new workout for the current date
          const currentWeight = exerciseProgress[date] || null;

          if (currentWeight !== null) {
            // If there's a new weight, update lastKnownWeight
            lastKnownWeight = currentWeight;
            dataForChart.push(currentWeight);
            backgroundColors.push(randomColor); // Color for a workout day
          } else {
            console.log("ELSE NO WORKOUT DATA");
            // If there's no new weight, use the last known weight and a different color
            dataForChart.push(lastKnownWeight);
            backgroundColors.push("rgba(195, 195, 195, 0.3)");
          }
        });
        const { style, radius, offset } =
          pointStyles[index % pointStyles.length];

        return {
          label: exerciseName,
          data: dataForChart.map((value, i) => ({
            x: i + offset,
            y: value,
          })),
          borderColor: randomColor,
          pointBorderColor: randomColor,
          // pointBackgroundColor: pointBackgroundColors,
          pointBackgroundColor: backgroundColors,
          pointRadius: radius,
          pointStyle: style,
        };
      });
      setWorkoutData({
        labels: uniqueDates,
        datasets: newDatasets,
      });
    } else {
      setWorkoutData({ datasets: [] });
    }
  }, [selectedExercises, chartData]);

  const chartConfig = {
    labels: chartData.map((item) => item.date),
    datasets: chartData.map((item, index) => ({
      label: "Max Weight (kg)",
      data: chartData.map((item) => item.maxWeight),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    })),
  };

  // const options = {
  //   responsive: true,
  //   type: "line",
  //   plugins: {
  //     legend: { position: "top" },
  //     // title: { display: true, text: `Progress for: ${selectedExercises[0]}` },
  //     title: { display: true, text: `Progress for: test` },
  //   },
  //   scales: {
  //     y: { beginAtZero: true },
  //   },
  // };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Workout Progress",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Max Weight (kgs)",
        },
      },
    },
  };
  return (
    <>
      {workoutData?.datasets?.length > 0 ? (
        <>
          {selectedExercises.length === 1 && (
            <>
              <p>Viewing individual data for: {selectedExercises[0]}</p>
              <button onClick={handleSeeSetsData}>
                See individual data for sets
              </button>
              <label>Choose metric type:</label>
              <select
                onChange={(event) => handleChangeMetricType(event)}
                size={1}
              >
                <option key={"Weight"} value={"Weight"}>
                  Weight
                </option>
                <option key={"Reps"} value={"Reps"}>
                  Reps
                </option>
              </select>
            </>
          )}

          <Line options={options} data={testing ? testing : workoutData} />
        </>
      ) : (
        <p>Please select one or more exercises to view the graph.</p>
      )}
    </>
  );
};

export default Chart;
