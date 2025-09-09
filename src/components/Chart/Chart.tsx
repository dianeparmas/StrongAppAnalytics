import { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

import { useTheme } from "../../contexts/ThemeContext";

import { ChartData, ChartProps, MetricKeys } from "../../types/Chart.types";

import exercises from "../../constants/exercises";
import METRICS from "../../constants/metrics";

import { getChartWidth } from "../../helpers/chartHelpers";
import processChartData from "../../helpers/processChartData";
import visualOffsetPlugin from "../../helpers/visualOffsetPlugin";

import useWindowSize from "../../hooks/useWindowSize";

import Tooltip from "../Tooltip/Tooltip";

import "./Chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  visualOffsetPlugin,
);

const Chart = ({ chartData = [], selectedExercises = [] }: ChartProps) => {
  const [workoutData, setWorkoutData] = useState<ChartData>({
    labels: [],
    datasets: [],
    rotationAngle: 0,
  });
  const [metricType, setMetricType] = useState<MetricKeys>(METRICS.WEIGHT);
  const { isDarkMode } = useTheme();
  const { width } = useWindowSize();

  const isDeadhang =
    selectedExercises.length === 1 &&
    selectedExercises[0] === exercises.DEADHANG;

  const handleChangeMetricType = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedType = event.target.value as MetricKeys;
    setMetricType(selectedType);
  };

  useEffect(() => {
    if (isDeadhang) {
      setMetricType(METRICS.DURATION);
    } else if (metricType === METRICS.DURATION) {
      // Reset to default if not deadhang and somehow duration is selected.
      setMetricType(METRICS.WEIGHT);
    }

    const processedData = processChartData({
      chartData,
      isDarkMode,
      selectedExercises,
      metricType,
    });

    setWorkoutData(processedData);
  }, [selectedExercises, chartData, metricType]);

  const chartOptions = {
    responsive: true,
    // responsive: false, // to make the scroll
    maintainAspectRatio: false,
    // maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDarkMode ? "#f0f0f0" : "#1a1a1a",
        },
      },
      visualOffset: {
        offset: 4, // pixels
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text:
            metricType === METRICS.WEIGHT
              ? "Max Weight (kgs)"
              : metricType === METRICS.REPS
                ? "Max Reps"
                : "Max Duration (sec)",
          color: isDarkMode ? "#f0f0f0" : "#1a1a1a",
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
        },
        ticks: {
          color: isDarkMode ? "#f0f0f0" : "#1a1a1a",
        },
      },
      // prevent axis tick skipping
      x: {
        // This is the key part to control the axis ticks
        ticks: {
          // Prevents skipping
          autoSkip: false,
          // Rotates labels to fit
          maxRotation: workoutData.rotationAngle,
          minRotation: workoutData.rotationAngle,
          color: isDarkMode ? "#f0f0f0" : "#1a1a1a",
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
        },
      },
    },
  };

  const tooltipContent = (
    <>
      <p>Click a legend item to hide or show its exercise line</p>
      {selectedExercises.length > 1 && (
        <>
          <p>
            Empty nodes mean that the exercise was not performed on that day
          </p>
          <p>
            The graph shows the overall maximum (weight/reps) across all sets of
            that exercise
          </p>
        </>
      )}
    </>
  );

  return (
    <>
      {workoutData?.datasets?.length > 0 && (
        <>
          {selectedExercises.length === 1 && (
            <p>Viewing individual data for: {selectedExercises[0]}</p>
          )}
          {!isDeadhang && (
            <>
              <label>Choose metric type:</label>
              <select
                onChange={(event) => handleChangeMetricType(event)}
                size={1}
                className="metric-select"
              >
                <option key={METRICS.WEIGHT} value={METRICS.WEIGHT}>
                  Weight
                </option>
                <option key={METRICS.REPS} value={METRICS.REPS}>
                  Reps
                </option>
              </select>
            </>
          )}
          <div className="chart-wrapper">
            <div
              className="chart-content"
              style={{
                // width: `${getChartWidth(workoutData.labels.length)}`,
                width: `${width < 768 ? getChartWidth(workoutData.labels.length) : `100%`}`,
                // width: `50%`,
              }}
            >
              <Line options={chartOptions} data={workoutData} />
              <Tooltip>{tooltipContent}</Tooltip>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Chart;
